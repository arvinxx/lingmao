import React, { Fragment, PureComponent } from 'react';
import { Redirect, Switch, withRouter } from 'react-router';
import Link from 'umi/link';

import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';

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

// @ts-ignore TypeScript by now doesn't allow decorators to change the signature of the classes
@withRouter
export default class UserLayout extends PureComponent {
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'LEGION';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - LEGION`;
  //   }
  //   return title;
  // }

  render() {
    const {children} = this.props;
    return (
      <DocumentTitle title={'this.getPageTitle()'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>灵 猫</span>
                </Link>
              </div>
              <div className={styles.desc}>
                友好强大的用户研究工具
              </div>
            </div>
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
