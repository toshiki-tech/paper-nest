'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubmissionGuidePage() {
  const requirements = [
    {
      title: '文章格式要求',
      items: [
        '文章长度：3000-8000字（含参考文献）',
        '文件格式：Word文档(.docx)或PDF格式',
        '字体：正文使用宋体12号，英文使用Times New Roman',
        '行距：1.5倍行距，页边距2.5cm',
        '页码：连续编号，位于页面底部居中'
      ]
    },
    {
      title: '内容结构要求',
      items: [
        '标题：简洁明确，不超过20字',
        '摘要：中文摘要300-500字，英文摘要200-300词',
        '关键词：3-8个，中英文对照',
        '正文：包括引言、文献综述、研究方法、结果分析、结论',
        '参考文献：采用APA格式，不少于15篇'
      ]
    },
    {
      title: '学术质量要求',
      items: [
        '原创性：未公开发表，无抄袭行为',
        '创新性：具有理论或实践创新价值',
        '科学性：研究方法科学，数据真实可靠',
        '规范性：符合学术写作规范',
        '完整性：内容完整，逻辑清晰'
      ]
    }
  ];

  const submissionSteps = [
    {
      step: 1,
      title: '注册账户',
      description: '在期刊官网注册作者账户，填写真实个人信息',
      details: [
        '提供有效的邮箱地址',
        '填写姓名、单位、联系方式',
        '上传个人简历和研究领域信息'
      ]
    },
    {
      step: 2,
      title: '准备稿件',
      description: '按照期刊要求准备完整的投稿材料',
      details: [
        '撰写符合格式要求的文章',
        '准备中英文摘要和关键词',
        '整理参考文献',
        '准备图表和附件材料'
      ]
    },
    {
      step: 3,
      title: '在线投稿',
      description: '通过投稿系统提交文章和相关材料',
      details: [
        '登录投稿系统',
        '填写文章基本信息',
        '上传文章文件',
        '填写作者信息',
        '选择审稿专家（可选）'
      ]
    },
    {
      step: 4,
      title: '等待审稿',
      description: '编辑部进行初步审查并安排专家审稿',
      details: [
        '编辑部7个工作日内完成初审',
        '通过初审后安排专家审稿',
        '审稿周期通常为30-60天',
        '作者可随时查看审稿进度'
      ]
    },
    {
      step: 5,
      title: '修改完善',
      description: '根据审稿意见修改文章并重新提交',
      details: [
        '仔细阅读审稿意见',
        '逐条回应修改建议',
        '修改后重新提交',
        '提供修改说明文档'
      ]
    },
    {
      step: 6,
      title: '最终录用',
      description: '通过终审后正式录用并安排发表',
      details: [
        '编辑部发送录用通知',
        '签署版权协议',
        '支付版面费（如适用）',
        '配合编辑进行最终校对'
      ]
    }
  ];

  const importantNotes = [
    {
      type: 'warning',
      title: '重要提醒',
      content: '投稿前请仔细阅读本指南，确保文章符合所有要求。不符合要求的稿件将被直接退回。'
    },
    {
      type: 'info',
      title: '审稿周期',
      content: '我们承诺在收到投稿后30天内完成审稿，特殊情况会及时通知作者。'
    },
    {
      type: 'success',
      title: '免费发表',
      content: '本期刊对所有录用文章免费发表，不收取任何版面费或审稿费。'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            投稿须知
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解投稿要求，确保您的文章能够顺利通过审稿
          </p>
        </div>

        {/* 重要提醒 */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantNotes.map((note, index) => (
              <Card key={index} className={`border-l-4 ${
                note.type === 'warning' ? 'border-l-orange-500' :
                note.type === 'info' ? 'border-l-blue-500' :
                'border-l-green-500'
              }`}>
                <CardContent className="p-6">
                  <h3 className={`font-semibold mb-2 ${
                    note.type === 'warning' ? 'text-orange-600' :
                    note.type === 'info' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {note.title}
                  </h3>
                  <p className="text-gray-600">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 投稿要求 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">投稿要求</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {requirements.map((requirement, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{requirement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 投稿流程 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">投稿流程</h2>
          <div className="space-y-8">
            {submissionSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mr-4">
                      步骤 {step.step}
                    </Badge>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < submissionSteps.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 常见问题 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">常见问题</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Q: 可以同时投稿多篇文章吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A: 可以，但建议作者专注于文章质量，确保每篇文章都达到发表标准。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Q: 审稿意见不满意可以申诉吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A: 可以，作者可以通过投稿系统提交申诉，编辑部会重新评估。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Q: 文章被拒后可以重新投稿吗？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A: 可以，但需要根据审稿意见进行重大修改，并说明修改内容。</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Q: 如何查询投稿状态？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A: 登录投稿系统后，在"我的投稿"页面可以查看详细的投稿状态和进度。</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">需要帮助？</h2>
          <p className="text-lg text-gray-600 mb-6">
            如果您在投稿过程中遇到任何问题，请随时联系我们
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700">editor@color-journal.com</span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700">+86-xxx-xxxx-xxxx</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
