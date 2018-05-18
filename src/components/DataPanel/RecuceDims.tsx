import React, { Component } from 'react';
import { Button, Divider, Progress, Tag } from 'antd';
import DimSelect from './DimsSelect';

import { TDim, TSelectedDims } from '../../models/data';
const { CheckableTag } = Tag;

interface IRecuceDimsProps {
  dims: Array<TDim>;
  percent: number;
  dispatch: Function;
  analysisStage: number;
  selectedDims: TSelectedDims;
}
export default class RecuceDims extends Component<IRecuceDimsProps> {
  static defaultProps: IRecuceDimsProps = {
    dims: [],
    percent: 0,
    dispatch: () => {},
    analysisStage: 0,
    selectedDims: [],
  };
  state = { checked: false };
  selectDims = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'data/addReductionSelectedDims', payload: id });
    } else {
      this.props.dispatch({ type: 'data/removeReductionSelectedDims', payload: id });
    }
  };

  resetSelection = () => {
    console.log('重置维度');
  };
  confirmSelection = () => {
    console.log('确认维度');
    if (this.props.analysisStage === 4) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '5' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '4' });
    }
  };
  render() {
    const { percent, dims, selectedDims } = this.props;
    return (
      <div>
        <p>点击选择参与降维的维度</p>
        <DimSelect selectedDims={selectedDims} dims={dims} handleSelect={this.selectDims} />
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
