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
import SimpleFooter from '@/components/SimpleFooter';

interface ReviewTask {
  id: string;
  articleId: string;
  title: string;
  abstract: string;
  authors: string;
  category: string;
  submissionDate: string;
  deadline: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'declined';
  manuscriptFile?: string;
  editorComments?: string;
  assignedAt: string;
  submittedAt?: string;
  score?: number;
  recommendation?: 'accept' | 'minor_revision' | 'major_revision' | 'reject';
  comments?: string;
  confidentialComments?: string;
}

interface ReviewForm {
  score: string;
  recommendation: string;
  comments: string;
  confidentialComments: string;
}

export default function ReviewerPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviewTasks, setReviewTasks] = useState<ReviewTask[]>([]);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ReviewTask | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  
  // 审稿表单
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    score: '',
    recommendation: '',
    comments: '',
    confidentialComments: ''
  });

  // 模拟数据
  useEffect(() => {
    setReviewTasks([
      {
        id: 'task-1',
        articleId: 'art-1',
        title: '色彩心理学在UI设计中的应用研究',
        abstract: '本文探讨了色彩心理学在用户界面设计中的重要作用，通过实验验证了不同色彩对用户行为的影响。研究采用定量分析方法，对200名用户进行了色彩偏好测试，发现蓝色系色彩能够显著提升用户的信任感和专业感，而红色系色彩则更容易引起用户的注意和行动欲望。这些发现为UI设计师提供了科学的色彩选择依据。',
        authors: '张三,李四',
        category: '色彩心理学',
        submissionDate: '2025-01-15',
        deadline: '2025-02-15',
        status: 'assigned',
        manuscriptFile: '/files/manuscript-1.pdf',
        editorComments: '请重点关注实验设计的科学性和数据分析的准确性。',
        assignedAt: '2025-01-16',
        submittedAt: undefined
      },
      {
        id: 'task-2',
        articleId: 'art-2',
        title: '基于机器学习的色彩搭配算法',
        abstract: '提出了一种基于机器学习的自动色彩搭配算法，能够根据设计需求自动生成和谐的色彩方案。算法采用深度神经网络，通过学习大量优秀设计作品的颜色搭配规律，实现了智能化的色彩推荐。实验结果表明，该算法生成的色彩方案在美学评价和用户满意度方面均优于传统方法。',
        authors: '王五,赵六',
        category: '色彩技术',
        submissionDate: '2025-01-10',
        deadline: '2025-02-10',
        status: 'in_progress',
        manuscriptFile: '/files/manuscript-2.pdf',
        editorComments: '请特别关注算法的创新性和实用性。',
        assignedAt: '2025-01-11',
        submittedAt: undefined
      },
      {
        id: 'task-3',
        articleId: 'art-3',
        title: '中国传统色彩文化的现代传承',
        abstract: '研究了中国传统色彩文化在现代设计中的传承与应用。通过分析古代文献和现代设计案例，探讨了传统色彩符号的现代意义。研究发现，传统色彩不仅具有美学价值，更承载着深厚的文化内涵，在现代设计中能够有效传达文化认同感。',
        authors: '孙七,周八',
        category: '色彩文化',
        submissionDate: '2025-01-05',
        deadline: '2025-02-05',
        status: 'completed',
        manuscriptFile: '/files/manuscript-3.pdf',
        editorComments: '请从文化传承的角度评价文章的价值。',
        assignedAt: '2025-01-06',
        submittedAt: '2025-01-20',
        score: 4,
        recommendation: 'minor_revision',
        comments: '文章整体质量较高，建议在实验部分增加更多数据，并补充相关参考文献。',
        confidentialComments: '作者的研究方法较为新颖，但实验样本数量可以进一步扩大。'
      },
      {
        id: 'task-4',
        articleId: 'art-4',
        title: '数字媒体中的色彩管理技术',
        abstract: '探讨了数字媒体环境下色彩管理的关键技术和标准。分析了不同色彩空间的特点和应用场景，提出了基于ICC标准的色彩管理解决方案。通过实际案例验证了该方案的有效性。',
        authors: '刘九,陈十',
        category: '色彩技术',
        submissionDate: '2025-01-01',
        deadline: '2025-02-01',
        status: 'completed',
        manuscriptFile: '/files/manuscript-4.pdf',
        editorComments: '请重点关注技术方案的实用性和创新性。',
        assignedAt: '2025-01-02',
        submittedAt: '2025-01-18',
        score: 5,
        recommendation: 'accept',
        comments: '文章质量优秀，技术方案实用性强，建议直接接受发表。',
        confidentialComments: '作者在色彩管理领域有丰富经验，文章质量很高。'
      },
      {
        id: 'task-5',
        articleId: 'art-5',
        title: '色彩在品牌设计中的心理效应',
        abstract: '分析了不同色彩在品牌设计中对消费者心理的影响。通过心理学实验和消费者调研，验证了色彩与品牌认知、情感反应之间的关系。研究结果为品牌设计师提供了科学的色彩选择指导。',
        authors: '吴十一,郑十二',
        category: '色彩设计',
        submissionDate: '2024-12-20',
        deadline: '2025-01-20',
        status: 'declined',
        manuscriptFile: '/files/manuscript-5.pdf',
        editorComments: '请从品牌设计角度评价文章的实用性。',
        assignedAt: '2023-12-21',
        submittedAt: undefined
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return '待审稿';
      case 'in_progress': return '审稿中';
      case 'completed': return '已完成';
      case 'declined': return '已拒绝';
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

  const handleStartReview = (task: ReviewTask) => {
    setSelectedTask(task);
    setShowReviewModal(true);
    // 更新状态为审稿中
    setReviewTasks(prev => prev.map(t => 
      t.id === task.id ? { ...t, status: 'in_progress' as const } : t
    ));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.score || !reviewForm.recommendation || !reviewForm.comments) {
      alert('请填写所有必填字段');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setReviewTasks(prev => prev.map(task => 
        task.id === selectedTask?.id 
          ? { 
              ...task, 
              status: 'completed' as const,
              submittedAt: new Date().toISOString().split('T')[0],
              score: parseInt(reviewForm.score),
              recommendation: reviewForm.recommendation as any,
              comments: reviewForm.comments,
              confidentialComments: reviewForm.confidentialComments
            }
          : task
      ));
      
      setShowReviewModal(false);
      setReviewForm({ score: '', recommendation: '', comments: '', confidentialComments: '' });
      alert('审稿意见提交成功！');
    } catch (error) {
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineReview = async (task: ReviewTask) => {
    if (confirm('确定要拒绝这个审稿任务吗？')) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setReviewTasks(prev => prev.map(t => 
          t.id === task.id ? { ...t, status: 'declined' as const } : t
        ));
        
        alert('已拒绝审稿任务');
      } catch (error) {
        alert('操作失败，请重试');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownloadFile = (task: ReviewTask) => {
    if (typeof window === 'undefined') return;
    
    if (task.manuscriptFile) {
      const link = document.createElement('a');
      link.href = task.manuscriptFile;
      link.download = `${task.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('文件不存在');
    }
  };

  if (!session) {
    router.push('/auth/signin');
    return <div>加载中...</div>;
  }

  if (session.user?.role !== 'reviewer' && session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">权限不足</h2>
            <p className="text-gray-600 mb-4">您没有访问审稿人面板的权限</p>
            <Button onClick={() => router.push('/')} className="w-full">
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingTasks = reviewTasks.filter(task => task.status === 'assigned' || task.status === 'in_progress');
  const completedTasks = reviewTasks.filter(task => task.status === 'completed' || task.status === 'declined');

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
                审稿人工作台
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
                  审稿工作台
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
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {pendingTasks.length}
              </div>
              <div className="text-gray-600">待审稿</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">
                {reviewTasks.filter(t => t.status === 'in_progress').length}
              </div>
              <div className="text-gray-600">审稿中</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {completedTasks.length}
              </div>
              <div className="text-gray-600">已完成</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {reviewTasks.length}
              </div>
              <div className="text-gray-600">总任务</div>
            </CardContent>
          </Card>
        </div>

        {/* 标签页切换 */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant="ghost"
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'pending' 
                  ? 'bg-white text-blue-600 shadow-sm font-medium' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              待审稿件 ({pendingTasks.length})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'completed' 
                  ? 'bg-white text-green-600 shadow-sm font-medium' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              已审稿件 ({completedTasks.length})
            </Button>
          </div>
        </div>

        {/* 稿件列表 */}
        <div className="space-y-4">
          {activeTab === 'pending' ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">待审稿件</h2>
              {pendingTasks.length === 0 ? (
                <Card className="border-purple-200">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      暂无待审稿件
                    </h3>
                    <p className="text-gray-500">
                      编辑分配审稿任务后，您将在这里看到待审稿的文章
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingTasks.map((task) => (
                  <Card key={task.id} className="border-purple-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {task.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {task.abstract}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>作者: {task.authors}</span>
                            <span>分类: {task.category}</span>
                            <span>投稿时间: {task.submissionDate}</span>
                            <span className="text-red-600">截止时间: {task.deadline}</span>
                          </div>
                          
                          {task.editorComments && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="text-sm font-semibold text-blue-800 mb-1">编辑说明:</h4>
                              <p className="text-sm text-blue-700">{task.editorComments}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusText(task.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {task.status === 'assigned' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                              onClick={() => handleStartReview(task)}
                            >
                              开始审稿
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-red-300 text-red-600 hover:bg-red-50"
                              onClick={() => handleDeclineReview(task)}
                            >
                              拒绝审稿
                            </Button>
                          </>
                        )}
                        
                        {task.status === 'in_progress' && (
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                            onClick={() => handleStartReview(task)}
                          >
                            继续审稿
                          </Button>
                        )}
                        
                        {task.manuscriptFile && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-300 text-purple-600 hover:bg-purple-50"
                            onClick={() => handleDownloadFile(task)}
                          >
                            下载稿件
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">已审稿件</h2>
              {completedTasks.length === 0 ? (
                <Card className="border-purple-200">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      暂无已审稿件
                    </h3>
                    <p className="text-gray-500">
                      完成审稿任务后，您将在这里看到已审稿的文章
                    </p>
                  </CardContent>
                </Card>
              ) : (
                completedTasks.map((task) => (
                  <Card key={task.id} className="border-purple-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {task.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {task.abstract}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>作者: {task.authors}</span>
                            <span>分类: {task.category}</span>
                            <span>投稿时间: {task.submissionDate}</span>
                            <span>审稿完成: {task.submittedAt}</span>
                          </div>
                          
                          {task.status === 'completed' && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center space-x-4 mb-2">
                                <Badge className={getRecommendationColor(task.recommendation || '')}>
                                  {getRecommendationText(task.recommendation || '')}
                                </Badge>
                                {task.score && (
                                  <span className="text-sm text-gray-600">评分: {task.score}/5</span>
                                )}
                              </div>
                              {task.comments && (
                                <p className="text-sm text-green-700">{task.comments}</p>
                              )}
                            </div>
                          )}
                          
                          {task.status === 'declined' && (
                            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-sm text-red-700">已拒绝审稿此任务</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusText(task.status)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                          onClick={() => handleStartReview(task)}
                        >
                          查看详情
                        </Button>
                        
                        {task.manuscriptFile && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-purple-300 text-purple-600 hover:bg-purple-50"
                            onClick={() => handleDownloadFile(task)}
                          >
                            下载稿件
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}
        </div>

        {/* 审稿表单模态框 */}
        {showReviewModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-purple-600 mr-2">📝</span>
                    审稿意见
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowReviewModal(false)}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  对文章 "{selectedTask.title}" 进行审稿评价
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 文章信息 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">文章信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">标题:</span>
                      <p className="text-gray-900 font-medium">{selectedTask.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">作者:</span>
                      <p className="text-gray-900">{selectedTask.authors}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">分类:</span>
                      <p className="text-gray-900">{selectedTask.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">截止时间:</span>
                      <p className="text-gray-900">{selectedTask.deadline}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600">摘要:</span>
                    <p className="text-gray-900 mt-1">{selectedTask.abstract}</p>
                  </div>
                </div>

                {/* 审稿表单 */}
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label htmlFor="score" className="text-gray-700">评分 (1-5分) *</Label>
                    <Select 
                      value={reviewForm.score} 
                      onValueChange={(value) => setReviewForm(prev => ({ ...prev, score: value }))}
                    >
                      <SelectTrigger className="border-purple-300">
                        <SelectValue placeholder="请选择评分" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5分 - 优秀</SelectItem>
                        <SelectItem value="4">4分 - 良好</SelectItem>
                        <SelectItem value="3">3分 - 一般</SelectItem>
                        <SelectItem value="2">2分 - 较差</SelectItem>
                        <SelectItem value="1">1分 - 很差</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="recommendation" className="text-gray-700">推荐意见 *</Label>
                    <Select 
                      value={reviewForm.recommendation} 
                      onValueChange={(value) => setReviewForm(prev => ({ ...prev, recommendation: value }))}
                    >
                      <SelectTrigger className="border-purple-300">
                        <SelectValue placeholder="请选择推荐意见" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accept">接受发表</SelectItem>
                        <SelectItem value="minor_revision">小修后接受</SelectItem>
                        <SelectItem value="major_revision">大修后重新审稿</SelectItem>
                        <SelectItem value="reject">拒绝发表</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="comments" className="text-gray-700">给作者的意见 *</Label>
                    <Textarea
                      id="comments"
                      value={reviewForm.comments}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comments: e.target.value }))}
                      placeholder="请详细说明文章的优点、不足和改进建议..."
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="confidentialComments" className="text-gray-700">给编辑的私密意见</Label>
                    <Textarea
                      id="confidentialComments"
                      value={reviewForm.confidentialComments}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, confidentialComments: e.target.value }))}
                      placeholder="这些意见只有编辑能看到，可以包含更详细的评价..."
                      className="border-purple-300 focus:ring-purple-500 focus:border-purple-500"
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      {loading ? '提交中...' : '提交审稿意见'}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewModal(false)}
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
      </main>
      
      {/* Footer */}
      <SimpleFooter />
      
      {/* 退出确认弹窗 */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || session?.user?.email || undefined}
      />
    </div>
  );
}