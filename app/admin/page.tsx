'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import SignOutModal from '@/components/SignOutModal';
import SimpleFooter from '@/components/SimpleFooter';
import { getArticleStatusText, getRecommendationText, getRoleText, getRoleColor } from '@/lib/translations';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'reviewer' | 'author';
  institution?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  articleCount?: number;
  reviewCount?: number;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  role: string;
  institution: string;
}

interface Statistics {
  overview: {
    totalArticles: number;
    totalReviews: number;
    completedReviews: number;
    pendingReviews: number;
    declinedReviews: number;
    avgReviewTime: number;
  };
  articlesByStatus: Array<{ status: string; count: number }>;
  articlesByCategory: Array<{ categoryName: string; count: number }>;
  recommendationStats: Array<{ recommendation: string; count: number }>;
  reviewRoundStats: Array<{ reviewRound: number; count: number }>;
  reviewerWorkload: Array<{
    reviewerName: string;
    reviewerEmail: string;
    totalReviews: number;
    completedReviews: number;
    pendingReviews: number;
  }>;
  monthlyTrends: Array<{ month: string; count: number }>;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('users');
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [exportLoading, setExportLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [exportDateRange, setExportDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  
  // 用户表单
  const [userForm, setUserForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    role: 'author',
    institution: ''
  });

  // 模拟数据
  useEffect(() => {
    setUsers([
      {
        id: 'user-1',
        name: '张三',
        email: 'zhangsan@example.com',
        role: 'author',
        institution: '北京大学',
        isActive: true,
        createdAt: '2025-01-01',
        lastLogin: '2025-01-22',
        articleCount: 3
      },
      {
        id: 'user-2',
        name: '李四',
        email: 'lisi@example.com',
        role: 'editor',
        institution: '清华大学',
        isActive: true,
        createdAt: '2025-01-02',
        lastLogin: '2025-01-21',
        articleCount: 0
      },
      {
        id: 'user-3',
        name: '王五',
        email: 'wangwu@example.com',
        role: 'reviewer',
        institution: '复旦大学',
        isActive: true,
        createdAt: '2025-01-03',
        lastLogin: '2025-01-20',
        reviewCount: 5
      },
      {
        id: 'user-4',
        name: '赵六',
        email: 'zhaoliu@example.com',
        role: 'author',
        institution: '上海交通大学',
        isActive: false,
        createdAt: '2025-01-04',
        lastLogin: '2025-01-15',
        articleCount: 1
      },
      {
        id: 'user-5',
        name: '孙七',
        email: 'sunqi@example.com',
        role: 'admin',
        institution: '中科院',
        isActive: true,
        createdAt: '2025-01-05',
        lastLogin: '2025-01-22',
        articleCount: 0,
        reviewCount: 0
      }
    ]);
  }, []);

  // 获取统计数据
  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/statistics', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('统计数据:', data);
        setStatistics(data.data);
      } else {
        const errorData = await response.json();
        console.error('获取统计数据失败:', errorData);
        alert('获取统计数据失败: ' + (errorData.error || '未知错误'));
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
      alert('获取统计数据失败，请检查网络连接');
    }
  };

  // 导出审稿记录
  const handleExport = async (format: 'json' | 'csv') => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams({
        format,
        ...(exportDateRange.startDate && { startDate: exportDateRange.startDate }),
        ...(exportDateRange.endDate && { endDate: exportDateRange.endDate })
      });

      const response = await fetch(`/api/admin/export?${params}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `审稿记录_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `审稿记录_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
      
      alert('导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请重试');
    } finally {
      setExportLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'statistics') {
      fetchStatistics();
    }
  }, [activeTab]);


  const handleCreateUser = () => {
    setUserForm({
      name: '',
      email: '',
      password: '',
      role: 'author',
      institution: ''
    });
    setShowCreateModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      institution: user.institution || ''
    });
    setShowUserModal(true);
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email || !userForm.role) {
      alert('请填写所有必填字段');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedUser) {
        // 更新用户
        setUsers(prev => prev.map(u => 
          u.id === selectedUser.id 
            ? { ...u, name: userForm.name, role: userForm.role as any, institution: userForm.institution }
            : u
        ));
        alert('用户信息更新成功！');
      } else {
        // 创建用户
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: userForm.name,
          email: userForm.email,
          role: userForm.role as any,
          institution: userForm.institution,
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0],
          lastLogin: undefined,
          articleCount: 0,
          reviewCount: 0
        };
        setUsers(prev => [...prev, newUser]);
        alert('用户创建成功！');
      }
      
      setShowUserModal(false);
      setShowCreateModal(false);
      setSelectedUser(null);
      setUserForm({
        name: '',
        email: '',
        password: '',
        role: 'author',
        institution: ''
      });
    } catch (error) {
      alert('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    if (confirm(`确定要${user.isActive ? '禁用' : '启用'}用户"${user.name}"吗？`)) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUsers(prev => prev.map(u => 
          u.id === user.id ? { ...u, isActive: !u.isActive } : u
        ));
        
        alert(`用户已${user.isActive ? '禁用' : '启用'}`);
      } catch (error) {
        alert('操作失败，请重试');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (confirm(`确定要删除用户"${user.name}"吗？此操作不可恢复。`)) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUsers(prev => prev.filter(u => u.id !== user.id));
        alert('用户已删除');
      } catch (error) {
        alert('删除失败，请重试');
      } finally {
        setLoading(false);
      }
    }
  };

  // 过滤用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (!session) {
    router.push('/auth/signin');
    return <div>加载中...</div>;
  }

  if (session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">权限不足</h2>
            <p className="text-gray-600 mb-4">您没有访问管理员面板的权限</p>
            <Button onClick={() => router.push('/')} className="w-full">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                管理员面板
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                欢迎，{session.user?.name || session.user?.email || '用户'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/profile')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                个人资料
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSignOutModal(true)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                退出登录
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{users.length}</div>
              <div className="text-gray-600">总用户数</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {users.filter(u => u.role === 'author').length}
              </div>
              <div className="text-gray-600">作者</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {users.filter(u => u.role === 'reviewer').length}
              </div>
              <div className="text-gray-600">审稿人</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {users.filter(u => u.isActive).length}
              </div>
              <div className="text-gray-600">活跃用户</div>
            </CardContent>
          </Card>
        </div>

        {/* 标签页切换 */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant="ghost"
              onClick={() => setActiveTab('users')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'users' 
                  ? 'bg-white text-purple-600 shadow-sm font-medium' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              用户管理
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('statistics')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'statistics' 
                  ? 'bg-white text-blue-600 shadow-sm font-medium' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              数据统计
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('export')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'export' 
                  ? 'bg-white text-green-600 shadow-sm font-medium' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              导出记录
            </Button>
          </div>
        </div>

        {/* 用户管理 */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">用户管理</h2>
              <Button 
                onClick={handleCreateUser}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                创建用户
              </Button>
            </div>

          {/* 搜索和过滤 */}
          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="text-gray-700">搜索用户</Label>
                  <Input
                    id="search"
                    placeholder="按姓名或邮箱搜索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="md:w-48">
                  <Label htmlFor="role" className="text-gray-700">角色筛选</Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="border-purple-300">
                      <SelectValue placeholder="选择角色" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有角色</SelectItem>
                      <SelectItem value="admin">管理员</SelectItem>
                      <SelectItem value="editor">编辑</SelectItem>
                      <SelectItem value="reviewer">审稿人</SelectItem>
                      <SelectItem value="author">作者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户列表 */}
          <div className="space-y-4">
            {(() => {
              const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
              const startIndex = (currentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const currentUsers = filteredUsers.slice(startIndex, endIndex);

              return (
                <>
                  {currentUsers.map((user) => (
              <Card key={user.id} className="border-purple-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleText(user.role)}
                        </Badge>
                        <Badge className={user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {user.isActive ? '活跃' : '禁用'}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                      {user.institution && (
                        <p className="text-gray-500 text-sm mb-2">所属机构: {user.institution}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>注册时间: {user.createdAt}</span>
                        {user.lastLogin && <span>最后登录: {user.lastLogin}</span>}
                        {user.articleCount !== undefined && <span>投稿数: {user.articleCount}</span>}
                        {user.reviewCount !== undefined && <span>审稿数: {user.reviewCount}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      onClick={() => handleEditUser(user)}
                    >
                      编辑
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={user.isActive ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-green-300 text-green-600 hover:bg-green-50'}
                      onClick={() => handleToggleUserStatus(user)}
                    >
                      {user.isActive ? '禁用' : '启用'}
                    </Button>
                    {user.role !== 'admin' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

                  {/* 分页组件 */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
                        >
                          上一页
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant="outline"
                            className={currentPage === page ? "bg-purple-600 text-white" : ""}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
                        >
                          下一页
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
        )}

        {/* 数据统计 */}
        {activeTab === 'statistics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">数据统计</h2>
            
            {!statistics ? (
              <Card className="border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    正在加载统计数据...
                  </h3>
                  <p className="text-gray-500">
                    请稍候，正在获取最新的统计数据
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* 概览统计 */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {statistics.overview.totalArticles}
                      </div>
                      <div className="text-sm text-gray-600">总文章数</div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {statistics.overview.completedReviews}
                      </div>
                      <div className="text-sm text-gray-600">已完成审稿</div>
                    </CardContent>
                  </Card>
                  <Card className="border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {statistics.overview.pendingReviews}
                      </div>
                      <div className="text-sm text-gray-600">待审稿</div>
                    </CardContent>
                  </Card>
                  <Card className="border-red-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {statistics.overview.declinedReviews}
                      </div>
                      <div className="text-sm text-gray-600">拒绝审稿</div>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {statistics.overview.avgReviewTime}
                      </div>
                      <div className="text-sm text-gray-600">平均审稿天数</div>
                    </CardContent>
                  </Card>
                  <Card className="border-indigo-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                        {statistics.overview.totalReviews}
                      </div>
                      <div className="text-sm text-gray-600">总审稿数</div>
                    </CardContent>
                  </Card>
                </div>

                {/* 文章状态统计 */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle>文章状态分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {statistics.articlesByStatus.map((item) => (
                        <div key={item.status} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold text-gray-900">{item.count}</div>
                          <div className="text-sm text-gray-600">{getArticleStatusText(item.status)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 审稿推荐意见统计 */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle>审稿推荐意见分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {statistics.recommendationStats.map((item) => (
                        <div key={item.recommendation} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold text-gray-900">{item.count}</div>
                          <div className="text-sm text-gray-600">{getRecommendationText(item.recommendation)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 审稿人工作量统计 */}
                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle>审稿人工作量统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statistics.reviewerWorkload.map((reviewer) => (
                        <div key={reviewer.reviewerEmail} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-semibold text-gray-900">{reviewer.reviewerName}</div>
                            <div className="text-sm text-gray-600">{reviewer.reviewerEmail}</div>
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <span className="text-blue-600">总计: {reviewer.totalReviews}</span>
                            <span className="text-green-600">已完成: {reviewer.completedReviews}</span>
                            <span className="text-yellow-600">进行中: {reviewer.pendingReviews}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* 导出记录 */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">导出审稿记录</h2>
            
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>导出设置</CardTitle>
                <CardDescription>
                  导出审稿记录用于新闻出版署审查，支持JSON和CSV格式
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-gray-700">开始日期</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={exportDateRange.startDate}
                      onChange={(e) => setExportDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-gray-700">结束日期</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={exportDateRange.endDate}
                      onChange={(e) => setExportDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => handleExport('csv')}
                    disabled={exportLoading}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    {exportLoading ? '导出中...' : '导出CSV'}
                  </Button>
                  <Button 
                    onClick={() => handleExport('json')}
                    disabled={exportLoading}
                    variant="outline"
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    {exportLoading ? '导出中...' : '导出JSON'}
                  </Button>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>• CSV格式：适合Excel打开，包含所有审稿记录</p>
                  <p>• JSON格式：包含完整的数据结构，适合程序处理</p>
                  <p>• 不设置日期范围将导出所有记录</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 创建/编辑用户模态框 */}
        {(showCreateModal || showUserModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-purple-600 mr-2">👤</span>
                    {selectedUser ? '编辑用户' : '创建用户'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowUserModal(false);
                      setShowCreateModal(false);
                      setSelectedUser(null);
                    }}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  {selectedUser ? '修改用户信息和角色' : '创建新用户账户'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitUser} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">姓名 *</Label>
                    <Input
                      id="name"
                      value={userForm.name}
                      onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="请输入用户姓名"
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700">邮箱 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="请输入邮箱地址"
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  {!selectedUser && (
                    <div>
                      <Label htmlFor="password" className="text-gray-700">密码 *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={userForm.password}
                        onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="请输入密码"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="role" className="text-gray-700">角色 *</Label>
                    <Select 
                      value={userForm.role} 
                      onValueChange={(value) => setUserForm(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger className="border-purple-300">
                        <SelectValue placeholder="请选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="author">作者</SelectItem>
                        <SelectItem value="reviewer">审稿人</SelectItem>
                        <SelectItem value="editor">编辑</SelectItem>
                        <SelectItem value="admin">管理员</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="institution" className="text-gray-700">所属机构</Label>
                    <Input
                      id="institution"
                      value={userForm.institution}
                      onChange={(e) => setUserForm(prev => ({ ...prev, institution: e.target.value }))}
                      placeholder="请输入所属机构（可选）"
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      {loading ? '处理中...' : (selectedUser ? '更新用户' : '创建用户')}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowUserModal(false);
                        setShowCreateModal(false);
                        setSelectedUser(null);
                      }}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      取消
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <SimpleFooter />
      
      {/* 退出确认弹窗 */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || session?.user?.email || undefined}
      />
    </div>
  );
}
