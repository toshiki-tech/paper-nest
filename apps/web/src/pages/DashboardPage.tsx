import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag } from 'antd';
import { FileTextOutlined, EditOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const DashboardPage: React.FC = () => {
  // 模拟数据
  const statistics = [
    {
      title: '总稿件数',
      value: 12,
      icon: <FileTextOutlined className="text-blue-500" />,
      color: '#1890ff',
    },
    {
      title: '待审稿件',
      value: 3,
      icon: <EditOutlined className="text-orange-500" />,
      color: '#fa8c16',
    },
    {
      title: '已录用',
      value: 8,
      icon: <CheckCircleOutlined className="text-green-500" />,
      color: '#52c41a',
    },
    {
      title: '审稿中',
      value: 1,
      icon: <ClockCircleOutlined className="text-purple-500" />,
      color: '#722ed1',
    },
  ];

  const recentSubmissions = [
    {
      key: '1',
      title: '色彩在平面设计中的应用研究',
      author: '张三',
      status: 'submitted',
      date: '2024-01-15',
    },
    {
      key: '2',
      title: '现代艺术中的色彩心理学',
      author: '李四',
      status: 'under_review',
      date: '2024-01-14',
    },
    {
      key: '3',
      title: '数字媒体时代的色彩设计',
      author: '王五',
      status: 'accepted',
      date: '2024-01-13',
    },
  ];

  const columns = [
    {
      title: '稿件标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          submitted: { color: 'blue', text: '已投稿' },
          under_review: { color: 'orange', text: '审稿中' },
          accepted: { color: 'green', text: '已录用' },
          rejected: { color: 'red', text: '已退稿' },
        };
        const config = statusMap[status as keyof typeof statusMap] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '投稿日期',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">仪表板</h1>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="mb-6">
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 最近稿件 */}
      <Card title="最近稿件" className="mb-6">
        <Table
          columns={columns}
          dataSource={recentSubmissions}
          pagination={false}
          size="small"
        />
      </Card>

      {/* 系统信息 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="系统信息">
            <div className="space-y-2">
              <p><strong>期刊名称：</strong>色彩期刊</p>
              <p><strong>当前期次：</strong>2024年第1期</p>
              <p><strong>系统版本：</strong>v1.0.0</p>
              <p><strong>最后更新：</strong>2024-01-15</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="快速操作">
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                📝 新建稿件
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                👥 管理用户
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                📊 查看统计
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                ⚙️ 系统设置
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
