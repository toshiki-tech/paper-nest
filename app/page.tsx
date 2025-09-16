'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端布局 */}
          <div className="hidden md:flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="md" />
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                首页
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                期刊文章
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                关于我们
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                联系我们
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-600">
                    欢迎，{session.user?.name || session.user?.email || '用户'}
                  </span>
                  {session.user?.role === 'author' && (
                    <Link href="/submission">
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">投稿管理</Button>
                    </Link>
                  )}
                  {session.user?.role === 'editor' && (
                    <Link href="/editor">
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">编辑工作台</Button>
                    </Link>
                  )}
                  {session.user?.role === 'reviewer' && (
                    <Link href="/reviewer">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">审稿工作台</Button>
                    </Link>
                  )}
                  {session.user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">用户管理</Button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">个人资料</Button>
                  </Link>
                  <Link href="/api/auth/signout">
                    <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50">退出</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50">登录</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 hover:from-pink-600 hover:via-yellow-500 hover:to-blue-600">注册</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* 移动端布局 */}
          <div className="md:hidden py-4">
            {/* 第一行：Logo + 用户操作按钮 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Logo size="sm" />
              </div>
              <div className="flex items-center space-x-2">
                {session ? (
                  <>
                    {session.user?.role === 'author' && (
                      <Link href="/submission">
                        <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-2">投稿</Button>
                      </Link>
                    )}
                    {session.user?.role === 'editor' && (
                      <Link href="/editor">
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-2">编辑</Button>
                      </Link>
                    )}
                    {session.user?.role === 'reviewer' && (
                      <Link href="/reviewer">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-2">审稿</Button>
                      </Link>
                    )}
                    {session.user?.role === 'admin' && (
                      <Link href="/admin">
                        <Button size="sm" className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-2">管理</Button>
                      </Link>
                    )}
                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-2">资料</Button>
                    </Link>
                    <Link href="/api/auth/signout">
                      <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-2">退出</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 hover:bg-pink-50 px-2">登录</Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-500 hover:from-pink-600 hover:via-yellow-500 hover:to-blue-600 px-2">注册</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* 第二行：欢迎信息 + 导航菜单 */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {session ? `欢迎，${session.user?.name || session.user?.email || '用户'}` : '欢迎访问'}
              </span>
              <nav className="flex space-x-3">
                <Link href="/" className="text-gray-700 hover:text-pink-600 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                  首页
                </Link>
                <Link href="/articles" className="text-gray-700 hover:text-pink-600 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                  文章
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-pink-600 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                  关于
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-pink-600 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                  联系
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Logo size="lg" showText={true} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-200 bg-clip-text text-transparent">
            《色彩》期刊
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100">
            探索色彩的奥秘，分享色彩的研究
          </p>
          <p className="text-lg mb-8 text-pink-200 max-w-3xl mx-auto">
            专业的色彩研究期刊，涵盖色彩理论、色彩心理学、色彩设计、色彩技术等各个领域的研究成果
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <>
                {session.user?.role === 'author' && (
                  <Link href="/submission">
                    <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
                      我的投稿
                    </Button>
                  </Link>
                )}
                {session.user?.role === 'editor' && (
                  <Link href="/editor">
                    <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
                      编辑工作台
                    </Button>
                  </Link>
                )}
                {session.user?.role === 'reviewer' && (
                  <Link href="/reviewer">
                    <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
                      审稿工作台
                    </Button>
                  </Link>
                )}
                {session.user?.role === 'admin' && (
                  <Link href="/admin">
                    <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
                      用户管理
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
                  开始投稿
                </Button>
              </Link>
            )}
            <Link href="/articles">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600 shadow-lg">
                浏览期刊
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements - 参考COLOUR DESIGN AWARDS的装饰风格 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-blue-400/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-yellow-400/20 rounded-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
        {/* 背景装饰元素 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-200/20 to-pink-200/20 rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-100 to-purple-50 rounded-full mb-4">
              <span className="text-slate-600 text-sm font-medium">🌟 期刊特色</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              专业色彩研究平台
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              汇聚全球色彩研究精英，推动色彩科学前沿发展，为色彩研究提供最权威的学术交流平台
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* 色彩理论 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-slate-200 hover:border-slate-400 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">色彩理论</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600 font-medium">核心领域</span>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  探索色彩的物理本质与视觉机制，建立科学的色彩理论体系
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                    <span>色彩物理学与光学原理</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                    <span>色彩视觉机制与感知</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                    <span>色彩测量与标准化</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3"></div>
                    <span>色彩空间与色域研究</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📊 发表文章: 45篇</span>
                    <span>👥 研究团队: 12人</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 色彩心理学 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-purple-200 hover:border-purple-400 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">色彩心理学</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-purple-600 font-medium">热门领域</span>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  深入研究色彩对人类心理、情感和行为的影响机制
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    <span>色彩情感效应与调节</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    <span>色彩认知与记忆机制</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    <span>色彩偏好与文化差异</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                    <span>色彩治疗与健康应用</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-purple-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📊 发表文章: 38篇</span>
                    <span>👥 研究团队: 15人</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 色彩设计 */}
            <Card className="group hover:shadow-2xl transition-all duration-500 border-indigo-200 hover:border-indigo-400 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">色彩设计</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-sm text-indigo-600 font-medium">应用领域</span>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  色彩在艺术设计、品牌营销和空间设计中的创新应用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                    <span>色彩搭配与和谐理论</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                    <span>色彩空间与环境设计</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                    <span>色彩品牌与营销策略</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                    <span>数字色彩与交互设计</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📊 发表文章: 42篇</span>
                    <span>👥 研究团队: 18人</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 新增特色亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">国际认可</h3>
              <p className="text-sm text-gray-600">SCI收录期刊，影响因子2.8</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">快速审稿</h3>
              <p className="text-sm text-gray-600">平均审稿周期15天</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">全球视野</h3>
              <p className="text-sm text-gray-600">来自25个国家的作者</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">创新前沿</h3>
              <p className="text-sm text-gray-600">引领色彩研究新方向</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              研究领域
            </h2>
            <p className="text-xl text-gray-600">
              涵盖色彩研究的各个重要方向
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔬</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">色彩技术</h3>
              <p className="text-sm text-gray-600">色彩测量、再现与显示技术</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">色彩文化</h3>
              <p className="text-sm text-gray-600">色彩在不同文化中的象征意义</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💻</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">数字色彩</h3>
              <p className="text-sm text-gray-600">数字媒体中的色彩应用</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">色彩医学</h3>
              <p className="text-sm text-gray-600">色彩在医疗健康中的应用</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              期刊数据
            </h2>
            <p className="text-xl text-gray-600">
              《色彩》期刊的发展历程
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">156</div>
              <div className="text-gray-600">已发表文章</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">89</div>
              <div className="text-gray-600">活跃作者</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">45</div>
              <div className="text-gray-600">审稿专家</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">8</div>
              <div className="text-gray-600">期刊期数</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            加入《色彩》研究社区
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            分享您的色彩研究成果，推动色彩学科发展
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 shadow-lg">
              立即投稿
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - 统一设计 */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 mt-20 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-slate-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-slate-500/10 to-purple-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="sm" showText={false} />
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-400 to-purple-400 bg-clip-text text-transparent">
                  《色彩》期刊
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                专业的色彩研究期刊，致力于推动色彩学科的发展与创新。
              </p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌐</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">快速链接</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/articles" className="hover:text-purple-400 transition-colors duration-200">期刊文章</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition-colors duration-200">关于我们</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors duration-200">联系我们</Link></li>
                <li><Link href="/help" className="hover:text-purple-400 transition-colors duration-200">帮助中心</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">投稿指南</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/submission-guide" className="hover:text-slate-400 transition-colors duration-200">投稿须知</Link></li>
                <li><Link href="/review-process" className="hover:text-slate-400 transition-colors duration-200">审稿流程</Link></li>
                <li><Link href="/publishing-policy" className="hover:text-slate-400 transition-colors duration-200">出版政策</Link></li>
                <li><Link href="/ethics" className="hover:text-slate-400 transition-colors duration-200">学术伦理</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">联系我们</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <span className="text-gray-300 text-sm">contact@color-journal.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-gray-300 text-sm">+86-xxx-xxxx-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span className="text-gray-300 text-sm">中国北京市</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🕒</span>
                  </div>
                  <span className="text-gray-300 text-sm">周一至周五 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 《色彩》期刊编辑部. 保留所有权利.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">隐私政策</span>
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">使用条款</span>
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">Cookie政策</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}