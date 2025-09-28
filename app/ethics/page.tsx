'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EthicsPage() {
  const ethicalPrinciples = [
    {
      principle: '学术诚信',
      description: '坚持学术诚信，杜绝学术不端行为',
      requirements: [
        '确保研究数据的真实性和完整性',
        '避免抄袭、剽窃等学术不端行为',
        '正确引用他人研究成果',
        '披露潜在的利益冲突',
        '配合编辑部的调查工作'
      ]
    },
    {
      principle: '研究伦理',
      description: '遵守研究伦理规范，保护研究对象权益',
      requirements: [
        '获得必要的伦理审查批准',
        '保护研究对象的隐私和权益',
        '确保研究过程的透明性',
        '遵守数据保护法规',
        '尊重文化差异和多样性'
      ]
    },
    {
      principle: '同行评议',
      description: '维护同行评议的公正性和客观性',
      requirements: [
        '客观公正地进行学术评价',
        '保护审稿过程的保密性',
        '避免利益冲突',
        '提供建设性的审稿意见',
        '尊重不同的学术观点'
      ]
    },
    {
      principle: '出版伦理',
      description: '遵守出版伦理规范，维护学术出版秩序',
      requirements: [
        '确保文章的原创性和创新性',
        '正确署名和致谢',
        '遵守版权和知识产权法规',
        '及时纠正错误和撤回不当发表',
        '维护期刊的学术声誉'
      ]
    }
  ];

  const misconductTypes = [
    {
      type: '抄袭剽窃',
      description: '未经授权使用他人的研究成果',
      examples: [
        '直接复制他人的文字、图表或数据',
        '改头换面地使用他人观点',
        '未正确引用他人研究成果',
        '自我抄袭已发表的内容'
      ],
      consequences: [
        '立即撤稿',
        '通知作者所在机构',
        '列入黑名单',
        '承担法律责任'
      ]
    },
    {
      type: '数据造假',
      description: '伪造、篡改或选择性报告研究数据',
      examples: [
        '编造实验数据或结果',
        '选择性报告有利数据',
        '篡改图表或统计结果',
        '隐瞒负面结果'
      ],
      consequences: [
        '撤销发表资格',
        '公开谴责',
        '影响学术声誉',
        '可能面临法律后果'
      ]
    },
    {
      type: '重复发表',
      description: '将同一研究成果多次发表',
      examples: [
        '一稿多投',
        '重复发表相同内容',
        '未声明相关发表',
        '违反版权协议'
      ],
      consequences: [
        '撤回重复发表',
        '限制未来投稿',
        '要求公开道歉',
        '承担经济责任'
      ]
    },
    {
      type: '不当署名',
      description: '在作者署名上存在不当行为',
      examples: [
        '将未参与研究的人员列为作者',
        '遗漏实际贡献者',
        '不当的通讯作者署名',
        '买卖作者署名'
      ],
      consequences: [
        '更正作者信息',
        '调查实际贡献',
        '可能撤稿',
        '影响学术声誉'
      ]
    }
  ];

  const preventionMeasures = [
    {
      measure: '技术检测',
      description: '使用先进技术手段检测学术不端',
      methods: [
        '使用反抄袭软件检测',
        '数据完整性验证',
        '图像处理检测',
        '统计分析验证'
      ]
    },
    {
      measure: '同行评议',
      description: '通过严格的同行评议发现学术不端',
      methods: [
        '邀请领域专家审稿',
        '多轮审稿制度',
        '匿名审稿机制',
        '审稿意见公开'
      ]
    },
    {
      measure: '教育宣传',
      description: '加强学术伦理教育和宣传',
      methods: [
        '定期举办学术伦理培训',
        '发布学术伦理指南',
        '建立举报机制',
        '表彰学术诚信行为'
      ]
    },
    {
      measure: '制度建设',
      description: '建立完善的学术伦理制度',
      methods: [
        '制定明确的伦理规范',
        '建立调查处理机制',
        '设立伦理委员会',
        '完善监督体系'
      ]
    }
  ];

  const reportingProcess = [
    {
      step: 1,
      title: '发现举报',
      description: '通过多种渠道发现学术不端行为',
      details: [
        '读者举报',
        '审稿专家发现',
        '技术检测发现',
        '同行举报'
      ]
    },
    {
      step: 2,
      title: '初步调查',
      description: '编辑部进行初步调查和证据收集',
      details: [
        '收集相关证据',
        '联系相关当事人',
        '初步评估严重程度',
        '决定是否深入调查'
      ]
    },
    {
      step: 3,
      title: '深入调查',
      description: '成立调查组进行深入调查',
      details: [
        '成立独立调查组',
        '详细调查事实',
        '听取各方意见',
        '形成调查报告'
      ]
    },
    {
      step: 4,
      title: '处理决定',
      description: '根据调查结果做出处理决定',
      details: [
        '评估违规程度',
        '确定处理措施',
        '通知相关当事人',
        '公开处理结果'
      ]
    },
    {
      step: 5,
      title: '后续跟进',
      description: '跟踪处理结果和预防措施',
      details: [
        '监督整改情况',
        '评估处理效果',
        '完善预防机制',
        '总结经验教训'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            学术伦理
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            维护学术诚信，促进学术健康发展
          </p>
        </div>

        {/* 伦理原则 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">学术伦理原则</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalPrinciples.map((principle, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{principle.principle}</CardTitle>
                  <CardDescription className="text-lg">{principle.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {principle.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 学术不端行为 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">学术不端行为</h2>
          <div className="space-y-8">
            {misconductTypes.map((misconduct, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2 mr-4">
                      类型 {index + 1}
                    </Badge>
                    <CardTitle className="text-xl text-red-600">{misconduct.type}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{misconduct.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">典型表现</h4>
                      <ul className="space-y-2">
                        {misconduct.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">处理后果</h4>
                      <ul className="space-y-2">
                        {misconduct.consequences.map((consequence, consequenceIndex) => (
                          <li key={consequenceIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{consequence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 预防措施 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">预防措施</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {preventionMeasures.map((measure, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{measure.measure}</CardTitle>
                  <CardDescription className="text-lg">{measure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {measure.methods.map((method, methodIndex) => (
                      <li key={methodIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 举报处理流程 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">举报处理流程</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-8">
              {reportingProcess.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="ml-16">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center">
                          <Badge className="bg-blue-100 text-blue-800 mr-4">
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
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 伦理承诺 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">学术伦理承诺</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-blue-600">作者承诺</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  我承诺遵守学术伦理规范，确保研究成果的真实性、完整性和原创性
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">审稿专家承诺</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  我承诺客观公正地进行同行评议，保护审稿过程的保密性和公正性
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center text-purple-600">编辑部承诺</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  我们承诺维护学术诚信，对学术不端行为采取零容忍态度
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 举报方式 */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">举报学术不端</h2>
          <p className="text-lg text-gray-600 mb-6">
            如果您发现学术不端行为，请通过以下方式举报
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">邮箱举报</h3>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">ethics@color-journal.com</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">电话举报</h3>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+86-xxx-xxxx-xxxx</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
