import React, { Component } from 'react';
import H from 'history';
import withRouter from 'umi/withRouter';
import DocumentTitle from 'react-document-title';
import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';

import { UserLayout as UserLayoutList, getPageTitle } from '@/common';

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
    const pageTitle = getPageTitle(pathname);
    // 如果路由地址是登录注册的话，使用登录注册布局
    // 否则使用基础布局
    if (UserLayoutList.indexOf(pathname) > -1) {
      return (
        <DocumentTitle title={pageTitle}>
          <UserLayout id="UserLayout">{children}</UserLayout>
        </DocumentTitle>
      );
    } else {
      return (
        <DocumentTitle title={pageTitle}>
          <BasicLayout id="BasicLayout">{children}</BasicLayout>
        </DocumentTitle>
      );
    }
  }
}
