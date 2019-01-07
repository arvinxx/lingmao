import React, { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

import { DataPanel } from './components';

import styles from './_layout.less';
import { getLastRouter } from '@/utils';

@(withRouter as any)
@connect(({ data }) => ({
  display: data.displayPanel,
}))
export default class InterviewLayout extends PureComponent<any> {
  render() {
    const { location, display } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.left}>{this.props.children}</div>
        {getLastRouter(location.pathname) !== 'analysis' && display && <DataPanel />}
      </div>
    );
  }
}
