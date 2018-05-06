import React from 'react';
import Authorized from '../utils/Authorized';
import Redirect from 'umi/redirect';

const { AuthorizedRoute } = Authorized;

class Index extends React.PureComponent {
  render() {
    return (
      <AuthorizedRoute
        path="/"
        render={() => <Redirect to="/dashboard" />}
        authority={['admin', 'user']}
        redirectPath="/user/login"
      />
    );
  }
}

export default Index;
