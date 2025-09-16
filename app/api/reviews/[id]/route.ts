import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reviews, reviewHistory } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 提交审稿意见
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'reviewer' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { reviewId, score, recommendation, comments, confidentialComments } = await request.json();

    if (!reviewId || !score || !recommendation || !comments) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 更新审稿记录
    await db
      .update(reviews)
      .set({
        score: parseInt(score),
        recommendation,
        comments,
        confidentialComments,
        status: 'completed',
        submittedAt: new Date().toISOString()
      })
      .where(eq(reviews.id, reviewId));

    // 记录审稿历史
    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    if (review[0]) {
      await db.insert(reviewHistory).values({
        articleId: review[0].articleId,
        reviewerId: review[0].reviewerId,
        action: 'review_completed',
        comments: `评分: ${score}, 推荐: ${recommendation}`,
        metadata: JSON.stringify({
          score: parseInt(score),
          recommendation,
          comments,
          confidentialComments
        })
      });
    }

    return NextResponse.json({ success: true, message: '审稿意见提交成功' });
  } catch (error) {
    console.error('提交审稿意见失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新审稿状态
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'reviewer' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { reviewId, status } = await request.json();

    if (!reviewId || !status) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 更新审稿状态
    await db
      .update(reviews)
      .set({ status })
      .where(eq(reviews.id, reviewId));

    // 记录状态变更历史
    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId))
      .limit(1);

    if (review[0]) {
      await db.insert(reviewHistory).values({
        articleId: review[0].articleId,
        reviewerId: review[0].reviewerId,
        action: `status_changed_to_${status}`,
        comments: `审稿状态变更为: ${status}`
      });
    }

    return NextResponse.json({ success: true, message: '状态更新成功' });
  } catch (error) {
    console.error('更新审稿状态失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
