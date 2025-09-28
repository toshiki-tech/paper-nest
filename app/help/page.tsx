'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HelpPage() {
  const faqItems = [
    {
      category: '投稿相关',
      questions: [
        {
          question: '如何投稿？',
          answer: '请先注册账户，登录后在"我的投稿"页面点击"新建投稿"，填写文章信息并上传文件即可。'
        },
        {
          question: '投稿需要什么格式？',
          answer: '我们接受Word文档(.docx)和PDF格式。文章应包含标题、摘要、关键词、正文、参考文献等完整内容。'
        },
        {
          question: '投稿后多久能收到回复？',
          answer: '我们会在收到投稿后7个工作日内进行初步审查，并在30天内完成审稿流程。'
        }
      ]
    },
    {
      category: '审稿相关',
      questions: [
        {
          question: '审稿流程是怎样的？',
          answer: '我们采用三审制：初审、专家审稿、终审。每轮审稿都有明确的时限和标准。'
        },
        {
          question: '如何成为审稿专家？',
          answer: '请发送您的简历和研究领域信息至编辑部邮箱，我们会根据您的专业背景进行评估。'
        },
        {
          question: '审稿意见如何查看？',
          answer: '登录后在"我的投稿"页面可以查看详细的审稿意见和修改建议。'
        }
      ]
    },
    {
      category: '账户相关',
      questions: [
        {
          question: '忘记密码怎么办？',
          answer: '在登录页面点击"忘记密码"，输入注册邮箱，我们会发送重置链接。'
        },
        {
          question: '如何修改个人信息？',
          answer: '登录后进入"个人资料"页面，可以修改姓名、邮箱、联系方式等信息。'
        },
        {
          question: '账户被锁定怎么办？',
          answer: '请联系客服邮箱或拨打客服电话，我们会协助您解锁账户。'
        }
      ]
    },
    {
      category: '技术问题',
      questions: [
        {
          question: '网站无法正常访问？',
          answer: '请检查网络连接，清除浏览器缓存，或尝试使用其他浏览器。如问题持续，请联系技术支持。'
        },
        {
          question: '文件上传失败？',
          answer: '请确保文件大小不超过50MB，格式正确，网络连接稳定。如仍有问题，请尝试分块上传。'
        },
        {
          question: '页面显示异常？',
          answer: '建议使用Chrome、Firefox、Safari等现代浏览器，并确保JavaScript已启用。'
        }
      ]
    }
  ];

  const contactInfo = [
    {
      title: '编辑部邮箱',
      content: 'editor@color-journal.com',
      description: '投稿、审稿相关问题'
    },
    {
      title: '技术支持',
      content: 'support@color-journal.com',
      description: '网站技术问题'
    },
    {
      title: '客服电话',
      content: '+86-xxx-xxxx-xxxx',
      description: '工作日 9:00-18:00'
    },
    {
      title: '在线客服',
      content: '点击右下角客服图标',
      description: '实时在线咨询'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            帮助中心
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            为您提供全面的使用指导和问题解答
          </p>
        </div>

        {/* 快速导航 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">投稿指南</h3>
              <p className="text-sm text-gray-600">了解投稿流程和要求</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">审稿流程</h3>
              <p className="text-sm text-gray-600">查看审稿标准和流程</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">出版政策</h3>
              <p className="text-sm text-gray-600">了解期刊出版政策</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">学术伦理</h3>
              <p className="text-sm text-gray-600">学术诚信和伦理规范</p>
            </CardContent>
          </Card>
        </div>

        {/* 常见问题 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">常见问题</h2>
          <div className="space-y-8">
            {faqItems.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.questions.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 联系我们 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-blue-600 font-medium mb-2">{item.content}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 使用指南 */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">使用指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 mr-3">1</Badge>
                  注册登录
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">首次使用需要注册账户，填写基本信息后即可登录系统。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="bg-green-100 text-green-800 mr-3">2</Badge>
                  投稿操作
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">登录后进入投稿页面，按照要求填写文章信息并上传文件。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Badge className="bg-purple-100 text-purple-800 mr-3">3</Badge>
                  跟踪进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">在个人中心可以查看投稿状态、审稿意见和修改建议。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
