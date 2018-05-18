import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';
import withRouter from 'umi/withRouter';

import { data as header } from '../../common/header';
import { Header, DataPanel } from '../../components';

import styles from './layout.less';
import { getLastRouter } from '../../utils';

const { Content } = Layout;
@(withRouter as any)
export default class InterviewLayout extends PureComponent<any> {
  render() {
    const { location } = this.props;
    return (
      <Fragment>
        <Header header={header} />
        <Content>
          <div className={styles.container}>
            <div className={styles.right}>{this.props.children}</div>
            {getLastRouter(location.pathname) !== 'analysis' && <DataPanel />}
          </div>
        </Content>
      </Fragment>
    );
  }
}
