import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth';

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const { tokens } = useAuthStore.getState();
    
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 如果是401错误且不是刷新token的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const { tokens, clearAuth } = useAuthStore.getState();
      
      if (tokens?.refreshToken) {
        try {
          // 尝试刷新token
          const response = await axios.post('/api/v1/auth/refresh', {
            refreshToken: tokens.refreshToken,
          });
          
          const { tokens: newTokens } = response.data.data;
          
          // 更新token
          useAuthStore.getState().setAuth(
            useAuthStore.getState().user!,
            newTokens
          );
          
          // 重新发送原始请求
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // 刷新失败，清除认证信息
          clearAuth();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // 没有refresh token，清除认证信息
        clearAuth();
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API服务类
export class ApiService {
  // 认证相关
  static async login(credentials: { email: string; password: string; tenantSlug?: string }) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }

  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantSlug?: string;
  }) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  }

  static async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  static async updateProfile(userData: Partial<User>) {
    const response = await apiClient.put('/auth/me', userData);
    return response.data;
  }

  static async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    const response = await apiClient.put('/auth/password', passwordData);
    return response.data;
  }

  // 租户相关
  static async getTenantBySlug(slug: string) {
    const response = await apiClient.get(`/tenants/${slug}`);
    return response.data;
  }

  // 稿件相关
  static async getSubmissions(params?: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: string;
  }) {
    const response = await apiClient.get('/submissions', { params });
    return response.data;
  }

  static async getSubmission(id: string) {
    const response = await apiClient.get(`/submissions/${id}`);
    return response.data;
  }

  static async createSubmission(submissionData: Partial<Submission>) {
    const response = await apiClient.post('/submissions', submissionData);
    return response.data;
  }

  static async updateSubmission(id: string, submissionData: Partial<Submission>) {
    const response = await apiClient.put(`/submissions/${id}`, submissionData);
    return response.data;
  }

  static async deleteSubmission(id: string) {
    const response = await apiClient.delete(`/submissions/${id}`);
    return response.data;
  }

  // 审稿相关
  static async getReviews(params?: {
    page?: number;
    limit?: number;
    status?: string;
    submissionId?: string;
  }) {
    const response = await apiClient.get('/reviews', { params });
    return response.data;
  }

  static async getReview(id: string) {
    const response = await apiClient.get(`/reviews/${id}`);
    return response.data;
  }

  static async createReview(reviewData: Partial<Review>) {
    const response = await apiClient.post('/reviews', reviewData);
    return response.data;
  }

  static async updateReview(id: string, reviewData: Partial<Review>) {
    const response = await apiClient.put(`/reviews/${id}`, reviewData);
    return response.data;
  }

  // 分类相关
  static async getCategories() {
    const response = await apiClient.get('/categories');
    return response.data;
  }

  static async createCategory(categoryData: Partial<Category>) {
    const response = await apiClient.post('/categories', categoryData);
    return response.data;
  }

  static async updateCategory(id: string, categoryData: Partial<Category>) {
    const response = await apiClient.put(`/categories/${id}`, categoryData);
    return response.data;
  }

  static async deleteCategory(id: string) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  }

  // 文件上传
  static async uploadFile(file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }
}

export default apiClient;
