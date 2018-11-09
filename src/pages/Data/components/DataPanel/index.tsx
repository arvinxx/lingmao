import React, { Component, ReactNode } from 'react';
import { Card, Tabs, Collapse } from 'antd';
import { connect } from 'dva';
import { DispatchProp } from 'react-redux';

import Upload from './Upload';
import QuestionSelector from './QuestionSelector';
import LabelMatch from './LabelMatch';
import Charts from './Charts';
import ReduceDims from './ReduceDims';
import ReductionOpts from './ReductionOpts';
import ClusterDim from './ClusterDim';
import ClusterMethod from './ClusterMethod';

import styles from './index.less';

import { getFilterLabels } from '@/utils';

import { IDataState } from '@/models/data';
import { IStageState } from '../../models/stage';
import { ILabel, TKeys } from '@/models/label';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

interface IDataPanelProps {
  data: IDataState;
  stage: IStageState;
  labels: ILabel[];
  clusterLabels: TKeys;
  reductionLabels: TKeys;
  location: { pathname: string };
}
@connect(({ data, routing, label, stage }) => ({
  data,
  labels: label.labels,
  clusterLabels: label.clusterLabels,
  reductionLabels: label.reductionLabels,
  stage,
  location: routing.location,
}))
export default class DataPanel extends Component<IDataPanelProps & DispatchProp> {
  static defaultProps: IDataPanelProps = {
    data: {
      quesData: [],
      userModels: [],
      keyDimensions: [],
      selectClusterIndex: 0,
      clusterResults: [],
      displayPanel: true,
      displayText: false,
      KMO: 0,
      PCAResult: {
        eigenValues: [],
        corr: [],
        componentMatrix: [],
        percent: [],
      },
      FAResult: {
        eigenValues: [],
        corr: [],
        componentMatrix: [],
        percent: [],
      },
      sig: 0,
    },
    clusterLabels: [],
    labels: [],
    reductionLabels: [],
    stage: {
      indexState: 0,
      analysisStage: 0,
      tagMatchState: 0,
      tabStage: '1',
      activePanelList: ['0'],
      questionState: 0,
      showCharts: false,
      reduction: {
        isReduced: false,
        reductionDiagrams: [],
        rotation: false,
      },
    },
    location: { pathname: '' },
  };

  changeTabStage = (key) => {
    this.props.dispatch({ type: 'stage/changeTabStage', payload: key });
  };
  handlePanelClick = (key) => {
    this.props.dispatch({ type: 'stage/handlePanelClick', payload: key });
  };
  render() {
    const { data, dispatch, stage, location, labels, reductionLabels, clusterLabels } = this.props;

    const { keyDimensions, quesData, KMO, sig } = data;

    const { analysisStage, tabStage, activePanelList, tagMatchState, reduction } = stage;

    const { reductionDiagrams } = reduction;

    const matchDims = getFilterLabels(labels, false);

    const CollapseArray = [
      { text: '上传文件', component: <Upload dispatch={dispatch} analysisStage={analysisStage} /> },
      {
        text: '选择问题',
        component: (
          <QuestionSelector quesData={quesData} dispatch={dispatch} analysisStage={analysisStage} />
        ),
      },
      {
        text: '维度匹配',
        component: (
          <LabelMatch
            dispatch={dispatch}
            tagMatchState={tagMatchState}
            pathname={location.pathname}
            labels={labels}
            analysisStage={analysisStage}
            keyDimensions={keyDimensions}
          />
        ),
      },
      {
        text: '可视化图表',
        component: (
          <Charts
            analysisStage={analysisStage}
            pathname={location.pathname}
            dispatch={dispatch}
            tabStage={tabStage}
          />
        ),
      },
      {
        text: '选择维度',
        component: (
          <ReduceDims
            labels={matchDims}
            selectedLabels={reductionLabels}
            percent={KMO}
            sig={sig}
            quesData={quesData}
            dispatch={dispatch}
          />
        ),
      },
      {
        text: '降维选项',
        component: (
          <ReductionOpts
            pathname={location.pathname}
            selectedLabels={reductionLabels}
            dispatch={dispatch}
            diagrams={reductionDiagrams}
            tabStage={tabStage}
            quesData={quesData}
          />
        ),
      },
      {
        text: '选择维度',
        component: (
          <ClusterDim labels={matchDims} selectedLabels={clusterLabels} dispatch={dispatch} />
        ),
      },
      {
        text: '聚类方法',
        component: (
          <ClusterMethod
            pathname={location.pathname}
            dispatch={dispatch}
            keyDimensions={keyDimensions}
            selectedLabels={clusterLabels}
            quesData={quesData}
          />
        ),
      },
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
        <Tabs activeKey={tabStage} onChange={this.changeTabStage} size="large">
          <TabPane tab="预处理" key="1">
            <div className={styles.advanced}>
              <Collapse
                bordered={false}
                onChange={this.handlePanelClick}
                activeKey={activePanelList}
              >
                {PanelComponent(0, 4)}
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="降维" key="2">
            <Collapse bordered={false} onChange={this.handlePanelClick} activeKey={activePanelList}>
              {PanelComponent(4, 6)}
            </Collapse>
          </TabPane>
          <TabPane tab="聚类" key="3">
            <Collapse bordered={false} onChange={this.handlePanelClick} activeKey={activePanelList}>
              {PanelComponent(6, 9)}
            </Collapse>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
