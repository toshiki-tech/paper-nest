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

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return '管理员';
      case 'editor': return '编辑';
      case 'reviewer': return '审稿人';
      case 'author': return '作者';
      default: return '未知';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-purple-100 text-purple-800';
      case 'reviewer': return 'bg-blue-100 text-blue-800';
      case 'author': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

        {/* 用户管理 */}
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
            {filteredUsers.map((user) => (
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
          </div>
        </div>

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
