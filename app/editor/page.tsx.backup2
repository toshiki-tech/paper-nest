'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import SignOutModal from '@/components/SignOutModal';

interface Article {
  id: string;
  title: string;
  abstract: string;
  keywords: string;
  authors: string;
  correspondingAuthor: string;
  category: string;
  status: 'submitted' | 'under_review' | 'revision_requested' | 'accepted' | 'rejected' | 'published';
  submissionDate: string;
  lastModified: string;
  manuscriptFile?: string;
  reviews?: Review[];
  needsReviewerAssignment?: boolean;
  needsDecision?: boolean;
}

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'declined';
  score?: number;
  recommendation?: 'accept' | 'minor_revision' | 'major_revision' | 'reject';
  comments?: string;
  submittedAt?: string;
  deadline?: string;
}

interface Reviewer {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  workload: number;
}

export default function EditorPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  // 审稿人分配表单
  const [assignmentForm, setAssignmentForm] = useState({
    reviewerId: '',
    deadline: '',
    comments: ''
  });

  // 编辑决策表单
  const [decisionForm, setDecisionForm] = useState({
    decision: '',
    comments: ''
  });

  // 模拟数据
  useEffect(() => {
    setArticles([
      {
        id: 'art-1',
        title: '色彩心理学在UI设计中的应用研究',
        abstract: '本文探讨了色彩心理学在用户界面设计中的重要作用，通过实验验证了不同色彩对用户行为的影响...',
        keywords: '色彩心理学,UI设计,用户体验',
        authors: '张三,李四',
        correspondingAuthor: '张三 (zhangsan@example.com)',
        category: '色彩心理学',
        status: 'submitted',
        submissionDate: '2024-01-15',
        lastModified: '2024-01-15',
        manuscriptFile: '/files/manuscript-1.pdf',
        needsReviewerAssignment: true,
        needsDecision: false
      },
      {
        id: 'art-2',
        title: '基于机器学习的色彩搭配算法',
        abstract: '提出了一种基于机器学习的自动色彩搭配算法，能够根据设计需求自动生成和谐的色彩方案...',
        keywords: '机器学习,色彩搭配,算法',
        authors: '王五,赵六',
        correspondingAuthor: '王五 (wangwu@example.com)',
        category: '色彩技术',
        status: 'under_review',
        submissionDate: '2024-01-10',
        lastModified: '2024-01-10',
        manuscriptFile: '/files/manuscript-2.pdf',
        reviews: [
          {
            id: 'rev-1',
            reviewerId: 'rev-001',
            reviewerName: '审稿专家A',
            status: 'completed',
            score: 4,
            recommendation: 'minor_revision',
            comments: '文章整体质量较高，建议在实验部分增加更多数据...',
            submittedAt: '2024-01-20',
            deadline: '2024-01-25'
          }
        ],
        needsReviewerAssignment: false,
        needsDecision: true
      },
      {
        id: 'art-3',
        title: '中国传统色彩文化的现代传承',
        abstract: '研究了中国传统色彩文化在现代设计中的传承与应用，探讨了传统色彩符号的现代意义...',
        keywords: '传统色彩,文化传承,现代设计',
        authors: '孙七,周八',
        correspondingAuthor: '孙七 (sunqi@example.com)',
        category: '色彩文化',
        status: 'revision_requested',
        submissionDate: '2024-01-05',
        lastModified: '2024-01-20',
        manuscriptFile: '/files/manuscript-3.pdf',
        reviews: [
          {
            id: 'rev-2',
            reviewerId: 'rev-002',
            reviewerName: '审稿专家B',
            status: 'completed',
            score: 3,
            recommendation: 'major_revision',
            comments: '文章需要重大修改，建议重新组织结构和补充实验数据...',
            submittedAt: '2024-01-18',
            deadline: '2024-01-23'
          }
        ],
        needsReviewerAssignment: false,
        needsDecision: false
      },
      {
        id: 'art-4',
        title: '数字媒体中的色彩管理技术',
        abstract: '探讨了数字媒体环境下色彩管理的关键技术和标准...',
        keywords: '数字媒体,色彩管理,技术标准',
        authors: '刘九,陈十',
        correspondingAuthor: '刘九 (liujiu@example.com)',
        category: '色彩技术',
        status: 'accepted',
        submissionDate: '2024-01-01',
        lastModified: '2024-01-18',
        manuscriptFile: '/files/manuscript-4.pdf',
        reviews: [
          {
            id: 'rev-3',
            reviewerId: 'rev-003',
            reviewerName: '审稿专家C',
            status: 'completed',
            score: 5,
            recommendation: 'accept',
            comments: '文章质量优秀，建议直接接受发表...',
            submittedAt: '2024-01-15',
            deadline: '2024-01-20'
          }
        ],
        needsReviewerAssignment: false,
        needsDecision: false
      }
    ]);

    setReviewers([
      {
        id: 'rev-001',
        name: '审稿专家A',
        email: 'reviewer-a@example.com',
        expertise: ['色彩心理学', 'UI设计'],
        workload: 2
      },
      {
        id: 'rev-002',
        name: '审稿专家B',
        email: 'reviewer-b@example.com',
        expertise: ['色彩技术', '机器学习'],
        workload: 1
      },
      {
        id: 'rev-003',
        name: '审稿专家C',
        email: 'reviewer-c@example.com',
        expertise: ['色彩理论', '设计理论'],
        workload: 3
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'revision_requested': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'published': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted': return '待审稿';
      case 'under_review': return '审稿中';
      case 'revision_requested': return '需要修改';
      case 'accepted': return '已录用';
      case 'rejected': return '已拒绝';
      case 'published': return '已发表';
      default: return '未知状态';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'accept': return '接受';
      case 'minor_revision': return '小修';
      case 'major_revision': return '大修';
      case 'reject': return '拒绝';
      default: return '未评价';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'accept': return 'bg-green-100 text-green-800';
      case 'minor_revision': return 'bg-yellow-100 text-yellow-800';
      case 'major_revision': return 'bg-orange-100 text-orange-800';
      case 'reject': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return '已分配';
      case 'in_progress': return '审稿中';
      case 'completed': return '已完成';
      case 'declined': return '已拒绝';
      default: return '未知状态';
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignReviewer = (article: Article) => {
    setSelectedArticle(article);
    setShowAssignmentModal(true);
  };

  const handleMakeDecision = (article: Article) => {
    setSelectedArticle(article);
    setShowDecisionModal(true);
  };

  const handleViewDetails = (article: Article) => {
    setSelectedArticle(article);
    setShowDetailsModal(true);
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentForm.reviewerId || !assignmentForm.deadline) {
      alert('请填写所有必填字段');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(prev => prev.map(article => 
        article.id === selectedArticle?.id 
          ? { 
              ...article, 
              status: 'under_review' as const,
              needsReviewerAssignment: false,
              reviews: [
                {
                  id: `rev-${Date.now()}`,
                  reviewerId: assignmentForm.reviewerId,
                  reviewerName: reviewers.find(r => r.id === assignmentForm.reviewerId)?.name || '审稿专家',
                  status: 'assigned',
                  deadline: assignmentForm.deadline
                }
              ]
            }
          : article
      ));
      
      setShowAssignmentModal(false);
      setAssignmentForm({ reviewerId: '', deadline: '', comments: '' });
      alert('审稿人分配成功！');
    } catch (error) {
      alert('分配失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDecisionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisionForm.decision) {
      alert('请选择决策结果');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(prev => prev.map(article => 
        article.id === selectedArticle?.id 
          ? { ...article, status: decisionForm.decision as any, needsDecision: false }
          : article
      ));
      
      setShowDecisionModal(false);
      setDecisionForm({ decision: '', comments: '' });
      alert('决策提交成功！');
    } catch (error) {
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push('/auth/signin');
    return <div>加载中...</div>;
  }

  if (session.user?.role !== 'editor' && session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">权限不足</h2>
            <p className="text-gray-600 mb-4">您没有访问编辑工作台面板的权限</p>
            <Button onClick={() => router.push('/')} className="w-full">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 桌面端布局 */}
          <div className="hidden md:flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                编辑工作台面板
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                欢迎，{session.user?.name || session.user?.email || '用户'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/profile')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                个人资料
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSignOutModal(true)}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                退出登录
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                返回首页
              </Button>
            </div>
          </div>
          
          {/* 移动端布局 */}
          <div className="md:hidden py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Logo size="sm" />
                <h1 className="text-lg font-bold text-gray-900">
                  编辑工作台
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push('/profile')}
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 px-2"
                >
                  资料
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSignOutModal(true)}
                  className="border-red-300 text-red-600 hover:bg-red-50 px-2"
                >
                  退出
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                欢迎，{session.user?.name || session.user?.email || '用户'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-purple-300 text-purple-600 hover:bg-purple-50 px-2"
              >
                首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {articles.filter(a => a.status === 'submitted').length}
              </div>
              <div className="text-gray-600">待审稿</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {articles.filter(a => a.status === 'under_review').length}
              </div>
              <div className="text-gray-600">审稿中</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {articles.filter(a => a.status === 'accepted').length}
              </div>
              <div className="text-gray-600">已录用</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {articles.length}
              </div>
              <div className="text-gray-600">总稿件</div>
            </CardContent>
          </Card>
        </div>

        {/* 待处理任务 */}
        <div className="mb-8">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-purple-600 mr-2">⚡</span>
                待处理任务
              </CardTitle>
              <CardDescription>
                需要您立即处理的稿件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 需要分配审稿人的稿件 */}
                {articles.filter(a => a.needsReviewerAssignment).length > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <span className="mr-2">👥</span>
                      需要分配审稿人
                      <Badge className="ml-2 bg-blue-600 text-white">
                        {articles.filter(a => a.needsReviewerAssignment).length} 篇
                      </Badge>
                    </h3>
                    <div className="space-y-2">
                      {articles.filter(a => a.needsReviewerAssignment).map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{article.title}</h4>
                            <p className="text-sm text-gray-600">作者: {article.authors}</p>
                            <p className="text-xs text-gray-500">投稿时间: {article.submissionDate}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAssignReviewer(article)}
                          >
                            分配审稿人
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 需要做出决策的稿件 */}
                {articles.filter(a => a.needsDecision).length > 0 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                      <span className="mr-2">⚖️</span>
                      需要做出决策
                      <Badge className="ml-2 bg-green-600 text-white">
                        {articles.filter(a => a.needsDecision).length} 篇
                      </Badge>
                    </h3>
                    <div className="space-y-2">
                      {articles.filter(a => a.needsDecision).map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{article.title}</h4>
                            <p className="text-sm text-gray-600">作者: {article.authors}</p>
                            <p className="text-xs text-gray-500">投稿时间: {article.submissionDate}</p>
                            {article.reviews && article.reviews.length > 0 && (
                              <div className="mt-1">
                                <span className="text-xs text-green-700">
                                  已完成审稿: {article.reviews.filter(r => r.status === 'completed').length}/{article.reviews.length}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleMakeDecision(article)}
                          >
                            做出决策
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 无待处理任务 */}
                {articles.filter(a => a.needsReviewerAssignment || a.needsDecision).length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      暂无待处理任务
                    </h3>
                    <p className="text-gray-500">
                      所有稿件都已处理完毕
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 稿件列表 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">稿件管理</h2>
          
          {articles.map((article) => (
            <Card key={article.id} className="border-purple-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                {/* 桌面端布局 */}
                <div className="hidden md:block">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.abstract}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span>作者: {article.authors}</span>
                        <span>分类: {article.category}</span>
                        <span>投稿时间: {article.submissionDate}</span>
                      </div>
                      
                      {/* 审稿信息 */}
                      {article.reviews && article.reviews.length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">审稿情况:</h4>
                          <div className="space-y-2">
                            {article.reviews.map((review) => (
                              <div key={review.id} className="flex items-center space-x-4 text-sm">
                                <span className="text-gray-600">{review.reviewerName}</span>
                                <Badge className={getRecommendationColor(review.recommendation || '')}>
                                  {getRecommendationText(review.recommendation || '')}
                                </Badge>
                                {review.score && (
                                  <span className="text-gray-600">评分: {review.score}/5</span>
                                )}
                                <span className="text-gray-500">
                                  {review.submittedAt ? `提交于 ${review.submittedAt}` : '未提交'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(article.status)}>
                        {getStatusText(article.status)}
                      </Badge>
                      {article.needsReviewerAssignment && (
                        <Badge className="bg-blue-100 text-blue-800">需要分配审稿人</Badge>
                      )}
                      {article.needsDecision && (
                        <Badge className="bg-green-100 text-green-800">需要决策</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {article.needsReviewerAssignment && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        onClick={() => handleAssignReviewer(article)}
                      >
                        分配审稿人
                      </Button>
                    )}
                    
                    {article.needsDecision && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                        onClick={() => handleMakeDecision(article)}
                      >
                        做出决策
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      onClick={() => handleViewDetails(article)}
                    >
                      查看详情
                    </Button>
                  </div>
                </div>

                {/* 移动端布局 */}
                <div className="md:hidden">
                  <div className="space-y-3">
                    {/* 标题和状态 */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-base font-semibold text-gray-900 leading-tight flex-1 pr-2">
                        {article.title}
                      </h3>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={`${getStatusColor(article.status)} text-xs`}>
                          {getStatusText(article.status)}
                        </Badge>
                        {article.needsReviewerAssignment && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">需分配</Badge>
                        )}
                        {article.needsDecision && (
                          <Badge className="bg-green-100 text-green-800 text-xs">需决策</Badge>
                        )}
                      </div>
                    </div>

                    {/* 摘要 */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.abstract}
                    </p>

                    {/* 基本信息 */}
                    <div className="space-y-1 text-xs text-gray-500">
                      <div><span className="font-medium">作者:</span> {article.authors}</div>
                      <div><span className="font-medium">分类:</span> {article.category}</div>
                      <div><span className="font-medium">投稿:</span> {article.submissionDate}</div>
                    </div>

                    {/* 审稿信息 - 移动端简化 */}
                    {article.reviews && article.reviews.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">审稿情况:</h4>
                        <div className="space-y-1">
                          {article.reviews.map((review) => (
                            <div key={review.id} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 truncate flex-1 mr-2">{review.reviewerName}</span>
                              <Badge className={`${getRecommendationColor(review.recommendation || '')} text-xs`}>
                                {getRecommendationText(review.recommendation || '')}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                      {article.needsReviewerAssignment && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-xs px-3"
                          onClick={() => handleAssignReviewer(article)}
                        >
                          分配审稿人
                        </Button>
                      )}
                      
                      {article.needsDecision && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-xs px-3"
                          onClick={() => handleMakeDecision(article)}
                        >
                          做出决策
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(article)}
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 text-xs px-3"
                      >
                        查看详情
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 审稿人分配模态框 */}
        {showAssignmentModal && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-purple-600 mr-2">👥</span>
                    分配审稿人
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAssignmentModal(false)}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  为文章 "{selectedArticle.title}" 分配审稿人
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAssignmentSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="reviewer" className="text-gray-700">选择审稿人 *</Label>
                    <Select 
                      value={assignmentForm.reviewerId} 
                      onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, reviewerId: value }))}
                    >
                      <SelectTrigger className="border-purple-300">
                        <SelectValue placeholder="请选择审稿人" />
                      </SelectTrigger>
                      <SelectContent>
                        {reviewers.map((reviewer) => (
                          <SelectItem key={reviewer.id} value={reviewer.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{reviewer.name}</span>
                              <span className="text-sm text-gray-500">
                                专长: {reviewer.expertise.join(', ')} | 当前工作量: {reviewer.workload}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="deadline" className="text-gray-700">审稿截止日期 *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={assignmentForm.deadline}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, deadline: e.target.value }))}
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="comments" className="text-gray-700">给审稿人的说明</Label>
                    <Textarea
                      id="comments"
                      value={assignmentForm.comments}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, comments: e.target.value }))}
                      placeholder="请提供审稿指导或特殊要求..."
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      rows={3}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      {loading ? '分配中...' : '确认分配'}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowAssignmentModal(false)}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      取消
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 编辑决策模态框 */}
        {showDecisionModal && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-green-600 mr-2">⚖️</span>
                    编辑决策
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDecisionModal(false)}
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  基于审稿意见对文章 "{selectedArticle.title}" 做出最终决策
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDecisionSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="decision" className="text-gray-700">决策结果 *</Label>
                    <Select 
                      value={decisionForm.decision} 
                      onValueChange={(value) => setDecisionForm(prev => ({ ...prev, decision: value }))}
                    >
                      <SelectTrigger className="border-green-300">
                        <SelectValue placeholder="请选择决策结果" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accepted">接受发表</SelectItem>
                        <SelectItem value="revision_requested">需要修改</SelectItem>
                        <SelectItem value="rejected">拒绝发表</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="comments" className="text-gray-700">决策说明</Label>
                    <Textarea
                      id="comments"
                      value={decisionForm.comments}
                      onChange={(e) => setDecisionForm(prev => ({ ...prev, comments: e.target.value }))}
                      placeholder="请说明决策理由和给作者的建议..."
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      {loading ? '提交中...' : '确认决策'}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowDecisionModal(false)}
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      取消
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 稿件详情模态框 */}
        {showDetailsModal && selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-purple-600 mr-2">📄</span>
                    稿件详情 - {selectedArticle.title}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDetailsModal(false)}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  查看稿件的完整信息和审稿状态
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 基本信息 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">基本信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">标题:</span>
                      <p className="text-gray-900 font-medium">{selectedArticle.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">状态:</span>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedArticle.status)}>
                          {getStatusText(selectedArticle.status)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">作者:</span>
                      <p className="text-gray-900">{selectedArticle.authors}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">通讯作者:</span>
                      <p className="text-gray-900">{selectedArticle.correspondingAuthor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">分类:</span>
                      <p className="text-gray-900">{selectedArticle.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">投稿时间:</span>
                      <p className="text-gray-900">{selectedArticle.submissionDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">最后修改:</span>
                      <p className="text-gray-900">{selectedArticle.lastModified}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">关键词:</span>
                      <p className="text-gray-900">{selectedArticle.keywords}</p>
                    </div>
                  </div>
                </div>

                {/* 摘要 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">摘要</h3>
                  <p className="text-gray-800 p-3 bg-gray-50 rounded-lg leading-relaxed">
                    {selectedArticle.abstract}
                  </p>
                </div>

                {/* 审稿情况 */}
                {selectedArticle.reviews && selectedArticle.reviews.length > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-3">审稿情况</h3>
                    <div className="space-y-4">
                      {selectedArticle.reviews.map((review) => (
                        <div key={review.id} className="p-3 bg-white rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-medium text-blue-800">{review.reviewerName}</span>
                            <Badge className={getReviewStatusColor(review.status)}>
                              {getReviewStatusText(review.status)}
                            </Badge>
                            {review.score && (
                              <span className="text-sm text-blue-700">评分: {review.score}/5</span>
                            )}
                            {review.recommendation && (
                              <Badge className={getRecommendationColor(review.recommendation)}>
                                {getRecommendationText(review.recommendation)}
                              </Badge>
                            )}
                          </div>
                          {review.comments && (
                            <p className="text-blue-700 text-sm leading-relaxed">{review.comments}</p>
                          )}
                          {review.submittedAt && (
                            <p className="text-xs text-gray-500 mt-2">提交时间: {review.submittedAt}</p>
                          )}
                          {review.deadline && (
                            <p className="text-xs text-gray-500">截止时间: {review.deadline}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 文件下载 */}
                {selectedArticle.manuscriptFile && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                      <span className="mr-2">📄</span>
                      稿件文件
                      <Badge className="ml-2 bg-green-600 text-white">最新版本</Badge>
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-green-200">
                        <span className="text-green-600">📎</span>
                        <span className="text-gray-900 font-medium">稿件文件</span>
                        <span className="text-sm text-green-600">(最新提交)</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(selectedArticle.manuscriptFile, '_blank')}
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        下载当前文件
                      </Button>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      💡 这是作者最新提交的稿件文件
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setShowDetailsModal(false)}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    关闭
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      {/* 退出确认弹窗 */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || session?.user?.email || undefined}
      />
    </div>
  );
}