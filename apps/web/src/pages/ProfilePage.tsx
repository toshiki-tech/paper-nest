import React from 'react';
import { Card, Empty } from 'antd';

const ProfilePage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">个人资料</h1>
      <Card>
        <Empty description="个人资料功能开发中..." />
      </Card>
    </div>
  );
};

export default ProfilePage;
