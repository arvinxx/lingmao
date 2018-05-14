import React, { Component } from 'react';
import { Button, Divider, Icon } from 'antd';

export default class ClusterDim extends Component {
  static defaultProps = {};

  render() {
    return (
      <div>
        <p>点击选择参与降维的维度</p>
        <div>
          <Button>降维成份一</Button>
          <Button>降维成份二</Button>
          <Button>降维成份三</Button>
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
        <div>
          <Divider />
          <Button>重置</Button>
          <Button type="primary" ghost>
            确认
          </Button>
        </div>
        <div>
          <Icon type="info-circle-o" />
          <p>聚类数预估参考 3，5</p>
        </div>
      </div>
    );
  }
}
