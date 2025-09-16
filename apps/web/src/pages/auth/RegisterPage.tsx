import React from 'react';
import { Card, Empty } from 'antd';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <Empty description="注册功能开发中..." />
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
