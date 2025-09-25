'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import SignOutModal from '@/components/SignOutModal';
import SimpleFooter from '@/components/SimpleFooter';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  institution?: string;
  bio?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    bio: ''
  });

  // 模拟获取用户资料
  useEffect(() => {
    if (session?.user) {
      // 模拟API调用获取用户资料
      const mockProfile: UserProfile = {
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        role: session.user.role || 'author',
        institution: '北京大学', // 模拟数据
        bio: '专注于色彩研究领域的学者，在色彩心理学和设计应用方面有丰富经验。', // 模拟数据
        createdAt: '2025-01-01'
      };
      setProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        institution: mockProfile.institution || '',
        bio: mockProfile.bio || ''
      });
    }
  }, [session]);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        name: profile.name,
        institution: profile.institution || '',
        bio: profile.bio || ''
      });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // 模拟API调用更新用户资料
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (profile) {
        const updatedProfile = {
          ...profile,
          name: formData.name,
          institution: formData.institution,
          bio: formData.bio
        };
        setProfile(updatedProfile);
        
        // 更新session中的用户名
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name
          }
        });
      }
      
      setIsEditing(false);
      alert('资料更新成功！');
    } catch (error) {
      alert('更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!session) {
    router.push('/auth/signin');
    return <div>加载中...</div>;
  }

  if (!profile) {
    return <div>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端布局 */}
          <div className="hidden md:flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                个人资料
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                欢迎，{session.user?.name || session.user?.email || '用户'}
              </span>
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
          
          {/* 移动端布局 */}
          <div className="md:hidden py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Logo size="sm" />
                <h1 className="text-lg font-bold text-gray-900">
                  个人资料
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSignOutModal(true)}
                  className="border-red-300 text-red-600 hover:bg-red-50 px-2"
                >
                  退出
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                欢迎，{session.user?.name || session.user?.email || '用户'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 px-2"
              >
                首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：基本信息卡片 */}
          <div className="lg:col-span-1">
            <Card className="border-purple-200">
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl text-purple-600">
                    {profile.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-xl">{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
                <Badge className={`${getRoleColor(profile.role)} mt-2`}>
                  {getRoleText(profile.role)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-600">注册时间：</span>
                    <span className="text-gray-900">{profile.createdAt}</span>
                  </div>
                  {profile.institution && (
                    <div>
                      <span className="text-gray-600">所属机构：</span>
                      <span className="text-gray-900">{profile.institution}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：详细信息 */}
          <div className="lg:col-span-2">
            <Card className="border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>详细信息</CardTitle>
                  {!isEditing && (
                    <Button 
                      onClick={handleEdit}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      编辑资料
                    </Button>
                  )}
                </div>
                <CardDescription>
                  管理您的个人信息和资料
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">姓名 *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="请输入您的姓名"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="institution" className="text-gray-700">所属机构</Label>
                      <Input
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        placeholder="请输入所属机构"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-gray-700">个人简介</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="请输入个人简介"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <Button 
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        {loading ? '保存中...' : '保存更改'}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleCancel}
                        className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gray-600">姓名</Label>
                      <p className="text-gray-900 font-medium mt-1">{profile.name}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">邮箱</Label>
                      <p className="text-gray-900 mt-1">{profile.email}</p>
                    </div>

                    <div>
                      <Label className="text-gray-600">角色</Label>
                      <div className="mt-1">
                        <Badge className={getRoleColor(profile.role)}>
                          {getRoleText(profile.role)}
                        </Badge>
                      </div>
                    </div>

                    {profile.institution && (
                      <div>
                        <Label className="text-gray-600">所属机构</Label>
                        <p className="text-gray-900 mt-1">{profile.institution}</p>
                      </div>
                    )}

                    {profile.bio && (
                      <div>
                        <Label className="text-gray-600">个人简介</Label>
                        <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                          {profile.bio}
                        </p>
                      </div>
                    )}

                    <div>
                      <Label className="text-gray-600">注册时间</Label>
                      <p className="text-gray-900 mt-1">{profile.createdAt}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 功能快捷入口 */}
            <Card className="border-purple-200 mt-6">
              <CardHeader>
                <CardTitle>功能快捷入口</CardTitle>
                <CardDescription>
                  根据您的角色快速访问相关功能
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.role === 'author' && (
                    <Button 
                      onClick={() => router.push('/submission')}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    >
                      投稿管理
                    </Button>
                  )}
                  {profile.role === 'editor' && (
                    <Button 
                      onClick={() => router.push('/editor')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      编辑工作台
                    </Button>
                  )}
                  {profile.role === 'reviewer' && (
                    <Button 
                      onClick={() => router.push('/reviewer')}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      审稿工作台
                    </Button>
                  )}
                  {profile.role === 'admin' && (
                    <Button 
                      onClick={() => router.push('/admin')}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                    >
                      用户管理
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
