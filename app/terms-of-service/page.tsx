'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
  const serviceTerms = [
    {
      section: '服务描述',
      description: '《色彩》期刊提供的在线服务',
      items: [
        '学术文章投稿和审稿系统',
        '同行评议和编辑管理',
        '学术交流和合作平台',
        '研究成果发布和传播',
        '学术资源检索和下载'
      ]
    },
    {
      section: '用户注册',
      description: '注册使用我们服务的条件',
      items: [
        '提供真实、准确、完整的个人信息',
        '及时更新个人信息变更',
        '保护账户安全，不得转让账户',
        '遵守相关法律法规和学术规范',
        '不得恶意注册多个账户'
      ]
    },
    {
      section: '用户责任',
      description: '使用服务时用户应承担的责任',
      items: [
        '确保提交内容的原创性和合法性',
        '尊重他人知识产权和学术成果',
        '不得进行任何违法或有害活动',
        '配合我们的管理和监督工作',
        '承担因违规行为产生的后果'
      ]
    },
    {
      section: '内容政策',
      description: '用户提交内容的要求和限制',
      items: [
        '内容必须符合学术规范和伦理要求',
        '不得包含虚假、误导或有害信息',
        '尊重他人隐私和人格尊严',
        '不得传播违法或不当内容',
        '遵守版权和知识产权法规'
      ]
    }
  ];

  const prohibitedActivities = [
    {
      category: '学术不端',
      description: '违反学术诚信的行为',
      examples: [
        '抄袭、剽窃他人研究成果',
        '伪造或篡改实验数据',
        '一稿多投或重复发表',
        '不当署名或买卖署名',
        '违反研究伦理规范'
      ]
    },
    {
      category: '技术滥用',
      description: '滥用技术手段的行为',
      examples: [
        '使用自动化工具恶意操作',
        '尝试破解或绕过安全措施',
        '传播恶意软件或病毒',
        '进行网络攻击或入侵',
        '干扰系统正常运行'
      ]
    },
    {
      category: '内容违规',
      description: '发布违规内容的行为',
      examples: [
        '发布虚假或误导性信息',
        '传播仇恨、暴力或歧视内容',
        '侵犯他人隐私或名誉',
        '发布商业广告或垃圾信息',
        '违反法律法规的内容'
      ]
    },
    {
      category: '账户滥用',
      description: '滥用用户账户的行为',
      examples: [
        '恶意注册多个账户',
        '转让或出售用户账户',
        '使用他人身份信息注册',
        '进行欺诈或诈骗活动',
        '干扰其他用户正常使用'
      ]
    }
  ];

  const intellectualProperty = [
    {
      type: '用户内容',
      description: '用户提交的原创内容',
      rights: [
        '用户保留对原创内容的版权',
        '授权期刊非独占的发表权',
        '允许期刊进行编辑和格式调整',
        '支持学术交流和知识传播',
        '遵守相关版权法律法规'
      ]
    },
    {
      type: '期刊内容',
      description: '期刊平台和系统内容',
      rights: [
        '期刊拥有平台和系统的知识产权',
        '保护期刊品牌和商标权',
        '维护期刊声誉和形象',
        '控制平台功能和技术架构',
        '保护商业机密和专有技术'
      ]
    },
    {
      type: '第三方内容',
      description: '来自第三方的授权内容',
      rights: [
        '尊重第三方知识产权',
        '遵守授权协议和许可',
        '不得超出授权范围使用',
        '保护第三方合法权益',
        '及时处理侵权投诉'
      ]
    }
  ];

  const liabilityLimitations = [
    {
      limitation: '服务可用性',
      description: '我们无法保证服务的绝对可用性',
      details: [
        '可能因维护、升级或故障暂停服务',
        '不承担因服务中断造成的损失',
        '用户应备份重要数据和内容',
        '建议用户定期保存工作成果',
        '提供合理的服务恢复时间'
      ]
    },
    {
      limitation: '内容准确性',
      description: '我们不对用户内容的准确性负责',
      details: [
        '用户对其提交内容承担全部责任',
        '我们不对内容错误或遗漏负责',
        '用户应自行验证内容的准确性',
        '建议用户寻求专业意见',
        '我们保留内容审核和修改权利'
      ]
    },
    {
      limitation: '第三方链接',
      description: '我们不对第三方网站负责',
      details: [
        '可能包含指向第三方网站的链接',
        '不控制第三方网站的内容',
        '不承担第三方网站的责任',
        '用户访问第三方网站需自行承担风险',
        '建议用户查看第三方隐私政策'
      ]
    },
    {
      limitation: '损害赔偿',
      description: '我们的责任限制',
      details: [
        '责任限于直接损失，不包括间接损失',
        '不承担利润损失或机会成本',
        '总责任不超过用户支付的费用',
        '某些情况下可能完全免责',
        '用户应购买适当的保险保障'
      ]
    }
  ];

  const terminationConditions = [
    {
      condition: '用户主动终止',
      description: '用户可以选择停止使用服务',
      procedures: [
        '通过账户设置申请注销',
        '联系客服协助处理',
        '删除或转移个人数据',
        '结清未完成的事务',
        '确认终止生效'
      ]
    },
    {
      condition: '违规终止',
      description: '因违规行为被终止服务',
      procedures: [
        '发送违规通知和警告',
        '给予整改机会和期限',
        '严重违规直接终止服务',
        '保留相关证据和记录',
        '通知相关机构和人员'
      ]
    },
    {
      condition: '服务终止',
      description: '我们停止提供某些服务',
      procedures: [
        '提前通知用户服务变更',
        '提供数据导出和迁移',
        '协助用户转移内容',
        '处理未完成的事务',
        '提供替代方案或补偿'
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
            使用条款
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            请仔细阅读以下条款，使用我们的服务即表示您同意遵守这些条款
          </p>
          <div className="mt-4 text-sm text-gray-500">
            最后更新：2025年1月15日
          </div>
        </div>

        {/* 条款概述 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">条款概述</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                欢迎使用《色彩》期刊在线服务平台。本使用条款（以下简称"条款"）是您与我们之间关于使用
                我们服务的法律协议。请仔细阅读本条款，使用我们的服务即表示您同意遵守这些条款。
              </p>
              <p className="text-gray-600 leading-relaxed">
                如果您不同意本条款的任何内容，请不要使用我们的服务。我们保留随时修改本条款的权利，
                修改后的条款将在网站上公布后生效。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 服务条款 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">服务条款</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceTerms.map((term, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{term.section}</CardTitle>
                  <CardDescription className="text-lg">{term.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {term.items.map((item, itemIndex) => (
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

        {/* 禁止行为 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">禁止行为</h2>
          <div className="space-y-8">
            {prohibitedActivities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-red-100 text-red-800 text-lg px-4 py-2 mr-4">
                      禁止 {index + 1}
                    </Badge>
                    <CardTitle className="text-xl text-red-600">{activity.category}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 知识产权 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">知识产权</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {intellectualProperty.map((property, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{property.type}</CardTitle>
                  <CardDescription className="text-lg">{property.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {property.rights.map((right, rightIndex) => (
                      <li key={rightIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{right}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 责任限制 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">责任限制</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {liabilityLimitations.map((limitation, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">{limitation.limitation}</CardTitle>
                  <CardDescription className="text-lg">{limitation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {limitation.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 服务终止 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">服务终止</h2>
          <div className="space-y-8">
            {terminationConditions.map((condition, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2 mr-4">
                      终止 {index + 1}
                    </Badge>
                    <CardTitle className="text-xl text-purple-600">{condition.condition}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{condition.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {condition.procedures.map((procedure, procedureIndex) => (
                      <li key={procedureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{procedure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 争议解决 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-600">争议解决</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">协商解决</h3>
                <p className="text-gray-600 leading-relaxed">
                  如发生争议，双方应首先通过友好协商解决。我们鼓励用户通过客服渠道
                  与我们沟通，寻求问题的妥善解决。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">法律适用</h3>
                <p className="text-gray-600 leading-relaxed">
                  本条款受中华人民共和国法律管辖。如协商不成，任何争议应提交
                  有管辖权的人民法院解决。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">条款有效性</h3>
                <p className="text-gray-600 leading-relaxed">
                  如本条款的任何条款被认定为无效或不可执行，其余条款仍然有效。
                  我们将及时修改无效条款，确保条款的合法性和可执行性。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">条款咨询</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">法律事务部</h3>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">legal@color-journal.com</span>
                </div>
                <p className="text-sm text-gray-600">处理法律和条款相关问题</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">客服热线</h3>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">+86-xxx-xxxx-xxxx</span>
                </div>
                <p className="text-sm text-gray-600">工作日 9:00-18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 条款更新 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">条款更新</h2>
          <p className="text-gray-600 mb-6">
            我们可能会不时更新本使用条款。重大变更将通过网站公告或邮件通知您。
          </p>
          <div className="text-sm text-gray-500">
            建议您定期查看本页面以了解最新条款。
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
