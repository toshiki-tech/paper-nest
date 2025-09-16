import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { articles, reviews } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 更新文章状态
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'editor' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: '权限不足' }, { status: 403 });
    }

    const { articleId, status, comments } = await request.json();

    if (!articleId || !status) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
    }

    // 更新文章状态
    await db
      .update(articles)
      .set({ 
        status,
        lastModified: new Date().toISOString(),
        metadata: comments ? JSON.stringify({ editorComments: comments }) : undefined
      })
      .where(eq(articles.id, articleId));

    return NextResponse.json({ success: true, message: '状态更新成功' });
  } catch (error) {
    console.error('更新文章状态失败:', error);
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

    // 创建审稿记录
    await db.insert(reviews).values({
      articleId,
      reviewerId,
      deadline,
      status: 'assigned',
      metadata: comments ? JSON.stringify({ editorComments: comments }) : undefined
    });

    // 更新文章状态为审稿中
    await db
      .update(articles)
      .set({ 
        status: 'under_review',
        lastModified: new Date().toISOString()
      })
      .where(eq(articles.id, articleId));

    return NextResponse.json({ success: true, message: '审稿人分配成功' });
  } catch (error) {
    console.error('分配审稿人失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
