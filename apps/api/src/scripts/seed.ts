import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始初始化数据库...');

  // 创建测试租户
  const tenant = await prisma.tenant.create({
    data: {
      name: '色彩期刊',
      slug: 'se-cai',
      domain: 'se-cai.com',
      subdomain: 'se-cai',
      logoUrl: 'https://via.placeholder.com/200x100/FF6B6B/FFFFFF?text=色彩期刊',
      themeConfig: JSON.stringify({
        primaryColor: '#FF6B6B',
        secondaryColor: '#4ECDC4',
        fontFamily: 'Inter, sans-serif',
      }),
      settings: JSON.stringify({
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        currency: 'CNY',
      }),
      status: 'active',
    },
  });

  console.log('✅ 创建租户:', tenant.name);

  // 创建管理员用户
  const adminPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@se-cai.com',
      passwordHash: adminPassword,
      firstName: '管理员',
      lastName: '系统',
      status: 'active',
      emailVerified: true,
    },
  });

  console.log('✅ 创建管理员用户:', adminUser.email);

  // 创建作者用户
  const authorPassword = await bcrypt.hash('author123', 12);
  const authorUser = await prisma.user.create({
    data: {
      email: 'author@se-cai.com',
      passwordHash: authorPassword,
      firstName: '张',
      lastName: '三',
      status: 'active',
      emailVerified: true,
    },
  });

  console.log('✅ 创建作者用户:', authorUser.email);

  // 创建审稿人用户
  const reviewerPassword = await bcrypt.hash('reviewer123', 12);
  const reviewerUser = await prisma.user.create({
    data: {
      email: 'reviewer@se-cai.com',
      passwordHash: reviewerPassword,
      firstName: '李',
      lastName: '四',
      status: 'active',
      emailVerified: true,
    },
  });

  console.log('✅ 创建审稿人用户:', reviewerUser.email);

  // 将用户关联到租户
  await prisma.userTenant.createMany({
    data: [
      {
        userId: adminUser.id,
        tenantId: tenant.id,
        role: 'admin',
        permissions: JSON.stringify(['*']),
        status: 'active',
      },
      {
        userId: authorUser.id,
        tenantId: tenant.id,
        role: 'author',
        permissions: JSON.stringify(['submission:create', 'submission:read', 'submission:update']),
        status: 'active',
      },
      {
        userId: reviewerUser.id,
        tenantId: tenant.id,
        role: 'reviewer',
        permissions: JSON.stringify(['review:read', 'review:create', 'review:update']),
        status: 'active',
      },
    ],
  });

  console.log('✅ 关联用户到租户');

  // 创建分类
  const category = await prisma.category.create({
    data: {
      name: '艺术设计',
      description: '艺术设计相关稿件',
      tenantId: tenant.id,
      sortOrder: 1,
      isActive: true,
    },
  });

  console.log('✅ 创建分类:', category.name);

  // 创建测试稿件
  const submission = await prisma.submission.create({
    data: {
      title: '色彩在平面设计中的应用研究',
      abstract: '本文探讨了色彩在平面设计中的重要作用，分析了不同色彩搭配对视觉效果的影响...',
      keywords: JSON.stringify(['色彩', '平面设计', '视觉传达']),
      authors: JSON.stringify([
        {
          firstName: '张',
          lastName: '三',
          email: 'author@se-cai.com',
          affiliation: '某某大学艺术学院',
          isCorresponding: true,
          order: 1,
        },
      ]),
      correspondingAuthorId: authorUser.id,
      categoryId: category.id,
      status: 'submitted',
    },
  });

  console.log('✅ 创建测试稿件:', submission.title);

  // 创建期刊期次
  const issue = await prisma.issue.create({
    data: {
      volume: 1,
      issueNumber: 1,
      title: '2024年第1期',
      status: 'planning',
      tenantId: tenant.id,
    },
  });

  console.log('✅ 创建期刊期次:', issue.title);

  console.log('\n🎉 数据库初始化完成！');
  console.log('\n📋 测试账户信息：');
  console.log('管理员: admin@se-cai.com / admin123');
  console.log('作者: author@se-cai.com / author123');
  console.log('审稿人: reviewer@se-cai.com / reviewer123');
  console.log('\n🌐 租户信息：');
  console.log(`租户标识: ${tenant.slug}`);
  console.log(`租户名称: ${tenant.name}`);
}

main()
  .catch((e) => {
    console.error('❌ 初始化失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
