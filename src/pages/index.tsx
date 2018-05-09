import React from 'react';
import Authorized from '../utils/Authorized';
//@ts-ignore
import Redirect from 'umi/redirect';

const { AuthorizedRoute } = Authorized;

class Index extends React.PureComponent {
  render() {
    return (
      <AuthorizedRoute
        path="/"
        render={() => <Redirect to="/dashboard" />}
        authority={['admin', 'user']}
        //@ts-ignore TODO 修改组件 index.d.ts
        redirectPath="/user/login"
      />
    );
  }
}

export default Index;
