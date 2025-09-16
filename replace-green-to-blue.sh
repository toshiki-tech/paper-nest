#!/bin/bash

echo "🔄 开始将绿色图标替换为蓝色图标..."

# 替换 Footer 组件中的绿色图标
echo "📝 更新 Footer 组件..."
sed -i '' 's/from-green-600 to-green-700/from-blue-600 to-blue-700/g' components/Footer.tsx

# 替换编辑器页面中的绿色按钮
echo "📝 更新编辑器页面..."
sed -i '' 's/from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700/from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700/g' app/editor/page.tsx

# 替换审稿人页面中的绿色按钮
echo "📝 更新审稿人页面..."
sed -i '' 's/from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700/from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700/g' app/reviewer/page.tsx

# 替换投稿页面中的绿色按钮
echo "📝 更新投稿页面..."
sed -i '' 's/from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700/from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700/g' app/submission/page.tsx

echo "✅ 绿色图标替换为蓝色完成！"
echo ""
echo "🎨 已更新的文件："
echo "  - components/Footer.tsx"
echo "  - app/editor/page.tsx"
echo "  - app/reviewer/page.tsx"
echo "  - app/submission/page.tsx"
echo ""
echo "🔍 替换内容："
echo "  - from-green-600 to-green-700 → from-blue-600 to-blue-700"
echo "  - from-green-500 to-blue-600 → from-blue-500 to-blue-600"
echo "  - hover:from-green-600 hover:to-blue-700 → hover:from-blue-600 hover:to-blue-700"
