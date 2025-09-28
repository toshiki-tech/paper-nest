'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import SignOutModal from '@/components/SignOutModal';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-cool-100 to-cool-50">
      {/* Header - 使用公共组件 */}
      <Header onSignOutClick={() => setShowSignOutModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-4">
        {/* 页面标题 */}
        <div className="text-center mb-16 relative">
          {/* 背景装饰 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-32 h-32 bg-gradient-to-br from-warm-200/30 to-secondary-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-gradient-to-br from-cool-200/20 to-warm-200/20 rounded-full blur-lg"></div>
          
          <div className="relative z-10">
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cool-700 via-primary-600 to-cool-700 bg-clip-text text-transparent mb-6 leading-tight">
              关于《色彩》期刊
            </h1>
            <p className="text-lg md:text-xl text-cool-600 max-w-3xl mx-auto leading-relaxed">
              专业的色彩研究期刊，致力于推动色彩学科的发展与创新，为全球色彩研究学者提供最权威的学术交流平台
            </p>
          </div>
        </div>

        {/* 期刊介绍 */}
        <section className="mb-16">
          <Card className="border-warm-200 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-cool-900">期刊简介</h2>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></div>
                    <span className="text-sm text-secondary-600 font-medium">专业学术期刊</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-warm-50 to-secondary-50 rounded-lg border border-warm-200">
                    <h3 className="font-semibold text-cool-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                      期刊定位
                    </h3>
                    <p className="text-cool-700 leading-relaxed">
                      《色彩》期刊是专注于色彩科学研究的国际性学术期刊，致力于推动色彩理论、色彩心理学、色彩应用等领域的发展。
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border border-primary-200">
                    <h3 className="font-semibold text-cool-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      研究领域
                    </h3>
                    <p className="text-cool-700 leading-relaxed">
                      涵盖色彩理论、色彩心理学、色彩设计、色彩技术、色彩文化等多个研究方向，为跨学科研究提供平台。
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-accent-50 to-cool-50 rounded-lg border border-accent-200">
                    <h3 className="font-semibold text-cool-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                      学术影响
                    </h3>
                    <p className="text-cool-700 leading-relaxed">
                      被多个国际数据库收录，影响因子持续上升，在色彩研究领域具有重要的学术地位和影响力。
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-cool-50 to-warm-50 rounded-lg border border-cool-200">
                    <h3 className="font-semibold text-cool-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-cool-500 rounded-full mr-2"></span>
                      国际化
                    </h3>
                    <p className="text-cool-700 leading-relaxed">
                      拥有来自世界各地的编委和审稿专家，发表来自全球学者的高质量研究成果。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 编委团队 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cool-900 mb-4">编委团队</h2>
            <p className="text-cool-600 max-w-2xl mx-auto">
              汇聚全球色彩研究领域的顶尖专家，为期刊质量提供坚实保障
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-primary-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">主编</CardTitle>
                <CardDescription>期刊主编</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-cool-900">张色彩</h3>
                <p className="text-sm text-cool-600 mt-1">色彩心理学专家，教授</p>
                <p className="text-sm text-cool-500 mt-2">北京大学心理学系</p>
              </CardContent>
            </Card>

            <Card className="border-accent-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">副主编</CardTitle>
                <CardDescription>期刊副主编</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-cool-900">李设计</h3>
                <p className="text-sm text-cool-600 mt-1">色彩设计专家，副教授</p>
                <p className="text-sm text-cool-500 mt-2">清华大学美术学院</p>
              </CardContent>
            </Card>

            <Card className="border-secondary-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">编委</CardTitle>
                <CardDescription>期刊编委</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-cool-900">王心理</h3>
                <p className="text-sm text-cool-600 mt-1">色彩认知专家，教授</p>
                <p className="text-sm text-cool-500 mt-2">中科院心理研究所</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 期刊特色 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cool-900 mb-4">期刊特色</h2>
            <p className="text-cool-600 max-w-2xl mx-auto">
              我们致力于为色彩研究提供最优质的学术平台
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-warm-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  专业性强
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-700">
                  专注于色彩研究领域，拥有专业的编委团队和严格的审稿流程，确保发表文章的高质量。
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  国际化视野
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-700">
                  拥有来自世界各地的编委和审稿专家，发表来自全球学者的高质量研究成果。
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  创新导向
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-700">
                  鼓励创新性研究，支持跨学科合作，推动色彩研究领域的理论创新和实践应用。
                </p>
              </CardContent>
            </Card>

            <Card className="border-cool-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  实践应用
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-cool-700">
                  注重理论与实践的结合，推动色彩研究成果在工业设计、艺术创作等领域的应用。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 期刊信息 */}
        <section className="mb-16">
          <Card className="border-warm-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-2 shadow-sm">
                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                期刊信息
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-cool-900 mb-4">基本信息</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cool-600">期刊名称</span>
                      <span className="font-medium">《色彩》</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">创刊时间</span>
                      <span className="font-medium">2020年</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">出版周期</span>
                      <span className="font-medium">月刊</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">语言</span>
                      <span className="font-medium">中文/英文</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-cool-900 mb-4">联系方式</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-cool-600">编辑部邮箱</span>
                      <span className="font-medium text-sm">editor@color-journal.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">投稿邮箱</span>
                      <span className="font-medium text-sm">submission@color-journal.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">联系电话</span>
                      <span className="font-medium">010-12345678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cool-600">地址</span>
                      <span className="font-medium text-sm">北京市海淀区</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer - 使用公共组件 */}
      <Footer />
      {/* 退出确认弹窗 */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || session?.user?.email || undefined}
      />
    </div>
  );
}