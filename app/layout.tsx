import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '《色彩》期刊 - 专业色彩研究平台',
  description: '专业的色彩研究期刊，涵盖色彩理论、色彩心理学、色彩设计、色彩技术等各个领域的研究成果',
  keywords: '色彩研究, 色彩理论, 色彩心理学, 色彩设计, 学术期刊',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
