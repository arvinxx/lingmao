import React, { Component } from 'react';
import { Button } from 'antd';
import { ILabel, TKeys } from '@/models/label';
import LabelSelector from '../LabelSelector';
import { DispatchProp } from 'react-redux';

interface IClusterDimProps {
  labels: ILabel[];
  selectedLabels: TKeys;
}
export default class ClusterDim extends Component<IClusterDimProps & DispatchProp> {
  static defaultProps: IClusterDimProps = {
    labels: [],
    selectedLabels: [],
  };

  selectDims = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'label/addClusterLabels', payload: id });
    } else {
      this.props.dispatch({ type: 'label/removeClusterLabels', payload: id });
    }
  };
  resetSelect = () => {
    this.props.dispatch({ type: 'label/handleClusterLabels', payload: [] });
  };

  render() {
    const { labels, selectedLabels } = this.props;
    return (
      <div style={{ marginLeft: 24 }}>
        <div style={{ marginBottom: 20 }}>点击选择参与聚类的维度</div>
        <LabelSelector
          selectedLabels={selectedLabels}
          labels={labels}
          handleSelect={this.selectDims}
        />
        <div>
          <Button disabled={selectedLabels.length === 0} onClick={this.resetSelect}>
            重置
          </Button>
        </div>
      </div>
    );
  }
}
