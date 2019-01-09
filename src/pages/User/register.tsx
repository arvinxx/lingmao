import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Icon } from 'antd';
import { DispatchProp } from 'react-redux';
import Link from 'umi/link';
import DocumentTitle from 'react-document-title';
import logo from '@/assets/logo.png';
import styles from './register.less';

@connect(({ register }) => ({
  register,
}))
export default class Register extends Component<DispatchProp> {
  state = {
    title: '注册 | 灵猫',
  };
  register() {
    this.props.dispatch({
      type: 'register/register',
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
            </Link>
          </div>
          <Input
            className={styles.inputPhone}
            placeholder="请输入手机号"
            onChange={(e) => {
              const temp = e.target.value;
              this.props.dispatch({
                type: 'register/changePhoneNumber',
                payload: { temp },
              });
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
            注册
          </Button>
          <div className={styles['account-container']}>
            <div className={styles.login}>
              <span>已有账号？</span>
              <Link to="/user/login">直接登录</Link>
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
                  <Icon className={styles.icon} type="dingding" />
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
