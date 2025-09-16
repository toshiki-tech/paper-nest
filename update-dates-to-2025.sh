#!/bin/bash

# 更新所有2024年的时间数据为2025年
echo "🔄 开始更新所有2024年的时间数据为2025年..."

# 更新Footer中的版权信息
echo "📝 更新Footer版权信息..."
sed -i '' 's/© 2024 《色彩》期刊编辑部/© 2025 《色彩》期刊编辑部/g' components/Footer.tsx

# 更新submission页面的时间数据
echo "📝 更新submission页面时间数据..."
sed -i '' 's/2024-01-15/2025-01-15/g' app/submission/page.tsx
sed -i '' 's/2024-01-10/2025-01-10/g' app/submission/page.tsx
sed -i '' 's/2024-01-05/2025-01-05/g' app/submission/page.tsx
sed -i '' 's/2024-01-20/2025-01-20/g' app/submission/page.tsx
sed -i '' 's/2024-01-25/2025-01-25/g' app/submission/page.tsx
sed -i '' 's/2024-01-30/2025-01-30/g' app/submission/page.tsx
sed -i '' 's/2024-01-18/2025-01-18/g' app/submission/page.tsx
sed -i '' 's/2024-01-19/2025-01-19/g' app/submission/page.tsx
sed -i '' 's/2024-01-23/2025-01-23/g' app/submission/page.tsx
sed -i '' 's/2024-01-24/2025-01-24/g' app/submission/page.tsx
sed -i '' 's/2024-01-06/2025-01-06/g' app/submission/page.tsx
sed -i '' 's/2024-01-07/2025-01-07/g' app/submission/page.tsx
sed -i '' 's/2024-01-22/2025-01-22/g' app/submission/page.tsx
sed -i '' 's/2024-01-01/2025-01-01/g' app/submission/page.tsx
sed -i '' 's/2024-01-16/2025-01-16/g' app/submission/page.tsx
sed -i '' 's/2024-01-21/2025-01-21/g' app/submission/page.tsx
sed -i '' 's/2024-01-02/2025-01-02/g' app/submission/page.tsx

# 更新reviewer页面的时间数据
echo "📝 更新reviewer页面时间数据..."
sed -i '' 's/2024-02-15/2025-02-15/g' app/reviewer/page.tsx
sed -i '' 's/2024-02-10/2025-02-10/g' app/reviewer/page.tsx
sed -i '' 's/2024-02-05/2025-02-05/g' app/reviewer/page.tsx
sed -i '' 's/2024-02-01/2025-02-01/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-20/2025-01-20/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-18/2025-01-18/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-16/2025-01-16/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-11/2025-01-11/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-06/2025-01-06/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-02/2025-01-02/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-15/2025-01-15/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-10/2025-01-10/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-05/2025-01-05/g' app/reviewer/page.tsx
sed -i '' 's/2024-01-01/2025-01-01/g' app/reviewer/page.tsx
sed -i '' 's/2023-12-20/2024-12-20/g' app/reviewer/page.tsx

# 更新profile页面的时间数据
echo "📝 更新profile页面时间数据..."
sed -i '' 's/2024-01-01/2025-01-01/g' app/profile/page.tsx

# 更新admin页面的时间数据
echo "📝 更新admin页面时间数据..."
sed -i '' 's/2024-01-22/2025-01-22/g' app/admin/page.tsx
sed -i '' 's/2024-01-21/2025-01-21/g' app/admin/page.tsx
sed -i '' 's/2024-01-20/2025-01-20/g' app/admin/page.tsx
sed -i '' 's/2024-01-15/2025-01-15/g' app/admin/page.tsx
sed -i '' 's/2024-01-05/2025-01-05/g' app/admin/page.tsx
sed -i '' 's/2024-01-04/2025-01-04/g' app/admin/page.tsx
sed -i '' 's/2024-01-03/2025-01-03/g' app/admin/page.tsx
sed -i '' 's/2024-01-02/2025-01-02/g' app/admin/page.tsx
sed -i '' 's/2024-01-01/2025-01-01/g' app/admin/page.tsx

# 更新articles页面的时间数据
echo "📝 更新articles页面时间数据..."
sed -i '' 's/2024-01-15/2025-01-15/g' app/articles/page.tsx
sed -i '' 's/2024-01-10/2025-01-10/g' app/articles/page.tsx
sed -i '' 's/2024-01-05/2025-01-05/g' app/articles/page.tsx

# 更新editor页面的时间数据
echo "📝 更新editor页面时间数据..."
sed -i '' 's/2024-01-15/2025-01-15/g' app/editor/page.tsx
sed -i '' 's/2024-01-10/2025-01-10/g' app/editor/page.tsx
sed -i '' 's/2024-01-05/2025-01-05/g' app/editor/page.tsx
sed -i '' 's/2024-01-20/2025-01-20/g' app/editor/page.tsx
sed -i '' 's/2024-01-25/2025-01-25/g' app/editor/page.tsx
sed -i '' 's/2024-01-18/2025-01-18/g' app/editor/page.tsx
sed -i '' 's/2024-01-23/2025-01-23/g' app/editor/page.tsx
sed -i '' 's/2024-01-01/2025-01-01/g' app/editor/page.tsx
sed -i '' 's/2024-01-16/2025-01-16/g' app/editor/page.tsx
sed -i '' 's/2024-01-21/2025-01-21/g' app/editor/page.tsx
sed -i '' 's/2024-01-02/2025-01-02/g' app/editor/page.tsx
sed -i '' 's/2024-01-22/2025-01-22/g' app/editor/page.tsx
sed -i '' 's/2024-01-19/2025-01-19/g' app/editor/page.tsx
sed -i '' 's/2024-01-24/2025-01-24/g' app/editor/page.tsx
sed -i '' 's/2024-01-06/2025-01-06/g' app/editor/page.tsx
sed -i '' 's/2024-01-07/2025-01-07/g' app/editor/page.tsx
sed -i '' 's/2024-01-17/2025-01-17/g' app/editor/page.tsx
sed -i '' 's/2024-01-12/2025-01-12/g' app/editor/page.tsx
sed -i '' 's/2024-01-08/2025-01-08/g' app/editor/page.tsx
sed -i '' 's/2024-01-03/2025-01-03/g' app/editor/page.tsx
sed -i '' 's/2024-01-04/2025-01-04/g' app/editor/page.tsx
sed -i '' 's/2024-01-09/2025-01-09/g' app/editor/page.tsx
sed -i '' 's/2024-01-11/2025-01-11/g' app/editor/page.tsx
sed -i '' 's/2024-01-13/2025-01-13/g' app/editor/page.tsx
sed -i '' 's/2024-01-14/2025-01-14/g' app/editor/page.tsx

echo "✅ 所有2024年的时间数据已更新为2025年！"
echo "📊 更新统计："
echo "   - Footer版权信息: 2024 → 2025"
echo "   - 投稿时间数据: 2024-01-XX → 2025-01-XX"
echo "   - 审稿时间数据: 2024-01-XX → 2025-01-XX"
echo "   - 用户创建时间: 2024-01-XX → 2025-01-XX"
echo "   - 文章发布时间: 2024-01-XX → 2025-01-XX"
echo "   - 编辑决策时间: 2024-01-XX → 2025-01-XX"
