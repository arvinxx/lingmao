import React, { Component } from 'react';
import { Button, Icon, InputNumber, Checkbox, Select } from 'antd';
import { TQuesData, TSelectedDims } from '../../models/data';
import {
  getBaseUrl,
  getClusterDataFromQuesData,
  getFilterQuesData,
  getCountAndPercent,
} from '../../utils';
import router from 'umi/router';
import { cluster, getClusterDims } from '../../services/ml';
import styles from './ClusterMethod.less';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

interface IClusterMethodProps {
  dispatch: Function;
  analysisStage: number;
  pathname: string;
  selectedDims: TSelectedDims;
  quesData: TQuesData;
}
interface IClusterMethodStates {
  K: number;
  method: string;
  options: string[];
}
export default class ClusterMethod extends Component<IClusterMethodProps, IClusterMethodStates> {
  static defaultProps: IClusterMethodProps = {
    analysisStage: 0,
    dispatch: () => {},
    pathname: '',
    quesData: [],
    selectedDims: [],
  };

  state = {
    K: 3,
    method: '1',
    options: [],
  };
  plainOptions = ['ANOVA 表', '以实际个案为中心'];

  startCluster = async () => {
    const { quesData, selectedDims, dispatch } = this.props;
    const { K, options, method } = this.state;
    if (method === '1') {
      if (options.indexOf('以实际个案为中心') > -1) {
        //TODO： 随机选择 data 中的 K 个数据作为中心
        console.log('接受以实际个案为中心');
      }
      if (options.indexOf('ANOVA 表') > -1) {
        //TODO: 检验聚类有效性的 ANOVA 表
        console.log('ANOVA 表');
      }
      const filterData = getFilterQuesData(quesData, selectedDims);
      const data = { data: getClusterDataFromQuesData(filterData), K };
      try {
        const { clusters } = await cluster(data);
        const results = getCountAndPercent(clusters);
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
    }
    if (method === '2') {
      //TODO :层次聚类法  ml-hclust
      console.log('HC');
    }
  };
  finish = () => {
    router.push(`${getBaseUrl(this.props.pathname)}/analysis`);
  };
  changeK = (value) => {
    this.setState({ K: value });
  };

  ChangeMethod = (value) => {
    this.setState({ method: value });
  };

  onChange = (value) => {
    this.setState({ options: value });
  };

  render() {
    const { K, options } = this.state;
    return (
      <div style={{ marginTop: 8 }}>
        <Select
          style={{ width: 150 }}
          defaultValue="1"
          placeholder="请选择聚类方法"
          onChange={this.ChangeMethod}
        >
          <Option value="1">K-Means聚类法</Option>
          <Option value="2">层次聚类法</Option>
        </Select>
        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0 8px 0' }}>
          <div>聚类数</div>
          <InputNumber
            style={{ width: 40, marginLeft: 16 }}
            min={2}
            max={9}
            value={K}
            size="small"
            onChange={this.changeK}
          />
        </div>
        <div className={styles.info}>
          <Icon type="info-circle-o" />
          <div style={{ marginLeft: 12 }}>聚类数预估参考 3，5</div>
        </div>
        <div>
          <CheckboxGroup options={this.plainOptions} value={options} onChange={this.onChange} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" ghost onClick={this.startCluster} style={{ marginRight: 16 }}>
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
