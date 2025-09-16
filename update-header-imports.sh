#!/bin/bash

echo "🔄 开始更新其他页面使用公共Header组件..."

# 更新期刊文章页面
echo "📝 更新期刊文章页面..."
sed -i '' 's/import Logo from '\''@\/components\/Logo'\'';/import Header from '\''@\/components\/Header'\'';\nimport Logo from '\''@\/components\/Logo'\'';/g' app/articles/page.tsx

# 更新关于我们页面
echo "📝 更新关于我们页面..."
sed -i '' 's/import Logo from '\''@\/components\/Logo'\'';/import Header from '\''@\/components\/Header'\'';\nimport Logo from '\''@\/components\/Logo'\'';/g' app/about/page.tsx

# 更新联系我们页面
echo "📝 更新联系我们页面..."
sed -i '' 's/import Logo from '\''@\/components\/Logo'\'';/import Header from '\''@\/components\/Header'\'';\nimport Logo from '\''@\/components\/Logo'\'';/g' app/contact/page.tsx

echo "✅ Header组件导入更新完成！"
echo ""
echo "🎨 已更新的文件："
echo "  - app/articles/page.tsx"
echo "  - app/about/page.tsx"
echo "  - app/contact/page.tsx"
echo ""
echo "📋 接下来需要手动替换各页面的Header部分为 <Header /> 组件"
