// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'reviewer' | 'author';
  avatar?: string;
  bio?: string;
  institution?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'editor' | 'reviewer' | 'author';
  institution?: string;
}

export interface UpdateUserData {
  name?: string;
  role?: 'admin' | 'editor' | 'reviewer' | 'author';
  avatar?: string;
  bio?: string;
  institution?: string;
  isActive?: boolean;
}

// 期刊栏目类型
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  sortOrder?: number;
}

// 作者信息类型
export interface Author {
  id?: string;
  name: string;
  email: string;
  institution?: string;
  isCorresponding: boolean;
  order: number;
}

// 论文相关类型
export interface Article {
  id: string;
  title: string;
  abstract?: string;
  keywords?: string[];
  authors: Author[];
  correspondingAuthorId: string;
  categoryId?: string;
  manuscriptFile?: string;
  supplementaryFiles?: FileInfo[];
  status: ArticleStatus;
  submissionDate: Date;
  lastModified: Date;
  publishedAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export type ArticleStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'revision_requested' 
  | 'accepted' 
  | 'rejected' 
  | 'published';

export interface CreateArticleData {
  title: string;
  abstract?: string;
  keywords?: string[];
  authors: Author[];
  categoryId?: string;
  manuscriptFile?: string;
  supplementaryFiles?: FileInfo[];
}

export interface UpdateArticleData {
  title?: string;
  abstract?: string;
  keywords?: string[];
  authors?: Author[];
  categoryId?: string;
  status?: ArticleStatus;
  manuscriptFile?: string;
  supplementaryFiles?: FileInfo[];
}

// 文件信息类型
export interface FileInfo {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

// 审稿相关类型
export interface Review {
  id: string;
  articleId: string;
  reviewerId: string;
  status: ReviewStatus;
  score?: number;
  recommendation?: ReviewRecommendation;
  comments?: string;
  confidentialComments?: string;
  submittedAt?: Date;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewStatus = 'assigned' | 'in_progress' | 'completed' | 'declined';
export type ReviewRecommendation = 'accept' | 'minor_revision' | 'major_revision' | 'reject';

export interface CreateReviewData {
  articleId: string;
  reviewerId: string;
  deadline?: Date;
}

export interface UpdateReviewData {
  status?: ReviewStatus;
  score?: number;
  recommendation?: ReviewRecommendation;
  comments?: string;
  confidentialComments?: string;
}

// 审稿历史类型
export interface ReviewHistory {
  id: string;
  articleId: string;
  reviewerId: string;
  action: string;
  comments?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 表单验证类型
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  institution?: string;
}

export interface ArticleFormData {
  title: string;
  abstract?: string;
  keywords?: string[];
  authors: Author[];
  categoryId?: string;
}

// 仪表板统计类型
export interface DashboardStats {
  totalArticles: number;
  pendingReviews: number;
  publishedArticles: number;
  totalUsers: number;
  recentArticles: Article[];
  recentReviews: Review[];
}

// 系统设置类型
export interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
