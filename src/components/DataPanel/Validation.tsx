import React, { Component } from 'react';
import { Icon, Button } from 'antd';

export default class Validation extends Component {
  static defaultProps = {};

  render() {
    return (
      <div>
        <div>
          <Icon type="plus-circle-o" />
          <p>添加检验维度</p>
        </div>
        <div>
          <Button>生成图表</Button>
          <Button type="primary">确认并跳转</Button>
        </div>
      </div>
    );
  }
}
