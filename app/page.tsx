'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header - 使用公共组件 */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    作者在线注册
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    作者在线投稿
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300 font-bold text-lg px-8 py-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    专家在线审稿
                  </Button>
                </Link>
              </>
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
          
          {/* 新增特色亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">国际认可</h3>
              <p className="text-sm text-gray-600">SCI收录期刊，影响因子2.8</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">快速审稿</h3>
              <p className="text-sm text-gray-600">平均审稿周期15天</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">全球视野</h3>
              <p className="text-sm text-gray-600">来自25个国家的作者</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">创新前沿</h3>
              <p className="text-sm text-gray-600">引领色彩研究新方向</p>
            </div>
          </div>
          
          {/* 最新期刊模块 */}
          <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  最新期刊
                </h2>
                <p className="text-xl text-gray-600">
                  浏览最新发表的色彩研究文章
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-xl transition-all duration-500 border-slate-200 hover:border-slate-400 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-pink-100 text-pink-800">第8卷第1期</Badge>
                      <span className="text-sm text-gray-500">2025年3月</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      色彩心理学在环境设计中的应用研究
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      探讨色彩心理学原理在室内外环境设计中的实践应用
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></div>
                        <span>作者：张色彩，李设计</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                        <span>关键词：色彩心理学，环境设计，用户体验</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                        <span>DOI：10.1234/color.2025.001</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📊 下载量: 156次</span>
                        <span>👥 引用: 8次</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-500 border-slate-200 hover:border-slate-400 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-purple-100 text-purple-800">第7卷第4期</Badge>
                      <span className="text-sm text-gray-500">2024年12月</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      数字媒体中的色彩再现技术研究
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      分析数字媒体环境下色彩再现的技术挑战与解决方案
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></div>
                        <span>作者：王技术，赵数字</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                        <span>关键词：数字色彩，色彩管理，显示技术</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                        <span>DOI：10.1234/color.2024.004</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📊 下载量: 203次</span>
                        <span>👥 引用: 12次</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-500 border-slate-200 hover:border-slate-400 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-indigo-100 text-indigo-800">第7卷第3期</Badge>
                      <span className="text-sm text-gray-500">2024年9月</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      跨文化色彩象征意义的比较研究
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      比较不同文化背景下色彩象征意义的差异与共性
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></div>
                        <span>作者：陈文化，刘比较</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                        <span>关键词：色彩文化，象征意义，跨文化研究</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                        <span>DOI：10.1234/color.2024.003</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📊 下载量: 189次</span>
                        <span>👥 引用: 15次</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <Link href="/articles">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg">
                    查看更多文章
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 期刊信息模块 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              期刊信息
            </h2>
            <p className="text-xl text-gray-600">
              《色彩》期刊基本信息与联系方式
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">期刊名称</h3>
              <p className="text-sm text-gray-600">《色彩》</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">创刊时间</h3>
              <p className="text-sm text-gray-600">2020年</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">出版周期</h3>
              <p className="text-sm text-gray-600">月刊</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">投稿邮箱</h3>
              <p className="text-sm text-gray-600">submission@color-journal.com</p>
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
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">色彩技术</h3>
              <p className="text-sm text-gray-600">色彩测量、再现与显示技术</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">色彩文化</h3>
              <p className="text-sm text-gray-600">色彩在不同文化中的象征意义</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">数字色彩</h3>
              <p className="text-sm text-gray-600">数字媒体中的色彩应用</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
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
      <section className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            加入《色彩》研究社区
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            分享您的色彩研究成果，推动色彩学科发展
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              立即投稿
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - 使用公共组件 */}
      <Footer />
    </div>
  );
}