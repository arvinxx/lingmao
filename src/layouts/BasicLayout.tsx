import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

import { SiderMenu } from '../components';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';

import styles from './BasicLayout.less';
import logo from '../assets/logo.png';

const redirectData: any[] = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

interface IBasicLayoutProps {
  collapsed?: boolean;
  location?: any;
  dispatch?: any;
  showMenu?: boolean;
}

@(withRouter as any)
@connect(({ user, global }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  showMenu: global.showMenu,
}))
export default class BasicLayout extends Component<IBasicLayoutProps> {
  handleMenuCollapse = (collapsedState) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsedState,
    });
  };
  handleMenuState = () => {
    this.props.dispatch({
      type: 'global/changeMenuState',
    });
  };

  render() {
    const { collapsed, location, children, showMenu } = this.props;
    const defaultSideWith = 140;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          showMenu={showMenu}
          // Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          onCollapse={this.handleMenuCollapse}
          width={defaultSideWith}
        />
        <Layout
          className={styles.layout}
          style={showMenu ? { paddingLeft: collapsed ? 80 : defaultSideWith } : {}}
        >
          <Fragment>{children}</Fragment>
        </Layout>
      </Layout>
    );
  }
}
