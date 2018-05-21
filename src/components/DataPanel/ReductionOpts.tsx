import React, { Component } from 'react';
import { Dropdown, Button, InputNumber, Collapse, Icon, message, Menu, Checkbox } from 'antd';
import styles from './ReductionOpts.less';
import { TDim } from '../../models/data';
import { getBaseUrl } from '../../utils';
import router from 'umi/router';

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}
function onChange(value) {
  console.log('changed', value);
}

const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;
const menu2 = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">最大方差法</Menu.Item>
    <Menu.Item key="2">方法2</Menu.Item>
    <Menu.Item key="3">方法3</Menu.Item>
  </Menu>
);

//dropbox
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">抽取信息量不小于</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const plainOptions = ['相关系数表', '碎石图', '总方差解释', '成分矩阵'];

interface IReductionOptsProps {
  dispatch: Function;
  analysisStage: number;
  pathname: string;
  tabStage: string;
}
export default class ReductionOpts extends Component<IReductionOptsProps> {
  static defaultProps: IReductionOptsProps = {
    dispatch: () => {},
    analysisStage: 0,
    pathname: '',
    tabStage: '',
  };
  finish = () => {
    if (this.props.analysisStage === 5) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '6' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '7' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '5' });
    }

    // Tab 切换
    this.props.dispatch({ type: 'stage/changeTabStage', payload: '3' });

    // 路由跳转
    router.push(`${getBaseUrl(this.props.pathname)}/cluster`);
  };
  render() {
    return (
      <div>
        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              请选择降维抽取参数 <Icon type="down" />
            </Button>
          </Dropdown>
          <InputNumber
            defaultValue={100}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => Number(value.replace('%', ''))}
            onChange={onChange}
          />
        </div>
        <div>
          <Collapse bordered={false} defaultActiveKey={[]}>
            <Panel className={styles.panel} header="高级选项" key="1">
              <div>
                <p>显示图表</p>
                <CheckboxGroup options={plainOptions} defaultValue={[]} onChange={onChange} />
              </div>
              <div>
                <p>旋转方法</p>
                <Dropdown.Button onClick={handleMenuClick} overlay={menu2}>
                  请选择方法
                </Dropdown.Button>
              </div>
              <div />
              <Button type="primary" ghost>
                生成图表
              </Button>
              <Button type="primary" onClick={this.finish}>
                确认并跳转
              </Button>
            </Panel>
          </Collapse>
        </div>
      </div>
    );
  }
}
