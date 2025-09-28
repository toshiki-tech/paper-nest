'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PublishingPolicyPage() {
  const policies = [
    {
      title: '发表政策',
      items: [
        '本期刊致力于发表高质量的色彩研究论文',
        '所有文章必须经过严格的同行评议',
        '采用开放获取模式，免费向读者提供',
        '支持作者保留版权，采用知识共享许可',
        '鼓励跨学科和跨文化的研究合作'
      ]
    },
    {
      title: '版权政策',
      items: [
        '作者保留文章的版权',
        '期刊获得非独占的发表权',
        '采用CC BY 4.0知识共享许可协议',
        '允许他人自由使用、修改和分发',
        '要求适当署名原作者'
      ]
    },
    {
      title: '开放获取政策',
      items: [
        '所有文章免费向全球读者开放',
        '支持立即开放获取，无禁期限制',
        '鼓励作者将预印本上传至学术平台',
        '支持机构知识库的长期保存',
        '促进学术成果的广泛传播'
      ]
    },
    {
      title: '撤稿政策',
      items: [
        '发现学术不端行为时立即撤稿',
        '作者主动申请撤稿需提供充分理由',
        '撤稿决定由编辑部委员会集体做出',
        '撤稿通知会公开发布并说明原因',
        '维护学术诚信和期刊声誉'
      ]
    }
  ];

  const ethicalGuidelines = [
    {
      category: '作者责任',
      items: [
        '确保研究数据的真实性和完整性',
        '避免抄袭、剽窃等学术不端行为',
        '正确引用他人研究成果',
        '披露潜在的利益冲突',
        '配合编辑部的调查工作'
      ]
    },
    {
      category: '审稿专家责任',
      items: [
        '客观公正地进行同行评议',
        '保护审稿过程的保密性',
        '及时完成审稿任务',
        '避免利益冲突',
        '提供建设性的审稿意见'
      ]
    },
    {
      category: '编辑责任',
      items: [
        '确保审稿过程的公平性',
        '保护作者和审稿专家的隐私',
        '及时处理投稿和审稿意见',
        '维护期刊的学术标准',
        '处理学术不端行为'
      ]
    }
  ];

  const publicationStandards = [
    {
      standard: '学术质量',
      description: '文章必须具有创新性和学术价值',
      requirements: [
        '研究问题具有理论或实践意义',
        '研究方法科学合理',
        '数据分析准确可靠',
        '结论有充分依据',
        '对相关领域有贡献'
      ]
    },
    {
      standard: '写作质量',
      description: '文章表达清晰，逻辑严密',
      requirements: [
        '结构完整，逻辑清晰',
        '语言准确，表达流畅',
        '图表设计合理',
        '参考文献规范',
        '符合期刊格式要求'
      ]
    },
    {
      standard: '学术规范',
      description: '严格遵守学术道德和规范',
      requirements: [
        '原创性研究，无抄袭行为',
        '正确引用他人成果',
        '数据真实可靠',
        '实验伦理合规',
        '署名权正确'
      ]
    }
  ];

  const accessPolicies = [
    {
      type: '立即开放获取',
      description: '文章发表后立即免费开放',
      benefits: [
        '全球读者免费访问',
        '提高文章影响力',
        '促进学术交流',
        '支持开放科学',
        '符合资助机构要求'
      ]
    },
    {
      type: '知识共享许可',
      description: '采用CC BY 4.0许可协议',
      benefits: [
        '允许商业使用',
        '允许修改和改编',
        '要求适当署名',
        '促进知识传播',
        '支持创新研究'
      ]
    },
    {
      type: '长期保存',
      description: '支持文章的长期保存和访问',
      benefits: [
        '机构知识库存档',
        '数字对象标识符(DOI)',
        '永久访问链接',
        '版本控制管理',
        '数据备份保护'
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
            出版政策
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解我们的出版政策，确保您的文章符合发表要求
          </p>
        </div>

        {/* 核心政策 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">核心政策</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{policy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {policy.items.map((item, itemIndex) => (
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

        {/* 学术伦理指南 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">学术伦理指南</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ethicalGuidelines.map((guideline, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{guideline.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {guideline.items.map((item, itemIndex) => (
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

        {/* 发表标准 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">发表标准</h2>
          <div className="space-y-8">
            {publicationStandards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mr-4">
                      标准 {index + 1}
                    </Badge>
                    <CardTitle className="text-xl">{standard.standard}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{standard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {standard.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 开放获取政策 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">开放获取政策</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {accessPolicies.map((policy, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{policy.type}</CardTitle>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {policy.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 政策声明 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">政策声明</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">学术诚信承诺</h3>
                <p className="text-gray-600">
                  我们承诺维护学术诚信，对所有学术不端行为采取零容忍态度。任何违反学术道德的行为都将受到严肃处理。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">开放科学支持</h3>
                <p className="text-gray-600">
                  我们支持开放科学理念，鼓励数据共享、方法透明和结果可重现，促进科学知识的广泛传播。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">公平公正原则</h3>
                <p className="text-gray-600">
                  我们坚持公平公正的审稿原则，不因作者的身份、国籍、性别、种族等因素影响审稿决定。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">政策咨询</h2>
          <p className="text-lg text-gray-600 mb-6">
            如果您对出版政策有任何疑问，请随时联系我们
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
