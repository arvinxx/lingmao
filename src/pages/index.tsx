import React, { Component } from 'react';
import Redirect from 'umi/redirect';

export default class Index extends Component {
  render() {
    return <Redirect to="/interview" />;
  }
}
