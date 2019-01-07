import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import { DispatchProp } from 'react-redux';
import Link from 'umi/link';
import DocumentTitle from 'react-document-title';

import styles from './register.less';

@connect(({ register }) => ({
  register,
}))
export default class Register extends Component<DispatchProp> {
  state = {
    title: '注册 | 灵猫'
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
        <Input
          placeholder="用户名"
          onChange={(e) => {
            const temp = e.target.value;
            this.props.dispatch({
              type: 'register/changeUserName',
              payload: { temp },
            });
          }}
        />
        <Input
          placeholder="手机号"
          onChange={(e) => {
            const temp = e.target.value;
            this.props.dispatch({
              type: 'register/changePhoneNumber',
              payload: { temp },
            });
          }}
        />
        <Input
          type="password"
          onChange={(e) => {
            const temp = e.target.value;
            this.props.dispatch({
              type: 'register/changePassword',
              payload: { temp },
            });
          }}
        />
        {/* </List> */}
        <Button
          type="primary"
          onClick={() => {
            this.register();
          }}
        >
          注册
        </Button>
        <p>已有帐号？</p>
        <Link to='/user'>
          <p>直接登录</p>
        </Link>
      </div>
      </DocumentTitle>
    );
  }
}
