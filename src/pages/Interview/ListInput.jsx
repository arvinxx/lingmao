import React from 'react';

import Workflowy from '../../components/ListInput/index';
import styles from './ListInput.less';

export default class ListInput extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Title</h2>
        <Workflowy />
      </div>
    );
  }
}
