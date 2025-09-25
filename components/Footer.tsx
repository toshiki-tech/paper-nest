import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-green-900 to-blue-900 text-white py-16 mt-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="sm" showText={false} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                《色彩》期刊
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              专业的色彩研究期刊，致力于推动色彩学科的发展与创新。
            </p>
            <div className="flex space-x-4 mt-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <span className="text-white text-sm font-bold">✉</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <span className="text-white text-sm font-bold">📱</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <span className="text-white text-sm font-bold">🌐</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">快速链接</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/articles" className="hover:text-blue-400 transition-colors duration-200">期刊文章</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-200">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">联系我们</Link></li>
              <li><Link href="/help" className="hover:text-blue-400 transition-colors duration-200">帮助中心</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">投稿指南</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/submission-guide" className="hover:text-green-400 transition-colors duration-200">投稿须知</Link></li>
              <li><Link href="/review-process" className="hover:text-green-400 transition-colors duration-200">审稿流程</Link></li>
              <li><Link href="/publishing-policy" className="hover:text-green-400 transition-colors duration-200">出版政策</Link></li>
              <li><Link href="/ethics" className="hover:text-green-400 transition-colors duration-200">学术伦理</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">联系我们</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-xs font-bold">✉</span>
                </div>
                <span className="text-gray-300 text-sm">contact@color-journal.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-xs font-bold">📞</span>
                </div>
                <span className="text-gray-300 text-sm">+86-xxx-xxxx-xxxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-xs font-bold">📍</span>
                </div>
                <span className="text-gray-300 text-sm">中国北京市</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-xs font-bold">🕒</span>
                </div>
                <span className="text-gray-300 text-sm">周一至周五 9:00-18:00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} 《色彩》期刊编辑部. 保留所有权利.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">隐私政策</span>
              <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">使用条款</span>
              <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">Cookie政策</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
