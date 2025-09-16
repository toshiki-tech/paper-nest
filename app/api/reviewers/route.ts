import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, reviews } from '@/lib/db/schema';
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
