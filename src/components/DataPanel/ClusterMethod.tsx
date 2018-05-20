import React, { Component } from 'react';
import { Dropdown, Button, Icon, InputNumber, Checkbox, Menu, message } from 'antd';
import { TQuesData, TSelectedDims } from '../../models/data';
import { getBaseUrl, getClusterDataFromQuesData, getFilterQuesData } from '../../utils';
import router from 'umi/router';
import { cluster, getClusterDims, getClusterPercent } from '../../services/ml';

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

const plainOptions = ['ANOVA表', '以实际个案为中心'];

interface IClusterMethodProps {
  dispatch: Function;
  analysisStage: number;
  pathname: string;
  selectedDims: TSelectedDims;
  quesData: TQuesData;
}
export default class ClusterMethod extends Component<IClusterMethodProps> {
  static defaultProps: IClusterMethodProps = {
    analysisStage: 0,
    dispatch: () => {},
    pathname: '',
    quesData: [],
    selectedDims: [],
  };

  startCluster = async () => {
    const { quesData, selectedDims, dispatch } = this.props;
    const filterData = getFilterQuesData(quesData, selectedDims);
    const data = { data: getClusterDataFromQuesData(filterData), K: 4 };
    try {
      const { clusters } = await cluster(data);
      const results = getClusterPercent(clusters);
      dispatch({ type: 'data/addClusterTypeToQuesData', payload: clusters });
      dispatch({
        type: 'data/handleClusterResults',
        payload: results.map((result, index) => ({
          percent: result.percent,
          title: `聚类 ${index + 1}`,
          dims: getClusterDims(clusters, filterData, index),
        })),
      });
    } catch (e) {
      console.log(e);
    }
  };
  finish = () => {
    router.push(`${getBaseUrl(this.props.pathname)}/analysis`);
  };
  onChange = (value) => {
    console.log('changed', value);
  };

  onChange_2 = (checkedValues_2) => {
    console.log('checked = ', checkedValues_2);
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
          <InputNumber min={1} max={10} defaultValue={3} onChange={this.onChange} />
        </div>
        <div>
          <CheckboxGroup options={plainOptions} onChange={this.onChange_2} />
        </div>
        <div>
          <Button type="primary" onClick={this.startCluster}>
            生成图表
          </Button>
          <Button type="primary" onClick={this.finish}>
            汇总结果
          </Button>
        </div>
      </div>
    );
  }
}
