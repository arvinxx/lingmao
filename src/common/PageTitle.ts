const PagePostfix = ' | 灵猫';
const PageTitleList = {
  '/login/login': '登录',
  '/login/register': '注册',
  '/persona/edit': '用户画像编辑',
  '/persona/match': '用户画像匹配',
  '/project/view': '我的项目'
};
export const getPageTitle = (pathname) => {
  const PageTitle = PageTitleList[pathname] + PagePostfix;
  console.log('PageTitle',PageTitle);
  if (PageTitleList[pathname] === undefined) return '灵猫';
  return PageTitle;
};
