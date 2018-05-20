import React, { Component } from 'react';
import { Button, Divider, Icon, Tag } from 'antd';
import { TDim, TSelectedDims } from '../../models/data';
import DimSelect from './DimsSelect';
import styles from './ClusterDim.less';

interface IClusterDimProps {
  dispatch: Function;
  dims: Array<TDim>;
  analysisStage: number;
  selectedDims: TSelectedDims;
}
export default class ClusterDim extends Component<IClusterDimProps> {
  static defaultProps: IClusterDimProps = {
    dims: [],
    dispatch: () => {},
    analysisStage: 0,
    selectedDims: [],
  };

  selectDims = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'data/addClusterSelectedDims', payload: id });
    } else {
      this.props.dispatch({ type: 'data/removeClusterSelectedDims', payload: id });
    }
  };

  finish = () => {
    // 解锁下一条面板
    if (this.props.analysisStage === 6) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '7' });
    }
  };
  render() {
    const { dims, selectedDims } = this.props;
    return (
      <div>
        <p>点击选择参与降维的维度</p>
        <DimSelect selectedDims={selectedDims} dims={dims} handleSelect={this.selectDims} />
        <div>
          <Button style={{ marginRight: 16 }}>重置</Button>
          <Button type="primary" ghost onClick={this.finish}>
            确认
          </Button>
        </div>
        <div className={styles.info}>
          <Icon type="info-circle-o" />

          <div style={{ marginLeft: 12 }}>聚类数预估参考 3，5</div>
        </div>
      </div>
    );
  }
}
