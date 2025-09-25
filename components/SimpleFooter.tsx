import Logo from '@/components/Logo';

export default function SimpleFooter() {
  return (
    <footer className="bg-slate-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Logo size="sm" showText={false} />
          <h3 className="text-lg font-semibold">期刊管理系统</h3>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} 《色彩》期刊. 保留所有权利.
        </p>
      </div>
    </footer>
  );
}
