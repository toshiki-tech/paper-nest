'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReviewProcessPage() {
  const reviewStages = [
    {
      stage: 1,
      title: '初审阶段',
      duration: '7个工作日',
      description: '编辑部对投稿进行初步审查',
      criteria: [
        '检查文章格式是否符合要求',
        '评估文章主题是否适合期刊',
        '确认文章基本学术质量',
        '检查是否存在明显学术不端行为'
      ],
      outcomes: [
        '通过初审，进入专家审稿',
        '格式问题，退回修改',
        '不符合期刊范围，直接拒稿'
      ]
    },
    {
      stage: 2,
      title: '专家审稿阶段',
      duration: '30-45天',
      description: '邀请相关领域专家进行同行评议',
      criteria: [
        '评估文章的创新性和学术价值',
        '检查研究方法的科学性和合理性',
        '验证实验数据的真实性和可靠性',
        '评价文章的写作质量和逻辑结构'
      ],
      outcomes: [
        '接受发表',
        '小修后接受',
        '大修后重新审稿',
        '拒绝发表'
      ]
    },
    {
      stage: 3,
      title: '终审阶段',
      duration: '7个工作日',
      description: '编辑部根据专家意见做出最终决定',
      criteria: [
        '综合评估所有审稿意见',
        '考虑期刊的发表标准和政策',
        '确保文章质量达到发表要求',
        '处理作者对审稿意见的回应'
      ],
      outcomes: [
        '正式录用',
        '需要进一步修改',
        '最终拒稿'
      ]
    }
  ];

  const reviewCriteria = [
    {
      category: '学术质量',
      weight: '40%',
      items: [
        '研究问题的创新性和重要性',
        '研究方法的科学性和适用性',
        '实验设计的合理性和完整性',
        '数据分析的准确性和深度',
        '结论的可靠性和推广价值'
      ]
    },
    {
      category: '写作质量',
      weight: '25%',
      items: [
        '文章结构的逻辑性和清晰度',
        '语言表达的准确性和流畅性',
        '图表设计的合理性和美观性',
        '参考文献的完整性和规范性',
        '摘要和关键词的准确性'
      ]
    },
    {
      category: '学术规范',
      weight: '20%',
      items: [
        '引用格式的规范性',
        '数据来源的可靠性',
        '实验伦理的合规性',
        '学术诚信的体现',
        '版权和署名权的正确性'
      ]
    },
    {
      category: '实用价值',
      weight: '15%',
      items: [
        '对理论发展的贡献',
        '对实践应用的指导意义',
        '对相关领域的影响',
        '对读者的参考价值',
        '对期刊声誉的提升'
      ]
    }
  ];

  const reviewerGuidelines = [
    {
      title: '审稿专家资格',
      items: [
        '具有相关领域的博士学位或同等学历',
        '在相关领域有5年以上的研究经验',
        '发表过高质量学术论文',
        '具有良好的学术声誉和职业道德',
        '能够客观公正地进行审稿'
      ]
    },
    {
      title: '审稿要求',
      items: [
        '在规定的时限内完成审稿',
        '提供详细、客观的审稿意见',
        '明确指出文章的优点和不足',
        '给出具体的修改建议',
        '保持审稿过程的保密性'
      ]
    },
    {
      title: '审稿标准',
      items: [
        '严格按照期刊的审稿标准执行',
        '基于学术质量进行客观评价',
        '避免个人偏见和利益冲突',
        '尊重作者的学术观点',
        '维护学术诚信和学术规范'
      ]
    }
  ];

  const timeline = [
    {
      time: '投稿后1-3天',
      event: '系统自动确认收到投稿',
      description: '作者收到投稿确认邮件，获得投稿编号'
    },
    {
      time: '投稿后7个工作日内',
      event: '编辑部完成初审',
      description: '检查格式、主题适合性等基本要求'
    },
    {
      time: '初审通过后3-5天',
      event: '分配审稿专家',
      description: '根据文章主题和研究领域选择合适的审稿专家'
    },
    {
      time: '分配后30-45天',
      event: '专家完成审稿',
      description: '审稿专家提交详细的审稿意见和推荐'
    },
    {
      time: '审稿完成后7个工作日内',
      event: '编辑部做出决定',
      description: '综合审稿意见，通知作者审稿结果'
    },
    {
      time: '收到修改意见后',
      event: '作者修改文章',
      description: '根据审稿意见进行修改，通常给予30天修改时间'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            审稿流程
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解我们的三审制审稿流程，确保每篇文章都经过严格的学术审查
          </p>
        </div>

        {/* 审稿阶段 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">审稿阶段</h2>
          <div className="space-y-8">
            {reviewStages.map((stage, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mr-4">
                        第{stage.stage}阶段
                      </Badge>
                      <CardTitle className="text-xl">{stage.title}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">
                      {stage.duration}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg">{stage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">审稿标准</h4>
                      <ul className="space-y-2">
                        {stage.criteria.map((criterion, criterionIndex) => (
                          <li key={criterionIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">可能结果</h4>
                      <ul className="space-y-2">
                        {stage.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                {index < reviewStages.length - 1 && (
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

        {/* 审稿标准 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">审稿标准</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewCriteria.map((criterion, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">{criterion.category}</CardTitle>
                  <Badge className="w-fit bg-blue-100 text-blue-800">
                    权重 {criterion.weight}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {criterion.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 审稿专家指南 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">审稿专家指南</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {reviewerGuidelines.map((guideline, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{guideline.title}</CardTitle>
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

        {/* 审稿时间线 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">审稿时间线</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                  <div className="ml-16">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-blue-100 text-blue-800">
                            {item.time}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.event}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 三审制说明 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">三审制说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-blue-600">初审</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  编辑部对投稿进行初步审查，检查格式、主题适合性等基本要求
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center text-green-600">专家审稿</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  邀请相关领域专家进行同行评议，评估学术质量和创新性
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center text-purple-600">终审</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  编辑部根据专家意见做出最终决定，确保文章质量达到发表标准
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">审稿相关问题</h2>
          <p className="text-lg text-gray-600 mb-6">
            如果您对审稿流程有任何疑问，请随时联系我们
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
