import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';
import { data as header } from '../../common/header';
import { Header, DataPanel } from '../../components';

import styles from './layout.less';

const { Content } = Layout;

export default class InterviewLayout extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header header={header} />
        <Content>
          <div className={styles.container}>
            <div className={styles.right}>{this.props.children}</div>
            <DataPanel />
          </div>
        </Content>
      </Fragment>
    );
  }
}
