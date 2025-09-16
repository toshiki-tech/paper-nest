import { PrismaClient } from '@prisma/client';
import { config } from '@/config';

// 全局Prisma客户端实例
let prisma: PrismaClient;

// 获取Prisma客户端实例
export function getPrismaClient(schema?: string): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: schema ? `${config.database.url}?schema=${schema}` : config.database.url,
        },
      },
      log: config.nodeEnv === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }
  return prisma;
}

// 根据租户获取Prisma客户端
export function getTenantPrismaClient(tenantSlug: string): PrismaClient {
  const schema = `tenant_${tenantSlug}`;
  return getPrismaClient(schema);
}

// 关闭Prisma连接
export async function closePrismaConnection(): Promise<void> {
  if (prisma) {
    await prisma.$disconnect();
  }
}

// 健康检查
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const client = getPrismaClient();
    await client.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
