# PaperNest 部署指南

## 系统架构

PaperNest 采用多租户SaaS架构，支持多个期刊独立运营：

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   色彩期刊      │    │   学术期刊      │    │   其他期刊      │
│  se-cai.com     │    │  academic.com   │    │  journal.com    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  PaperNest平台  │
                    │  多租户SaaS     │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   共享基础设施  │
                    │ PostgreSQL      │
                    │ Redis           │
                    │ MinIO           │
                    └─────────────────┘
```

## 多租户实现方案

### 1. 数据库隔离
- **Schema级隔离**：每个租户使用独立的数据库schema
- **命名规则**：`tenant_{tenant_slug}`
- **数据安全**：完全隔离，互不干扰

### 2. 域名管理
- **子域名**：`{tenant-slug}.papernest.com`
- **自定义域名**：支持绑定独立域名
- **SSL证书**：自动申请和管理

### 3. 权限控制
- **角色系统**：作者、审稿人、编辑、主编、管理员
- **权限矩阵**：细粒度权限控制
- **租户隔离**：用户只能访问所属租户数据

## 部署步骤

### 1. 环境准备

```bash
# 安装Docker和Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env

# 编辑配置文件
nano .env
```

### 3. 启动服务

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 4. 数据库初始化

```bash
# 进入API容器
docker-compose exec api bash

# 运行数据库迁移
npm run db:migrate

# 初始化数据
npm run db:seed
```

### 5. 创建第一个租户

```bash
# 创建"色彩"期刊租户
curl -X POST http://localhost:3001/api/v1/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "色彩期刊",
    "slug": "se-cai",
    "domain": "se-cai.com",
    "settings": {
      "theme": "colorful",
      "language": "zh-CN"
    }
  }'
```

## 商业化模式

### 1. 订阅模式
- **基础版**：¥999/月，支持1个期刊，1000篇稿件
- **专业版**：¥2999/月，支持5个期刊，10000篇稿件
- **企业版**：¥9999/月，支持无限期刊，无限稿件

### 2. 按量计费
- **存储费用**：¥0.1/GB/月
- **带宽费用**：¥0.5/GB
- **API调用**：¥0.01/次

### 3. 增值服务
- **定制开发**：¥500/小时
- **数据迁移**：¥2000/期刊
- **培训服务**：¥1000/天

## 扩展功能

### 1. 学术集成
- **Crossref**：DOI注册和引用
- **CNKI**：中文期刊数据库
- **Google Scholar**：学术搜索

### 2. 数据分析
- **投稿统计**：按时间、分类统计
- **审稿效率**：审稿周期分析
- **引用分析**：文章影响力评估

### 3. 移动应用
- **iOS/Android**：原生移动应用
- **PWA**：渐进式Web应用
- **微信小程序**：微信生态集成

## 安全措施

### 1. 数据安全
- **加密存储**：敏感数据AES-256加密
- **传输安全**：HTTPS/TLS 1.3
- **备份策略**：每日自动备份

### 2. 访问控制
- **多因子认证**：支持TOTP、短信验证
- **IP白名单**：限制管理后台访问
- **审计日志**：完整操作记录

### 3. 合规性
- **GDPR**：欧盟数据保护法规
- **等保三级**：中国网络安全等级保护
- **SOC 2**：安全运营中心认证

## 监控和维护

### 1. 系统监控
- **Prometheus**：指标收集
- **Grafana**：可视化监控
- **AlertManager**：告警管理

### 2. 日志管理
- **ELK Stack**：日志收集和分析
- **Fluentd**：日志转发
- **Kibana**：日志可视化

### 3. 性能优化
- **CDN加速**：全球内容分发
- **缓存策略**：Redis多级缓存
- **数据库优化**：索引和查询优化
