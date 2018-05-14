import React, { Component } from 'react';
import { Button } from 'antd';

export default class DimMatch extends Component {
  defaultProps = {};

  render() {
    return (
      <div>
        <p>点击维度，匹配维度</p>
        <div style={{ padding: '26px 16px 16px' }}>
          <Button>年龄</Button>
          <Button>性别</Button>
          <Button>月收入</Button>
          <Button>烟费</Button>
          <Button>烟龄</Button>
          <Button>口味</Button>
          <Button>忠诚度</Button>
          <Button>健康</Button>
          <Button>公共场合</Button>
          <Button>新鲜事物</Button>
          <Button>性价比</Button>
        </div>
        <div />
        <div style={{ padding: '26px 16px 16px' }}>
          <Button>重置</Button>
          <Button type="primary" ghost>
            确认
          </Button>
        </div>
      </div>
    );
  }
}
