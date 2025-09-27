import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles, reviews, users, categories } from '@/lib/db/schema';
import { eq, sql, count, and, gte, lte, desc } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 获取统计数据
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // 构建查询条件
    let whereConditions = [];
    if (startDate) {
      whereConditions.push(gte(articles.createdAt, startDate));
    }
    if (endDate) {
      whereConditions.push(lte(articles.createdAt, endDate));
    }

    // 1. 文章总数统计
    const totalArticles = await db
      .select({ count: count() })
      .from(articles)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    // 2. 按状态统计文章数量
    const articlesByStatus = await db
      .select({
        status: articles.status,
        count: count()
      })
      .from(articles)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .groupBy(articles.status);

    // 3. 按分类统计文章数量
    const articlesByCategory = await db
      .select({
        categoryName: categories.name,
        count: count()
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .groupBy(categories.name);

    // 4. 审稿统计
    const reviewStats = await db
      .select({
        totalReviews: count(),
        completedReviews: sql<number>`COUNT(CASE WHEN ${reviews.status} = 'completed' THEN 1 END)`,
        pendingReviews: sql<number>`COUNT(CASE WHEN ${reviews.status} = 'pending' THEN 1 END)`,
        declinedReviews: sql<number>`COUNT(CASE WHEN ${reviews.status} = 'declined' THEN 1 END)`
      })
      .from(reviews)
      .leftJoin(articles, eq(reviews.articleId, articles.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

    // 5. 审稿推荐意见统计
    const recommendationStats = await db
      .select({
        recommendation: reviews.recommendation,
        count: count()
      })
      .from(reviews)
      .leftJoin(articles, eq(reviews.articleId, articles.id))
      .where(and(
        eq(reviews.status, 'completed'),
        whereConditions.length > 0 ? and(...whereConditions) : undefined
      ))
      .groupBy(reviews.recommendation);

    // 6. 审稿轮次统计 (暂时跳过，因为当前数据库没有reviewRound字段)
    const reviewRoundStats: Array<{ reviewRound: number; count: number }> = [];

    // 7. 审稿人工作量统计
    const reviewerWorkload = await db
      .select({
        reviewerName: users.name,
        reviewerEmail: users.email,
        totalReviews: count(),
        completedReviews: sql<number>`COUNT(CASE WHEN ${reviews.status} = 'completed' THEN 1 END)`,
        pendingReviews: sql<number>`COUNT(CASE WHEN ${reviews.status} = 'pending' THEN 1 END)`
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.reviewerId, users.id))
      .leftJoin(articles, eq(reviews.articleId, articles.id))
      .where(and(
        eq(users.role, 'reviewer'),
        whereConditions.length > 0 ? and(...whereConditions) : undefined
      ))
      .groupBy(users.id, users.name, users.email)
      .orderBy(desc(count()));

    // 8. 月度投稿趋势
    const monthlyTrends = await db
      .select({
        month: sql<string>`strftime('%Y-%m', ${articles.createdAt})`,
        count: count()
      })
      .from(articles)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .groupBy(sql`strftime('%Y-%m', ${articles.createdAt})`)
      .orderBy(sql`strftime('%Y-%m', ${articles.createdAt})`);

    // 9. 平均审稿时间统计
    const avgReviewTime = await db
      .select({
        avgDays: sql<number>`AVG(julianday(${reviews.updatedAt}) - julianday(${reviews.createdAt}))`
      })
      .from(reviews)
      .leftJoin(articles, eq(reviews.articleId, articles.id))
      .where(and(
        eq(reviews.status, 'completed'),
        whereConditions.length > 0 ? and(...whereConditions) : undefined
      ));

    const statistics = {
      overview: {
        totalArticles: totalArticles[0]?.count || 0,
        totalReviews: reviewStats[0]?.totalReviews || 0,
        completedReviews: reviewStats[0]?.completedReviews || 0,
        pendingReviews: reviewStats[0]?.pendingReviews || 0,
        declinedReviews: reviewStats[0]?.declinedReviews || 0,
        avgReviewTime: Math.round(avgReviewTime[0]?.avgDays || 0)
      },
      articlesByStatus: articlesByStatus,
      articlesByCategory: articlesByCategory,
      recommendationStats: recommendationStats,
      reviewRoundStats: reviewRoundStats,
      reviewerWorkload: reviewerWorkload,
      monthlyTrends: monthlyTrends,
      dateRange: {
        startDate: startDate || '全部',
        endDate: endDate || '全部'
      }
    };

    return NextResponse.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
