# 学术期刊管理系统

一个基于Next.js的现代化学术期刊管理平台，支持论文投稿、审稿、编辑和发布的全流程管理。

## 功能特性

### 🎯 核心功能
- **用户注册与认证**：支持邮箱注册和登录
- **角色管理**：管理员、编辑、审稿人、作者四种角色
- **论文投稿**：作者可以上传Word文档并填写论文信息
- **审稿流程**：编辑分配审稿人，审稿人提供修改意见
- **状态管理**：投稿→审稿→修改→再审稿→通过/退稿
- **文章发布**：审核通过的文章发布到网站栏目

### 🏗️ 技术架构
- **前端框架**：Next.js 14 (App Router)
- **样式系统**：Tailwind CSS + shadcn/ui
- **数据库**：Vercel Postgres (SQL)
- **认证**：NextAuth.js
- **文件存储**：Vercel Blob Storage
- **部署平台**：Vercel

### 📱 用户角色
1. **管理员**：用户管理、角色分配、系统设置
2. **编辑**：论文管理、审稿人分配、文章发布
3. **审稿人**：审稿任务、提供修改意见
4. **作者**：论文投稿、修改、查看状态

## 项目结构

```
academic-journal/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证相关页面
│   ├── admin/             # 管理员页面
│   ├── editor/            # 编辑页面
│   ├── reviewer/          # 审稿人页面
│   ├── author/            # 作者页面
│   ├── articles/          # 文章展示页面
│   └── api/               # API路由
├── components/            # 可复用组件
├── lib/                   # 工具函数和配置
├── types/                 # TypeScript类型定义
└── public/                # 静态资源
```

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署到Vercel

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

## 参考网站

本项目参考了[纺织导报网站](https://www.texleader.com.cn/)的设计理念和功能布局。