import React, { Component } from 'react';
import { Button } from 'antd';
import { TDim, TSelectedDims } from '../../../../models/data';
import DimSelect from './DimsSelect';

interface IClusterDimProps {
  dispatch: Function;
  dims: Array<TDim>;
  selectedDims: TSelectedDims;
}
export default class ClusterDim extends Component<IClusterDimProps> {
  static defaultProps: IClusterDimProps = {
    dims: [],
    dispatch: () => {},
    selectedDims: [],
  };

  selectDims = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'data/addClusterSelectedDims', payload: id });
    } else {
      this.props.dispatch({ type: 'data/removeClusterSelectedDims', payload: id });
    }
  };
  resetSelect = () => {
    this.props.dispatch({ type: 'data/handleClusterSelectedDims', payload: [] });
  };

  render() {
    const { dims, selectedDims } = this.props;
    return (
      <div style={{ marginLeft: 24 }}>
        <div style={{ marginBottom: 20 }}>点击选择参与聚类的维度</div>
        <DimSelect selectedDims={selectedDims} dims={dims} handleSelect={this.selectDims} />
        <div>
          <Button disabled={selectedDims.length === 0} onClick={this.resetSelect}>
            重置
          </Button>
        </div>
      </div>
    );
  }
}
