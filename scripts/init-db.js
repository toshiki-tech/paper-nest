const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../dev.db'));

// 创建用户表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    emailVerified INTEGER,
    image TEXT,
    password_hash TEXT,
    role TEXT DEFAULT 'author' NOT NULL CHECK (role IN ('admin', 'editor', 'reviewer', 'author')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
  )
`);

// 创建账户表
db.exec(`
  CREATE TABLE IF NOT EXISTS accounts (
    userId TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    PRIMARY KEY (provider, providerAccountId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// 创建会话表
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    sessionToken TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    expires INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// 创建验证令牌表
db.exec(`
  CREATE TABLE IF NOT EXISTS verificationToken (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires INTEGER NOT NULL,
    PRIMARY KEY (identifier, token)
  )
`);

// 创建分类表
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
  )
`);

// 创建文章表
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    abstract TEXT,
    keywords TEXT,
    authors TEXT,
    file_url TEXT,
    status TEXT DEFAULT 'submitted' NOT NULL CHECK (status IN ('submitted', 'under_review', 'revisions_requested', 'accepted', 'published', 'rejected')),
    category_id TEXT,
    submitted_by_id TEXT,
    published_at INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (submitted_by_id) REFERENCES users(id)
  )
`);

// 创建审稿表
db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL,
    reviewer_id TEXT NOT NULL,
    comments TEXT,
    recommendation TEXT CHECK (recommendation IN ('accept', 'minor_revisions', 'major_revisions', 'reject')),
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'completed', 'declined')),
    assigned_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

// 插入默认分类
db.exec(`
  INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
  ('cat-1', '色彩理论', 'color-theory', '色彩基础理论与应用研究'),
  ('cat-2', '色彩心理学', 'color-psychology', '色彩对人类心理和行为的影响研究'),
  ('cat-3', '色彩设计', 'color-design', '色彩在艺术设计中的应用与创新'),
  ('cat-4', '色彩技术', 'color-technology', '色彩测量、再现与显示技术'),
  ('cat-5', '色彩文化', 'color-culture', '色彩在不同文化中的象征意义与表达')
`);

// 插入测试用户
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const users = [
  { id: uuidv4(), name: '系统管理员', email: 'admin@test.com', password: 'admin123', role: 'admin' },
  { id: uuidv4(), name: '编辑部', email: 'editor@test.com', password: 'editor123', role: 'editor' },
  { id: uuidv4(), name: '审稿专家', email: 'reviewer@test.com', password: 'reviewer123', role: 'reviewer' },
  { id: uuidv4(), name: '作者', email: 'author@test.com', password: 'author123', role: 'author' }
];

const stmt = db.prepare('INSERT OR IGNORE INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)');

users.forEach(user => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  stmt.run(user.id, user.name, user.email, hashedPassword, user.role);
});

console.log('数据库初始化完成！');
console.log('测试账户：');
console.log('- 管理员: admin@test.com / admin123');
console.log('- 编辑: editor@test.com / editor123');
console.log('- 审稿人: reviewer@test.com / reviewer123');
console.log('- 作者: author@test.com / author123');

db.close();
