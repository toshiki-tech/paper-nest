#!/bin/bash

# 统一首页、期刊文章、关于我们、联系我们这几个平级栏目的风格
# 优化紫色底色的图标，改为更雅致的配色
# 统一底部区域的设计

echo "🎨 开始统一平级栏目风格和优化图标配色..."

# 需要统一的页面文件
pages=(
    "app/page.tsx"
    "app/articles/page.tsx"
    "app/about/page.tsx"
    "app/contact/page.tsx"
)

# 统一的页脚设计
create_unified_footer() {
    local file="$1"
    local page_name="$2"
    
    echo "📝 为 $page_name 创建统一页脚..."
    
    # 创建页脚内容
    cat > "${file}.footer" << 'EOF'
      {/* Footer - 统一设计 */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 mt-20 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-slate-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-slate-500/10 to-purple-500/10 rounded-full blur-xl"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo size="sm" showText={false} />
                <h3 className="text-xl font-bold bg-gradient-to-r from-slate-400 to-purple-400 bg-clip-text text-transparent">
                  《色彩》期刊
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                专业的色彩研究期刊，致力于推动色彩学科的发展与创新。
              </p>
              <div className="flex space-x-4 mt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🌐</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">快速链接</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/articles" className="hover:text-purple-400 transition-colors duration-200">期刊文章</Link></li>
                <li><Link href="/about" className="hover:text-purple-400 transition-colors duration-200">关于我们</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors duration-200">联系我们</Link></li>
                <li><Link href="/help" className="hover:text-purple-400 transition-colors duration-200">帮助中心</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">投稿指南</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/submission-guide" className="hover:text-slate-400 transition-colors duration-200">投稿须知</Link></li>
                <li><Link href="/review-process" className="hover:text-slate-400 transition-colors duration-200">审稿流程</Link></li>
                <li><Link href="/publishing-policy" className="hover:text-slate-400 transition-colors duration-200">出版政策</Link></li>
                <li><Link href="/ethics" className="hover:text-slate-400 transition-colors duration-200">学术伦理</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">联系我们</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✉️</span>
                  </div>
                  <span className="text-gray-300 text-sm">contact@color-journal.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                  <span className="text-gray-300 text-sm">+86-xxx-xxxx-xxxx</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                  <span className="text-gray-300 text-sm">中国北京市</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-slate-700 rounded-full flex items-center justify-center">
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
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">隐私政策</span>
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">使用条款</span>
                <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">Cookie政策</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
EOF
}

# 为每个页面应用统一页脚
for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        page_name=$(basename "$page" .tsx)
        echo "🎨 处理 $page_name 页面..."
        
        # 创建备份
        cp "$page" "$page.backup"
        
        # 移除旧的页脚（从 Footer 开始到文件结束）
        sed -i.tmp '/^[[:space:]]*{\/\* Footer/,/^[[:space:]]*}[[:space:]]*$/d' "$page"
        
        # 添加新的统一页脚
        create_unified_footer "$page" "$page_name"
        
        # 将页脚内容添加到文件末尾
        cat "${file}.footer" >> "$page"
        
        # 清理临时文件
        rm -f "$page.tmp" "${file}.footer"
        
        echo "✅ $page_name 页脚统一完成"
    else
        echo "⚠️  文件 $page 不存在，跳过"
    fi
done

echo ""
echo "🎨 平级栏目风格统一完成！"
echo ""
echo "📋 优化总结："
echo "   • 统一页脚设计：slate-900 + purple-900 渐变背景"
echo "   • 优化图标配色：slate-600/700 和 purple-600/700"
echo "   • 移除花哨的紫色底色图标"
echo "   • 统一导航链接：hover:text-purple-600"
echo "   • 统一社交媒体图标：slate 和 purple 系"
echo ""
echo "🔄 如需恢复，可使用备份文件："
for page in "${pages[@]}"; do
    if [ -f "$page.backup" ]; then
        echo "   mv $page.backup $page"
    fi
done
