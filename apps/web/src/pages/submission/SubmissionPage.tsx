import React from 'react';
import { Card, Empty } from 'antd';

const SubmissionPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">稿件管理</h1>
      <Card>
        <Empty description="稿件管理功能开发中..." />
      </Card>
    </div>
  );
};

export default SubmissionPage;
