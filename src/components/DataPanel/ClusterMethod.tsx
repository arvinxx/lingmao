import React, { Component } from 'react';
import { Dropdown, Button, Icon, InputNumber, Checkbox, Menu, message } from 'antd';
import { TDim } from '../../models/data';
import { baseUrl } from '../../utils';
import router from 'umi/router';

const CheckboxGroup = Checkbox.Group;

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">K-Means聚类法</Menu.Item>
    <Menu.Item key="2">方法2</Menu.Item>
    <Menu.Item key="3">方法3</Menu.Item>
  </Menu>
);

//inputnumber
function onChange(value) {
  console.log('changed', value);
}

//checkbox2

function onChange_2(checkedValues_2) {
  console.log('checked = ', checkedValues_2);
}
const plainOptions = ['ANOVA表', '以实际个案为中心'];

interface IClusterMethodProps {
  dispatch: Function;
  analysisStage: number;
  pathname: string;
}
export default class ClusterMethod extends Component<IClusterMethodProps> {
  static defaultProps: IClusterMethodProps = {
    analysisStage: 0,
    dispatch: () => {},
    pathname: '',
  };

  finish = () => {
    router.push(`${baseUrl(this.props.pathname)}/analysis`);
  };

  render() {
    return (
      <div>
        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              请选择聚类方法 <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div>
          <p>聚类数</p>
          <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
        </div>
        <div>
          <CheckboxGroup options={plainOptions} onChange={onChange_2} />
        </div>
        <div>
          <Button type="primary">生成图表</Button>
          <Button type="primary" onClick={this.finish}>
            汇总结果
          </Button>
        </div>
      </div>
    );
  }
}