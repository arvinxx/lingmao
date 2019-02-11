import React, { Component, ComponentClass } from 'react';

import { Layout } from 'antd';
import { DispatchProp } from 'react-redux';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import { SiderMenu, Topbar } from '@/components';
import { getMenuData } from '@/utils';
import styles from './BasicLayout.less';
import logo from '@/assets/logo.png';

const { Content } = Layout;

export interface IBasicLayoutProps {
  collapsed?: boolean;
  location?: any;
  showMenu?: boolean;
}

@(withRouter as any)
@connect(({ menu }) => ({
  collapsed: menu.collapsed,
  showMenu: menu.visible,
}))
class BasicLayout extends Component<IBasicLayoutProps & DispatchProp> {
  handleMenuCollapse = (collapsedState) => {
    this.props.dispatch({
      type: 'menu/handleCollapsed',
      payload: collapsedState,
    });
  };
  render() {
    const { collapsed, location, children, showMenu } = this.props;
    const defaultSideWith = 140;
    return (
      <Layout>
        <Topbar />
        <Layout
          className={styles.layout}
          // style={
          //   showMenu ? { paddingLeft: collapsed ? 80 : defaultSideWith, paddingTop: '7vh' } : {}
          // }
        >
          {/*<Content>*/}
          {children}
          {/*</Content>*/}
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout as ComponentClass;
