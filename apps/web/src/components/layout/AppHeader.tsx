import React from 'react';
import { Layout, Button, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/stores/auth';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white shadow-sm border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">PaperNest</h1>
        <span className="ml-4 text-sm text-gray-500">色彩期刊</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          欢迎，{user?.firstName} {user?.lastName}
        </span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Button type="text" className="flex items-center">
            <Avatar size="small" icon={<UserOutlined />} />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
