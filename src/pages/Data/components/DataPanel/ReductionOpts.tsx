import React, { Component } from 'react';
import { Button, InputNumber, Checkbox, Select } from 'antd';
import router from 'umi/router';
import { DispatchProp } from 'react-redux';
import styles from './ReductionOpts.less';

import { getBaseUrl, getFilterQuesData, getNumberDataFromQuesData } from '../../../../utils';
import { TQuesData, TSelectedDims } from '../../../../models/data';
import { getFA, getPCA } from '../../../../services/ml';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['相关系数表', '碎石图', '方差解释表'];

export interface IReductionOptsProps {
  pathname: string;
  tabStage: string;
  selectedDims: TSelectedDims;
  diagrams: string[];
  quesData: TQuesData;
}
export default class ReductionOpts extends Component<IReductionOptsProps & DispatchProp> {
  static defaultProps: IReductionOptsProps = {
    pathname: '',
    tabStage: '',
    diagrams: [],
    selectedDims: [],
    quesData: [],
  };
  state = {
    value: 100,
    count: 2,
    method: 'extractRate',
    rotationMethod: '3',
    diagrams: [],
  };

  finish = () => {
    // Tab 切换
    this.props.dispatch({ type: 'stage/changeTabStage', payload: '3' });

    // 路由跳转
    router.push(`${getBaseUrl(this.props.pathname)}/cluster`);
  };

  changeMethod = (method) => {
    this.setState({ method });
  };
  changeRate = (value) => {
    this.setState({ value });
  };
  changeCount = (count) => {
    this.setState({ count });
  };

  changeRotation = (rotationMethod) => {
    this.setState({ rotationMethod });
  };
  changeDiagram = (diagrams) => {
    this.props.dispatch({ type: 'stage/handleReductionDiagrams', payload: diagrams });
  };
  startReduction = async () => {
    const { quesData, selectedDims, dispatch } = this.props;
    const { method, count, value, rotationMethod } = this.state;
    const filterData = getFilterQuesData(quesData, selectedDims);
    const data = getNumberDataFromQuesData(filterData);
    const extractMethod = {};
    extractMethod[method] = method === 'extractRate' ? value : count;

    console.log(data);
    try {
      const res = await getPCA(data, extractMethod);
      dispatch({ type: 'data/handlePCAResult', payload: res });
      if (rotationMethod === '1') {
        const FARes = await getFA(data, extractMethod);
        dispatch({ type: 'data/handleFAResult', payload: FARes });
      }
    } catch (e) {
      console.log(e);
    }

    dispatch({ type: 'stage/startReducing' });
    dispatch({
      type: 'stage/handleReductionRotation',
      payload: rotationMethod !== '3',
    });
  };

  render() {
    const { diagrams } = this.props;
    const { value, method, rotationMethod, count } = this.state;
    return (
      <div style={{ marginLeft: 24 }}>
        <div className={styles.method}>
          <div style={{ marginRight: 8 }}>提取方法</div>

          <Select
            //@ts-ignore
            id="method"
            style={{ width: 130 }}
            value={method}
            placeholder="请选择降维方法"
            onChange={this.changeMethod}
          >
            <Option value="extractRate">特征值不小于</Option>
            <Option value="extractNumber">维度个数为</Option>
          </Select>
          <div style={{ marginLeft: 8 }}>
            {method === 'extractRate' ? (
              <InputNumber
                style={{ width: 72 }}
                id="input-rate"
                min={50}
                max={300}
                step={10}
                value={value}
                formatter={(value) => `${value}%`}
                parser={(value) => Number(value.replace('%', ''))}
                onChange={this.changeRate}
              />
            ) : (
              <InputNumber
                id="input-count"
                style={{ width: 72 }}
                value={count}
                min={1}
                max={10}
                onChange={this.changeCount}
              />
            )}
          </div>
        </div>
        <div className={styles.rotation}>
          <div style={{ marginRight: 8 }}>旋转方法</div>
          <Select
            //@ts-ignore
            id="rotation"
            style={{ width: 130 }}
            placeholder="请选择方法"
            value={rotationMethod}
            onChange={this.changeRotation}
          >
            <Option value="1">最大方差法</Option>
            <Option value="2">最大四次方值法</Option>
            <Option value="3">不旋转</Option>
          </Select>
        </div>
        <div className={styles.diagram}>
          <div style={{ marginBottom: 8 }}>显示图表</div>
          <CheckboxGroup options={plainOptions} value={diagrams} onChange={this.changeDiagram} />
        </div>
        <div className={styles.buttons}>
          <Button type="primary" style={{ marginRight: 16 }} onClick={this.startReduction}>
            确认
          </Button>
          <Button type="primary" ghost onClick={this.finish}>
            跳转
          </Button>
        </div>
      </div>
    );
  }
}
