import React from 'react';
import ContentLayout from '../layouts/ContentLayout';
import Authorized from '../utils/Authorized';

import styles from './index.less';

const testComp = (
  <ContentLayout>
    <div className={styles.container}>Indexhj Page</div>
  </ContentLayout>
);

const { AuthorizedRoute } = Authorized;



class Index extends React.PureComponent {
  render() {
    return (
      <AuthorizedRoute
        path="/"
        render={() => <testComp />}
        authority={['admin', 'user']}
        redirectPath="/user/login"
      />
    );
  }
}

export default Index;
