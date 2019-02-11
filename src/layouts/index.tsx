import React, { Component } from 'react';
import H from 'history';
import withRouter from 'umi/withRouter';
import DocumentTitle from 'react-document-title';
import pathToRegexp from 'path-to-regexp';
import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';
import ProjectLayout from './ProjectLayout';
import { Alert } from 'antd';

import { UserLayout as UserLayoutList, ProjectLayout as ProjectList, getPageTitle } from '@/common';
import { Authorized } from '@/utils';

export interface ILayoutEntryProps {
  location: H.Location;
  history: H.History;
  route: any;
}

@(withRouter as any)
export default class LayoutEntry extends Component<ILayoutEntryProps> {
  // Layout 入口
  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map((route) => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          if (route.authority !== null) routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        console.log(routeAuthority);
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };
  render() {
    const {
      location,
      children,
      route: { routes },
    } = this.props;
    const { pathname } = location;
    const pageTitle = getPageTitle(pathname);
    console.log(location, routes);
    const routerConfig = this.getRouterAuthority(location.pathname, routes);
    console.log(routerConfig);
    // 如果路由地址是登录注册的话，使用登录注册布局
    // 否则使用基础布局
    if (UserLayoutList.indexOf(pathname) > -1) {
      return (
        <DocumentTitle title={pageTitle}>
          <UserLayout id="UserLayout">{children}</UserLayout>
        </DocumentTitle>
      );
    } else if (ProjectList.indexOf(pathname) > -1) {
      return (
        <Authorized authority={routerConfig} noMatch={<Alert message={'error'} />}>
          <ProjectLayout id="ProjectLayout">{children}</ProjectLayout>
        </Authorized>
      );
    } else {
      return (
        <DocumentTitle title={pageTitle}>
          <Authorized authority={routerConfig} noMatch={<Alert message={'error'} />}>
            <BasicLayout id="BasicLayout">{children}</BasicLayout>
          </Authorized>
        </DocumentTitle>
      );
    }
  }
}
