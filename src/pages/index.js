import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ global }) => ({
  collapsed: global.collapsed,
}))
class Index extends React.PureComponent {
  render() {
    return (
      <Layout>
        <div className={styles.container}>Index Page</div>
      </Layout>
    );
  }
}
export default Index;
