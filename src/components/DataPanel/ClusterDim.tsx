import React, { Component } from 'react';
import { Button, Divider, Icon, Tag } from 'antd';
import { TDim } from '../../models/data';
import { baseUrl } from '../../utils';
import router from 'umi/router';

const { CheckableTag } = Tag;

interface IClusterDimProps {
  dispatch: Function;
  dims: Array<TDim>;
  analysisStage: number;
}
export default class ClusterDim extends Component<IClusterDimProps> {
  static defaultProps: IClusterDimProps = {
    dims: [],
    dispatch: () => {},
    analysisStage: 0,
  };

  finish = () => {
    // 解锁下一条面板
    if (this.props.analysisStage === 6) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '7' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '6' });

    }
  };
  render() {
    const { dims } = this.props;
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
          <Divider />
          <Button>重置</Button>
          <Button type="primary" ghost onClick={this.finish}>
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
