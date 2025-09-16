#!/bin/bash

# 精确日本风格配色优化脚本
# 参考 https://www.c-c-j.com/feature/psychology/ 的配色方案

echo "🎨 开始应用精确日本风格配色优化..."

# 定义精确的日本风格配色映射
declare -A color_mapping=(
    # 主色调 - 更柔和的蓝色系
    ["from-blue-500"]="from-blue-400"
    ["to-blue-600"]="to-blue-500"
    ["from-blue-600"]="from-blue-500"
    ["to-blue-700"]="to-blue-600"
    ["bg-blue-500"]="bg-blue-400"
    ["bg-blue-600"]="bg-blue-500"
    ["text-blue-600"]="text-blue-500"
    ["text-blue-700"]="text-blue-600"
    ["border-blue-200"]="border-blue-100"
    ["border-blue-300"]="border-blue-200"
    ["hover:text-blue-400"]="hover:text-blue-300"
    ["hover:text-blue-600"]="hover:text-blue-500"
    ["focus:ring-blue-500"]="focus:ring-blue-400"
    ["focus:border-blue-500"]="focus:border-blue-400"
    
    # 辅助色 - 更清新的绿色系
    ["from-green-500"]="from-green-400"
    ["to-green-600"]="to-green-500"
    ["from-green-600"]="from-green-500"
    ["to-green-700"]="to-green-600"
    ["bg-green-500"]="bg-green-400"
    ["bg-green-600"]="bg-green-500"
    ["text-green-600"]="text-green-500"
    ["text-green-700"]="text-green-600"
    ["border-green-200"]="border-green-100"
    ["border-green-300"]="border-green-200"
    ["hover:text-green-400"]="hover:text-green-300"
    ["focus:ring-green-500"]="focus:ring-green-400"
    ["focus:border-green-500"]="focus:border-green-400"
    
    # 强调色 - 温暖的橙色系（主要CTA颜色）
    ["from-orange-500"]="from-orange-400"
    ["to-orange-600"]="to-orange-500"
    ["bg-orange-500"]="bg-orange-400"
    ["text-orange-600"]="text-orange-500"
    ["border-orange-200"]="border-orange-100"
    ["border-orange-300"]="border-orange-200"
    ["hover:bg-orange-50"]="hover:bg-orange-25"
    
    # 背景色 - 更柔和的渐变
    ["from-blue-50"]="from-blue-25"
    ["via-green-50"]="via-green-25"
    ["to-blue-50"]="to-blue-25"
    
    # 页脚背景 - 更深的蓝色系
    ["from-blue-900"]="from-blue-800"
    ["via-green-900"]="via-green-800"
    ["to-blue-900"]="to-blue-800"
    
    # 特殊颜色 - 粉色系（用于特殊标识）
    ["from-pink-500"]="from-pink-400"
    ["to-pink-600"]="to-pink-500"
    ["bg-pink-500"]="bg-pink-400"
    ["text-pink-600"]="text-pink-500"
    ["border-pink-300"]="border-pink-200"
    ["hover:bg-pink-50"]="hover:bg-pink-25"
)

# 需要优化的文件列表
files=(
    "app/page.tsx"
    "app/submission/page.tsx"
    "app/editor/page.tsx"
    "app/reviewer/page.tsx"
    "app/admin/page.tsx"
    "app/profile/page.tsx"
    "app/articles/page.tsx"
    "app/about/page.tsx"
    "app/contact/page.tsx"
)

# 对每个文件进行配色优化
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "🎨 优化文件: $file"
        
        # 创建备份
        cp "$file" "${file}.backup2"
        
        # 应用配色映射
        for old_color in "${!color_mapping[@]}"; do
            new_color="${color_mapping[$old_color]}"
            sed -i '' "s/$old_color/$new_color/g" "$file"
        done
        
        echo "✅ 完成: $file"
    else
        echo "⚠️  文件不存在: $file"
    fi
done

echo ""
echo "🎉 精确日本风格配色优化完成！"
echo ""
echo "📋 优化说明："
echo "• 主色调：更柔和的蓝色系（温和、专业）"
echo "• 辅助色：更清新的绿色系（自然、和谐）"
echo "• 强调色：温暖的橙色系（主要CTA颜色）"
echo "• 背景色：更柔和的蓝绿渐变"
echo "• 页脚：更深的蓝色系"
echo "• 特殊色：粉色系（用于特殊标识）"
echo ""
echo "🔍 请检查以下页面效果："
echo "1. 首页: http://localhost:3000/"
echo "2. 投稿页面: http://localhost:3000/submission"
echo "3. 编辑工作台: http://localhost:3000/editor"
echo "4. 审稿工作台: http://localhost:3000/reviewer"
echo "5. 用户管理: http://localhost:3000/admin"
echo "6. 期刊文章: http://localhost:3000/articles"
echo "7. 关于我们: http://localhost:3000/about"
echo "8. 联系我们: http://localhost:3000/contact"
echo ""
echo "💡 如需恢复原配色，请运行:"
echo "   for file in *.backup2; do mv \"\$file\" \"\${file%.backup2}\"; done"
