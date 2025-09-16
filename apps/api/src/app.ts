import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from '@/config';
import { checkDatabaseConnection } from '@/utils/database';

// 创建Express应用
const app = express();

// 安全中间件
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS配置
app.use(cors({
  origin: (origin, callback) => {
    // 允许的域名列表
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://papernest.com',
      // 动态允许租户子域名
      /^https:\/\/[a-zA-Z0-9-]+\.papernest\.com$/,
    ];

    if (!origin || allowedOrigins.some(allowed => 
      typeof allowed === 'string' ? allowed === origin : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 请求日志
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 压缩响应
app.use(compression());

// 请求体解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 速率限制
const limiter = rateLimit({
  windowMs: config.security.rateLimitWindow,
  max: config.security.rateLimitMax,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 健康检查端点
app.get('/health', async (req, res) => {
  const dbStatus = await checkDatabaseConnection();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus ? 'connected' : 'disconnected',
    environment: config.nodeEnv,
  });
});

// API版本前缀
app.use('/api/v1', (req, res, next) => {
  // 设置API版本信息
  res.set('API-Version', '1.0.0');
  next();
});

// 导入路由
import authRoutes from '@/routes/auth';

// 注册路由
app.use('/api/v1/auth', authRoutes);

// 错误处理中间件
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);

  // 开发环境返回详细错误信息
  if (config.nodeEnv === 'development') {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }

  // 生产环境返回通用错误信息
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

export default app;
