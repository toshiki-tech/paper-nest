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
import { getArticleStatusText, getRecommendationText } from '@/lib/translations';

interface Submission {
  id: string;
  title: string;
  abstract: string;
  keywords: string;
  category: string;
  status: 'draft' | 'submitted' | 'under_review' | 'revision_requested' | 'accepted' | 'rejected' | 'published';
  submittedAt: string;
  lastModified: string;
  fileUrl?: string;
  finalPdfUrl?: string; // 最终发表的PDF文件
  reviewComments?: string;
  canWithdraw?: boolean;
  canEdit?: boolean;
  canResubmit?: boolean;
  canUploadFinalPdf?: boolean; // 是否可以上传最终PDF
  paymentInfo?: PaymentInfo; // 付款信息
  // 新增字段
  reviews?: Review[];
  editorDecision?: EditorDecision;
  reviewProgress?: ReviewProgress;
  // 历史记录字段
  history?: SubmissionHistory[];
  versions?: SubmissionVersion[];
}

interface Review {
  id: string;
  reviewerName: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'declined';
  score?: number;
  recommendation?: 'accept' | 'minor_revision' | 'major_revision' | 'reject';
  comments?: string;
  submittedAt?: string;
  deadline?: string;
}

interface EditorDecision {
  decision: 'accepted' | 'revision_requested' | 'rejected';
  comments?: string;
  decidedAt?: string;
  decidedBy?: string;
}

interface ReviewProgress {
  totalReviewers: number;
  completedReviews: number;
  pendingReviews: number;
  declinedReviews: number;
}

interface SubmissionHistory {
  id: string;
  submissionId: string;
  action: 'submitted' | 'resubmitted' | 'withdrawn' | 'reviewer_assigned' | 'review_completed' | 'decision_made' | 'status_changed';
  actionBy: string;
  actionAt: string;
  description: string;
  details?: {
    previousStatus?: string;
    newStatus?: string;
    reviewerName?: string;
    decision?: string;
    comments?: string;
    fileUrl?: string;
  };
}

interface SubmissionVersion {
  id: string;
  submissionId: string;
  version: number;
  title: string;
  abstract: string;
  keywords: string;
  category: string;
  fileUrl: string;
  submittedAt: string;
  submittedBy: string;
  isCurrent: boolean;
}

interface PaymentInfo {
  accountName: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  currency: string;
  dueDate: string;
  paymentStatus: 'pending' | 'paid' | 'overdue';
  paymentDate?: string;
  transactionId?: string;
}

export default function SubmissionPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFinalPdfModal, setShowFinalPdfModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    category: '',
    file: null as File | null
  });

  // 最终PDF上传状态
  const [finalPdfFile, setFinalPdfFile] = useState<File | null>(null);

  const categories = [
    { id: 'color-theory', name: '色彩理论' },
    { id: 'color-psychology', name: '色彩心理学' },
    { id: 'color-design', name: '色彩设计' },
    { id: 'color-technology', name: '色彩技术' },
    { id: 'color-culture', name: '色彩文化' }
  ];

  // 模拟数据 - 只在组件首次加载时运行
  useEffect(() => {
    // 如果已经有数据，不重新加载
    if (submissions.length > 0) return;
    
    setSubmissions([
      {
        id: 'sub-1',
        title: '色彩心理学在UI设计中的应用研究',
        abstract: '本文探讨了色彩心理学在用户界面设计中的重要作用，通过实验验证了不同色彩对用户行为的影响...',
        keywords: '色彩心理学,UI设计,用户体验',
        category: 'color-psychology',
        status: 'submitted',
        submittedAt: '2025-01-15',
        lastModified: '2025-01-15',
        fileUrl: '/files/manuscript-1.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 0,
          completedReviews: 0,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-2',
        title: '基于机器学习的色彩搭配算法',
        abstract: '提出了一种基于机器学习的自动色彩搭配算法，能够根据设计需求自动生成和谐的色彩方案...',
        keywords: '机器学习,色彩搭配,算法',
        category: 'color-technology',
        status: 'under_review',
        submittedAt: '2025-01-10',
        lastModified: '2025-01-10',
        fileUrl: '/files/manuscript-2.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviews: [
          {
            id: 'rev-1',
            reviewerName: '审稿专家A',
            status: 'completed',
            score: 4,
            recommendation: 'minor_revision',
            comments: '文章整体质量较高，建议在实验部分增加更多数据，并补充相关参考文献。',
            submittedAt: '2025-01-20',
            deadline: '2025-01-25'
          },
          {
            id: 'rev-2',
            reviewerName: '审稿专家B',
            status: 'in_progress',
            deadline: '2025-01-30'
          }
        ],
        reviewProgress: {
          totalReviewers: 2,
          completedReviews: 1,
          pendingReviews: 1,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-3',
        title: '中国传统色彩文化的现代传承',
        abstract: '研究了中国传统色彩文化在现代设计中的传承与应用，探讨了传统色彩符号的现代意义...',
        keywords: '传统色彩,文化传承,现代设计',
        category: 'color-culture',
        status: 'revision_requested',
        submittedAt: '2025-01-05',
        lastModified: '2025-01-20',
        fileUrl: '/files/manuscript-3.pdf',
        reviewComments: '文章整体质量较高，建议在实验部分增加更多数据，并补充相关参考文献。',
        canWithdraw: false,
        canEdit: false,
        canResubmit: true,
        reviews: [
          {
            id: 'rev-3',
            reviewerName: '审稿专家C',
            status: 'completed',
            score: 3,
            recommendation: 'major_revision',
            comments: '文章需要重大修改，建议重新组织结构和补充实验数据。',
            submittedAt: '2025-01-18',
            deadline: '2025-01-23'
          },
          {
            id: 'rev-4',
            reviewerName: '审稿专家D',
            status: 'completed',
            score: 4,
            recommendation: 'minor_revision',
            comments: '文章创新性较强，但语言表达需要润色，建议补充更多案例。',
            submittedAt: '2025-01-19',
            deadline: '2025-01-24'
          }
        ],
        editorDecision: {
          decision: 'revision_requested',
          comments: '根据审稿专家意见，文章需要重大修改。请作者根据审稿意见进行修改，并补充实验数据。',
          decidedAt: '2025-01-20',
          decidedBy: '编辑张三'
        },
        reviewProgress: {
          totalReviewers: 2,
          completedReviews: 2,
          pendingReviews: 0,
          declinedReviews: 0
        },
        history: [
          {
            id: 'hist-1',
            submissionId: 'sub-3',
            action: 'submitted',
            actionBy: '作者',
            actionAt: '2025-01-05',
            description: '首次投稿',
            details: {
              fileUrl: '/files/manuscript-3-v1.pdf'
            }
          },
          {
            id: 'hist-2',
            submissionId: 'sub-3',
            action: 'reviewer_assigned',
            actionBy: '编辑张三',
            actionAt: '2025-01-06',
            description: '分配审稿人：审稿专家C',
            details: {
              reviewerName: '审稿专家C'
            }
          },
          {
            id: 'hist-3',
            submissionId: 'sub-3',
            action: 'reviewer_assigned',
            actionBy: '编辑张三',
            actionAt: '2025-01-07',
            description: '分配审稿人：审稿专家D',
            details: {
              reviewerName: '审稿专家D'
            }
          },
          {
            id: 'hist-4',
            submissionId: 'sub-3',
            action: 'review_completed',
            actionBy: '审稿专家C',
            actionAt: '2025-01-18',
            description: '审稿专家C完成审稿',
            details: {
              decision: 'major_revision',
              comments: '文章需要重大修改，建议重新组织结构和补充实验数据。'
            }
          },
          {
            id: 'hist-5',
            submissionId: 'sub-3',
            action: 'review_completed',
            actionBy: '审稿专家D',
            actionAt: '2025-01-19',
            description: '审稿专家D完成审稿',
            details: {
              decision: 'minor_revision',
              comments: '文章创新性较强，但语言表达需要润色，建议补充更多案例。'
            }
          },
          {
            id: 'hist-6',
            submissionId: 'sub-3',
            action: 'decision_made',
            actionBy: '编辑张三',
            actionAt: '2025-01-20',
            description: '编辑做出决策：需要修改',
            details: {
              decision: 'revision_requested',
              comments: '根据审稿专家意见，文章需要重大修改。请作者根据审稿意见进行修改，并补充实验数据。'
            }
          },
          {
            id: 'hist-7',
            submissionId: 'sub-3',
            action: 'status_changed',
            actionBy: '系统',
            actionAt: '2025-01-20',
            description: '状态变更：审稿中 → 需要修改',
            details: {
              previousStatus: 'under_review',
              newStatus: 'revision_requested'
            }
          }
        ],
        versions: [
          {
            id: 'ver-1',
            submissionId: 'sub-3',
            version: 1,
            title: '中国传统色彩文化的现代传承',
            abstract: '研究了中国传统色彩文化在现代设计中的传承与应用，探讨了传统色彩符号的现代意义...',
            keywords: '传统色彩,文化传承,现代设计',
            category: 'color-culture',
            fileUrl: '/files/manuscript-3-v1.pdf',
            submittedAt: '2025-01-05',
            submittedBy: '作者',
            isCurrent: false
          },
          {
            id: 'ver-2',
            submissionId: 'sub-3',
            version: 2,
            title: '中国传统色彩文化的现代传承（修改版）',
            abstract: '研究了中国传统色彩文化在现代设计中的传承与应用，探讨了传统色彩符号的现代意义。本文增加了更多实验数据和案例分析...',
            keywords: '传统色彩,文化传承,现代设计,实验数据',
            category: 'color-culture',
            fileUrl: '/files/manuscript-3-v2.pdf',
            submittedAt: '2025-01-20',
            submittedBy: '作者',
            isCurrent: true
          }
        ]
      },
      {
        id: 'sub-4',
        title: '数字媒体中的色彩管理技术',
        abstract: '探讨了数字媒体环境下色彩管理的关键技术和标准...',
        keywords: '数字媒体,色彩管理,技术标准',
        category: 'color-technology',
        status: 'draft',
        submittedAt: '',
        lastModified: '2025-01-22',
        fileUrl: '/files/manuscript-4.pdf',
        canWithdraw: false,
        canEdit: true,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 0,
          completedReviews: 0,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-5',
        title: '色彩在品牌设计中的心理效应',
        abstract: '分析了不同色彩在品牌设计中对消费者心理的影响...',
        keywords: '品牌设计,色彩心理,消费者行为',
        category: 'color-design',
        status: 'accepted',
        submittedAt: '2025-01-01',
        lastModified: '2025-01-18',
        fileUrl: '/files/manuscript-5.pdf',
        canWithdraw: false,
        canEdit: false,
        canResubmit: false,
        canUploadFinalPdf: true,
        paymentInfo: {
          accountName: '《色彩》期刊编辑部',
          accountNumber: '1234567890123456',
          bankName: '中国工商银行北京分行',
          amount: 800,
          currency: 'CNY',
          dueDate: '2025-02-15',
          paymentStatus: 'pending'
        },
        reviews: [
          {
            id: 'rev-5',
            reviewerName: '审稿专家E',
            status: 'completed',
            score: 5,
            recommendation: 'accept',
            comments: '文章质量优秀，技术方案实用性强，建议直接接受发表。',
            submittedAt: '2025-01-15',
            deadline: '2025-01-20'
          },
          {
            id: 'rev-6',
            reviewerName: '审稿专家F',
            status: 'completed',
            score: 4,
            recommendation: 'accept',
            comments: '文章内容丰富，论证充分，建议接受发表。',
            submittedAt: '2025-01-16',
            deadline: '2025-01-21'
          }
        ],
        editorDecision: {
          decision: 'accepted',
          comments: '经过审稿专家评审，文章质量优秀，建议接受发表。',
          decidedAt: '2025-01-18',
          decidedBy: '编辑李四'
        },
        reviewProgress: {
          totalReviewers: 2,
          completedReviews: 2,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-6',
        title: '色彩在医疗环境设计中的应用研究',
        abstract: '研究色彩在医疗环境设计中的应用，探讨不同色彩对患者心理状态和康复效果的影响...',
        keywords: '医疗环境,色彩应用,康复效果',
        category: 'color-medicine',
        status: 'revision_requested',
        submittedAt: '2024-12-20',
        lastModified: '2025-01-20',
        fileUrl: '/files/manuscript-6.pdf',
        canWithdraw: true,
        canEdit: true,
        canResubmit: true,
        reviews: [
          {
            id: 'rev-7',
            reviewerName: '审稿专家G',
            status: 'completed',
            score: 3,
            recommendation: 'major_revision',
            comments: '文章内容需要大幅修改，建议增加更多实验数据和案例分析。',
            submittedAt: '2025-01-10',
            deadline: '2025-01-15'
          }
        ],
        reviewProgress: {
          totalReviewers: 1,
          completedReviews: 1,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-7',
        title: '数字媒体中的色彩管理技术',
        abstract: '探讨数字媒体环境下的色彩管理技术，研究跨平台色彩一致性的实现方法...',
        keywords: '数字媒体,色彩管理,跨平台',
        category: 'digital-color',
        status: 'under_review',
        submittedAt: '2024-12-15',
        lastModified: '2024-12-15',
        fileUrl: '/files/manuscript-7.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 2,
          completedReviews: 1,
          pendingReviews: 1,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-8',
        title: '传统色彩文化的现代传承',
        abstract: '分析传统色彩文化的内涵，探讨其在现代设计中的传承与创新应用...',
        keywords: '传统色彩,文化传承,现代设计',
        category: 'color-culture',
        status: 'submitted',
        submittedAt: '2024-12-10',
        lastModified: '2024-12-10',
        fileUrl: '/files/manuscript-8.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 0,
          completedReviews: 0,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-9',
        title: '色彩在儿童教育环境中的影响',
        abstract: '研究色彩在儿童教育环境中的影响，探讨不同色彩对儿童学习效果和情绪状态的作用...',
        keywords: '儿童教育,色彩影响,学习效果',
        category: 'color-psychology',
        status: 'draft',
        submittedAt: '',
        lastModified: '2024-12-05',
        fileUrl: '/files/manuscript-9.pdf',
        canWithdraw: false,
        canEdit: true,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 0,
          completedReviews: 0,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-10',
        title: '色彩测量技术的标准化研究',
        abstract: '研究色彩测量技术的标准化问题，建立统一的色彩测量和评价体系...',
        keywords: '色彩测量,标准化,评价体系',
        category: 'color-technology',
        status: 'rejected',
        submittedAt: '2024-11-30',
        lastModified: '2024-12-01',
        fileUrl: '/files/manuscript-10.pdf',
        canWithdraw: false,
        canEdit: false,
        canResubmit: true,
        reviews: [
          {
            id: 'rev-8',
            reviewerName: '审稿专家H',
            status: 'completed',
            score: 2,
            recommendation: 'reject',
            comments: '文章质量不符合发表要求，建议重新研究后再投稿。',
            submittedAt: '2024-12-01',
            deadline: '2024-12-05'
          }
        ],
        editorDecision: {
          decision: 'rejected',
          comments: '经过审稿专家评审，文章质量不符合发表要求，建议重新研究后再投稿。',
          decidedAt: '2024-12-01',
          decidedBy: '主编'
        },
        reviewProgress: {
          totalReviewers: 1,
          completedReviews: 1,
          pendingReviews: 0,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-11',
        title: '色彩在建筑立面设计中的表现力',
        abstract: '分析色彩在建筑立面设计中的表现力，研究色彩对建筑视觉效果和城市景观的影响...',
        keywords: '建筑立面,色彩表现,城市景观',
        category: 'color-design',
        status: 'under_review',
        submittedAt: '2024-11-25',
        lastModified: '2024-11-25',
        fileUrl: '/files/manuscript-11.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 3,
          completedReviews: 2,
          pendingReviews: 1,
          declinedReviews: 0
        }
      },
      {
        id: 'sub-12',
        title: '色彩在食品包装设计中的心理效应',
        abstract: '研究色彩在食品包装设计中的心理效应，探讨色彩对消费者购买决策的影响机制...',
        keywords: '食品包装,色彩心理,购买决策',
        category: 'color-psychology',
        status: 'submitted',
        submittedAt: '2024-11-20',
        lastModified: '2024-11-20',
        fileUrl: '/files/manuscript-12.pdf',
        canWithdraw: true,
        canEdit: false,
        canResubmit: false,
        reviewProgress: {
          totalReviewers: 0,
          completedReviews: 0,
          pendingReviews: 0,
          declinedReviews: 0
        }
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'revision_requested': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'published': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'submitted': return '已投稿';
      case 'under_review': return '审稿中';
      case 'revision_requested': return '需要修改';
      case 'accepted': return '已录用';
      case 'published': return '已发表';
      case 'rejected': return '已拒绝';
      default: return '未知状态';
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

  const getDecisionText = (decision: string) => {
    switch (decision) {
      case 'accepted': return '接受发表';
      case 'revision_requested': return '需要修改';
      case 'rejected': return '拒绝发表';
      default: return '未决策';
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'revision_requested': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'submitted': return '📝';
      case 'resubmitted': return '🔄';
      case 'withdrawn': return '↩️';
      case 'reviewer_assigned': return '👥';
      case 'review_completed': return '✅';
      case 'decision_made': return '⚖️';
      case 'status_changed': return '🔄';
      default: return '📋';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'resubmitted': return 'bg-purple-100 text-purple-800';
      case 'withdrawn': return 'bg-yellow-100 text-yellow-800';
      case 'reviewer_assigned': return 'bg-indigo-100 text-indigo-800';
      case 'review_completed': return 'bg-green-100 text-green-800';
      case 'decision_made': return 'bg-orange-100 text-orange-800';
      case 'status_changed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowDetailsModal(true);
  };

  const handleViewHistory = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowHistoryModal(true);
  };

  const handleDownloadFile = (submission: Submission) => {
    if (typeof window === 'undefined') return;
    
    if (submission.fileUrl) {
      const link = document.createElement('a');
      link.href = submission.fileUrl;
      link.download = `${submission.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('文件不存在');
    }
  };

  const handleEditArticle = (submission: Submission) => {
    setSelectedSubmission(submission);
    setFormData({
      title: submission.title,
      abstract: submission.abstract,
      keywords: submission.keywords,
      category: submission.category,
      file: null
    });
    setShowForm(true);
  };

  const handleWithdrawArticle = async (submission: Submission) => {
    if (confirm(`确定要撤回稿件"${submission.title}"吗？撤回后可以重新编辑和提交。`)) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmissions(prev => prev.map(s => 
          s.id === submission.id 
            ? { ...s, status: 'draft' as const, canEdit: true, canWithdraw: false }
            : s
        ));
        
        alert('稿件已撤回，您可以重新编辑和提交');
      } catch (error) {
        alert('撤回失败，请重试');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResubmitArticle = (submission: Submission) => {
    setSelectedSubmission(submission);
    setFormData({
      title: submission.title,
      abstract: submission.abstract,
      keywords: submission.keywords,
      category: submission.category,
      file: null
    });
    setShowForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleFinalPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFinalPdfFile(file);
    }
  };

  const handleUploadFinalPdf = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowFinalPdfModal(true);
  };

  const handleViewPayment = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowPaymentModal(true);
  };

  const handleSubmitFinalPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!finalPdfFile || !selectedSubmission) {
      alert('请选择要上传的PDF文件');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟上传成功
      const finalPdfUrl = typeof window !== 'undefined' ? URL.createObjectURL(finalPdfFile) : '#';
      
      setSubmissions(prev => prev.map(s => 
        s.id === selectedSubmission.id 
          ? { 
              ...s, 
              finalPdfUrl,
              status: 'published' as const,
              canUploadFinalPdf: false,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : s
      ));
      
      alert('最终PDF上传成功！文章已发表。');
      setShowFinalPdfModal(false);
      setFinalPdfFile(null);
      setSelectedSubmission(null);
    } catch (error) {
      alert('上传失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    // 如果是提交投稿，需要检查所有必填字段
    if (!isDraft && (!formData.title || !formData.abstract || !formData.keywords || !formData.category || !formData.file)) {
      alert('请填写所有必填字段');
      return;
    }

    // 如果是保存草稿，只需要标题
    if (isDraft && !formData.title) {
      alert('请至少填写文章标题');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newSubmission: Submission = {
        id: selectedSubmission ? selectedSubmission.id : `sub-${Date.now()}`,
        title: formData.title,
        abstract: formData.abstract,
        keywords: formData.keywords,
        category: formData.category,
        status: isDraft ? 'draft' : 'submitted',
        submittedAt: isDraft ? '' : new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        fileUrl: formData.file ? (typeof window !== 'undefined' ? URL.createObjectURL(formData.file) : '#') : undefined,
        canWithdraw: isDraft ? false : true,  // 草稿不能撤回，已投稿可以撤回
        canEdit: isDraft ? true : false,     // 草稿可以编辑，已投稿不能编辑
        canResubmit: false                   // 新提交的稿件不需要重新提交
      };

      if (selectedSubmission) {
        // 更新现有稿件
        setSubmissions(prev => {
          const updated = prev.map(s => 
            s.id === selectedSubmission.id ? newSubmission : s
          );
          console.log('更新稿件:', newSubmission);
          return updated;
        });
        alert(isDraft ? '稿件已保存为草稿！' : '稿件修改并重新提交成功！');
      } else {
        // 添加新稿件
        setSubmissions(prev => {
          const updated = [newSubmission, ...prev];
          console.log('添加新稿件:', newSubmission);
          console.log('更新后的列表:', updated);
          return updated;
        });
        alert(isDraft ? '草稿保存成功！' : '投稿成功！');
      }
      
      setFormData({
        title: '',
        abstract: '',
        keywords: '',
        category: '',
        file: null
      });
      
      setShowForm(false);
      setSelectedSubmission(null);
    } catch (error) {
      alert('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    router.push('/auth/signin');
    return <div>加载中...</div>;
  }

  if (session.user?.role !== 'author' && session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="p-6 text-center">
            <div className="text-red-600 text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">权限不足</h2>
            <p className="text-gray-600 mb-4">您没有访问作者工作台的权限</p>
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
                作者工作台
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
                className="border-pink-300 text-pink-600 hover:bg-pink-50"
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
                  作者工作台
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
                className="border-pink-300 text-pink-600 hover:bg-pink-50 px-2"
              >
                首页
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 快速操作区 */}
        <div className="mb-8">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-orange-600 mr-2">📝</span>
                快速操作
              </CardTitle>
              <CardDescription>
                开始您的新投稿
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                新建投稿
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 稿件统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{submissions.length}</div>
              <div className="text-gray-600">总稿件数</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {submissions.filter(s => s.status === 'submitted' || s.status === 'under_review').length}
              </div>
              <div className="text-gray-600">审稿中</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {submissions.filter(s => s.status === 'accepted' || s.status === 'published').length}
              </div>
              <div className="text-gray-600">已录用</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">
                {submissions.filter(s => s.status === 'draft').length}
              </div>
              <div className="text-gray-600">草稿</div>
            </CardContent>
          </Card>
        </div>

        {/* 稿件列表 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">我的稿件</h2>
          
          {/* 分页计算 */}
          {(() => {
            const totalPages = Math.ceil(submissions.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentSubmissions = submissions
              .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
              .slice(startIndex, endIndex);
            
            return (
              <>
                {submissions.length === 0 ? (
            <Card className="border-orange-200">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  暂无稿件
                </h3>
                <p className="text-gray-500 mb-4">
                  开始您的第一篇投稿吧
                </p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  立即投稿
                </Button>
              </CardContent>
            </Card>
          ) : (
            currentSubmissions.map((submission) => (
              <Card key={submission.id} className="border-orange-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex-1">
                        {submission.title}
                      </h3>
                      <Badge className={getStatusColor(submission.status)}>
                        {getStatusText(submission.status)}
                      </Badge>
                    </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {submission.abstract}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-500">
                        <span>关键词: {submission.keywords}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>分类: {categories.find(c => c.id === submission.category)?.name}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>投稿时间: {submission.submittedAt || '未提交'}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>最后修改: {submission.lastModified}</span>
                      </div>
                      
                      {/* 审稿进度 */}
                      {submission.reviewProgress && submission.reviewProgress.totalReviewers > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="text-sm font-semibold text-blue-800 mb-2">审稿进度</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
                            <span className="text-blue-700">
                              总审稿人: {submission.reviewProgress.totalReviewers}
                            </span>
                            <span className="text-green-700">
                              已完成: {submission.reviewProgress.completedReviews}
                            </span>
                            <span className="text-yellow-700">
                              进行中: {submission.reviewProgress.pendingReviews}
                            </span>
                            {submission.reviewProgress.declinedReviews > 0 && (
                              <span className="text-red-700">
                                已拒绝: {submission.reviewProgress.declinedReviews}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* 审稿意见 */}
                      {submission.reviews && submission.reviews.length > 0 && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="text-sm font-semibold text-yellow-800 mb-2">审稿意见</h4>
                          <div className="space-y-2">
                            {submission.reviews
                              .filter(review => review.status === 'completed' && review.comments)
                              .map((review) => (
                                <div key={review.id} className="text-sm">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-yellow-800">{review.reviewerName}</span>
                                    <Badge className={getRecommendationColor(review.recommendation || '')}>
                                      {getRecommendationText(review.recommendation || '')}
                                    </Badge>
                                    {review.score && (
                                      <span className="text-yellow-700">评分: {review.score}/5</span>
                                    )}
                                  </div>
                                  <p className="text-yellow-700">{review.comments}</p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                      
                      {/* 编辑决策 */}
                      {submission.editorDecision && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="text-sm font-semibold text-green-800 mb-2">编辑决策</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-1">
                            <Badge className={getDecisionColor(submission.editorDecision.decision)}>
                              {getDecisionText(submission.editorDecision.decision)}
                            </Badge>
                            <span className="text-sm text-green-700">
                              决策时间: {submission.editorDecision.decidedAt}
                            </span>
                            <span className="text-sm text-green-700">
                              决策人: {submission.editorDecision.decidedBy}
                            </span>
                          </div>
                          {submission.editorDecision.comments && (
                            <p className="text-sm text-green-700">{submission.editorDecision.comments}</p>
                          )}
                        </div>
                      )}
                      
                      {/* 审稿历史记录 */}
                      {submission.history && submission.history.length > 0 && (
                        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">审稿历史记录</h4>
                          <div className="space-y-2">
                            {submission.history.slice(0, 3).map((historyItem) => (
                              <div key={historyItem.id} className="flex items-center space-x-2 text-sm">
                                <span className="text-lg">{getActionIcon(historyItem.action)}</span>
                                <span className="text-gray-700">{historyItem.description}</span>
                                <span className="text-gray-500">- {historyItem.actionBy}</span>
                                <span className="text-gray-500">{historyItem.actionAt}</span>
                              </div>
                            ))}
                            {submission.history.length > 3 && (
                              <div className="text-sm text-gray-500 text-center">
                                <span>还有 {submission.history.length - 3} 条审稿记录</span>
                                <button 
                                  onClick={() => handleViewHistory(submission)}
                                  className="text-blue-600 hover:text-blue-800 ml-1 underline cursor-pointer"
                                >
                                  查看全部
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* 版本信息 */}
                      {submission.versions && submission.versions.length > 1 && (
                        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <h4 className="text-sm font-semibold text-purple-800 mb-2">版本信息</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
                            <span className="text-purple-700">
                              当前版本: v{submission.versions.find(v => v.isCurrent)?.version}
                            </span>
                            <span className="text-purple-700">
                              总版本数: {submission.versions.length}
                            </span>
                            <span className="text-purple-700">
                              最新修改: {submission.versions.find(v => v.isCurrent)?.submittedAt}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-pink-300 text-pink-600 hover:bg-pink-50 w-full sm:w-auto"
                      onClick={() => handleViewDetails(submission)}
                    >
                      查看详情
                    </Button>
                    
                    {submission.history && submission.history.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
                        onClick={() => handleViewHistory(submission)}
                      >
                        📋 审稿历史
                      </Button>
                    )}
                    
                    {submission.canEdit && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 w-full sm:w-auto"
                        onClick={() => handleEditArticle(submission)}
                      >
                        编辑
                      </Button>
                    )}
                    
                    {submission.canWithdraw && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 w-full sm:w-auto"
                        onClick={() => handleWithdrawArticle(submission)}
                      >
                        撤回
                      </Button>
                    )}
                    
                    {submission.canResubmit && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 w-full sm:w-auto"
                        onClick={() => handleResubmitArticle(submission)}
                      >
                        重新提交
                      </Button>
                    )}
                    
                    {submission.canUploadFinalPdf && (
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 w-full sm:w-auto"
                        onClick={() => handleUploadFinalPdf(submission)}
                      >
                        上传最终PDF
                      </Button>
                    )}
                    
                    {submission.paymentInfo && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
                        onClick={() => handleViewPayment(submission)}
                      >
                        💰 付款信息
                      </Button>
                    )}
                    
                    {submission.fileUrl && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 w-full sm:w-auto"
                        onClick={() => handleDownloadFile(submission)}
                      >
                        下载文件
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          
          {/* 分页组件 */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
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
                    className={currentPage === page ? "bg-orange-600 text-white" : ""}
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
          </>
            );
          })()}
        </div>

        {/* 投稿表单模态框 */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-orange-600 mr-2">📝</span>
                    {selectedSubmission ? '修改稿件' : '新建投稿'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedSubmission(null);
                    }}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  {selectedSubmission ? '修改稿件信息并重新提交' : '请填写文章信息并上传文件'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-gray-700">文章标题 *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="请输入文章标题"
                      className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="abstract" className="text-gray-700">摘要 <span className="text-orange-600">*</span></Label>
                    <Textarea
                      id="abstract"
                      value={formData.abstract}
                      onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                      placeholder="请输入文章摘要（200-500字）"
                      className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-orange-600">*</span> 提交投稿时必填
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="keywords" className="text-gray-700">关键词 <span className="text-orange-600">*</span></Label>
                    <Input
                      id="keywords"
                      value={formData.keywords}
                      onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                      placeholder="请输入关键词，用逗号分隔"
                      className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-orange-600">*</span> 提交投稿时必填
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-gray-700">文章分类 <span className="text-orange-600">*</span></Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="border-orange-300">
                        <SelectValue placeholder="请选择文章分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="text-orange-600">*</span> 提交投稿时必填
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="file" className="text-gray-700">上传文件 <span className="text-orange-600">*</span></Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileChange}
                      className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      支持Word文档(.doc, .docx)和PDF文件(.pdf)
                      <br />
                      <span className="text-orange-600">*</span> 提交投稿时必填
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      disabled={loading}
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      {loading ? '保存中...' : '保存草稿'}
                    </Button>
                    <Button 
                      type="button"
                      onClick={(e) => handleSubmit(e, false)}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    >
                      {loading ? '提交中...' : (selectedSubmission ? '重新提交' : '提交投稿')}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedSubmission(null);
                      }}
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      取消
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 投稿详情模态框 */}
        {showDetailsModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-pink-600 mr-2">📄</span>
                    稿件详情
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDetailsModal(false)}
                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">基本信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">标题</Label>
                      <p className="text-gray-900 font-medium">{selectedSubmission.title}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">状态</Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedSubmission.status)}>
                          {getStatusText(selectedSubmission.status)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-600">分类</Label>
                      <p className="text-gray-900">{categories.find(c => c.id === selectedSubmission.category)?.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">投稿时间</Label>
                      <p className="text-gray-900">{selectedSubmission.submittedAt || '未提交'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-600">摘要</Label>
                  <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedSubmission.abstract}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-600">关键词</Label>
                  <p className="text-gray-900 mt-1">{selectedSubmission.keywords}</p>
                </div>

                {/* 审稿进度 */}
                {selectedSubmission.reviewProgress && selectedSubmission.reviewProgress.totalReviewers > 0 && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">审稿进度</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{selectedSubmission.reviewProgress.totalReviewers}</div>
                        <div className="text-blue-700">总审稿人</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{selectedSubmission.reviewProgress.completedReviews}</div>
                        <div className="text-green-700">已完成</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">{selectedSubmission.reviewProgress.pendingReviews}</div>
                        <div className="text-yellow-700">进行中</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{selectedSubmission.reviewProgress.declinedReviews}</div>
                        <div className="text-red-700">已拒绝</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 审稿意见 */}
                {selectedSubmission.reviews && selectedSubmission.reviews.length > 0 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-3">审稿意见</h4>
                    <div className="space-y-4">
                      {selectedSubmission.reviews
                        .filter(review => review.status === 'completed' && review.comments)
                        .map((review) => (
                          <div key={review.id} className="p-3 bg-white rounded-lg border border-yellow-200">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-medium text-yellow-800">{review.reviewerName}</span>
                              <Badge className={getRecommendationColor(review.recommendation || '')}>
                                {getRecommendationText(review.recommendation || '')}
                              </Badge>
                              {review.score && (
                                <span className="text-sm text-yellow-700">评分: {review.score}/5</span>
                              )}
                              {review.submittedAt && (
                                <span className="text-sm text-gray-500">提交时间: {review.submittedAt}</span>
                              )}
                            </div>
                            <p className="text-yellow-700 text-sm leading-relaxed">{review.comments}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 编辑决策 */}
                {selectedSubmission.editorDecision && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-3">编辑决策</h4>
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={getDecisionColor(selectedSubmission.editorDecision.decision)}>
                          {getDecisionText(selectedSubmission.editorDecision.decision)}
                        </Badge>
                        <span className="text-sm text-green-700">
                          决策时间: {selectedSubmission.editorDecision.decidedAt}
                        </span>
                        <span className="text-sm text-green-700">
                          决策人: {selectedSubmission.editorDecision.decidedBy}
                        </span>
                      </div>
                      {selectedSubmission.editorDecision.comments && (
                        <p className="text-green-700 text-sm leading-relaxed">{selectedSubmission.editorDecision.comments}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 兼容旧的审稿意见字段 */}
                {selectedSubmission.reviewComments && !selectedSubmission.reviews && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">审稿意见</h4>
                    <p className="text-yellow-700">{selectedSubmission.reviewComments}</p>
                  </div>
                )}

                {/* 审稿历史记录 */}
                {selectedSubmission.history && selectedSubmission.history.length > 0 && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">审稿历史记录</h4>
                    <div className="space-y-3">
                      {selectedSubmission.history.map((historyItem) => (
                        <div key={historyItem.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                          <span className="text-2xl mt-1">{getActionIcon(historyItem.action)}</span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <Badge className={getActionColor(historyItem.action)}>
                                {historyItem.action}
                              </Badge>
                              <span className="text-sm text-gray-600">{historyItem.actionBy}</span>
                              <span className="text-sm text-gray-500">{historyItem.actionAt}</span>
                            </div>
                            <p className="text-gray-800 text-sm">{historyItem.description}</p>
                            {historyItem.details && (
                              <div className="mt-2 text-xs text-gray-600">
                                {historyItem.details.previousStatus && historyItem.details.newStatus && (
                                  <p>状态变更: {historyItem.details.previousStatus} → {historyItem.details.newStatus}</p>
                                )}
                                {historyItem.details.reviewerName && (
                                  <p>审稿人: {historyItem.details.reviewerName}</p>
                                )}
                                {historyItem.details.decision && (
                                  <p>决策: {historyItem.details.decision}</p>
                                )}
                                {historyItem.details.comments && (
                                  <p>说明: {historyItem.details.comments}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 版本历史 */}
                {selectedSubmission.versions && selectedSubmission.versions.length > 0 && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                      <span className="mr-2">📚</span>
                      版本历史
                      <span className="text-sm text-purple-600 ml-2">(包含历史版本文件)</span>
                    </h4>
                    <p className="text-sm text-purple-700 mb-3">
                      💡 版本历史包含所有提交过的文件版本，当前版本与上面的"当前文件"相同
                    </p>
                    <div className="space-y-3">
                      {selectedSubmission.versions.map((version) => (
                        <div key={version.id} className={`p-3 rounded-lg border ${version.isCurrent ? 'bg-purple-100 border-purple-300' : 'bg-white border-purple-200'}`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={version.isCurrent ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'}>
                              版本 {version.version} {version.isCurrent ? '(当前)' : ''}
                            </Badge>
                            <span className="text-sm text-purple-700">{version.submittedAt}</span>
                            <span className="text-sm text-purple-700">{version.submittedBy}</span>
                          </div>
                          <div className="text-sm text-purple-800">
                            <p className="font-medium mb-1">{version.title}</p>
                            <p className="text-purple-700 mb-2">{version.abstract}</p>
                            <div className="flex items-center space-x-4 text-xs text-purple-600">
                              <span>关键词: {version.keywords}</span>
                              <span>分类: {version.category}</span>
                              {version.fileUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(version.fileUrl, '_blank')}
                                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                                >
                                  {version.isCurrent ? '下载当前版本' : `下载v${version.version}`}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 当前文件 - 显示最新提交的文件 */}
                {selectedSubmission.fileUrl && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                      <span className="mr-2">📄</span>
                      当前文件
                      <Badge className="ml-2 bg-blue-600 text-white">最新版本</Badge>
                    </h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-blue-200">
                        <span className="text-blue-600">📎</span>
                        <span className="text-gray-900 font-medium">稿件文件</span>
                        <span className="text-sm text-blue-600">(最新提交)</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadFile(selectedSubmission)}
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        下载当前文件
                      </Button>
                    </div>
                    <p className="text-sm text-blue-700 mt-2">
                      💡 这是您最新提交的稿件文件，与版本历史中的当前版本文件相同
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setShowDetailsModal(false)}
                    className="border-pink-300 text-pink-600 hover:bg-pink-50"
                  >
                    关闭
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 审稿历史记录模态框 */}
        {showHistoryModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-gray-600 mr-2">📋</span>
                    审稿历史记录 - {selectedSubmission.title}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowHistoryModal(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  查看稿件的完整审稿历史记录
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 稿件基本信息 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">稿件信息</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">标题:</span>
                      <p className="text-gray-900 font-medium">{selectedSubmission.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">状态:</span>
                      <div className="mt-1">
                        <Badge className={getStatusColor(selectedSubmission.status)}>
                          {getStatusText(selectedSubmission.status)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">分类:</span>
                      <p className="text-gray-900">{categories.find(c => c.id === selectedSubmission.category)?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">投稿时间:</span>
                      <p className="text-gray-900">{selectedSubmission.submittedAt || '未提交'}</p>
                    </div>
                  </div>
                </div>

                {/* 审稿历史记录 */}
                {selectedSubmission.history && selectedSubmission.history.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">审稿历史记录</h3>
                    <div className="space-y-3">
                      {selectedSubmission.history.map((historyItem) => (
                        <div key={historyItem.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
                          <span className="text-2xl mt-1">{getActionIcon(historyItem.action)}</span>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={getActionColor(historyItem.action)}>
                                {historyItem.action}
                              </Badge>
                              <span className="text-sm text-gray-600">{historyItem.actionBy}</span>
                              <span className="text-sm text-gray-500">{historyItem.actionAt}</span>
                            </div>
                            <p className="text-gray-800 text-sm mb-2">{historyItem.description}</p>
                            {historyItem.details && (
                              <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-600">
                                {historyItem.details.previousStatus && historyItem.details.newStatus && (
                                  <p className="mb-1"><strong>状态变更:</strong> {historyItem.details.previousStatus} → {historyItem.details.newStatus}</p>
                                )}
                                {historyItem.details.reviewerName && (
                                  <p className="mb-1"><strong>审稿人:</strong> {historyItem.details.reviewerName}</p>
                                )}
                                {historyItem.details.decision && (
                                  <p className="mb-1"><strong>决策:</strong> {historyItem.details.decision}</p>
                                )}
                                {historyItem.details.comments && (
                                  <p className="mb-1"><strong>说明:</strong> {historyItem.details.comments}</p>
                                )}
                                {historyItem.details.fileUrl && (
                                  <p className="mb-1"><strong>文件:</strong> {historyItem.details.fileUrl}</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      暂无审稿历史记录
                    </h3>
                    <p className="text-gray-500">
                      该稿件还没有审稿历史记录
                    </p>
                  </div>
                )}

                {/* 版本历史 */}
                {selectedSubmission.versions && selectedSubmission.versions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">版本历史</h3>
                    <div className="space-y-3">
                      {selectedSubmission.versions.map((version) => (
                        <div key={version.id} className={`p-4 rounded-lg border ${version.isCurrent ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={version.isCurrent ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'}>
                              版本 {version.version} {version.isCurrent ? '(当前)' : ''}
                            </Badge>
                            <span className="text-sm text-gray-600">{version.submittedAt}</span>
                            <span className="text-sm text-gray-600">{version.submittedBy}</span>
                          </div>
                          <div className="text-sm text-gray-800">
                            <p className="font-medium mb-1">{version.title}</p>
                            <p className="text-gray-600 mb-2">{version.abstract}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>关键词: {version.keywords}</span>
                              <span>分类: {version.category}</span>
                              {version.fileUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(version.fileUrl, '_blank')}
                                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                                >
                                  下载文件
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setShowHistoryModal(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    关闭
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 最终PDF上传模态框 */}
        {showFinalPdfModal && selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-green-600 mr-2">📄</span>
                    上传最终PDF
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowFinalPdfModal(false);
                      setSelectedSubmission(null);
                      setFinalPdfFile(null);
                    }}
                    className="border-green-300 text-green-600 hover:bg-green-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  请上传经过最终编辑和格式化的PDF文件
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitFinalPdf} className="space-y-4">
                  <div>
                    <Label htmlFor="finalPdf" className="text-gray-700">最终PDF文件 *</Label>
                    <Input
                      id="finalPdf"
                      type="file"
                      accept=".pdf"
                      onChange={handleFinalPdfChange}
                      className="border-green-300 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      请确保PDF文件格式正确，包含所有必要的图表和参考文献
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button 
                      type="submit"
                      disabled={loading || !finalPdfFile}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      {loading ? '上传中...' : '确认上传'}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowFinalPdfModal(false);
                        setSelectedSubmission(null);
                        setFinalPdfFile(null);
                      }}
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

        {/* 付款信息模态框 */}
        {showPaymentModal && selectedSubmission && selectedSubmission.paymentInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-lg mx-4 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-orange-600 mr-2">💰</span>
                    付款信息
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPaymentModal(false)}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    ✕
                  </Button>
                </CardTitle>
                <CardDescription>
                  文章已通过审核，请按以下信息完成付款
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">🎉 恭喜！您的文章已通过审核</h3>
                  <p className="text-green-700 text-sm">
                    文章《{selectedSubmission.title}》已通过专家评审，现需要完成发表费用支付。
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">付款信息</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">收款单位：</span>
                        <span className="font-medium">{selectedSubmission.paymentInfo.accountName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">银行账号：</span>
                        <span className="font-medium font-mono">{selectedSubmission.paymentInfo.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">开户银行：</span>
                        <span className="font-medium">{selectedSubmission.paymentInfo.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">付款金额：</span>
                        <span className="font-bold text-orange-600">
                          ¥{selectedSubmission.paymentInfo.amount} {selectedSubmission.paymentInfo.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">付款期限：</span>
                        <span className="font-medium">{selectedSubmission.paymentInfo.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">付款状态：</span>
                        <Badge className={
                          selectedSubmission.paymentInfo.paymentStatus === 'paid' 
                            ? 'bg-green-100 text-green-800'
                            : selectedSubmission.paymentInfo.paymentStatus === 'overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }>
                          {selectedSubmission.paymentInfo.paymentStatus === 'paid' ? '已付款' :
                           selectedSubmission.paymentInfo.paymentStatus === 'overdue' ? '已逾期' : '待付款'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📋 付款说明</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• 请在付款备注中注明文章标题和作者姓名</li>
                      <li>• 付款完成后，请保留付款凭证</li>
                      <li>• 我们将在收到付款后3个工作日内确认</li>
                      <li>• 确认付款后，您将收到发表确认邮件</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 重要提醒</h4>
                    <p className="text-sm text-yellow-700">
                      请在{selectedSubmission.paymentInfo.dueDate}前完成付款，逾期未付款将影响文章发表。
                      如有疑问，请联系编辑部：contact@color-journal.com
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setShowPaymentModal(false)}
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    关闭
                  </Button>
                  {selectedSubmission.paymentInfo.paymentStatus === 'pending' && (
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => {
                        alert('付款功能开发中，请联系编辑部完成付款');
                        setShowPaymentModal(false);
                      }}
                    >
                      确认付款
                    </Button>
                  )}
                </div>
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