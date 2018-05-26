import React, { Component, ReactNode } from 'react';
import { Card, Tabs, Collapse } from 'antd';
import { connect } from 'dva';

import UploadComponent from './Upload';
import DataIndexComponent from './DataIndex';
import ClusterMethodComponent from './ClusterMethod';
import ClusterDimComponent from './ClusterDim';
import ReductionOptsComponent from './ReductionOpts';
import Charts from './Charts';
import RecuceDimsComponent from './RecuceDims';
import DimMatchComponent from './DimMatch';

import styles from './index.less';

import { dims } from '../../../mock/dims';
import { TDataModel } from '../../models/data';
import { TStageModel } from '../../models/stage';
import { extractTags, getFilterDims } from '../../utils';
import { TTag } from '../../models/tag';
import { queryDocument, getCleanTagGroups } from '../../services';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

interface IDataPanelProps {
  dispatch?: Function;
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
export default class DataPanel extends Component<IDataPanelProps> {
  static defaultProps: IDataPanelProps = {
    data: {
      quesData: [],
      selectedQues: [],
      reductionSelectedDims: [],
      clusterSelectedDims: [],
      matchSelectedDims: [],
      selectClusterIndex: 0,
      clusterResults: [],
      FAResult: {
        KMO: 0,
        sig: 0,
      },
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
    },
    location: { pathname: '' },
    dispatch: () => {},
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
      FAResult,
    } = data;
    const {
      analysisStage,
      indexState,
      tabStage,
      activePanelList,
      questionState,
      tagMatchState,
    } = stage;

    const matchDims = getFilterDims(dims, matchSelectedDims, false);

    const CollapseArray = [
      {
        text: '数据文件',
        component: <UploadComponent dispatch={dispatch} analysisStage={analysisStage} />,
      },
      {
        text: '数据编码',
        component: (
          <DataIndexComponent
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
          <DimMatchComponent
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
          <RecuceDimsComponent
            dims={matchDims}
            selectedDims={reductionSelectedDims}
            percent={FAResult.KMO}
            analysisStage={analysisStage}
            dispatch={dispatch}
          />
        ),
      },
      {
        text: '维度选项',
        component: (
          <ReductionOptsComponent
            pathname={location.pathname}
            analysisStage={analysisStage}
            dispatch={dispatch}
            tabStage={tabStage}
          />
        ),
      },
      {
        text: '选择维度',
        component: (
          <ClusterDimComponent
            dims={matchDims}
            selectedDims={clusterSelectedDims}
            analysisStage={analysisStage}
            dispatch={dispatch}
          />
        ),
      },
      {
        text: '聚类方法',
        component: (
          <ClusterMethodComponent
            analysisStage={analysisStage}
            pathname={location.pathname}
            dispatch={dispatch}
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
          <TabPane tab="因子分析" key="2">
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
