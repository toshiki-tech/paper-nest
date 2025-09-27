import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// 用户表
export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  role: text('role').notNull().default('author'),
  image: text('image'),
  emailVerified: integer('emailVerified', { mode: 'timestamp' }),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 期刊栏目表
export const categories: any = sqliteTable('categories', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  parentId: text('parent_id').references(() => categories.id),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 论文表
export const articles = sqliteTable('articles', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  abstract: text('abstract'),
  keywords: text('keywords'), // JSON字符串存储关键词数组
  authors: text('authors').notNull(), // JSON字符串存储作者信息
  correspondingAuthorId: text('corresponding_author_id').notNull().references(() => users.id),
  categoryId: text('category_id').references(() => categories.id),
  manuscriptFile: text('manuscript_file'), // 文件URL
  supplementaryFiles: text('supplementary_files'), // JSON字符串存储补充文件
  status: text('status').notNull().default('submitted'),
  submissionDate: text('submission_date').notNull().default(sql`CURRENT_TIMESTAMP`),
  lastModified: text('last_modified').notNull().default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text('published_at'),
  metadata: text('metadata'), // JSON字符串存储其他元数据
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 审稿表
export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  articleId: text('article_id').notNull().references(() => articles.id),
  reviewerId: text('reviewer_id').notNull().references(() => users.id),
  reviewRound: integer('review_round').notNull().default(1), // 审稿轮次：1, 2, 3
  status: text('status').notNull().default('assigned'),
  score: integer('score'), // 1-5分
  recommendation: text('recommendation'),
  comments: text('comments'), // 给作者的公开意见
  confidentialComments: text('confidential_comments'), // 给编辑的私密意见
  submittedAt: text('submitted_at'),
  deadline: text('deadline'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 审稿历史表
export const reviewHistory = sqliteTable('review_history', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  articleId: text('article_id').notNull().references(() => articles.id),
  reviewerId: text('reviewer_id').notNull().references(() => users.id),
  action: text('action').notNull(), // 'assigned', 'completed', 'revision_requested', etc.
  comments: text('comments'),
  metadata: text('metadata'), // JSON字符串存储额外信息
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 系统设置表
export const settings = sqliteTable('settings', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  description: text('description'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 关系定义
export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  reviews: many(reviews),
  reviewHistory: many(reviewHistory),
}));

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  articles: many(articles),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  correspondingAuthor: one(users, {
    fields: [articles.correspondingAuthorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  reviews: many(reviews),
  reviewHistory: many(reviewHistory),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  article: one(articles, {
    fields: [reviews.articleId],
    references: [articles.id],
  }),
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
  }),
}));

export const reviewHistoryRelations = relations(reviewHistory, ({ one }) => ({
  article: one(articles, {
    fields: [reviewHistory.articleId],
    references: [articles.id],
  }),
  reviewer: one(users, {
    fields: [reviewHistory.reviewerId],
    references: [users.id],
  }),
}));