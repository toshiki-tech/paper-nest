'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      type: '必要Cookie',
      description: '网站正常运行所必需的Cookie',
      purpose: '确保网站基本功能和安全',
      examples: [
        '用户登录状态保持',
        '购物车内容保存',
        '安全验证和防护',
        '语言和地区设置',
        '表单数据临时保存'
      ],
      duration: '会话期间或短期',
      canDisable: false
    },
    {
      type: '功能Cookie',
      description: '增强用户体验的功能性Cookie',
      purpose: '记住用户偏好和设置',
      examples: [
        '用户界面个性化设置',
        '字体大小和显示偏好',
        '主题和颜色选择',
        '搜索历史和过滤器',
        '个性化内容推荐'
      ],
      duration: '30天到1年',
      canDisable: true
    },
    {
      type: '分析Cookie',
      description: '用于网站分析和改进的Cookie',
      purpose: '了解用户行为，优化网站性能',
      examples: [
        '页面访问统计',
        '用户行为分析',
        '网站性能监控',
        '错误日志收集',
        'A/B测试数据'
      ],
      duration: '2年',
      canDisable: true
    },
    {
      type: '营销Cookie',
      description: '用于广告和营销的Cookie',
      purpose: '提供相关广告和营销内容',
      examples: [
        '广告投放和效果跟踪',
        '社交媒体集成',
        '邮件营销跟踪',
        '转化率分析',
        '用户兴趣分析'
      ],
      duration: '1-2年',
      canDisable: true
    }
  ];

  const thirdPartyServices = [
    {
      service: 'Google Analytics',
      purpose: '网站流量和用户行为分析',
      cookies: ['_ga', '_gid', '_gat'],
      duration: '2年',
      privacyPolicy: 'https://policies.google.com/privacy'
    },
    {
      service: 'Google Tag Manager',
      purpose: '标签管理和跟踪代码管理',
      cookies: ['_gtm', '_gtag'],
      duration: '会话期间',
      privacyPolicy: 'https://policies.google.com/privacy'
    },
    {
      service: '社交媒体插件',
      purpose: '社交媒体分享和集成功能',
      cookies: ['各种社交媒体Cookie'],
      duration: '根据各平台政策',
      privacyPolicy: '各平台隐私政策'
    },
    {
      service: 'CDN服务',
      purpose: '内容分发和网站加速',
      cookies: ['性能优化Cookie'],
      duration: '短期',
      privacyPolicy: '各CDN提供商政策'
    }
  ];

  const cookieManagement = [
    {
      method: '浏览器设置',
      description: '通过浏览器设置管理Cookie',
      steps: [
        '打开浏览器设置菜单',
        '找到隐私和安全选项',
        '选择Cookie和网站数据',
        '设置Cookie偏好',
        '保存设置并重启浏览器'
      ],
      note: '可能影响网站功能'
    },
    {
      method: '网站设置',
      description: '通过我们的Cookie设置面板管理',
      steps: [
        '点击网站底部的Cookie设置',
        '选择Cookie偏好类别',
        '开启或关闭特定Cookie类型',
        '保存设置',
        '设置立即生效'
      ],
      note: '推荐使用此方法'
    },
    {
      method: '第三方工具',
      description: '使用第三方Cookie管理工具',
      steps: [
        '安装Cookie管理扩展',
        '配置Cookie规则',
        '设置自动清理',
        '定期检查和更新',
        '监控Cookie使用情况'
      ],
      note: '需要技术知识'
    }
  ];

  const dataRetention = [
    {
      category: '会话Cookie',
      duration: '浏览器会话期间',
      description: '关闭浏览器后自动删除',
      examples: ['登录状态', '购物车内容', '临时设置']
    },
    {
      category: '持久Cookie',
      duration: '30天到2年',
      description: '在设定时间后自动过期',
      examples: ['用户偏好', '分析数据', '营销跟踪']
    },
    {
      category: '长期Cookie',
      duration: '2年以上',
      description: '用于长期用户识别',
      examples: ['用户ID', '设备指纹', '长期分析']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie政策
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            了解我们如何使用Cookie来改善您的浏览体验
          </p>
          <div className="mt-4 text-sm text-gray-500">
            最后更新：2025年1月15日
          </div>
        </div>

        {/* 政策概述 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">什么是Cookie？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Cookie是存储在您设备上的小型文本文件，用于记录网站访问信息。
                它们帮助我们了解您如何使用我们的网站，并改善您的浏览体验。
              </p>
              <p className="text-gray-600 leading-relaxed">
                我们使用Cookie来提供个性化内容、记住您的偏好设置、分析网站流量，
                并确保网站的安全和正常运行。您可以随时管理或删除这些Cookie。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cookie类型 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">我们使用的Cookie类型</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cookieTypes.map((cookie, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-blue-600">{cookie.type}</CardTitle>
                    <Badge className={cookie.canDisable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {cookie.canDisable ? "可禁用" : "必需"}
                    </Badge>
                  </div>
                  <CardDescription className="text-lg">{cookie.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">用途：</h4>
                    <p className="text-gray-600">{cookie.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">示例：</h4>
                    <ul className="space-y-2">
                      {cookie.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">持续时间：</h4>
                    <p className="text-gray-600">{cookie.duration}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 第三方服务 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">第三方Cookie服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {thirdPartyServices.map((service, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">{service.service}</CardTitle>
                  <CardDescription className="text-lg">{service.purpose}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">使用的Cookie：</h4>
                    <p className="text-gray-600">{service.cookies.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">持续时间：</h4>
                    <p className="text-gray-600">{service.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">隐私政策：</h4>
                    <a 
                      href={service.privacyPolicy} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      查看隐私政策
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cookie管理 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">如何管理Cookie</h2>
          <div className="space-y-8">
            {cookieManagement.map((method, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center">
                    <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2 mr-4">
                      方法 {index + 1}
                    </Badge>
                    <CardTitle className="text-xl text-purple-600">{method.method}</CardTitle>
                  </div>
                  <CardDescription className="text-lg">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">操作步骤：</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2 py-1 rounded-full mr-3 mt-0.5 min-w-[24px] text-center">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>注意：</strong> {method.note}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 数据保留 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Cookie数据保留</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dataRetention.map((retention, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">{retention.category}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-orange-700">
                    {retention.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{retention.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">示例：</h4>
                    <ul className="space-y-1">
                      {retention.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 浏览器特定说明 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-600">浏览器特定说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Chrome</h3>
                  <p className="text-sm text-gray-600">设置 → 隐私和安全 → Cookie</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Firefox</h3>
                  <p className="text-sm text-gray-600">选项 → 隐私与安全 → Cookie</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Safari</h3>
                  <p className="text-sm text-gray-600">偏好设置 → 隐私 → Cookie</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Edge</h3>
                  <p className="text-sm text-gray-600">设置 → Cookie和网站权限</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 联系我们 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Cookie问题咨询</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">技术支持</h3>
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">support@color-journal.com</span>
                </div>
                <p className="text-sm text-gray-600">处理Cookie技术问题</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-3">隐私咨询</h3>
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
            我们可能会不时更新本Cookie政策。重大变更将通过网站公告或邮件通知您。
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
