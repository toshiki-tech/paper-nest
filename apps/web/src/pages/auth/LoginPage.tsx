import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { ApiService } from '@/services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await ApiService.login({
        ...values,
        tenantSlug: 'se-cai', // 默认使用色彩期刊
      });

      if (response.success) {
        setAuth(response.data.user, response.data.tokens);
        message.success('登录成功！');
        navigate('/dashboard');
      } else {
        message.error(response.error || '登录失败');
      }
    } catch (error) {
      message.error('登录失败，请检查网络连接');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            登录到 PaperNest
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            色彩期刊管理系统
          </p>
        </div>
        
        <Card className="mt-8">
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="邮箱地址"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入邮箱地址"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="w-full"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>测试账户：</p>
            <p>管理员: admin@se-cai.com / admin123</p>
            <p>作者: author@se-cai.com / author123</p>
            <p>审稿人: reviewer@se-cai.com / reviewer123</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
