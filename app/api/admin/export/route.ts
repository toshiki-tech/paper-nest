import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles, reviews, reviewHistory, users, categories } from '@/lib/db/schema';
import { alias } from 'drizzle-orm/sqlite-core';
import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 导出审稿记录
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const format = searchParams.get('format') || 'json';

    // 构建查询条件
    let whereConditions = [];
    if (startDate) {
      whereConditions.push(gte(articles.createdAt, startDate));
    }
    if (endDate) {
      whereConditions.push(lte(articles.createdAt, endDate));
    }

    // 创建用户表别名
    const correspondingAuthors = alias(users, 'corresponding_authors');
    const reviewers = alias(users, 'reviewers');

    // 获取所有文章及其审稿记录
    const articlesWithReviews = await db
      .select({
        articleId: articles.id,
        title: articles.title,
        authors: articles.authors,
        status: articles.status,
        submissionDate: articles.createdAt,
        publishedAt: articles.publishedAt,
        categoryName: categories.name,
        correspondingAuthorName: correspondingAuthors.name,
        correspondingAuthorEmail: correspondingAuthors.email,
        reviewId: reviews.id,
        reviewRound: reviews.reviewRound,
        reviewerName: reviewers.name,
        reviewerEmail: reviewers.email,
        reviewStatus: reviews.status,
        reviewScore: reviews.score,
        reviewRecommendation: reviews.recommendation,
        reviewComments: reviews.comments,
        reviewSubmittedAt: reviews.updatedAt,
        reviewDeadline: reviews.deadline
      })
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .leftJoin(correspondingAuthors, eq(articles.correspondingAuthorId, correspondingAuthors.id))
      .leftJoin(reviews, eq(articles.id, reviews.articleId))
      .leftJoin(reviewers, eq(reviews.reviewerId, reviewers.id))
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(articles.createdAt), desc(reviews.reviewRound));

    // 获取审稿历史记录
    const reviewHistories = await db
      .select({
        articleId: reviewHistory.articleId,
        reviewerId: reviewHistory.reviewerId,
        action: reviewHistory.action,
        comments: reviewHistory.comments,
        metadata: reviewHistory.metadata,
        createdAt: reviewHistory.createdAt
      })
      .from(reviewHistory)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
      .orderBy(desc(reviewHistory.createdAt));

    // 组织数据
    const exportData = {
      exportInfo: {
        exportDate: new Date().toISOString(),
        exportedBy: session.user.name || session.user.email,
        dateRange: {
          startDate: startDate || '全部',
          endDate: endDate || '全部'
        },
        totalArticles: articlesWithReviews.length,
        totalReviews: articlesWithReviews.filter(a => a.reviewId).length
      },
      articles: articlesWithReviews,
      reviewHistories: reviewHistories
    };

    if (format === 'csv') {
      // 生成CSV格式
      const csvContent = generateCSV(exportData);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="审稿记录_${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    } else {
      // 返回JSON格式
      return NextResponse.json({
        success: true,
        data: exportData
      });
    }
  } catch (error) {
    console.error('导出审稿记录失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 生成CSV内容
function generateCSV(data: any): string {
  const headers = [
    '文章ID',
    '文章标题',
    '作者',
    '通讯作者',
    '通讯作者邮箱',
    '文章状态',
    '投稿日期',
    '发表日期',
    '分类',
    '审稿轮次',
    '审稿人',
    '审稿人邮箱',
    '审稿状态',
    '评分',
    '推荐意见',
    '审稿意见',
    '审稿提交时间',
    '审稿截止时间'
  ];

  const rows = data.articles.map((article: any) => [
    article.articleId,
    article.title,
    article.authors,
    article.correspondingAuthorName,
    article.correspondingAuthorEmail,
    article.status,
    article.submissionDate,
    article.publishedAt,
    article.categoryName,
    article.reviewRound,
    article.reviewerName,
    article.reviewerEmail,
    article.reviewStatus,
    article.reviewScore,
    article.reviewRecommendation,
    article.reviewComments,
    article.reviewSubmittedAt,
    article.reviewDeadline
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row: any[]) => row.map(cell => `"${cell || ''}"`).join(','))
  ].join('\n');

  return '\uFEFF' + csvContent; // 添加BOM以支持中文
}
