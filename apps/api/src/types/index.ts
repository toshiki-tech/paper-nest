// 多租户类型定义
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
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantContext {
  tenantId: string;
  tenantSlug: string;
  schema: string;
  userRole: UserRole;
  permissions: string[];
}

// 用户相关类型
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTenant {
  id: string;
  userId: string;
  tenantId: string;
  role: UserRole;
  permissions: string; // SQLite中存储为字符串
  status: 'active' | 'inactive';
  joinedAt: Date;
}

export type UserRole = 'author' | 'reviewer' | 'editor' | 'chief_editor' | 'admin';

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
  submissionDate: Date;
  lastModified: Date;
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
  uploadedAt: Date;
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
  submittedAt?: Date;
  deadline?: Date;
  createdAt: Date;
}

export type ReviewStatus = 'assigned' | 'in_progress' | 'completed' | 'declined';
export type ReviewRecommendation = 'accept' | 'minor_revision' | 'major_revision' | 'reject';

// 期刊相关类型
export interface Issue {
  id: string;
  volume: number;
  issueNumber: number;
  title?: string;
  publicationDate?: Date;
  status: IssueStatus;
  coverImageUrl?: string;
  createdAt: Date;
}

export type IssueStatus = 'planning' | 'in_production' | 'published';

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
}

// API响应类型
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

// 认证相关类型
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

// 请求扩展类型
export interface AuthenticatedRequest extends Request {
  user?: User;
  tenant?: Tenant;
  tenantContext?: TenantContext;
}

// 文件上传类型
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
