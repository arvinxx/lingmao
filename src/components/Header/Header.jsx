import React from 'react';
import styles from './Header.less';

const index = () => {
  return (
    <div className={styles.header}>
      <div className={styles['tool-container']}>
        <div>icon1</div>
        <div>icon2</div>
        <div>icon3</div>
      </div>
      <div className={styles['tool-container']}>
        <div>记录</div>
        <div>标签</div>
      </div>
      <div className={styles['tool-container']}>
        <div>button1</div>
        <div>button2</div>
      </div>
    </div>
  );
};

export default index;
