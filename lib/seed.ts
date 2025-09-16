import { db } from './db';
import { users, categories } from './db/schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 开始初始化数据库...');

  try {
    // 创建测试用户
    const adminPassword = await bcrypt.hash('admin123', 12);
    const editorPassword = await bcrypt.hash('editor123', 12);
    const reviewerPassword = await bcrypt.hash('reviewer123', 12);
    const authorPassword = await bcrypt.hash('author123', 12);

    const testUsers = await db.insert(users).values([
      {
        email: 'admin@test.com',
        passwordHash: adminPassword,
        name: '系统管理员',
        role: 'admin',
      },
      {
        email: 'editor@test.com',
        passwordHash: editorPassword,
        name: '编辑主任',
        role: 'editor',
      },
      {
        email: 'reviewer@test.com',
        passwordHash: reviewerPassword,
        name: '审稿专家',
        role: 'reviewer',
      },
      {
        email: 'author@test.com',
        passwordHash: authorPassword,
        name: '投稿作者',
        role: 'author',
      },
    ]).returning();

    console.log('✅ 创建测试用户');

    // 创建期刊栏目
    const testCategories = await db.insert(categories).values([
      {
        name: '计算机科学',
        slug: 'computer-science',
        description: '计算机科学相关论文',
        sortOrder: 1,
      },
      {
        name: '人工智能',
        slug: 'artificial-intelligence',
        description: '人工智能与机器学习',
        sortOrder: 2,
      },
      {
        name: '数据科学',
        slug: 'data-science',
        description: '数据科学与大数据分析',
        sortOrder: 3,
      },
      {
        name: '软件工程',
        slug: 'software-engineering',
        description: '软件工程与系统开发',
        sortOrder: 4,
      },
    ]).returning();

    console.log('✅ 创建期刊栏目');

    console.log('\n🎉 数据库初始化完成！');
    console.log('\n📋 测试账户信息：');
    console.log('管理员: admin@test.com / admin123');
    console.log('编辑: editor@test.com / editor123');
    console.log('审稿人: reviewer@test.com / reviewer123');
    console.log('作者: author@test.com / author123');

  } catch (error) {
    console.error('❌ 初始化失败:', error);
    throw error;
  }
}

// 如果直接运行此文件
if (require.main === module) {
  seed()
    .then(() => {
      console.log('✅ 种子数据创建完成');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ 种子数据创建失败:', error);
      process.exit(1);
    });
}

export { seed };
