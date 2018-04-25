import React from 'react';
import ListInput from './ListInput';

import styles from './styles.less';

export default class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Title</h2>
        <ListInput />
      </div>
    );
  }
}
