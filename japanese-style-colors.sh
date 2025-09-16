#!/bin/bash

# 日本风格配色优化脚本
# 参考 https://www.c-c-j.com/course/ 的配色方案

echo "🎨 开始应用日本风格配色优化..."

# 定义日本风格配色映射
declare -A color_mapping=(
    # 主色调 - 蓝色系（专业、信任）
    ["from-purple-500"]="from-blue-500"
    ["to-purple-600"]="to-blue-600"
    ["from-purple-600"]="from-blue-600"
    ["to-purple-700"]="to-blue-700"
    ["bg-purple-500"]="bg-blue-500"
    ["bg-purple-600"]="bg-blue-600"
    ["text-purple-600"]="text-blue-600"
    ["text-purple-700"]="text-blue-700"
    ["border-purple-200"]="border-blue-200"
    ["border-purple-300"]="border-blue-300"
    ["border-purple-500"]="border-blue-500"
    ["hover:text-purple-400"]="hover:text-blue-400"
    ["hover:text-purple-600"]="hover:text-blue-600"
    ["focus:ring-purple-500"]="focus:ring-blue-500"
    ["focus:border-purple-500"]="focus:border-blue-500"
    
    # 辅助色 - 绿色系（自然、和谐）
    ["from-slate-600"]="from-green-600"
    ["to-slate-700"]="to-green-700"
    ["bg-slate-600"]="bg-green-600"
    ["bg-slate-700"]="bg-green-700"
    ["text-slate-600"]="text-green-600"
    ["text-slate-700"]="text-green-700"
    ["border-slate-200"]="border-green-200"
    ["border-slate-300"]="border-green-300"
    ["hover:text-slate-400"]="hover:text-green-400"
    ["focus:ring-slate-500"]="focus:ring-green-500"
    ["focus:border-slate-500"]="focus:border-slate-500"
    
    # 强调色 - 橙色系（温暖、活力）
    ["from-orange-500"]="from-orange-500"
    ["to-red-600"]="to-orange-600"
    ["bg-orange-500"]="bg-orange-500"
    ["text-orange-600"]="text-orange-600"
    ["border-orange-200"]="border-orange-200"
    ["border-orange-300"]="border-orange-300"
    ["hover:bg-orange-50"]="hover:bg-orange-50"
    
    # 背景色 - 更柔和的渐变
    ["from-slate-50"]="from-blue-50"
    ["via-gray-50"]="via-green-50"
    ["to-purple-50"]="to-blue-50"
    
    # 页脚背景 - 深蓝色系
    ["from-slate-900"]="from-blue-900"
    ["via-purple-900"]="via-green-900"
    ["to-slate-900"]="to-blue-900"
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
        cp "$file" "${file}.backup"
        
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
echo "🎉 日本风格配色优化完成！"
echo ""
echo "📋 优化说明："
echo "• 主色调：蓝色系（专业、信任）"
echo "• 辅助色：绿色系（自然、和谐）"
echo "• 强调色：橙色系（温暖、活力）"
echo "• 背景色：柔和的蓝绿渐变"
echo "• 页脚：深蓝色系"
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
echo "   for file in *.backup; do mv \"\$file\" \"\${file%.backup}\"; done"
