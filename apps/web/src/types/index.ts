// 共享类型定义
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  subdomain?: string;
  logoUrl?: string;
  themeConfig?: string; // SQLite中存储为字符串
  settings?: string; // SQLite中存储为字符串
  status: 'active' | 'suspended' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantSlug?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantSlug?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 稿件相关类型
export interface Submission {
  id: string;
  title: string;
  abstract?: string;
  keywords?: string; // SQLite中存储为字符串
  authors: string; // SQLite中存储为字符串
  correspondingAuthorId: string;
  categoryId?: string;
  manuscriptFileUrl?: string;
  supplementaryFiles?: string; // SQLite中存储为字符串
  status: SubmissionStatus;
  submissionDate: string;
  lastModified: string;
  metadata?: string; // SQLite中存储为字符串
}

export interface Author {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation?: string;
  orcid?: string;
  isCorresponding: boolean;
  order: number;
}

export interface FileInfo {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export type SubmissionStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'revision_requested' 
  | 'accepted' 
  | 'rejected';

// 审稿相关类型
export interface Review {
  id: string;
  submissionId: string;
  reviewerId: string;
  reviewType: 'peer_review' | 'editorial_review';
  status: ReviewStatus;
  score?: number;
  recommendation?: ReviewRecommendation;
  comments?: string;
  confidentialComments?: string;
  submittedAt?: string;
  deadline?: string;
  createdAt: string;
}

export type ReviewStatus = 'assigned' | 'in_progress' | 'completed' | 'declined';
export type ReviewRecommendation = 'accept' | 'minor_revision' | 'major_revision' | 'reject';

// 期刊相关类型
export interface Issue {
  id: string;
  volume: number;
  issueNumber: number;
  title?: string;
  publicationDate?: string;
  status: IssueStatus;
  coverImageUrl?: string;
  createdAt: string;
}

export type IssueStatus = 'planning' | 'in_production' | 'published';

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}
