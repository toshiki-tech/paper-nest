import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reviews, reviewHistory, articles, users } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 处理下一轮审稿分配
async function handleNextReviewRound(articleId: string, nextRound: number) {
  try {
    // 获取所有审稿人
    const allReviewers = await db
      .select()
      .from(users)
      .where(eq(users.role, 'reviewer'));

    // 获取已分配过此文章的审稿人
    const assignedReviewers = await db
      .select({ reviewerId: reviews.reviewerId })
      .from(reviews)
      .where(eq(reviews.articleId, articleId));

    const assignedReviewerIds = assignedReviewers.map(r => r.reviewerId);

    // 找到未分配过的审稿人
    const availableReviewers = allReviewers.filter(
      reviewer => !assignedReviewerIds.includes(reviewer.id)
    );

    if (availableReviewers.length > 0) {
      // 随机选择一个审稿人
      const selectedReviewer = availableReviewers[Math.floor(Math.random() * availableReviewers.length)];
      
      // 创建新的审稿记录
      const newReview = await db.insert(reviews).values({
        articleId,
        reviewerId: selectedReviewer.id,
        reviewRound: nextRound,
        status: 'assigned',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14天后截止
      }).returning();

      // 记录审稿历史
      await db.insert(reviewHistory).values({
        articleId,
        reviewerId: selectedReviewer.id,
        action: 'auto_assigned_next_round',
        comments: `自动分配第${nextRound}轮审稿给 ${selectedReviewer.name || selectedReviewer.email}`,
        metadata: JSON.stringify({
          reviewRound: nextRound,
          autoAssigned: true
        })
      });

      console.log(`第${nextRound}轮审稿已自动分配给: ${selectedReviewer.name || selectedReviewer.email}`);
    } else {
      // 如果没有可用的审稿人，记录日志
      await db.insert(reviewHistory).values({
        articleId,
        reviewerId: '', // 空字符串表示系统操作
        action: 'no_available_reviewers',
        comments: `第${nextRound}轮审稿：没有可用的审稿人`,
        metadata: JSON.stringify({
          reviewRound: nextRound,
          error: 'no_available_reviewers'
        })
      });
    }
  } catch (error) {
    console.error('处理下一轮审稿失败:', error);
  }
}

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
          confidentialComments,
          reviewRound: review[0].reviewRound
        })
      });

      // 三审制逻辑：如果当前审稿通过且不是最后一轮，自动分配给下一个审稿人
      if (recommendation === 'accept' && review[0].reviewRound < 3) {
        await handleNextReviewRound(review[0].articleId, review[0].reviewRound + 1);
      }
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
