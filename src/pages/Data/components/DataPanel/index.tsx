import React, { Component, ReactNode } from 'react';
import { Card, Tabs, Collapse } from 'antd';
import { connect } from 'dva';
import { DispatchProp } from 'react-redux';

import Upload from './Upload';
import DataIndex from './DataIndex';
import DimMatch from './DimMatch';
import Charts from './Charts';
import ReduceDims from './ReduceDims';
import ReductionOpts from './ReductionOpts';
import ClusterDim from './ClusterDim';
import ClusterMethod from './ClusterMethod';

import styles from './index.less';

import { extractTags, getFilterDims } from '../../../../utils';
import { queryDocument, getCleanTagGroups } from '../../../../services';

import { dims } from '../../../../../mock/dims';
import { TDataModel } from '../../../../models/data';
import { TStageModel } from '../../../../models/stage';
import { TTag } from '../../../../models/tag';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

interface IDataPanelProps {
  data: TDataModel;
  stage: TStageModel;
  tags: TTag[];
  location: { pathname: string };
}
@connect(({ data, routing, tag, stage }) => ({
  data,
  tags: extractTags(tag.tagGroups),
  stage,
  location: routing.location,
}))
export default class DataPanel extends Component<IDataPanelProps & DispatchProp> {
  static defaultProps: IDataPanelProps = {
    data: {
      quesData: [],
      selectedQues: [],
      reductionSelectedDims: [],
      clusterSelectedDims: [],
      matchSelectedDims: [],
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
    tags: [],
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

  async componentDidMount() {
    let documents = await queryDocument();
    documents = Array.isArray(documents) ? documents : [];
    if (documents.length > 0) {
      this.props.dispatch({
        type: 'tag/querryTagGroups',
        payload: getCleanTagGroups(documents[0]),
      });
    }
  }

  changeTabStage = (key) => {
    this.props.dispatch({ type: 'stage/changeTabStage', payload: key });
  };
  handlePanelClick = (key) => {
    this.props.dispatch({ type: 'stage/handlePanelClick', payload: key });
  };
  render() {
    const { data, dispatch, stage, location, tags: dims } = this.props;
    const {
      selectedQues,
      quesData,
      matchSelectedDims,
      reductionSelectedDims,
      clusterSelectedDims,
      KMO,
      sig,
    } = data;
    const {
      analysisStage,
      indexState,
      tabStage,
      activePanelList,
      questionState,
      tagMatchState,
      reduction,
    } = stage;

    const { reductionDiagrams } = reduction;
    const matchDims = getFilterDims(dims, matchSelectedDims, false);

    const CollapseArray = [
      {
        text: '数据文件',
        component: <Upload dispatch={dispatch} analysisStage={analysisStage} />,
      },
      {
        text: '数据编码',
        component: (
          <DataIndex
            selectedQues={selectedQues}
            quesData={quesData}
            indexState={indexState}
            questionState={questionState}
            dispatch={dispatch}
            analysisStage={analysisStage}
          />
        ),
      },
      {
        text: '维度匹配',
        component: (
          <DimMatch
            dispatch={dispatch}
            tagMatchState={tagMatchState}
            pathname={location.pathname}
            dims={dims}
            selectedDims={matchSelectedDims}
            analysisStage={analysisStage}
            selectedQues={selectedQues}
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
            dims={matchDims}
            selectedDims={reductionSelectedDims}
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
            selectedDims={reductionSelectedDims}
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
          <ClusterDim
            dims={matchDims}
            selectedDims={clusterSelectedDims}
            dispatch={dispatch}
          />
        ),
      },
      {
        text: '聚类方法',
        component: (
          <ClusterMethod
            pathname={location.pathname}
            dispatch={dispatch}
            selectedQues={selectedQues}
            selectedDims={clusterSelectedDims}
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
