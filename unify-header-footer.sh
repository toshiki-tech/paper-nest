#!/bin/bash

# 统一页面头尾部设计脚本
# 参考首页的设计，统一期刊文章、关于我们、联系我们页面

echo "🎨 开始统一页面头尾部设计..."

# 需要统一的文件列表
files=(
    "app/articles/page.tsx"
    "app/about/page.tsx"
    "app/contact/page.tsx"
)

# 统一的头部设计
create_unified_header() {
    cat << 'EOF'
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端布局 */}
          <div className="hidden md:flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                PAGE_TITLE
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-600">欢迎，{session.user?.name || '用户'}</span>
                  {session.user?.role === 'author' && (
                    <Link href="/submission">
                      <Button size="sm" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-md">投稿管理</Button>
                    </Link>
                  )}
                  {session.user?.role === 'editor' && (
                    <Link href="/editor">
                      <Button size="sm" className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 shadow-md">编辑工作台</Button>
                    </Link>
                  )}
                  {session.user?.role === 'reviewer' && (
                    <Link href="/reviewer">
                      <Button size="sm" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 shadow-md">审稿工作台</Button>
                    </Link>
                  )}
                  {session.user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md">用户管理</Button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-500 hover:bg-blue-25">个人资料</Button>
                  </Link>
                  <Link href="/api/auth/signout">
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-500 hover:bg-gray-25">退出</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-500 hover:bg-blue-25">登录</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-md">注册</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* 移动端布局 */}
          <div className="md:hidden py-4">
            {/* 第一行：Logo + 用户操作按钮 */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Logo size="sm" />
              </div>
              <div className="flex items-center space-x-2">
                {session ? (
                  <>
                    {session.user?.role === 'author' && (
                      <Link href="/submission">
                        <Button size="sm" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 px-2 shadow-md">投稿</Button>
                      </Link>
                    )}
                    {session.user?.role === 'editor' && (
                      <Link href="/editor">
                        <Button size="sm" className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 px-2 shadow-md">编辑</Button>
                      </Link>
                    )}
                    {session.user?.role === 'reviewer' && (
                      <Link href="/reviewer">
                        <Button size="sm" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 px-2 shadow-md">审稿</Button>
                      </Link>
                    )}
                    {session.user?.role === 'admin' && (
                      <Link href="/admin">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-2 shadow-md">管理</Button>
                      </Link>
                    )}
                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-500 hover:bg-blue-25 px-2">资料</Button>
                    </Link>
                    <Link href="/api/auth/signout">
                      <Button variant="outline" size="sm" className="border-gray-200 text-gray-500 hover:bg-gray-25 px-2">退出</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-500 hover:bg-blue-25 px-2">登录</Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button size="sm" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 px-2 shadow-md">注册</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* 第二行：页面标题 + 欢迎信息 */}
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-900">PAGE_TITLE</h1>
              <span className="text-sm text-gray-600">
                {session ? `欢迎，${session.user?.name || '用户'}` : '欢迎，访客'}
              </span>
            </div>
          </div>
        </div>
      </header>
EOF
}

# 统一的页脚设计
create_unified_footer() {
    cat << 'EOF'
      {/* Footer - 统一设计 */}
      <footer className="bg-gradient-to-br from-blue-900 via-green-900 to-blue-900 text-white py-16 mt-8 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="sm" showText={false} />
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  《色彩》期刊
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                专业的色彩研究期刊，致力于推动色彩学科的发展与创新。
              </p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌐</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">快速链接</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/articles" className="hover:text-blue-400 transition-colors duration-200">期刊文章</Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-200">关于我们</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">联系我们</Link></li>
                <li><Link href="/help" className="hover:text-blue-400 transition-colors duration-200">帮助中心</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">投稿指南</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/submission-guide" className="hover:text-green-400 transition-colors duration-200">投稿须知</Link></li>
                <li><Link href="/review-process" className="hover:text-green-400 transition-colors duration-200">审稿流程</Link></li>
                <li><Link href="/publishing-policy" className="hover:text-green-400 transition-colors duration-200">出版政策</Link></li>
                <li><Link href="/ethics" className="hover:text-green-400 transition-colors duration-200">学术伦理</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">联系我们</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <span className="text-gray-300 text-sm">contact@color-journal.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-gray-300 text-sm">+86-xxx-xxxx-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span className="text-gray-300 text-sm">中国北京市</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🕒</span>
                  </div>
                  <span className="text-gray-300 text-sm">周一至周五 9:00-18:00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 《色彩》期刊编辑部. 保留所有权利.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">隐私政策</span>
                <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">使用条款</span>
                <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">Cookie政策</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
EOF
}

# 页面标题映射
declare -A page_titles=(
    ["app/articles/page.tsx"]="期刊文章"
    ["app/about/page.tsx"]="关于我们"
    ["app/contact/page.tsx"]="联系我们"
)

# 对每个文件进行统一处理
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "🎨 统一文件: $file"
        
        # 创建备份
        cp "$file" "${file}.backup3"
        
        # 获取页面标题
        page_title="${page_titles[$file]}"
        
        # 生成统一的头部和页脚
        header_content=$(create_unified_header | sed "s/PAGE_TITLE/$page_title/g")
        footer_content=$(create_unified_footer)
        
        # 替换头部（从header标签开始到header标签结束）
        sed -i '' '/<header/,/<\/header>/c\
'"$header_content"'' "$file"
        
        # 替换页脚（从footer标签开始到文件结束）
        sed -i '' '/<footer/,/<\/footer>/c\
'"$footer_content"'' "$file"
        
        echo "✅ 完成: $file"
    else
        echo "⚠️  文件不存在: $file"
    fi
done

echo ""
echo "🎉 页面头尾部统一完成！"
echo ""
echo "📋 统一内容："
echo "• 头部设计：与首页完全一致的导航和按钮样式"
echo "• 页脚设计：统一的深蓝色渐变背景和内容布局"
echo "• 配色方案：使用新的日本风格配色"
echo "• 响应式设计：桌面端和移动端都有优化"
echo ""
echo "🔍 请检查以下页面效果："
echo "1. 期刊文章: http://localhost:3000/articles"
echo "2. 关于我们: http://localhost:3000/about"
echo "3. 联系我们: http://localhost:3000/contact"
echo ""
echo "💡 如需恢复原设计，请运行:"
echo "   for file in *.backup3; do mv \"\$file\" \"\${file%.backup3}\"; done"
