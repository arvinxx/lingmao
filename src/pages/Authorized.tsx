import React from 'react';
import 'ant-design-pro/dist/ant-design-pro.css';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from '@/utils';
import { Alert } from 'antd';

import Redirect from 'umi/redirect';

const Authority = getAuthority('');
const Authorized = RenderAuthorized(Authority);

export default ({ children }) => {
  console.log('this is auth page');
  console.log(children.props.route.authority);
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
      {children}
    </Authorized>
  );
};
