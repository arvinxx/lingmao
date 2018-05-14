import React, { Component } from 'react';
import { Button, Divider, Progress, Tag } from 'antd';
import { TDim } from '../../models/data';
const { CheckableTag } = Tag;

interface IRecuceDimsProps {
  dims: Array<TDim>;
  percent: number;
  dispatch: Function;
  analysisStage: number;
}
export default class RecuceDims extends Component<IRecuceDimsProps> {
  static defaultProps: IRecuceDimsProps = {
    dims: [],
    percent: 0,
    dispatch: () => {},
    analysisStage: 0,
  };
  state = { checked: false };
  handleChange = (checked) => {
    this.setState({ checked });
  };
  resetSelection = () => {
    console.log('重置维度');
  };
  confirmSelection = () => {
    console.log('确认维度');
    if (this.props.analysisStage === 4) {
      this.props.dispatch({ type: 'data/addAnalysisStageCount' });
    }
  };
  render() {
    const { percent, dims } = this.props;
    return (
      <div>
        <p>点击选择参与降维的维度</p>
        {dims.map((dim: TDim) => {
          const { id, selected, text } = dim;
          return (
            <CheckableTag key={id} checked={selected} onChange={this.handleChange}>
              {text}
            </CheckableTag>
          );
        })}
        <div>
          <Button onClick={this.resetSelection}>重置</Button>
          <Button type="primary" ghost onClick={this.confirmSelection}>
            确认
          </Button>
          <Divider />
        </div>
        <div>
          {percent ? (
            <div>
              <p>因子分析有效性检验</p>
              <Progress percent={percent} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
