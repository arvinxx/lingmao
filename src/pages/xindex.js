import React from 'react';
import ContentLayout from '../layouts/ContentLayout';

import styles from './index.less';

class Xindex extends React.PureComponent {
  render() {
    return (
      <ContentLayout>
        <div className={styles.container}>Indexhj Page</div>
      </ContentLayout>
    );
  }
}

export default Xindex;
