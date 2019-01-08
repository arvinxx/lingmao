import React, { Fragment, Component } from 'react';
import H from 'history';

import { Redirect, Switch, withRouter } from 'react-router';

import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import { GlobalFooter } from '@/components';

import { getPageTitle } from '@/utils';

import styles from './UserLayout.less';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 灵 猫
  </Fragment>
);
export interface IUserLayoutProps {
  location: H.Location;
}

@(withRouter as any)
export default class UserLayout extends Component<IUserLayoutProps> {
  render() {
    const { children, location } = this.props;
    const { pathname } = location;
    const title = '灵猫';
    return (
      <DocumentTitle title={getPageTitle(pathname, title)}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              <Fragment>{children}</Fragment>
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}
