import React, { Component } from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './reduction.less';

import { Plots, VarianceExplain, CorrTable, CompMatrixTable } from './components';
import { TReductionDiagrams } from '../../models/stage';
import { getColumnsAndData, getEigenValuesData } from '../../utils';
import { IPCAResult } from '../../models/data';

const Panel = Collapse.Panel;

export interface IReductionProps {
  isReduced: boolean;
  diagrams: TReductionDiagrams;
  rotation: boolean;
  PCAResult: IPCAResult;
  FAResult: IPCAResult;
}
@connect(({ stage, data }) => ({
  isReduced: stage.reduction.isReduced,
  diagrams: stage.reduction.reductionDiagrams,
  rotation: stage.reduction.rotation,
  PCAResult: data.PCAResult,
  FAResult: data.FAResult,
}))
export default class Reduction extends Component<IReductionProps> {
  static defaultProps: IReductionProps = {
    diagrams: [],
    rotation: false,
    isReduced: false,
    FAResult: {
      componentMatrix: [],
      corr: [],
      eigenValues: [],
      percent: [],
    },
    PCAResult: {
      componentMatrix: [],
      corr: [],
      eigenValues: [],
      percent: [],
    },
  };
  state = {
    filteredInfo: null,
    sortedInfo: {
      columnKey: '',
      order: false,
    },
  };
  render() {
    const { isReduced, rotation, diagrams, PCAResult, FAResult } = this.props;
    const { eigenValues, componentMatrix, corr, percent } = PCAResult;
    const {
      eigenValues: rEigenValues,
      componentMatrix: rComponentMatrix,
      percent: rPercent,
    } = FAResult;

    const displayComponentMatrix = rotation ? rComponentMatrix : componentMatrix;
    const { columns: CMColumns, data: CMData } = getColumnsAndData(displayComponentMatrix);
    const { columns: CorrColumns, data: corrData } = getColumnsAndData(corr);

    const vEData = rotation
      ? getEigenValuesData(eigenValues, percent, rEigenValues, rPercent)
      : getEigenValuesData(eigenValues, percent);

    if (isReduced) {
      return (
        <div style={{ marginTop: 24, width: 600 }}>
          <div className={styles.card}>
            <CompMatrixTable data={CMData} columns={CMColumns} />
          </div>
          {diagrams.map((diagram) => (
            <div key={diagram} className={styles.card}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header={diagram} key="1">
                  {diagram === '碎石图' ? (
                    <div className={styles.plot}>
                      <Plots data={eigenValues} />
                    </div>
                  ) : diagram === '方差解释表' ? (
                    <VarianceExplain data={vEData} rotation={rotation} />
                  ) : diagram === '相关系数表' ? (
                    <CorrTable data={corrData} columns={CorrColumns} />
                  ) : null}
                </Panel>
              </Collapse>
            </div>
          ))}
        </div>
      );
    } else return <div id="no-data">no data</div>;
  }
}
