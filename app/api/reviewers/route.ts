import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, reviews, reviewHistory } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 获取审稿人列表
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'editor' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    // 获取所有审稿人及其当前工作量
    const reviewers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        workload: sql<number>`COUNT(CASE WHEN ${reviews.status} IN ('assigned', 'in_progress') THEN 1 END)`
      })
      .from(users)
      .leftJoin(reviews, eq(users.id, reviews.reviewerId))
      .where(eq(users.role, 'reviewer'))
      .groupBy(users.id, users.name, users.email);

    return NextResponse.json({ success: true, data: reviewers });
  } catch (error) {
    console.error('获取审稿人列表失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 分配审稿人
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'editor' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { articleId, reviewerId, deadline, comments } = await request.json();

    if (!articleId || !reviewerId || !deadline) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 检查是否已有审稿记录，确定审稿轮次
    const existingReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.articleId, articleId));

    const reviewRound = existingReviews.length + 1;

    // 创建审稿记录
    const newReview = await db.insert(reviews).values({
      articleId,
      reviewerId,
      reviewRound,
      status: 'assigned',
      deadline,
      comments
    }).returning();

    // 记录审稿历史
    await db.insert(reviewHistory).values({
      articleId,
      reviewerId,
      action: 'reviewer_assigned',
      comments: `第${reviewRound}轮审稿分配给 ${session.user.name || session.user.email}`,
      metadata: JSON.stringify({
        reviewRound,
        deadline,
        comments
      })
    });

    return NextResponse.json({ 
      success: true, 
      message: `第${reviewRound}轮审稿分配成功`,
      data: newReview[0]
    });
  } catch (error) {
    console.error('分配审稿人失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
