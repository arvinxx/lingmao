import React, { Component } from 'react';
import H from 'history';
import withRouter from 'umi/withRouter';

import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';

import { UserLayout as UserLayoutList } from '@/common';

export interface ILayoutEntryProps {
  location: H.Location;
  history: H.History;
}

@(withRouter as any)
export default class LayoutEntry extends Component<ILayoutEntryProps> {
  // Layout 入口
  render() {
    const { location, children } = this.props;
    const { pathname } = location;

    // 如果路由地址是登录注册的话，使用登录注册布局
    // 否则使用基础布局
    if (UserLayoutList.indexOf(pathname) > -1) {
      return <UserLayout id="UserLayout">{children}</UserLayout>;
    } else {
      return <BasicLayout id="BasicLayout">{children}</BasicLayout>;
    }
  }
}
