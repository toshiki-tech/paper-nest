'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

interface Review {
  id: string;
  articleId: string;
  articleTitle: string;
  status: 'pending' | 'completed' | 'declined';
  recommendation?: 'accept' | 'minor_revisions' | 'major_revisions' | 'reject';
  comments?: string;
  assignedAt: string;
  deadline?: string;
}

export default function ReviewPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [comments, setComments] = useState('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // 模拟数据
    const mockReviews: Review[] = [
      {
        id: '1',
        articleId: 'art-1',
        articleTitle: '色彩心理学在品牌设计中的应用研究',
        status: 'pending',
        assignedAt: '2024-01-15',
        deadline: '2024-02-15'
      },
      {
        id: '2',
        articleId: 'art-2',
        articleTitle: '数字媒体中色彩再现技术的创新与发展',
        status: 'completed',
        recommendation: 'minor_revisions',
        comments: '文章整体质量较高，建议在实验部分增加更多数据支撑...',
        assignedAt: '2024-01-10',
        deadline: '2024-02-10'
      },
      {
        id: '3',
        articleId: 'art-3',
        articleTitle: '色彩文化差异对消费者购买决策的影响',
        status: 'pending',
        assignedAt: '2024-01-20',
        deadline: '2024-02-20'
      }
    ];

    setReviews(mockReviews);
  }, [session, router]);

  const handleSubmitReview = async () => {
    if (!selectedReview || !comments || !recommendation) {
      alert('请填写完整的审稿意见');
      return;
    }

    setLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新本地状态
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, status: 'completed', recommendation: recommendation as any, comments }
          : review
      ));
      
      setSelectedReview(null);
      setComments('');
      setRecommendation('');
      alert('审稿意见提交成功！');
    } catch (error) {
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationText = (rec?: string) => {
    switch (rec) {
      case 'accept': return '接受';
      case 'minor_revisions': return '小修';
      case 'major_revisions': return '大修';
      case 'reject': return '拒绝';
      default: return '未评价';
    }
  };

  if (!session) {
    return <div>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="md" />
              <h1 className="text-xl font-bold text-gray-900">
                审稿管理
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">欢迎，{session.user?.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 审稿列表 */}
          <div className="lg:col-span-1">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-orange-600 mr-2">📋</span>
                  我的审稿任务
                </CardTitle>
                <CardDescription>
                  您当前需要审稿的文章列表
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <Card 
                    key={review.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedReview?.id === review.id ? 'ring-2 ring-orange-500' : ''
                    }`}
                    onClick={() => setSelectedReview(review)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getStatusColor(review.status)}>
                          {review.status === 'pending' ? '待审稿' : 
                           review.status === 'completed' ? '已完成' : '已拒绝'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {review.deadline}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                        {review.articleTitle}
                      </h4>
                      <p className="text-xs text-gray-500">
                        分配时间: {review.assignedAt}
                      </p>
                      {review.recommendation && (
                        <p className="text-xs text-orange-600 mt-1">
                          建议: {getRecommendationText(review.recommendation)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 审稿详情 */}
          <div className="lg:col-span-2">
            {selectedReview ? (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="text-orange-600 mr-2">✏️</span>
                      审稿详情
                    </span>
                    <Badge className={getStatusColor(selectedReview.status)}>
                      {selectedReview.status === 'pending' ? '待审稿' : 
                       selectedReview.status === 'completed' ? '已完成' : '已拒绝'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {selectedReview.articleTitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 文章信息 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">文章信息</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">文章ID:</span>
                        <span className="ml-2">{selectedReview.articleId}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">分配时间:</span>
                        <span className="ml-2">{selectedReview.assignedAt}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">截止时间:</span>
                        <span className="ml-2">{selectedReview.deadline}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">审稿状态:</span>
                        <span className="ml-2">{getRecommendationText(selectedReview.recommendation)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 审稿意见 */}
                  {selectedReview.status === 'pending' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          审稿建议
                        </label>
                        <Select value={recommendation} onValueChange={setRecommendation}>
                          <SelectTrigger className="border-orange-300">
                            <SelectValue placeholder="请选择审稿建议" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accept">接受</SelectItem>
                            <SelectItem value="minor_revisions">小修</SelectItem>
                            <SelectItem value="major_revisions">大修</SelectItem>
                            <SelectItem value="reject">拒绝</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          审稿意见
                        </label>
                        <Textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          placeholder="请详细说明您的审稿意见，包括文章的优点、不足和改进建议..."
                          className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                          rows={8}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button 
                          onClick={handleSubmitReview}
                          disabled={loading}
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        >
                          {loading ? '提交中...' : '提交审稿意见'}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setComments('');
                            setRecommendation('');
                          }}
                          className="border-orange-300 text-orange-600 hover:bg-orange-50"
                        >
                          清空
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          审稿建议
                        </label>
                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          {getRecommendationText(selectedReview.recommendation)}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          审稿意见
                        </label>
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          {selectedReview.comments}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    请选择要审稿的文章
                  </h3>
                  <p className="text-gray-500">
                    从左侧列表中选择一篇文章开始审稿
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
