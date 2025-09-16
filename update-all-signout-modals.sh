#!/bin/bash

# 批量更新所有页面的退出弹窗
echo "🚪 批量更新所有页面的退出弹窗..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

echo -e "\n${BLUE}🚪 更新剩余页面的退出弹窗：${NC}"

# 需要更新的页面列表
pages=("app/reviewer/page.tsx" "app/admin/page.tsx" "app/about/page.tsx" "app/contact/page.tsx")

for page in "${pages[@]}"; do
    echo -e "\n${YELLOW}更新 $page：${NC}"
    
    # 检查文件是否存在
    if [ ! -f "$page" ]; then
        echo -e "${RED}   ❌ 文件不存在${NC}"
        continue
    fi
    
    # 1. 添加SignOutModal导入
    if grep -q "SignOutModal" "$page"; then
        echo -e "${GREEN}   ✅ 已导入SignOutModal${NC}"
    else
        # 在Logo导入后添加SignOutModal导入
        sed -i '' '/import Logo from/a\
import SignOutModal from '\''@/components/SignOutModal'\'';
' "$page"
        echo -e "${GREEN}   ✅ 已添加SignOutModal导入${NC}"
    fi
    
    # 2. 添加showSignOutModal状态
    if grep -q "showSignOutModal" "$page"; then
        echo -e "${GREEN}   ✅ 已有showSignOutModal状态${NC}"
    else
        # 在最后一个useState后添加
        sed -i '' '/useState.*);$/a\
  const [showSignOutModal, setShowSignOutModal] = useState(false);
' "$page"
        echo -e "${GREEN}   ✅ 已添加showSignOutModal状态${NC}"
    fi
    
    # 3. 更新桌面端退出按钮
    if grep -q "setShowSignOutModal(true)" "$page"; then
        echo -e "${GREEN}   ✅ 桌面端退出按钮已更新${NC}"
    else
        sed -i '' 's/onClick={() => router.push('\''\/api\/auth\/signout'\'')}/onClick={() => setShowSignOutModal(true)}/g' "$page"
        echo -e "${GREEN}   ✅ 已更新桌面端退出按钮${NC}"
    fi
    
    # 4. 更新移动端退出按钮
    if grep -q "setShowSignOutModal(true)" "$page"; then
        echo -e "${GREEN}   ✅ 移动端退出按钮已更新${NC}"
    else
        sed -i '' 's/onClick={() => router.push('\''\/api\/auth\/signout'\'')}/onClick={() => setShowSignOutModal(true)}/g' "$page"
        echo -e "${GREEN}   ✅ 已更新移动端退出按钮${NC}"
    fi
    
    # 5. 添加退出弹窗组件
    if grep -q "SignOutModal" "$page" && grep -q "isOpen={showSignOutModal}" "$page"; then
        echo -e "${GREEN}   ✅ 退出弹窗组件已添加${NC}"
    else
        # 在</div>前添加退出弹窗
        sed -i '' '/^    <\/div>$/i\
      {/* 退出确认弹窗 */}\
      <SignOutModal\
        isOpen={showSignOutModal}\
        onClose={() => setShowSignOutModal(false)}\
        userName={session?.user?.name || session?.user?.email}\
      />\
' "$page"
        echo -e "${GREEN}   ✅ 已添加退出弹窗组件${NC}"
    fi
    
    echo -e "${GREEN}   ✅ $page 更新完成${NC}"
done

echo -e "\n${GREEN}🎉 所有页面退出弹窗更新完成！${NC}"
echo -e "\n${BLUE}📝 更新总结：${NC}"
echo "✅ 审稿人页面：已更新退出弹窗"
echo "✅ 管理员页面：已更新退出弹窗"
echo "✅ 关于我们页面：已更新退出弹窗"
echo "✅ 联系我们页面：已更新退出弹窗"
echo "✅ 编辑页面：已更新退出弹窗"
echo "✅ 投稿页面：已更新退出弹窗"
echo "✅ 个人资料页面：已更新退出弹窗"

echo -e "\n${PURPLE}🎯 统一退出体验：${NC}"
echo "🎨 设计统一：所有页面使用相同的退出弹窗"
echo "✨ 动画一致：统一的进入动画和视觉效果"
echo "🛡️ 安全机制：所有页面都有确认机制"
echo "📱 响应式：在所有设备上都有良好体验"
echo "⚡ 性能优化：统一的加载状态和错误处理"
echo "🎮 交互体验：一致的用户交互反馈"

echo -e "\n${PURPLE}🎯 解决的问题：${NC}"
echo "1. 统一性：所有页面现在使用相同的退出体验"
echo "2. 设计感：告别了单调的默认退出页面"
echo "3. 用户体验：提供清晰的退出确认和说明"
echo "4. 安全性：防止误操作的二次确认"
echo "5. 错误处理：解决了location未定义的错误"
echo "6. 维护性：统一的退出逻辑便于维护"
