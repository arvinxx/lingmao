import React, { Component } from 'react';
import H from 'history';
// @ts-ignore umi withRouter 未包含声明文件
import withRouter from 'umi/withRouter';


import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';
import { queryCurrent } from '../services/user';

const publicList:Array<string> = ['/user/login', '/user/register'];

interface AuthRouteProps {
  location: H.Location;
  history: H.History;
}

@withRouter
export default class AuthRoute extends Component<AuthRouteProps> {
  componentDidMount() {
    const {location} = this.props;
    const {pathname} = location;
    if (publicList.indexOf(pathname) < 0) {
      this.AuthCurrentUser();
    }
  }

  AuthCurrentUser = async () => {
    try {
      const res = await queryCurrent();
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登陆信息
          console.log(res.data);
        } else {
          this.props.history.push('/user/login');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Layout 选择
  render() {
    const {location, children} = this.props;
    const {pathname} = location;
    if (publicList.indexOf(pathname) > -1) {
      return <UserLayout>{children}</UserLayout>;
    } else {
      return <BasicLayout>{children}</BasicLayout>;
    }
  }
}
