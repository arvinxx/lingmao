import React, { Component } from 'react';
import { Button, InputNumber, Checkbox, Select } from 'antd';
import router from 'umi/router';
import { DispatchProp } from 'react-redux';
import styles from './ReductionOpts.less';
import { getBaseUrl } from '../../utils';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['相关系数表', '碎石图', '总方差解释'];

export interface IReductionOptsProps {
  analysisStage: number;
  pathname: string;
  tabStage: string;
  diagrams: string[];
}
export default class ReductionOpts extends Component<IReductionOptsProps & DispatchProp> {
  static defaultProps: IReductionOptsProps = {
    analysisStage: 0,
    pathname: '',
    tabStage: '',
    diagrams: [],
  };
  state = {
    value: 100,
    count: 2,
    method: '1',
    rotationMethod: '1',
    diagrams: [],
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
            defaultValue="1"
            value={method}
            placeholder="请选择降维方法"
            onChange={this.changeMethod}
          >
            <Option value="1">特征值不小于</Option>
            <Option value="2">聚类个数为</Option>
          </Select>
          <div style={{ marginLeft: 8 }}>
            {method === '1' ? (
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
            defaultValue="1"
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
          <Button type="primary" style={{ marginRight: 16 }}>
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
