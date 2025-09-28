'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  const dataTypes = [
    {
      category: '个人信息',
      description: '我们收集的基本个人信息',
      items: [
        '姓名、邮箱地址、电话号码',
        '所属机构、职位、研究领域',
        '学术背景和专业资格',
        '通讯地址和联系方式'
      ]
    },
    {
      category: '使用数据',
      description: '您使用我们服务时产生的数据',
      items: [
        '登录记录和访问时间',
        '投稿和审稿活动记录',
        '搜索和浏览行为',
        '系统使用偏好设置'
      ]
    },
    {
      category: '技术数据',
      description: '自动收集的技术信息',
      items: [
        'IP地址和地理位置',
        '浏览器类型和版本',
        '设备信息和操作系统',
        '网站访问日志和错误报告'
      ]
    },
    {
      category: '内容数据',
      description: '您提交的学术内容',
      items: [
        '投稿文章和附件',
        '审稿意见和评论',
        '个人资料和简历',
        '通讯记录和反馈'
      ]
    }
  ];

  const dataUsage = [
    {
      purpose: '服务提供',
      description: '为您提供期刊投稿和审稿服务',
      examples: [
        '处理投稿和审稿流程',
        '发送通知和更新信息',
        '维护用户账户和权限',
        '提供技术支持和客户服务'
      ]
    },
    {
      purpose: '学术交流',
      description: '促进学术研究和交流',
      examples: [
        '匹配审稿专家和投稿',
        '维护学术网络和合作',
        '发布学术成果和活动',
        '促进跨机构学术交流'
      ]
    },
    {
      purpose: '质量改进',
      description: '改进我们的服务质量',
      examples: [
        '分析用户使用模式',
        '优化网站功能和性能',
        '开发新功能和服务',
        '进行用户满意度调查'
      ]
    },
    {
      purpose: '法律合规',
      description: '遵守法律法规要求',
      examples: [
        '履行法律义务和责任',
        '保护知识产权和版权',
        '处理争议和投诉',
        '配合监管机构调查'
      ]
    }
  ];

  const dataProtection = [
    {
      measure: '技术保护',
      description: '采用先进技术保护数据安全',
      methods: [
        'SSL/TLS加密传输',
        '数据库加密存储',
        '访问控制和身份验证',
        '定期安全漏洞扫描'
      ]
    },
    {
      measure: '管理保护',
      description: '建立完善的管理制度',
      methods: [
        '员工隐私培训',
        '数据访问权限控制',
        '定期安全审计',
        '事件响应计划'
      ]
    },
    {
      measure: '物理保护',
      description: '保护服务器和存储设备',
      methods: [
        '安全的数据中心',
        '24小时监控系统',
        '备份和灾难恢复',
        '设备安全销毁'
      ]
    },
    {
      measure: '法律保护',
      description: '通过法律手段保护隐私',
      methods: [
        '隐私政策合规',
        '数据处理协议',
        '第三方服务监管',
        '用户权利保障'
      ]
    }
  ];

  const userRights = [
    {
      right: '访问权',
      description: '了解我们持有的您的个人信息',
      actions: [
        '查看个人资料信息',
        '下载个人数据副本',
        '了解数据处理情况',
        '获取隐私政策副本'
      ]
    },
    {
      right: '更正权',
      description: '更正不准确或不完整的个人信息',
      actions: [
        '更新个人资料',
        '修正错误信息',
        '补充缺失数据',
        '验证信息准确性'
      ]
    },
    {
      right: '删除权',
      description: '在特定情况下删除个人信息',
      actions: [
        '删除账户和资料',
        '撤回数据处理同意',
        '删除过时信息',
        '处理删除请求'
      ]
    },
    {
      right: '限制权',
      description: '限制我们处理您的个人信息',
      actions: [
        '暂停数据处理',
        '限制特定用途',
        '保留数据但限制使用',
        '恢复数据处理'
      ]
    },
    {
      right: '可携带权',
      description: '以结构化格式获取您的数据',
      actions: [
        '导出个人数据',
        '转移数据到其他服务',
        '提供机器可读格式',
        '协助数据迁移'
      ]
    },
    {
      right: '反对权',
      description: '反对我们处理您的个人信息',
      actions: [
        '反对营销通讯',
        '反对自动化决策',
        '反对特定数据处理',
        '撤回处理同意'
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
            隐私政策
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们重视您的隐私，致力于保护您的个人信息安全
          </p>
          <div className="mt-4 text-sm text-gray-500">
            最后更新：2025年1月15日
          </div>
        </div>

        {/* 政策概述 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">政策概述</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                《色彩》期刊（以下简称"我们"）深知个人信息对您的重要性，我们将严格遵守相关法律法规，
                采取相应的安全保护措施，致力于保护您的个人信息安全可控。
              </p>
              <p className="text-gray-600 leading-relaxed">
                本隐私政策将详细说明我们如何收集、使用、存储、共享和保护您的个人信息，
                以及您对个人信息享有的权利。请您仔细阅读本隐私政策。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 信息收集 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">我们收集的信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataTypes.map((type, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{type.category}</CardTitle>
                  <CardDescription className="text-lg">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {type.items.map((item, itemIndex) => (
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

        {/* 信息使用 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">信息使用目的</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataUsage.map((usage, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{usage.purpose}</CardTitle>
                  <CardDescription className="text-lg">{usage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {usage.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 数据保护 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">数据保护措施</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dataProtection.map((protection, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">{protection.measure}</CardTitle>
                  <CardDescription className="text-lg">{protection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {protection.methods.map((method, methodIndex) => (
                      <li key={methodIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{method}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 用户权利 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">您的权利</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userRights.map((right, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-600">{right.right}</CardTitle>
                  <CardDescription>{right.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {right.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 信息共享 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">信息共享</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">我们不会出售您的个人信息</h3>
                <p className="text-gray-600 leading-relaxed">
                  我们不会向第三方出售、出租或以其他方式披露您的个人信息，除非：
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">获得您的明确同意</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">法律法规要求或司法机关要求</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">保护我们的合法权益</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">与可信赖的服务提供商共享（在严格保密协议下）</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">隐私问题联系</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">隐私保护官</h3>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">privacy@color-journal.com</span>
                </div>
                <p className="text-sm text-gray-600">专门处理隐私相关问题</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">数据保护热线</h3>
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

        {/* 政策更新 */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">政策更新</h2>
          <p className="text-gray-600 mb-6">
            我们可能会不时更新本隐私政策。重大变更将通过网站公告或邮件通知您。
          </p>
          <div className="text-sm text-gray-500">
            建议您定期查看本页面以了解最新信息。
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
