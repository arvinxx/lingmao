import React from 'react';
import styles from './index.less';

export default (props) => {
  const { left1, left2, left3, center1, center2, right1, right2 } = props.data;
  return (
    <div className={styles.header}>
      <div className={styles['tool-container']}>
        <div>{left1}</div>
        <div>{left2}</div>
        <div>{left3}</div>
      </div>
      <div className={styles['tool-container']}>
        <div>{center1}</div>
        <div>{center2}</div>
      </div>
      <div className={styles['tool-container']}>
        <div>{right1}</div>
        <div>{right2}</div>
      </div>
    </div>
  );
};
