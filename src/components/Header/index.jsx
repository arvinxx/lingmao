import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';
import { connect } from 'dva';

// import withRouter from 'umi/withouter';

const TabPane = Tabs.TabPane;
import styles from './index.less';

@connect(({ interview }) => ({
  interview,
}))
// @withRouter
export default class Header extends Component {
  state = {
    current: '0',
  };
  callback = (key) => {
    // console.log(key);
  };
  goToUrl = (url) => {
    console.log(`/${url}`);
    // router.push(`/${url}`);
  };
  onClick = (dispatch) => {
    this.props.dispatch(dispatch);
  };

  render() {
    const { left, center, right } = this.props.header;
    // const { location } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles['tool-container']}>
          {left.map((item) => {
            const { text, dispatch } = item;
            return (
              <Icon
                key={'icon' + text}
                onClick={() => {
                  this.onClick(dispatch);
                }}
                type={text}
                className={styles.icon}
              />
            );
          })}
        </div>
        <Tabs
          defaultActiveKey="0-menu"
          onChange={this.callback}
          className={styles['tool-container']}
        >
          {center.map((item, index) => {
            const { text, path } = item;
            return <TabPane tab={text} key={index + '-menu'} />;
          })}
        </Tabs>
        <div className={styles['tool-container']}>
          {right.map((item) => {
            const { text, dispatch } = item;
            return (
              <Icon
                key={'icon' + text}
                onClick={() => {
                  this.onClick(dispatch);
                }}
                type={text}
                className={styles.icon}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
