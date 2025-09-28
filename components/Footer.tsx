import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white py-16 mt-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-slate-500/10 to-slate-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-slate-400/10 to-slate-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <Logo size="sm" showText={false} />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                《色彩》期刊
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              专业的色彩研究期刊，致力于推动色彩学科的发展与创新。
            </p>
            <div className="flex space-x-4 mt-4">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">快速链接</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/articles" className="hover:text-slate-300 transition-colors duration-200">期刊文章</Link></li>
              <li><Link href="/about" className="hover:text-slate-300 transition-colors duration-200">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-slate-300 transition-colors duration-200">联系我们</Link></li>
              <li><Link href="/help" className="hover:text-slate-300 transition-colors duration-200">帮助中心</Link></li>
            </ul>
          </div>
          <div className="text-center md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">投稿指南</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/submission-guide" className="hover:text-slate-300 transition-colors duration-200">投稿须知</Link></li>
              <li><Link href="/review-process" className="hover:text-slate-300 transition-colors duration-200">审稿流程</Link></li>
              <li><Link href="/publishing-policy" className="hover:text-slate-300 transition-colors duration-200">出版政策</Link></li>
              <li><Link href="/ethics" className="hover:text-slate-300 transition-colors duration-200">学术伦理</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">联系我们</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">contact@color-journal.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">+86-xxx-xxxx-xxxx</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">中国北京市</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-sm">
                  <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors duration-200">隐私政策</Link>
              <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors duration-200">使用条款</Link>
              <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors duration-200">Cookie政策</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
