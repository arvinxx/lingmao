import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

import styles from './index.less';

export default class Header extends Component<any> {
  callback = (key) => {
    console.log(key);
  };
  render() {
    const { left, center, right } = this.props.header;

    return (
      <div className={styles.header}>
        <div className={styles['tool-container']}>
          {left.map((item) => {
            const { text, onClick } = item;
            return (
              <Icon
                key={'icon' + text}
                onClick={(e) => {
                  onClick(e);
                }}
                type={text}
                className={styles.icon}
              />
            );
          })}
        </div>
        <Tabs defaultActiveKey="1" onChange={this.callback} className={styles['tool-container']}>
          {center.map((item, index) => <TabPane tab={item} key={index} />)}
        </Tabs>
        <div className={styles['tool-container']}>
          {right.map((item) => <Icon key={'icon' + item} type={item} className={styles.icon} />)}
        </div>
      </div>
    );
  }
}
