'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  onSignOutClick?: () => void;
}

export default function Header({ onSignOutClick }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-warm-50/95 backdrop-blur-sm shadow-sm border-b border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 桌面端布局 */}
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size="md" />
          </div>
          <nav className="flex space-x-2 lg:space-x-8">
            <Link href="/" className="text-gray-900 hover:text-primary-600 px-2 lg:px-4 py-3 rounded-md text-sm lg:text-base font-medium transition-colors">
              首页
            </Link>
            <Link href="/articles" className="text-gray-900 hover:text-primary-600 px-2 lg:px-4 py-3 rounded-md text-sm lg:text-base font-medium transition-colors">
              期刊文章
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-primary-600 px-2 lg:px-4 py-3 rounded-md text-sm lg:text-base font-medium transition-colors">
              关于我们
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-primary-600 px-2 lg:px-4 py-3 rounded-md text-sm lg:text-base font-medium transition-colors">
              联系我们
            </Link>
          </nav>
          <div className="flex items-center space-x-2 lg:space-x-4">
            {session ? (
              <>
                <span className="text-cool-600 text-sm lg:text-base hidden lg:inline">
                  欢迎，{session.user?.name || session.user?.email || '用户'}
                </span>
                {session.user?.role === 'author' && (
                  <Link href="/submission">
                    <Button size="sm" className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-md text-white text-xs lg:text-sm px-2 lg:px-3">投稿</Button>
                  </Link>
                )}
                {session.user?.role === 'editor' && (
                  <Link href="/editor">
                    <Button size="sm" className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-md text-white text-xs lg:text-sm px-2 lg:px-3">编辑</Button>
                  </Link>
                )}
                {session.user?.role === 'reviewer' && (
                  <Link href="/reviewer">
                    <Button size="sm" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-md text-white text-xs lg:text-sm px-2 lg:px-3">审稿</Button>
                  </Link>
                )}
                {session.user?.role === 'admin' && (
                  <Link href="/admin">
                    <Button size="sm" className="bg-gradient-to-r from-cool-600 to-cool-700 hover:from-cool-700 hover:to-cool-800 shadow-md text-white text-xs lg:text-sm px-2 lg:px-3">管理</Button>
                  </Link>
                )}
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="border-warm-300 text-warm-700 hover:bg-warm-100 text-xs lg:text-sm px-2 lg:px-3">资料</Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-300 text-red-600 hover:bg-red-50 text-xs lg:text-sm px-2 lg:px-3"
                  onClick={() => onSignOutClick?.()}
                >
                  退出
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="border-warm-300 text-warm-700 hover:bg-warm-100 text-xs lg:text-sm px-2 lg:px-3">登录</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-md text-white text-xs lg:text-sm px-2 lg:px-3">注册</Button>
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
                      <Button size="sm" className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 px-2 shadow-md text-white">投稿</Button>
                    </Link>
                  )}
                  {session.user?.role === 'editor' && (
                    <Link href="/editor">
                      <Button size="sm" className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 px-2 shadow-md text-white">编辑</Button>
                    </Link>
                  )}
                  {session.user?.role === 'reviewer' && (
                    <Link href="/reviewer">
                      <Button size="sm" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-2 shadow-md text-white">审稿</Button>
                    </Link>
                  )}
                  {session.user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button size="sm" className="bg-gradient-to-r from-cool-600 to-cool-700 hover:from-cool-700 hover:to-cool-800 px-2 shadow-md text-white">管理</Button>
                    </Link>
                  )}
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="border-warm-300 text-warm-700 hover:bg-warm-100 px-2">资料</Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-300 text-red-600 hover:bg-red-50 px-2"
                    onClick={() => onSignOutClick?.()}
                  >
                    退出
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="outline" size="sm" className="border-warm-300 text-warm-700 hover:bg-warm-100 px-2">登录</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 px-2 shadow-md text-white">注册</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* 第二行：欢迎信息 + 导航菜单 */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-cool-600 flex-shrink-0">
              {session ? `欢迎，${session.user?.name || session.user?.email || '用户'}` : '欢迎访问'}
            </span>
            <nav className="flex space-x-1 flex-1 justify-end">
              <Link href="/" className="text-cool-700 hover:text-primary-600 px-1 py-1 rounded-md text-xs font-medium transition-colors">
                首页
              </Link>
              <Link href="/articles" className="text-cool-700 hover:text-primary-600 px-1 py-1 rounded-md text-xs font-medium transition-colors">
                文章
              </Link>
              <Link href="/about" className="text-cool-700 hover:text-primary-600 px-1 py-1 rounded-md text-xs font-medium transition-colors">
                关于
              </Link>
              <Link href="/contact" className="text-cool-700 hover:text-primary-600 px-1 py-1 rounded-md text-xs font-medium transition-colors">
                联系
              </Link>
            </nav>
          </div>
        </div>
      </div>
      
    </header>
  );
}
