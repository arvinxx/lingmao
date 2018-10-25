import React, { Component, Fragment } from 'react';

import { Layout } from 'antd';
import { DispatchProp } from 'react-redux';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { SiderMenu } from '@/components';

import { getMenuData } from '@/utils';

import styles from './BasicLayout.less';
import logo from '@/assets/logo.png';

export interface IBasicLayoutProps {
  collapsed?: boolean;
  location?: any;
  visible?: boolean;
}

@(withRouter as any)
@connect(({ menu }) => ({
  collapsed: menu.collapsed,
  visible: menu.visible,
}))
export default class BasicLayout extends Component<IBasicLayoutProps & DispatchProp> {
  handleMenuCollapse = (collapsedState) => {
    this.props.dispatch({
      type: 'menu/changeMenuCollapsed',
      payload: collapsedState,
    });
  };

  render() {
    const { collapsed, location, children, visible } = this.props;
    const defaultSideWith = 140;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          showMenu={visible}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          onCollapse={this.handleMenuCollapse}
          width={defaultSideWith}
        />
        <Layout
          className={styles.layout}
          style={visible ? { paddingLeft: collapsed ? 80 : defaultSideWith } : {}}
        >
          <Fragment>{children}</Fragment>
        </Layout>
      </Layout>
    );
  }
}
