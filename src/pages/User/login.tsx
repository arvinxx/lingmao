import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Icon } from 'antd';
import { DispatchProp } from 'react-redux';
import Link from 'umi/link';
import DocumentTitle from 'react-document-title';
import logo from '@/assets/logo.png';

import styles from './login.less';

@connect(({ login }) => ({
  login,
}))
export default class Login extends Component<DispatchProp> {
  state = {
    title: '登录 | 灵猫',
  };
  login() {
    this.props.dispatch({
      type: 'login/login',
      payload: {},
    });
  }

  render() {
    return (
      <DocumentTitle title={this.state.title}>
        <div className={styles.container}>
          {/* <List> */}
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>灵 猫</span>
            </Link>
          </div>
          <Input
            className={styles.inputPhone}
            placeholder="请输入手机号"
            onChange={(e) => {
              const temp = e.target.value;
              this.props.dispatch({ type: 'login/changePhoneNumber', payload: { temp } });
            }}
          />
          <Input
            className={styles.inputCode}
            placeholder="请输入密码"
            style={{ outline: 'none' }}
            type="password"
            onChange={(e) => {
              const temp = e.target.value;
              this.props.dispatch({ type: 'login/changePassword', payload: { temp } });
            }}
          />
          <Button
            type="primary"
            className={styles.button}
            onClick={() => {
              this.login();
            }}
          >
            登录
          </Button>
          <div className={styles['account-container']}>
            <div className={styles.login}>
              <span>已有账号？</span>
              <Link to="/user/register">直接登录</Link>
            </div>
            <div className={styles['OAuth-container']}>
              <div>第三方登录</div>
              <div className={styles.OAuth}>
                <span className={styles['icon-bg']}>
                  <Icon className={styles.icon} type="wechat" />
                </span>
                <span className={styles['icon-bg']}>
                  <Icon className={styles.icon} type="qq" />
                </span>
                <span className={styles['icon-bg']}>
                  <Icon className={styles.icon} type="taobao" />
                </span>
                <span className={styles['icon-bg']}>
                  <Icon className={styles.icon} type="weibo" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
