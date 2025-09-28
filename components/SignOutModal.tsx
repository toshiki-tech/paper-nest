'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function SignOutModal({ isOpen, onClose, userName }: SignOutModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="animate-in fade-in-0 zoom-in-95 duration-200">
        <Card className="w-full max-w-md border-gray-200 bg-white shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              确认退出登录
            </CardTitle>
            <CardDescription className="text-gray-600">
              {userName ? `您好，${userName}` : '您确定要退出登录吗？'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-gray-900 mb-1">退出后将：</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 清除您的登录状态</li>
                    <li>• 需要重新登录才能访问个人功能</li>
                    <li>• 未保存的数据可能会丢失</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                取消
              </Button>
              <Button
                onClick={handleSignOut}
                disabled={isLoading}
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>退出中...</span>
                  </div>
                ) : (
                  '确认退出'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
