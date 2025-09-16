#!/bin/bash

# 优化网站整体配色方案 - 从繁杂花哨改为雅致统一
# 采用 slate + purple 的配色方案，追求赏心悦目的视觉效果

echo "🎨 开始优化网站整体配色方案..."

# 定义新的配色方案
declare -A color_mapping=(
    # 从花哨的多色改为雅致的双色
    ["from-pink-500"]="from-slate-600"
    ["from-pink-600"]="from-slate-700"
    ["from-pink-700"]="from-slate-800"
    ["to-pink-600"]="to-slate-700"
    ["to-pink-700"]="to-slate-800"
    
    ["from-blue-500"]="from-purple-600"
    ["from-blue-600"]="from-purple-700"
    ["from-blue-700"]="from-purple-800"
    ["to-blue-600"]="to-purple-700"
    ["to-blue-700"]="to-purple-800"
    
    ["from-indigo-500"]="from-slate-600"
    ["from-indigo-600"]="from-slate-700"
    ["from-indigo-700"]="from-slate-800"
    ["to-indigo-600"]="to-slate-700"
    ["to-indigo-700"]="to-slate-800"
    
    ["from-green-500"]="from-slate-600"
    ["from-green-600"]="from-slate-700"
    ["from-green-700"]="from-slate-800"
    ["to-green-600"]="to-slate-700"
    ["to-green-700"]="to-slate-800"
    
    ["from-yellow-500"]="from-slate-600"
    ["from-yellow-600"]="from-slate-700"
    ["from-yellow-700"]="from-slate-800"
    ["to-yellow-600"]="to-slate-700"
    ["to-yellow-700"]="to-slate-800"
    
    # 边框颜色
    ["border-pink-200"]="border-slate-200"
    ["border-pink-300"]="border-purple-300"
    ["border-blue-200"]="border-slate-200"
    ["border-blue-300"]="border-slate-300"
    ["border-indigo-200"]="border-slate-200"
    ["border-indigo-300"]="border-slate-300"
    ["border-green-200"]="border-slate-200"
    ["border-green-300"]="border-slate-300"
    
    # 文字颜色
    ["text-pink-600"]="text-slate-600"
    ["text-pink-700"]="text-slate-700"
    ["text-blue-600"]="text-purple-600"
    ["text-blue-700"]="text-purple-700"
    ["text-indigo-600"]="text-slate-600"
    ["text-indigo-700"]="text-slate-700"
    ["text-green-600"]="text-slate-600"
    ["text-green-700"]="text-slate-700"
    
    # 背景颜色
    ["bg-pink-50"]="bg-slate-50"
    ["bg-pink-100"]="bg-slate-100"
    ["bg-blue-50"]="bg-purple-50"
    ["bg-blue-100"]="bg-purple-100"
    ["bg-indigo-50"]="bg-slate-50"
    ["bg-indigo-100"]="bg-slate-100"
    ["bg-green-50"]="bg-slate-50"
    ["bg-green-100"]="bg-slate-100"
    
    # hover 颜色
    ["hover:text-pink-400"]="hover:text-purple-400"
    ["hover:text-pink-500"]="hover:text-purple-500"
    ["hover:text-blue-400"]="hover:text-purple-400"
    ["hover:text-blue-500"]="hover:text-purple-500"
    ["hover:text-indigo-400"]="hover:text-slate-400"
    ["hover:text-indigo-500"]="hover:text-slate-500"
    ["hover:text-green-400"]="hover:text-slate-400"
    ["hover:text-green-500"]="hover:text-slate-500"
    
    # focus 颜色
    ["focus:ring-pink-500"]="focus:ring-purple-500"
    ["focus:border-pink-500"]="focus:border-purple-500"
    ["focus:ring-blue-500"]="focus:ring-purple-500"
    ["focus:border-blue-500"]="focus:border-purple-500"
    ["focus:ring-indigo-500"]="focus:ring-slate-500"
    ["focus:border-indigo-500"]="focus:border-slate-500"
    ["focus:ring-green-500"]="focus:ring-slate-500"
    ["focus:border-green-500"]="focus:border-slate-500"
)

# 需要优化的页面文件
pages=(
    "app/page.tsx"
    "app/submission/page.tsx"
    "app/editor/page.tsx"
    "app/reviewer/page.tsx"
    "app/admin/page.tsx"
    "app/profile/page.tsx"
    "app/articles/page.tsx"
    "app/about/page.tsx"
)

# 优化每个页面
for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "🎨 优化 $page 的配色方案..."
        
        # 创建备份
        cp "$page" "$page.backup"
        
        # 应用配色映射
        for old_color in "${!color_mapping[@]}"; do
            new_color="${color_mapping[$old_color]}"
            sed -i.tmp "s/$old_color/$new_color/g" "$page"
        done
        
        # 清理临时文件
        rm -f "$page.tmp"
        
        echo "✅ $page 配色优化完成"
    else
        echo "⚠️  文件 $page 不存在，跳过"
    fi
done

echo ""
echo "🎨 配色方案优化完成！"
echo ""
echo "📋 优化总结："
echo "   • 主色调：slate (灰色系) + purple (紫色系)"
echo "   • 移除：pink, blue, indigo, green, yellow 等花哨颜色"
echo "   • 追求：雅致统一，赏心悦目的视觉效果"
echo "   • 符合：'色彩'期刊的专业性和学术性"
echo ""
echo "🔄 如需恢复，可使用备份文件："
for page in "${pages[@]}"; do
    if [ -f "$page.backup" ]; then
        echo "   mv $page.backup $page"
    fi
done
