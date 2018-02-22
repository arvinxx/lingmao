import React, { Fragment } from 'react';
import { Icon, Layout } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';

import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.png';
import styles from './index.less';

const { Content, Footer } = Layout;

const redirectData = [];
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

const BasicLayout = (props) => {
  const { collapsed, location } = props;
  const defaultSideWith = 140;
  const handleMenuCollapse = (collapsedState) => {
    props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsedState,
    });
  };
  console.log(collapsed);
  return (
    <Layout>
      <SiderMenu
        logo={logo}
        Authorized={Authorized}
        menuData={getMenuData()}
        collapsed={collapsed}
        location={location}
        onCollapse={handleMenuCollapse}
        width={defaultSideWith}
      />
      <Layout className={styles.layout} style={{ paddingLeft: collapsed ? 80 : defaultSideWith }}>
        <Content className={styles.content}>
          <Fragment>{props.children}</Fragment>
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            links={[
              {
                key: '使用指南',
                title: 'Pro 首页',
                href: 'http://pro.ant.design',
                blankTarget: true,
              },
              {
                key: '关于我们',
                title: '关于我们',
                href: 'http://arvinx.io',
                blankTarget: true,
              },
            ]}
            copyright={
              <Fragment>
                Copyright <Icon type="copyright" /> 2018 LEGION
              </Fragment>
            }
          />
        </Footer>
      </Layout>
    </Layout>
  );
};
export default withRouter(
  connect(({ user, global }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
  }))(BasicLayout),
);
