import React from 'react';
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './index.less';

export default (props) => {
  const { left, center, right } = props.data;
  function callback(key) {
    console.log(key);
  }

  return (
    <div className={styles.header}>
      <div className={styles['tool-container']}>{left.map((item) => <Icon type={item} className={styles.icon} />)}</div>
      <Tabs defaultActiveKey="1" onChange={callback} className={styles['tool-container']}>
        {center.map((item, index) => <TabPane tab={item} key={index} />)}
      </Tabs>
      <div className={styles['tool-container']}>{right.map((item) => <Icon type={item} className={styles.icon}/>)}</div>
    </div>
  );
};
