import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ global }) => ({
  collapsed: global.collapsed,
}))
class Index extends React.PureComponent {
  // handleMenuCollapse = (collapsed) => {
  //   console.log(this.props.dispatch);
  //   this.props.dispatch({
  //     type: 'global/changeLayoutCollapsed',
  //     payload: collapsed,
  //   });
  // };

  render() {
    return (
      <Layout>
        <div className={styles.container}>Index Page</div>
      </Layout>
    );
  }
}

export default Index;
