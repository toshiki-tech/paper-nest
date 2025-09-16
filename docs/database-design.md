# 多租户数据库设计

## 租户隔离策略

采用**数据库Schema级隔离**，每个期刊作为独立租户：

### 1. 租户管理表（全局）

```sql
-- 租户信息表
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL, -- 期刊名称
  slug VARCHAR(50) UNIQUE NOT NULL, -- 租户标识符
  domain VARCHAR(100), -- 自定义域名
  subdomain VARCHAR(50), -- 子域名
  logo_url VARCHAR(255), -- 期刊Logo
  theme_config JSONB, -- 主题配置
  settings JSONB, -- 期刊设置
  status VARCHAR(20) DEFAULT 'active', -- active, suspended, inactive
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 租户管理员表
CREATE TABLE tenant_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'admin', -- admin, super_admin
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. 用户管理（全局）

```sql
-- 全局用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url VARCHAR(255),
  phone VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 用户租户关联表（多租户支持）
CREATE TABLE user_tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- author, reviewer, editor, chief_editor, admin
  permissions JSONB, -- 具体权限配置
  status VARCHAR(20) DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, tenant_id)
);
```

### 3. 租户特定数据（每个租户独立Schema）

每个租户的数据存储在独立的Schema中，命名规则：`tenant_{tenant_slug}`

```sql
-- 稿件表
CREATE TABLE tenant_{slug}.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  abstract TEXT,
  keywords TEXT[],
  authors JSONB NOT NULL, -- 作者信息
  corresponding_author_id UUID REFERENCES users(id),
  category_id UUID REFERENCES tenant_{slug}.categories(id),
  manuscript_file_url VARCHAR(500),
  supplementary_files JSONB, -- 补充文件
  status VARCHAR(30) DEFAULT 'submitted', -- submitted, under_review, revision_requested, accepted, rejected
  submission_date TIMESTAMP DEFAULT NOW(),
  last_modified TIMESTAMP DEFAULT NOW(),
  metadata JSONB -- 其他元数据
);

-- 审稿表
CREATE TABLE tenant_{slug}.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES tenant_{slug}.submissions(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES users(id),
  review_type VARCHAR(20) DEFAULT 'peer_review', -- peer_review, editorial_review
  status VARCHAR(20) DEFAULT 'assigned', -- assigned, in_progress, completed, declined
  score INTEGER, -- 1-5分
  recommendation VARCHAR(20), -- accept, minor_revision, major_revision, reject
  comments TEXT, -- 审稿意见
  confidential_comments TEXT, -- 给编辑的私密意见
  submitted_at TIMESTAMP,
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 期刊期次表
CREATE TABLE tenant_{slug}.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volume INTEGER NOT NULL,
  issue_number INTEGER NOT NULL,
  title VARCHAR(200),
  publication_date DATE,
  status VARCHAR(20) DEFAULT 'planning', -- planning, in_production, published
  cover_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 栏目分类表
CREATE TABLE tenant_{slug}.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES tenant_{slug}.categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 数据访问模式

### 1. 租户上下文
```typescript
interface TenantContext {
  tenantId: string;
  tenantSlug: string;
  schema: string; // tenant_{slug}
  userRole: string;
  permissions: string[];
}
```

### 2. 数据库连接
```typescript
// 动态Schema切换
const getTenantSchema = (tenantSlug: string) => `tenant_${tenantSlug}`;

// Prisma配置
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + `?schema=${getTenantSchema(tenantSlug)}`
    }
  }
});
```

### 3. 中间件处理
```typescript
// 租户识别中间件
app.use(async (req, res, next) => {
  const tenantSlug = extractTenantFromRequest(req);
  const tenant = await getTenantBySlug(tenantSlug);
  
  if (!tenant) {
    return res.status(404).json({ error: 'Tenant not found' });
  }
  
  req.tenant = tenant;
  req.schema = `tenant_${tenantSlug}`;
  next();
});
```

## 安全考虑

1. **数据隔离**：每个租户的数据完全隔离
2. **权限控制**：基于角色的访问控制（RBAC）
3. **审计日志**：记录所有数据操作
4. **备份策略**：支持租户级别的数据备份
5. **数据迁移**：支持租户数据的导入导出
