import React, { Component, Fragment } from 'react';
import { Button, InputNumber, Checkbox, Select } from 'antd';
import { TQuesData, IKeyDimension } from '@/models/data';
import {
  getBaseUrl,
  getValueFromQuesData,
  getFilterQuesData,
  getCountAndPercent,
} from '@/utils';
import router from 'umi/router';
import { cluster, getClusterDims, getPersonaQuesDatum } from '@/services';
import { TSelectedLabelKeys } from '@/models/tag';

const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;

interface IClusterMethodProps {
  dispatch: Function;
  pathname: string;
  selectedLabels: TSelectedLabelKeys;
  quesData: TQuesData;
  keyDimensions: IKeyDimension[];
}
interface IClusterMethodStates {
  K: number;
  method: string;
  options: string[];
}
export default class ClusterMethod extends Component<IClusterMethodProps, IClusterMethodStates> {
  static defaultProps: IClusterMethodProps = {
    dispatch: () => {},
    pathname: '',
    quesData: [],
    keyDimensions: [],
    selectedLabels: [],
  };

  state = {
    K: 3,
    method: '1',
    options: [],
  };
  plainOptions = ['ANOVA 表', '以实际个案为中心'];

  startCluster = async () => {
    const { quesData, selectedLabels, dispatch, keyDimensions } = this.props;
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
      const filterData = getFilterQuesData(quesData, selectedLabels);
      const data = { data: getValueFromQuesData(filterData), K };
      const { clusters } = await cluster(data);
      const results = getCountAndPercent(clusters);
      dispatch({ type: 'data/addClusterTypeToQuesData', payload: clusters });
      dispatch({
        type: 'data/handleClusterResults',
        payload: results.map((result, index) => ({
          percent: result.percent,
          title: `聚类 ${index + 1}`,
          dims: getClusterDims(clusters, filterData, index, keyDimensions),
        })),
      });
      //获得取得每个问题完整平均值的画像信息
      dispatch({
        type: 'data/handlePersonaQuesData',
        payload: results.map((result, index) =>
          getPersonaQuesDatum(quesData, index, result.percent)
        ),
      });
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
    const { K, options, method } = this.state;
    return (
      <div style={{ marginTop: 8, marginLeft: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0 8px 0' }}>
          <Select
            style={{ width: 150 }}
            defaultValue="1"
            placeholder="请选择聚类方法"
            onChange={this.ChangeMethod}
          >
            <Option value="1">K-Means聚类法</Option>
            <Option value="2">层次聚类法</Option>
          </Select>
          {method === '2' ? null : (
            <Fragment>
              <div style={{ marginLeft: 16 }}>聚类数</div>
              <InputNumber
                style={{ width: 48, marginLeft: 8 }}
                min={2}
                max={9}
                value={K}
                onChange={this.changeK}
              />
            </Fragment>
          )}
        </div>
        <div style={{ marginTop: 16 }}>
          <CheckboxGroup options={this.plainOptions} value={options} onChange={this.onChange} />
        </div>
        <div style={{ marginTop: 24 }}>
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
