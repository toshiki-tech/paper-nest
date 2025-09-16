import { Router } from 'express';
import { AuthController } from '@/controllers/auth';
import { authenticateToken, optionalAuth } from '@/middleware/auth';
import { tenantMiddleware } from '@/middleware/tenant';

const router = Router();
const authController = new AuthController();

// 用户注册
router.post('/register', authController.register);

// 用户登录
router.post('/login', authController.login);

// 刷新token
router.post('/refresh', authController.refreshToken);

// 登出
router.post('/logout', authenticateToken, authController.logout);

// 获取当前用户信息
router.get('/me', authenticateToken, authController.getCurrentUser);

// 更新用户信息
router.put('/me', authenticateToken, authController.updateProfile);

// 修改密码
router.put('/password', authenticateToken, authController.changePassword);

// 忘记密码
router.post('/forgot-password', authController.forgotPassword);

// 重置密码
router.post('/reset-password', authController.resetPassword);

// 验证邮箱
router.post('/verify-email', authController.verifyEmail);

// 重新发送验证邮件
router.post('/resend-verification', authenticateToken, authController.resendVerification);

export default router;
