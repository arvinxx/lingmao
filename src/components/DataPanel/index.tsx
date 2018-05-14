import React, { Component, ReactNode } from 'react';
import { Card, Tabs, Collapse } from 'antd';

import UploadComponent from './upload';
import DataIndexComponent from './DataIndex';
import ClusterMethodComponent from './ClusterMethod';
import ClusterDimComponent from './ClusterDim';
import ReductionOptsComponent from './ReductionOpts';
import ValidationComponent from './Validation';
import RecuceDimsComponent from './RecuceDims';
import DimMatchComponent from './DimMatch';

import styles from './index.less';

import { dims } from '../../../mock/dims';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class DataPanel extends Component {
  state = {
    analysisStage: 9,
    indexState: 0,
  };
  callback = (key) => {
    console.log(key);
  };

  render() {
    const { analysisStage, indexState } = this.state;
    const CollapseArray = [
      { text: '数据文件', component: <UploadComponent /> },
      { text: '数据编码', component: <DataIndexComponent indexState={indexState} /> },
      { text: '维度匹配', component: <DimMatchComponent /> },
      { text: '有效性检验', component: <ValidationComponent /> },
      { text: '选择维度', component: <RecuceDimsComponent dims={dims} percent={70} /> },
      { text: '维度选项', component: <ReductionOptsComponent /> },
      { text: '选择维度', component: <ClusterDimComponent /> },
      { text: '聚类方法', component: <ClusterMethodComponent /> },
    ];
    const PanelComponent = (from: number, end: number): ReactNode => {
      {
        return CollapseArray.map((panel, index) => {
          if (index >= from && index < end) {
            return (
              <Panel
                className={styles.panel}
                disabled={index > analysisStage}
                header={panel.text}
                key={index.toString()}
              >
                {panel.component}
              </Panel>
            );
          }
        });
      }
    };
    return (
      <Card bordered={false} className={styles.right}>
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
          <TabPane tab="预处理" key="1">
            <div className={styles.advanced}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                {PanelComponent(0, 4)}
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="降维" key="2">
            <Collapse bordered={false} defaultActiveKey={['4']}>
              {PanelComponent(4, 6)}
            </Collapse>
          </TabPane>
          <TabPane tab="聚类" key="3">
            <Collapse bordered={false} defaultActiveKey={['6']}>
              {PanelComponent(6, 9)}
            </Collapse>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
