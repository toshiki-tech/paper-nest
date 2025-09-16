#!/bin/bash

echo "🔐 《色彩》期刊登录功能修复验证"
echo "================================"
echo ""

echo "📋 测试账户信息："
echo "  邮箱: admin@test.com"
echo "  密码: admin123"
echo "  角色: 管理员"
echo ""

echo "🔍 检查修复状态："

# 检查服务器状态
if curl -s http://localhost:3000 > /dev/null; then
    echo "  ✅ 服务器运行正常"
else
    echo "  ❌ 服务器未运行"
    exit 1
fi

# 检查登录页面
if curl -s http://localhost:3000/auth/signin | grep -q "登录"; then
    echo "  ✅ 登录页面正常"
else
    echo "  ❌ 登录页面异常"
fi

# 检查NextAuth配置
if curl -s http://localhost:3000/api/auth/providers | grep -q "credentials"; then
    echo "  ✅ NextAuth配置正常"
else
    echo "  ❌ NextAuth配置异常"
fi

# 检查数据库
if sqlite3 dev.db "SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
    user_count=$(sqlite3 dev.db "SELECT COUNT(*) FROM users;")
    echo "  ✅ 数据库连接正常 (用户数: $user_count)"
else
    echo "  ❌ 数据库连接异常"
fi

echo ""
echo "🎯 登录测试步骤："
echo "1. 打开浏览器访问: http://localhost:3000/auth/signin"
echo "2. 在邮箱字段输入: admin@test.com"
echo "3. 在密码字段输入: admin123"
echo "4. 点击'登录'按钮"
echo "5. 如果成功，应该会跳转到首页或仪表板"
echo ""

echo "🔧 如果仍然出现401错误，请检查："
echo "- 浏览器控制台是否有JavaScript错误"
echo "- 网络请求是否正常发送"
echo "- 服务器日志是否有新的错误信息"
echo ""

echo "📊 当前数据库用户："
sqlite3 dev.db "SELECT '  👤 ' || name || ' (' || email || ') - ' || role FROM users;"

echo ""
echo "✨ 修复完成！请尝试登录测试。"
