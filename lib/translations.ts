/**
 * 统一的翻译函数
 * 用于将英文枚举值转换为中文显示
 */

// 审稿推荐意见翻译
export const getRecommendationText = (recommendation: string): string => {
  switch (recommendation) {
    case 'accept': return '接受';
    case 'minor_revision': return '小修';
    case 'major_revision': return '大修';
    case 'reject': return '拒绝';
    default: return recommendation || '未评价';
  }
};

// 审稿推荐意见颜色样式
export const getRecommendationColor = (recommendation: string): string => {
  switch (recommendation) {
    case 'accept': return 'bg-green-100 text-green-800';
    case 'minor_revision': return 'bg-yellow-100 text-yellow-800';
    case 'major_revision': return 'bg-orange-100 text-orange-800';
    case 'reject': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// 文章状态翻译
export const getArticleStatusText = (status: string): string => {
  switch (status) {
    case 'draft': return '草稿';
    case 'submitted': return '已提交';
    case 'under_review': return '审稿中';
    case 'revision_requested': return '需要修改';
    case 'accepted': return '已接受';
    case 'rejected': return '已拒绝';
    case 'published': return '已发表';
    default: return status;
  }
};

// 审稿状态翻译
export const getReviewStatusText = (status: string, reviewRound?: number): string => {
  const roundText = reviewRound ? `第${reviewRound}轮` : '';
  switch (status) {
    case 'assigned': return `${roundText}已分配`;
    case 'in_progress': return `${roundText}审稿中`;
    case 'completed': return `${roundText}已完成`;
    case 'declined': return `${roundText}已拒绝`;
    default: return '未知状态';
  }
};

// 用户角色翻译
export const getRoleText = (role: string): string => {
  switch (role) {
    case 'admin': return '管理员';
    case 'editor': return '编辑';
    case 'reviewer': return '审稿人';
    case 'author': return '作者';
    default: return '未知';
  }
};

// 用户角色颜色样式
export const getRoleColor = (role: string): string => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'editor': return 'bg-purple-100 text-purple-800';
    case 'reviewer': return 'bg-blue-100 text-blue-800';
    case 'author': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
