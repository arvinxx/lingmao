import React, { PureComponent, Fragment } from 'react';
import { interview as header } from '../../common/header';
import { Header } from '../../components';

export default class Layout extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header header={header} />
        {this.props.children}
      </Fragment>
    );
  }
}
