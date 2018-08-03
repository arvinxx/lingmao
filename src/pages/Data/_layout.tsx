import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

import { data as header } from '../../common/header';
import { Header } from '@/components';
import { DataPanel } from './components';

import styles from './_layout.less';
import { getLastRouter } from '@/utils';

const { Content } = Layout;
@(withRouter as any)
@connect(({ data }) => ({
  display: data.displayPanel,
}))
export default class InterviewLayout extends PureComponent<any> {
  render() {
    const { location, display } = this.props;
    return (
      <Fragment>
        <Header header={header} />
        <Content>
          <div className={styles.container}>
            <div className={styles.left}>{this.props.children}</div>
            {getLastRouter(location.pathname) !== 'analysis' && display && <DataPanel />}
          </div>
        </Content>
      </Fragment>
    );
  }
}
