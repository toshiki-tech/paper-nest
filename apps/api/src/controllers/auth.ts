import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '@/config';
import { generateTokens, verifyRefreshToken } from '@/middleware/auth';
import { ApiResponse, LoginRequest, RegisterRequest, User } from '@/types';
import { getPrismaClient } from '@/utils/database';

export class AuthController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  // 用户注册
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName, tenantSlug }: RegisterRequest = req.body;

      // 验证输入
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
        return;
      }

      // 检查用户是否已存在
      const existingUser = await this.prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          error: 'User already exists'
        });
        return;
      }

      // 加密密码
      const passwordHash = await bcrypt.hash(password, config.security.bcryptRounds);

      // 创建用户
      const user = await this.prisma.user.create({
        data: {
          email,
          passwordHash,
          firstName,
          lastName,
        }
      });

      // 如果指定了租户，将用户添加到租户
      if (tenantSlug) {
        const tenant = await this.prisma.tenant.findUnique({
          where: { slug: tenantSlug }
        });

        if (tenant) {
          await this.prisma.userTenant.create({
            data: {
              userId: user.id,
              tenantId: tenant.id,
              role: 'author', // 默认为作者角色
            }
          });
        }
      }

      // 生成token
      const tokens = generateTokens(user.id);

      const response: ApiResponse<{ user: User; tokens: any }> = {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
            phone: user.phone,
            status: user.status as any,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          tokens
        },
        message: 'User registered successfully'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 用户登录
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, tenantSlug }: LoginRequest = req.body;

      // 验证输入
      if (!email || !password) {
        res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
        return;
      }

      // 查找用户
      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
        return;
      }

      // 验证密码
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
        return;
      }

      // 检查用户状态
      if (user.status !== 'active') {
        res.status(403).json({
          success: false,
          error: 'Account is not active'
        });
        return;
      }

      // 如果指定了租户，检查用户是否属于该租户
      if (tenantSlug) {
        const tenant = await this.prisma.tenant.findUnique({
          where: { slug: tenantSlug }
        });

        if (tenant) {
          const userTenant = await this.prisma.userTenant.findUnique({
            where: {
              userId_tenantId: {
                userId: user.id,
                tenantId: tenant.id,
              }
            }
          });

          if (!userTenant || userTenant.status !== 'active') {
            res.status(403).json({
              success: false,
              error: 'Access denied for this tenant'
            });
            return;
          }
        }
      }

      // 生成token
      const tokens = generateTokens(user.id);

      const response: ApiResponse<{ user: User; tokens: any }> = {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
            phone: user.phone,
            status: user.status as any,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          tokens
        },
        message: 'Login successful'
      };

      res.json(response);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 刷新token
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: 'Refresh token is required'
        });
        return;
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        res.status(401).json({
          success: false,
          error: 'Invalid refresh token'
        });
        return;
      }

      // 生成新的token
      const tokens = generateTokens(decoded.userId);

      const response: ApiResponse<{ tokens: any }> = {
        success: true,
        data: { tokens },
        message: 'Token refreshed successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 登出
  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      // 这里可以实现token黑名单机制
      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 获取当前用户信息
  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      const response: ApiResponse<User> = {
        success: true,
        data: req.user
      };

      res.json(response);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 更新用户信息
  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      const { firstName, lastName, phone, avatarUrl } = req.body;

      const updatedUser = await this.prisma.user.update({
        where: { id: req.user.id },
        data: {
          firstName,
          lastName,
          phone,
          avatarUrl,
        }
      });

      const response: ApiResponse<User> = {
        success: true,
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          avatarUrl: updatedUser.avatarUrl,
          phone: updatedUser.phone,
          status: updatedUser.status as any,
          emailVerified: updatedUser.emailVerified,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
        message: 'Profile updated successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 修改密码
  changePassword = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Current password and new password are required'
        });
        return;
      }

      // 验证当前密码
      const user = await this.prisma.user.findUnique({
        where: { id: req.user.id }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isValidPassword) {
        res.status(400).json({
          success: false,
          error: 'Current password is incorrect'
        });
        return;
      }

      // 更新密码
      const newPasswordHash = await bcrypt.hash(newPassword, config.security.bcryptRounds);
      await this.prisma.user.update({
        where: { id: req.user.id },
        data: { passwordHash: newPasswordHash }
      });

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 忘记密码
  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          error: 'Email is required'
        });
        return;
      }

      const user = await this.prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // 为了安全，即使用户不存在也返回成功
        res.json({
          success: true,
          message: 'If the email exists, a password reset link has been sent'
        });
        return;
      }

      // 生成重置token
      const resetToken = jwt.sign(
        { userId: user.id, type: 'password_reset' },
        config.jwt.secret,
        { expiresIn: '1h' }
      );

      // 这里应该发送邮件，暂时只返回成功
      // TODO: 实现邮件发送功能

      res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent'
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 重置密码
  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Token and new password are required'
        });
        return;
      }

      // 验证重置token
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      if (decoded.type !== 'password_reset') {
        res.status(400).json({
          success: false,
          error: 'Invalid reset token'
        });
        return;
      }

      // 更新密码
      const passwordHash = await bcrypt.hash(newPassword, config.security.bcryptRounds);
      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { passwordHash }
      });

      res.json({
        success: true,
        message: 'Password reset successfully'
      });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 验证邮箱
  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({
          success: false,
          error: 'Verification token is required'
        });
        return;
      }

      // 验证邮箱验证token
      const decoded = jwt.verify(token, config.jwt.secret) as any;
      if (decoded.type !== 'email_verification') {
        res.status(400).json({
          success: false,
          error: 'Invalid verification token'
        });
        return;
      }

      // 更新用户邮箱验证状态
      await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: true }
      });

      res.json({
        success: true,
        message: 'Email verified successfully'
      });
    } catch (error) {
      console.error('Verify email error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };

  // 重新发送验证邮件
  resendVerification = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
        return;
      }

      if (req.user.emailVerified) {
        res.status(400).json({
          success: false,
          error: 'Email is already verified'
        });
        return;
      }

      // 生成验证token
      const verificationToken = jwt.sign(
        { userId: req.user.id, type: 'email_verification' },
        config.jwt.secret,
        { expiresIn: '24h' }
      );

      // 这里应该发送邮件，暂时只返回成功
      // TODO: 实现邮件发送功能

      res.json({
        success: true,
        message: 'Verification email sent'
      });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };
}
