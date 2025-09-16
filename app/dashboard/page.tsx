'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'admin':
        return {
          title: '系统管理员',
          description: '拥有系统所有权限',
          color: 'bg-red-100 text-red-800',
          features: ['用户管理', '系统设置', '数据统计', '权限分配']
        };
      case 'editor':
        return {
          title: '编辑部',
          description: '负责期刊编辑和文章管理',
          color: 'bg-blue-100 text-blue-800',
          features: ['文章审核', '栏目管理', '发布管理', '审稿分配']
        };
      case 'reviewer':
        return {
          title: '审稿专家',
          description: '负责文章审稿工作',
          color: 'bg-green-100 text-green-800',
          features: ['文章审稿', '审稿意见', '审稿历史', '专业评估']
        };
      case 'author':
        return {
          title: '作者',
          description: '投稿和文章管理',
          color: 'bg-purple-100 text-purple-800',
          features: ['论文投稿', '稿件状态', '修改提交', '发表记录']
        };
      default:
        return {
          title: '用户',
          description: '普通用户',
          color: 'bg-gray-100 text-gray-800',
          features: ['浏览文章', '个人设置']
        };
    }
  };

  const roleInfo = getRoleInfo(session.user?.role || 'author');

  const getQuickActions = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          { label: '用户管理', href: '/admin/users', icon: '👥' },
          { label: '系统设置', href: '/admin/settings', icon: '⚙️' },
          { label: '数据统计', href: '/admin/analytics', icon: '📊' },
          { label: '权限管理', href: '/admin/permissions', icon: '🔐' }
        ];
      case 'editor':
        return [
          { label: '文章审核', href: '/editor/review', icon: '📝' },
          { label: '栏目管理', href: '/editor/categories', icon: '📂' },
          { label: '发布管理', href: '/editor/publish', icon: '📢' },
          { label: '审稿分配', href: '/editor/assign', icon: '👨‍💼' }
        ];
      case 'reviewer':
        return [
          { label: '待审稿件', href: '/review/pending', icon: '⏳' },
          { label: '审稿历史', href: '/review/history', icon: '📋' },
          { label: '审稿指南', href: '/review/guide', icon: '📖' },
          { label: '个人设置', href: '/profile', icon: '👤' }
        ];
      case 'author':
        return [
          { label: '论文投稿', href: '/submission', icon: '📄' },
          { label: '稿件状态', href: '/submission/status', icon: '📊' },
          { label: '修改提交', href: '/submission/revise', icon: '✏️' },
          { label: '发表记录', href: '/submission/published', icon: '📚' }
        ];
      default:
        return [
          { label: '浏览文章', href: '/articles', icon: '📖' },
          { label: '个人设置', href: '/profile', icon: '👤' }
        ];
    }
  };

  const quickActions = getQuickActions(session.user?.role || 'author');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                控制台
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">欢迎，{session.user?.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎信息 */}
        <div className="mb-8">
          <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    欢迎回来，{session.user?.name}！
                  </h2>
                  <p className="text-gray-600 mb-4">
                    您当前的角色是 <Badge className={roleInfo.color}>{roleInfo.title}</Badge>
                  </p>
                  <p className="text-gray-700">{roleInfo.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">登录时间</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date().toLocaleString('zh-CN')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 快速操作 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">快速操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="border-pink-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(action.href)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h4 className="font-medium text-gray-900">{action.label}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 功能权限 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">您的权限</h3>
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-purple-600 mr-2">🔑</span>
                功能权限
              </CardTitle>
              <CardDescription>
                根据您的角色，您可以访问以下功能
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle className="text-lg">账户信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">邮箱</span>
                  <span className="font-medium">{session.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">角色</span>
                  <Badge className={roleInfo.color}>{roleInfo.title}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">状态</span>
                  <span className="text-green-600 font-medium">已激活</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">系统状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">服务器</span>
                  <span className="text-green-600 font-medium">正常</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">数据库</span>
                  <span className="text-green-600 font-medium">正常</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">版本</span>
                  <span className="font-medium">v1.0.0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-lg">帮助支持</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => router.push('/help')}
                >
                  📖 使用指南
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => router.push('/contact')}
                >
                  📞 联系我们
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Logo size="sm" showText={false} />
            <h3 className="text-lg font-semibold">《色彩》期刊管理系统</h3>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2024 《色彩》期刊. 保留所有权利.
          </p>
        </div>
      </footer>
    </div>
  );
}
