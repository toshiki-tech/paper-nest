'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 桌面端布局 */}
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size="md" />
          </div>
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              首页
            </Link>
            <Link href="/articles" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              期刊文章
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              关于我们
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              联系我们
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-600">
                  欢迎，{session.user?.name || session.user?.email || '用户'}
                </span>
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
          
          {/* 第二行：欢迎信息 + 导航菜单 */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {session ? `欢迎，${session.user?.name || session.user?.email || '用户'}` : '欢迎访问'}
            </span>
            <nav className="flex space-x-3">
              <Link href="/" className="text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                首页
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                文章
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                关于
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md text-xs font-medium transition-colors">
                联系
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
