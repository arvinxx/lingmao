import React, { PureComponent } from 'react';
import Redirect from 'umi/redirect';

// import Authorized from '../utils/Authorized';
// const { AuthorizedRoute } = Authorized;

export default class Index extends PureComponent {
  render() {
    return <Redirect to="/interview" />;
  }
}

// <AuthorizedRoute
//         path="/"
//         render={() => <Redirect to="/dashboard" />}
//         authority={['admin', 'user']}
//         redirectPath="/user/login"
//       />
