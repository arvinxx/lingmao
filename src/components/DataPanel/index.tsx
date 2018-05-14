import React, { Component, ReactNode } from 'react';
import { Card, Tabs, Collapse } from 'antd';
import { connect } from 'dva';

import UploadComponent from './Upload';
import DataIndexComponent from './DataIndex';
import ClusterMethodComponent from './ClusterMethod';
import ClusterDimComponent from './ClusterDim';
import ReductionOptsComponent from './ReductionOpts';
import ValidationComponent from './Validation';
import RecuceDimsComponent from './RecuceDims';
import DimMatchComponent from './DimMatch';

import styles from './index.less';

import { dims } from '../../../mock/dims';
import { TDataModel } from '../../models/data';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

interface IDataPanelProps {
  dispatch: Function;
  data: TDataModel;
  location: { pathname: string };
}
@connect(({ data, routing }) => ({
  data,
  location: routing.location,
}))
export default class DataPanel extends Component<IDataPanelProps> {
  static defaultProps: IDataPanelProps = {
    data: {
      indexState: 0,
      analysisStage: 0,
      tabStage: '1',
      activePanelList: ['0'],
      rawData: [],
      questions: [],
      questionState: 0,
      selectedQuestions: [],
    },
    location: { pathname: '' },
    dispatch: () => {},
  };
  changeTabStage = (key) => {
    this.props.dispatch({ type: 'data/changeTabStage', payload: key });
  };
  handlePanelClick = (key) => {
    this.props.dispatch({ type: 'data/handlePanelClick', payload: key });
  };
  render() {
    const { data, dispatch, location } = this.props;

    const {
      analysisStage,
      indexState,
      rawData,
      tabStage,
      selectedQuestions,
      activePanelList,
      questionState,
    } = data;
    const CollapseArray = [
      {
        text: '数据文件',
        component: <UploadComponent dispatch={dispatch} analysisStage={analysisStage} />,
      },
      {
        text: '数据编码',
        component: (
          <DataIndexComponent
            selectedQuestions={selectedQuestions}
            rawData={rawData}
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
            pathname={location.pathname}
            dims={dims}
            analysisStage={analysisStage}
          />
        ),
      },
      {
        text: '有效性检验',
        component: (
          <ValidationComponent
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
            dims={dims}
            percent={70}
            dispatch={dispatch}
            analysisStage={analysisStage}
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
          <ClusterDimComponent dims={dims} analysisStage={analysisStage} dispatch={dispatch} />
        ),
      },
      {
        text: '聚类方法',
        component: (
          <ClusterMethodComponent
            analysisStage={analysisStage}
            pathname={location.pathname}
            dispatch={dispatch}
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
            <Collapse bordered={false} activeKey={activePanelList}>
              {PanelComponent(4, 6)}
            </Collapse>
          </TabPane>
          <TabPane tab="聚类" key="3">
            <Collapse bordered={false} activeKey={activePanelList}>
              {PanelComponent(6, 9)}
            </Collapse>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
