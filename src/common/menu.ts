import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '总览',
    icon: 'dashboard',
    path: 'dashboard',
  },
  {
    name: '访谈',
    icon: 'form',
    path: 'interview',
  },
  {
    name: '数据处理',
    icon: 'calculator',
    path: 'data',
  },
  // {
  //   name: '竞品分析',
  //   icon: 'database',
  //   path: 'competitors',
  // },
  {
    name: '用户画像',
    icon: 'user',
    path: 'persona',
  },
];

function formatter(data, parentPath = '', parentAuthority?) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
