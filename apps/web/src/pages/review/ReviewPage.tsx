import React from 'react';
import { Card, Empty } from 'antd';

const ReviewPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">审稿管理</h1>
      <Card>
        <Empty description="审稿管理功能开发中..." />
      </Card>
    </div>
  );
};

export default ReviewPage;
