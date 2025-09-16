'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Article {
  id: string;
  title: string;
  abstract: string;
  authors: string;
  keywords: string;
  category: string;
  status: 'submitted' | 'under_review' | 'revisions_requested' | 'accepted' | 'published' | 'rejected';
  publishedAt?: string;
  views: number;
  downloads: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export default function ArticlesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 模拟数据
    const mockCategories: Category[] = [
      { id: 'color-theory', name: '色彩理论', slug: 'color-theory', description: '色彩基础理论与应用研究' },
      { id: 'color-psychology', name: '色彩心理学', slug: 'color-psychology', description: '色彩对人类心理和行为的影响研究' },
      { id: 'color-design', name: '色彩设计', slug: 'color-design', description: '色彩在艺术设计中的应用与创新' },
      { id: 'color-technology', name: '色彩技术', slug: 'color-technology', description: '色彩测量、再现与显示技术' },
      { id: 'color-culture', name: '色彩文化', slug: 'color-culture', description: '色彩在不同文化中的象征意义与表达' }
    ];

    const mockArticles: Article[] = [
      {
        id: 'art-1',
        title: '色彩心理学在品牌设计中的应用研究',
        abstract: '本文探讨了色彩心理学在品牌设计中的重要作用，通过实验研究分析了不同色彩对消费者心理的影响...',
        authors: '张三, 李四',
        keywords: '色彩心理学, 品牌设计, 消费者行为',
        category: 'color-psychology',
        status: 'published',
        publishedAt: '2025-01-15',
        views: 1250,
        downloads: 89
      },
      {
        id: 'art-2',
        title: '数字媒体中色彩再现技术的创新与发展',
        abstract: '随着数字媒体技术的快速发展，色彩再现技术也在不断创新。本文分析了当前主流的色彩再现技术...',
        authors: '王五, 赵六',
        keywords: '数字媒体, 色彩再现, 技术创新',
        category: 'color-technology',
        status: 'published',
        publishedAt: '2025-01-10',
        views: 980,
        downloads: 67
      },
      {
        id: 'art-3',
        title: '色彩文化差异对消费者购买决策的影响',
        abstract: '不同文化背景下的消费者对色彩的理解和偏好存在显著差异。本研究通过跨文化比较分析...',
        authors: '孙七, 周八',
        keywords: '色彩文化, 消费者行为, 跨文化研究',
        category: 'color-culture',
        status: 'published',
        publishedAt: '2025-01-05',
        views: 756,
        downloads: 45
      },
      {
        id: 'art-4',
        title: '现代色彩理论在UI设计中的应用实践',
        abstract: '用户界面设计中的色彩运用直接影响用户体验。本文结合现代色彩理论，探讨了UI设计中的色彩应用原则...',
        authors: '吴九, 郑十',
        keywords: '色彩理论, UI设计, 用户体验',
        category: 'color-design',
        status: 'published',
        publishedAt: '2023-12-28',
        views: 1120,
        downloads: 78
      },
      {
        id: 'art-5',
        title: '色彩测量技术的发展历程与未来趋势',
        abstract: '色彩测量技术是色彩科学的重要基础。本文回顾了色彩测量技术的发展历程，并展望了未来的发展趋势...',
        authors: '钱十一, 李十二',
        keywords: '色彩测量, 技术发展, 未来趋势',
        category: 'color-technology',
        status: 'published',
        publishedAt: '2023-12-20',
        views: 890,
        downloads: 56
      }
    ];

    setCategories(mockCategories);
    setArticles(mockArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.keywords.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && article.status === 'published';
  });

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || '未知分类';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-green-25 to-blue-25">
      {/* Header - 使用公共组件 */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-500 transition-colors duration-200">
              首页
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-blue-600 font-medium">期刊文章</span>
          </div>
        </nav>

        {/* 页面标题和导航 */}
        <div className="text-center mb-12 relative">
          {/* 背景装饰 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-gradient-to-r from-blue-200/20 via-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-50 rounded-full mb-6">
              <span className="text-blue-600 text-sm font-medium">📚 学术期刊</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-green-600 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
              期刊文章
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              探索色彩研究的学术前沿，发现最新的研究成果
            </p>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <Card className="mb-8 border-blue-200 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="搜索文章标题、摘要或关键词..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-blue-300 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{articles.length}</div>
              <div className="text-gray-600">总文章数</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{categories.length}</div>
              <div className="text-gray-600">期刊栏目</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {articles.reduce((sum, article) => sum + article.views, 0)}
              </div>
              <div className="text-gray-600">总浏览量</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {articles.reduce((sum, article) => sum + article.downloads, 0)}
              </div>
              <div className="text-gray-600">总下载量</div>
            </CardContent>
          </Card>
        </div>

        {/* 文章列表 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? '全部文章' : getCategoryName(selectedCategory)}
            </h2>
            <Badge variant="outline" className="border-orange-300 text-orange-600">
              共 {filteredArticles.length} 篇文章
            </Badge>
          </div>

          {filteredArticles.length === 0 ? (
            <Card className="border-orange-200">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  暂无文章
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? '没有找到匹配的文章' : '该分类下暂无文章'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card key={article.id} className="border-orange-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  {/* 桌面端布局 */}
                  <div className="hidden md:block">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-300">
                            {getCategoryName(article.category)}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            发布时间: {formatDate(article.publishedAt!)}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-orange-600 cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.abstract}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>作者: {article.authors}</span>
                          <span>关键词: {article.keywords}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {article.views} 次浏览
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {article.downloads} 次下载
                        </span>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          在线阅读
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        >
                          下载PDF
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* 移动端布局 */}
                  <div className="md:hidden">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-300 text-xs">
                          {getCategoryName(article.category)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.publishedAt!)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600 cursor-pointer leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.abstract}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">作者:</span> {article.authors}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">关键词:</span> {article.keywords}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {article.views}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {article.downloads}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 px-2 text-xs"
                          >
                            阅读
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-2 text-xs"
                          >
                            下载
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Footer - 使用公共组件 */}
      <Footer />
    </div>
  );
}
