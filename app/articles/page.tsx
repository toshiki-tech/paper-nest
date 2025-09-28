'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { value: 'all', label: '全部分类' },
    { value: 'color-theory', label: '色彩理论' },
    { value: 'color-psychology', label: '色彩心理学' },
    { value: 'color-design', label: '色彩设计' },
    { value: 'color-technology', label: '色彩技术' },
    { value: 'color-culture', label: '色彩文化' },
    { value: 'digital-color', label: '数字色彩' },
    { value: 'color-medicine', label: '色彩医学' }
  ];

  const years = [
    { value: 'all', label: '全部年份' },
    { value: '2025', label: '2025年' },
    { value: '2024', label: '2024年' },
    { value: '2023', label: '2023年' },
    { value: '2022', label: '2022年' }
  ];

  const articles = [
    {
      id: 1,
      title: '色彩心理学在环境设计中的应用研究',
      authors: '张色彩, 李设计',
      abstract: '探讨色彩心理学原理在室内外环境设计中的实践应用，通过实验研究验证不同色彩对人们心理状态和行为的影响，为环境设计提供科学依据。',
      keywords: ['色彩心理学', '环境设计', '用户体验'],
      category: 'color-psychology',
      year: 2025,
      volume: 8,
      issue: 1,
      pages: '1-15',
      doi: '10.1234/color.2025.001',
      downloadCount: 156,
      citationCount: 8,
      publishedAt: '2025-03-15'
    },
    {
      id: 2,
      title: '数字媒体中的色彩再现技术研究',
      authors: '王技术, 赵数字',
      abstract: '分析数字媒体环境下色彩再现的技术挑战与解决方案，研究不同显示设备对色彩表现的影响，提出优化色彩管理的方法。',
      keywords: ['数字色彩', '色彩管理', '显示技术'],
      category: 'digital-color',
      year: 2024,
      volume: 7,
      issue: 4,
      pages: '23-38',
      doi: '10.1234/color.2024.004',
      downloadCount: 203,
      citationCount: 12,
      publishedAt: '2024-12-20'
    },
    {
      id: 3,
      title: '跨文化色彩象征意义的比较研究',
      authors: '陈文化, 刘比较',
      abstract: '比较不同文化背景下色彩象征意义的差异与共性，探讨文化因素对色彩认知的影响，为跨文化设计提供理论指导。',
      keywords: ['色彩文化', '象征意义', '跨文化研究'],
      category: 'color-culture',
      year: 2024,
      volume: 7,
      issue: 3,
      pages: '45-62',
      doi: '10.1234/color.2024.003',
      downloadCount: 189,
      citationCount: 15,
      publishedAt: '2024-09-10'
    },
    {
      id: 4,
      title: '基于机器学习的色彩搭配算法',
      authors: '李算法, 王智能',
      abstract: '提出了一种基于机器学习的自动色彩搭配算法，能够根据设计需求自动生成和谐的色彩方案，提高设计效率。',
      keywords: ['机器学习', '色彩搭配', '算法设计'],
      category: 'color-technology',
      year: 2024,
      volume: 7,
      issue: 2,
      pages: '78-95',
      doi: '10.1234/color.2024.002',
      downloadCount: 234,
      citationCount: 18,
      publishedAt: '2024-06-15'
    },
    {
      id: 5,
      title: '色彩疗法在心理健康中的应用',
      authors: '孙心理, 周健康',
      abstract: '研究色彩疗法在心理健康治疗中的应用效果，探讨不同色彩对情绪调节和心理康复的作用机制。',
      keywords: ['色彩疗法', '心理健康', '情绪调节'],
      category: 'color-medicine',
      year: 2023,
      volume: 6,
      issue: 4,
      pages: '112-128',
      doi: '10.1234/color.2023.004',
      downloadCount: 167,
      citationCount: 9,
      publishedAt: '2023-12-05'
    },
    {
      id: 6,
      title: '传统色彩理论在现代设计中的传承与创新',
      authors: '吴传统, 郑现代',
      abstract: '分析传统色彩理论的核心价值，探讨其在现代设计中的传承方式与创新应用，为设计实践提供理论支撑。',
      keywords: ['传统色彩', '现代设计', '传承创新'],
      category: 'color-theory',
      year: 2023,
      volume: 6,
      issue: 3,
      pages: '89-105',
      doi: '10.1234/color.2023.003',
      downloadCount: 145,
      citationCount: 7,
      publishedAt: '2023-09-20'
    },
    {
      id: 7,
      title: '色彩感知的神经机制研究进展',
      authors: '林神经, 黄感知',
      abstract: '综述色彩感知的神经机制研究最新进展，探讨大脑处理色彩信息的神经通路和认知过程。',
      keywords: ['色彩感知', '神经机制', '认知科学'],
      category: 'color-psychology',
      year: 2023,
      volume: 6,
      issue: 2,
      pages: '56-72',
      doi: '10.1234/color.2023.002',
      downloadCount: 198,
      citationCount: 14,
      publishedAt: '2023-06-10'
    },
    {
      id: 8,
      title: '可持续设计中的色彩选择策略',
      authors: '马可持续, 钱环保',
      abstract: '研究可持续设计理念下的色彩选择策略，探讨环保材料与色彩应用的结合方式。',
      keywords: ['可持续设计', '环保色彩', '绿色设计'],
      category: 'color-design',
      year: 2023,
      volume: 6,
      issue: 1,
      pages: '34-48',
      doi: '10.1234/color.2023.001',
      downloadCount: 176,
      citationCount: 11,
      publishedAt: '2023-03-15'
    },
    {
      id: 9,
      title: '色彩在品牌识别中的战略作用',
      authors: '赵品牌, 孙识别',
      abstract: '分析色彩在品牌识别系统中的战略作用，研究色彩选择对品牌认知和消费者行为的影响。',
      keywords: ['品牌识别', '色彩战略', '消费者行为'],
      category: 'color-design',
      year: 2022,
      volume: 5,
      issue: 4,
      pages: '67-82',
      doi: '10.1234/color.2022.004',
      downloadCount: 223,
      citationCount: 19,
      publishedAt: '2022-12-20'
    },
    {
      id: 10,
      title: '虚拟现实环境中的色彩渲染技术',
      authors: '周虚拟, 吴现实',
      abstract: '研究虚拟现实环境中的色彩渲染技术，探讨沉浸式体验中的色彩表现和优化方法。',
      keywords: ['虚拟现实', '色彩渲染', '沉浸式体验'],
      category: 'digital-color',
      year: 2022,
      volume: 5,
      issue: 3,
      pages: '91-108',
      doi: '10.1234/color.2022.003',
      downloadCount: 187,
      citationCount: 13,
      publishedAt: '2022-09-25'
    },
    {
      id: 11,
      title: '色彩在医疗环境设计中的应用研究',
      authors: '李医疗, 王环境',
      abstract: '探讨色彩在医疗环境设计中的应用，研究色彩对患者心理状态和康复效果的影响。',
      keywords: ['医疗环境', '色彩应用', '康复效果'],
      category: 'color-medicine',
      year: 2022,
      volume: 5,
      issue: 2,
      pages: '45-61',
      doi: '10.1234/color.2022.002',
      downloadCount: 156,
      citationCount: 8,
      publishedAt: '2022-06-18'
    },
    {
      id: 12,
      title: '中国传统色彩体系的现代解读',
      authors: '陈传统, 刘现代',
      abstract: '深入解读中国传统色彩体系的文化内涵，探讨其在现代设计中的创新应用价值。',
      keywords: ['中国传统', '色彩体系', '文化内涵'],
      category: 'color-culture',
      year: 2022,
      volume: 5,
      issue: 1,
      pages: '23-39',
      doi: '10.1234/color.2022.001',
      downloadCount: 201,
      citationCount: 16,
      publishedAt: '2022-03-12'
    },
    {
      id: 13,
      title: '色彩测量技术的标准化研究',
      authors: '张测量, 黄标准',
      abstract: '研究色彩测量技术的标准化问题，建立统一的色彩测量和评价体系。',
      keywords: ['色彩测量', '标准化', '评价体系'],
      category: 'color-technology',
      year: 2021,
      volume: 4,
      issue: 4,
      pages: '78-94',
      doi: '10.1234/color.2021.004',
      downloadCount: 134,
      citationCount: 6,
      publishedAt: '2021-12-08'
    },
    {
      id: 14,
      title: '色彩在儿童教育环境中的影响研究',
      authors: '王儿童, 李教育',
      abstract: '研究色彩在儿童教育环境中的影响，探讨不同色彩对儿童学习效果和情绪状态的作用。',
      keywords: ['儿童教育', '色彩影响', '学习效果'],
      category: 'color-psychology',
      year: 2021,
      volume: 4,
      issue: 3,
      pages: '52-68',
      doi: '10.1234/color.2021.003',
      downloadCount: 189,
      citationCount: 12,
      publishedAt: '2021-09-15'
    },
    {
      id: 15,
      title: '色彩在建筑立面设计中的表现力',
      authors: '刘建筑, 陈立面',
      abstract: '分析色彩在建筑立面设计中的表现力，研究色彩对建筑视觉效果和城市景观的影响。',
      keywords: ['建筑立面', '色彩表现', '城市景观'],
      category: 'color-design',
      year: 2021,
      volume: 4,
      issue: 2,
      pages: '41-57',
      doi: '10.1234/color.2021.002',
      downloadCount: 167,
      citationCount: 9,
      publishedAt: '2021-06-22'
    },
    {
      id: 16,
      title: '色彩在食品包装设计中的心理效应',
      authors: '孙食品, 赵包装',
      abstract: '研究色彩在食品包装设计中的心理效应，探讨色彩对消费者购买决策的影响机制。',
      keywords: ['食品包装', '色彩心理', '购买决策'],
      category: 'color-psychology',
      year: 2021,
      volume: 4,
      issue: 1,
      pages: '29-45',
      doi: '10.1234/color.2021.001',
      downloadCount: 212,
      citationCount: 17,
      publishedAt: '2021-03-10'
    },
    {
      id: 17,
      title: '色彩在纺织品设计中的创新应用',
      authors: '吴纺织, 郑设计',
      abstract: '探讨色彩在纺织品设计中的创新应用，研究色彩与材质、纹理的协调关系。',
      keywords: ['纺织品', '色彩创新', '材质协调'],
      category: 'color-design',
      year: 2020,
      volume: 3,
      issue: 4,
      pages: '63-79',
      doi: '10.1234/color.2020.004',
      downloadCount: 145,
      citationCount: 7,
      publishedAt: '2020-12-05'
    },
    {
      id: 18,
      title: '色彩在数字艺术创作中的表现手法',
      authors: '林数字, 黄艺术',
      abstract: '分析色彩在数字艺术创作中的表现手法，探讨数字技术与色彩艺术的融合方式。',
      keywords: ['数字艺术', '色彩表现', '技术融合'],
      category: 'digital-color',
      year: 2020,
      volume: 3,
      issue: 3,
      pages: '87-103',
      doi: '10.1234/color.2020.003',
      downloadCount: 178,
      citationCount: 11,
      publishedAt: '2020-09-18'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || article.year.toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  // 分页计算
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // 重置到第一页当筛选条件改变时
  const handleFilterChange = (type: string, value: string) => {
    setCurrentPage(1);
    if (type === 'search') setSearchTerm(value);
    if (type === 'category') setSelectedCategory(value);
    if (type === 'year') setSelectedYear(value);
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            期刊文章
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            浏览《色彩》期刊发表的最新研究成果
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="搜索文章标题、作者或关键词..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={selectedCategory} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={selectedYear} onValueChange={(value) => handleFilterChange('year', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择年份" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 文章列表 */}
        <div className="space-y-8">
          {currentArticles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  未找到相关文章
                </h3>
                <p className="text-gray-500">
                  请尝试调整搜索条件或筛选器
                </p>
              </CardContent>
            </Card>
          ) : (
            currentArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">
                        {article.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>作者：{article.authors}</span>
                        <span>•</span>
                        <span>第{article.volume}卷第{article.issue}期</span>
                        <span>•</span>
                        <span>{article.year}年</span>
                        <span>•</span>
                        <span>第{article.pages}页</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-blue-100 text-blue-800">
                          {getCategoryLabel(article.category)}
                        </Badge>
                        {article.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-gray-600">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div>下载量: {article.downloadCount}</div>
                      <div>引用量: {article.citationCount}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                    {article.abstract}
                  </CardDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span>DOI: {article.doi}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>发表日期: {article.publishedAt}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto"
                        onClick={() => window.open(`/articles/${article.id}`, '_blank')}
                      >
                        查看详情
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          // 模拟PDF下载
                          const link = document.createElement('a');
                          link.href = `/api/articles/${article.id}/download`;
                          link.download = `${article.title}.pdf`;
                          link.click();
                        }}
                      >
                        下载PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
              >
                上一页
              </Button>
              
              {/* 页码按钮 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant="outline"
                  className={currentPage === page ? "bg-blue-600 text-white" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
              >
                下一页
              </Button>
            </div>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">期刊统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-gray-600">已发表文章</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2,847</div>
              <div className="text-gray-600">总下载量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">189</div>
              <div className="text-gray-600">总引用量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">25</div>
              <div className="text-gray-600">合作机构</div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}