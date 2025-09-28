'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import SignOutModal from '@/components/SignOutModal';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header - 使用公共组件 */}
      <Header onSignOutClick={() => setShowSignOutModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* 页面标题 - 科技感设计 */}
        <div className="text-center mb-12 md:mb-20 relative">
          {/* 背景装饰 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-slate-200/20 via-purple-200/20 to-slate-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-700 via-purple-600 to-slate-700 bg-clip-text text-transparent mb-6 leading-tight">
              联系我们
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              探索色彩的无限可能，与我们一起创造视觉奇迹
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* 联系信息 - 优化布局 */}
          <div className="space-y-6">
            {/* 编辑部地址 */}
            <Card className="border-slate-200 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">编辑部地址</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                      <span className="text-sm text-slate-600 font-medium">色彩研究总部</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-slate-500 rounded-full mr-2"></span>
                      《色彩》期刊编辑部
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      北京市海淀区中关村大街1号<br />
                      色彩研究大厦15层<br />
                      <span className="text-slate-600 font-medium">邮编：100000</span>
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-slate-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      交通指南
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      地铁4号线中关村站A出口步行5分钟<br />
                      公交：中关村南站（多路公交可达）
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 联系方式 */}
            <Card className="border-purple-200 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">联系方式</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-purple-600 font-medium">多渠道联系</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-50 to-slate-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">编辑部电话</h4>
                    <p className="text-purple-600 font-medium">010-12345678</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-purple-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">投稿邮箱</h4>
                    <p className="text-slate-600 font-medium text-xs">submission@color-journal.com</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">编辑部邮箱</h4>
                    <p className="text-gray-600 font-medium text-xs">editor@color-journal.com</p>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">广告合作</h4>
                    <p className="text-slate-600 font-medium text-xs">advertising@color-journal.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 联系表单 */}
          <div>
            <Card className="border-purple-200 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">发送消息</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm text-purple-600 font-medium">在线沟通</span>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  请填写以下表单，我们会尽快回复您
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        姓名 *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="请输入您的姓名"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        邮箱 *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="请输入您的邮箱"
                        className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      电话
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="请输入您的电话"
                      className="border-slate-300 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      主题 *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="请输入消息主题"
                      className="border-slate-300 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      消息内容 *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="请详细描述您的问题或建议..."
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-slate-600 hover:from-purple-700 hover:to-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="mr-2">🚀</span>
                      发送消息
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 常见问题 - 科技感设计 */}
        <section className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-700 to-purple-600 bg-clip-text text-transparent mb-4">
              常见问题解答
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              快速找到您需要的答案，如果还有疑问，欢迎随时联系我们
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">如何投稿？</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  请访问我们的投稿页面，注册账户后即可在线投稿。投稿前请仔细阅读投稿指南，确保文章符合期刊要求。
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">审稿周期多长？</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  一般情况下，初审需要1-2周，外审需要4-6周，终审需要1-2周。整个审稿流程大约需要6-10周。
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">如何订阅期刊？</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  您可以通过我们的官网订阅，或者联系编辑部进行订阅。我们提供纸质版和电子版两种订阅方式。
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-gray-900">如何成为审稿人？</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  如果您是色彩研究领域的专家，欢迎联系我们申请成为审稿人。请发送您的简历和研究领域信息到编辑部邮箱。
                </p>
              </CardContent>
            </Card>
          </div>
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