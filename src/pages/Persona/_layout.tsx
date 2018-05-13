import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { persona as header } from '../../common/header';
import { Header } from '../../components';
import styles from './layout.less';

const { Content } = Layout;

export default class PersonaLayout extends Component {
  render() {
    return (
      <Fragment>
        <Header header={header} />
        <Content>
          <div className={styles.container}>{this.props.children}</div>
        </Content>
      </Fragment>
    );
  }
}
