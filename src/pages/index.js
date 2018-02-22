import React from 'react';
import ContentLayout from '../layouts/ContentLayout';

import styles from './index.less';

class Index extends React.PureComponent {
  render() {
    return (
      <ContentLayout>
        <div className={styles.container} >
          Index Page

        </div>
      </ContentLayout>
    );
  }
}

export default Index;
