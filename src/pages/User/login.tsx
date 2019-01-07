import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import { DispatchProp } from 'react-redux';
import Link from 'umi/link';
import DocumentTitle from 'react-document-title';

import styles from './login.less';

@connect(({ login }) => ({
  login
}))
export default class Login extends Component<DispatchProp> {
  state = {
    title: '登录 | 灵猫'
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
        <Input
          placeholder="手机号"
          onChange={(e) => {
            const temp = e.target.value;
            this.props.dispatch({
              type: 'login/changePhoneNumber',
              payload: { temp },
            });
          }}
        />
        <Input
          type="password"
          onChange={(e) => {
            const temp = e.target.value;
            this.props.dispatch({
              type: 'login/changePassword',
              payload: { temp },
            });
          }}
        />
        {/* </List> */}
        <Button
          type="primary"
          onClick={() => {
            this.login();
          }}
        >
          登录
        </Button>
        <p>还没有帐号？</p>
        <Link to="/user/register">
          <p>注册新帐号</p>
        </Link>
      </div>
      </DocumentTitle>
    );
  }
}
