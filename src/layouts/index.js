import React, { Fragment } from 'react';
import { Icon, Layout } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';

import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.png';
import styles from './BasicLayout.less';

const { Content, Footer } = Layout;

/**
 * 根据菜单取得重定向地址.
 */
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
  // const bashRedirect = () => {
  //   // According to the url parameter to redirect
  //   // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
  //   const urlParams = new URL(window.location.href);
  //
  //   const redirect = urlParams.searchParams.get('redirect');
  //   // Remove the parameters in the url
  //   if (redirect) {
  //     urlParams.searchParams.delete('redirect');
  //     window.history.replaceState(null, 'redirect', urlParams.href);
  //   } else {
  //     return '/interview';
  //   }
  //   return redirect;
  // };

  return (
    <Layout>
      <SiderMenu
        logo={logo}
        Authorized={Authorized}
        menuData={getMenuData()}
        collapsed={collapsed}
        location={location}
        onCollapse={state => handleMenuCollapse(state)}
        width={defaultSideWith}
      />
      <Layout className={styles.layout} style={{ paddingLeft: collapsed ? 80 : defaultSideWith }}>
        <Content>
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
export default connect(({ user, global }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
}))(withRouter(BasicLayout));
