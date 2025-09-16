import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuthStore } from '@/stores/auth';
import { useTenantStore } from '@/stores/tenant';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import SubmissionPage from '@/pages/submission/SubmissionPage';
import ReviewPage from '@/pages/review/ReviewPage';
import ProfilePage from '@/pages/ProfilePage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const { Content } = Layout;

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { currentTenant, isLoading: tenantLoading } = useTenantStore();

  if (isLoading || tenantLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* 认证路由 */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
          }
        />

        {/* 受保护的路由 */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout className="min-h-screen">
                <AppHeader />
                <Layout>
                  <AppSidebar />
                  <Layout className="p-6">
                    <Content className="bg-white rounded-lg shadow-sm">
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/submissions" element={<SubmissionPage />} />
                        <Route path="/reviews" element={<ReviewPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
