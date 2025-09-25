import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-8',  // 长方形比例 3:2
    md: 'w-16 h-12', // 长方形比例 4:3
    lg: 'w-20 h-16'  // 长方形比例 5:4
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo图片 - 长方形适配 */}
      <div className={`${sizeClasses[size]} relative rounded-lg overflow-hidden shadow-sm`}>
        <Image
          src="/logo.jpg"
          alt="色彩期刊Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 文字部分 */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold ${textSizes[size]} bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent`}>
            JOURNAL
          </h1>
          <p className="text-xs text-slate-500 font-medium">ACADEMIC PUBLICATION</p>
        </div>
      )}
    </div>
  );
}
