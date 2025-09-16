import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo图形 - 参考COLOUR DESIGN AWARDS的设计 */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* 三个相互交织的弧形，形成动态的S形或循环 */}
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 顶部弧形 - 品红色 */}
          <path
            d="M8 24C8 15.1634 15.1634 8 24 8C32.8366 8 40 15.1634 40 24C40 28.4183 38.2091 32.2091 35.5 35"
            stroke="#E91E63"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* 中间弧形 - 亮黄色 */}
          <path
            d="M12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24C36 27.3137 34.3137 30 31 30"
            stroke="#FFD700"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* 底部弧形 - 鲜蓝色 */}
          <path
            d="M16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24C32 26.2091 30.2091 28 28 28"
            stroke="#2196F3"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* 交叠处的半透明效果 */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E91E63" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* 渐变填充的圆形背景 */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="url(#gradient1)"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* 文字部分 */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold ${textSizes[size]} bg-gradient-to-r from-pink-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent`}>
            《色彩》
          </h1>
          <p className="text-xs text-gray-600 font-medium">COLOUR JOURNAL</p>
        </div>
      )}
    </div>
  );
}
