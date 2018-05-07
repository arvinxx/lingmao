import React, { PureComponent, Fragment } from 'react';
import { interview as header } from '../../common/header';
import { Layout } from 'antd';

import { Header } from '../../components';

const { Content } = Layout;

export default class InterviewLayout extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header header={header} />
        <Content>{this.props.children}</Content>
      </Fragment>
    );
  }
}
