import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.png';
import { getRoutes } from '../utils/utils';

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

// TODO 了解 Fragment 的用法 @GQ @LJH @XY
const copyright = (
  <Fragment>
    {/* Fragment 提供空的Wrapper标签 */}
    {/* 详情查看 https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax */}
    Copyright <Icon type="copyright" /> 2018 LEGION
  </Fragment>
);

class UserLayout extends React.PureComponent {
  getPageTitle() { // TODO:在 BasicLayout 也有该函数，可以考虑提取同一函数
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'LEGION';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - LEGION`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>LEGION</span>
                </Link>
              </div>
              <div className={styles.desc}>
                LEGION 群，体内有多种人格，出自《圣经》
              </div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
