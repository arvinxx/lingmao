import React, { PureComponent, Fragment } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

export default class InterviewLayout extends PureComponent {
  render() {
    return (
      <Fragment>
        <Content>{this.props.children}</Content>
      </Fragment>
    );
  }
}