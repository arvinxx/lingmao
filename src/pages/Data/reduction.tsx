import React, { Component } from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './reduction.less';

import { Plots, VarianceExplain, CorrTable, CompMatrixTable } from './components';
import { TReductionDiagrams } from '../../models/stage';
import { getAccumulation } from '../../utils';
import { IFAResult } from '../../models/data';

const Panel = Collapse.Panel;

interface IReductionProps {
  diagrams: TReductionDiagrams;
  FAResult: IFAResult;
}
@connect(({ stage, data }) => ({ diagrams: stage.reductionDiagrams, FAResult: data.FAResult }))
export default class Reduction extends Component<IReductionProps> {
  static defaultProps: IReductionProps = {
    diagrams: [],
    FAResult: {
      sig: 0,
      KMO: 0,
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
    const { diagrams, FAResult } = this.props;
    const { eigenValues, componentMatrix, corr, percent } = FAResult;

    const CMColumns = componentMatrix.map((comp, index) => ({
      title: (index + 1).toString(),
      dataIndex: index.toString(),
      key: index.toString(),
    }));
    const CMData = componentMatrix.map((i, index) => ({
      ...i.map((t) => t.toFixed(1)),
      dims: index + 1,
      key: index,
    }));

    const CorrColumns = corr.map((comp, index) => ({
      title: (index + 1).toString(),
      dataIndex: index.toString(),
      key: index.toString(),
    }));

    const corrData = corr.map((i, index) => ({
      ...i.map((t) => t.toFixed(2)),
      key: index,
      dims: index + 1,
    }));

    const chartData = eigenValues.map((eigenValue, index) => ({
      n: index + 1,
      value: eigenValue,
    }));

    const vEData = eigenValues.map((i, index) => ({
      key: index,
      eigenValue: i.toFixed(3),
      percent: (percent[index] * 100).toFixed(1) + '%',
      acc: (getAccumulation(percent)[index] * 100).toFixed(1) + '%',
      dims: index + 1,
    }));

    if (diagrams.length > 0) {
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
                      <Plots data={chartData} />
                    </div>
                  ) : diagram === '方差解释表' ? (
                    <VarianceExplain data={vEData} rotation={false} />
                  ) : diagram === '相关系数表' ? (
                    <CorrTable data={corrData} columns={CorrColumns} />
                  ) : null}
                </Panel>
              </Collapse>
            </div>
          ))}
        </div>
      );
    } else return <div>no data</div>;
  }
}
