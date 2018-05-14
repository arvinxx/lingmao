import React, { Component } from 'react';
import { Steps, Tabs, Button, Table, Icon } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { getAnswers, getKeyArrays, getQuestions } from '../../utils';
import styles from './DataIndex.less';
import { TQuestion } from '../../models/data';
import { push } from 'react-router-redux';
import { render } from 'enzyme';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const { Column } = Table;

interface IDataIndexProps {
  indexState: number;
  questionState: number;
  dispatch: Function;
  analysisStage: number;
  rawData: Array<object>;
  selectedQuestions: Array<TQuestion>;
}
export default class DataIndex extends Component<IDataIndexProps> {
  static defaultProps: IDataIndexProps = {
    indexState: 0,
    analysisStage: 0,
    rawData: [],
    dispatch: () => {},
    selectedQuestions: [],
    questionState: 0,
  };

  questionStateNext = () => {
    const { selectedQuestions, questionState } = this.props;
    if (questionState < selectedQuestions.length) {
      this.props.dispatch({ type: 'data/questionStateNext' });
    }
  };
  questionStateBack = () => {
    const { questionState } = this.props;
    if (questionState > 0) {
      this.props.dispatch({ type: 'data/questionStateBack' });
    }
  };
  indexStateNext = () => {
    this.props.dispatch({ type: 'data/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'data/indexStateBack' });
  };
  finish = () => {
    if (this.props.analysisStage === 1) {
      this.props.dispatch({ type: 'data/addAnalysisStageCount' });
      this.props.dispatch({ type: 'data/addActivePanelList', payload: '2' });
      this.props.dispatch({ type: 'data/removeActivePanelList', payload: '1' });
    }
  };

  resetSelection = () => {
    this.props.dispatch({
      type: 'data/handleSelectedQuestions',
      payload: [],
    });
  };
  render() {
    const { indexState, rawData, selectedQuestions, questionState } = this.props;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRow) => {
        console.log(selectedRow);
        this.props.dispatch({
          type: 'data/handleSelectedQuestions',
          payload: selectedRow,
        });
      },
      selectedRowKeys: getKeyArrays(selectedQuestions),
    };
    const dataSource = getQuestions(rawData);
    return (
      <div>
        <Steps size="small" current={indexState}>
          <Step title="选择问题" description="选择编码的问题" />
          <Step title="维度编码" description="拖动修改答案编码" />
        </Steps>
        <div className={styles.content}>
          {indexState ? (
            <div>
              {selectedQuestions.map((question, index) => {
                const { key, name } = question;
                const answers = getAnswers(rawData, name);
                console.log(answers);
                if (index === questionState) {
                  return (
                    <div key={key}>
                      <Table
                        className={styles['index-table']}
                        size="middle"
                        dataSource={answers}
                        pagination={false}
                        footer={() => (
                          <div className={styles['button-group']}>
                            <ButtonGroup>
                              <Button
                                type="ghost"
                                icon="left"
                                disabled={questionState === 0}
                                onClick={this.questionStateBack}
                              />
                              <Button
                                type="ghost"
                                icon="right"
                                disabled={questionState === selectedQuestions.length - 1}
                                onClick={this.questionStateNext}
                              />
                            </ButtonGroup>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button style={{ marginRight: 16 }} onClick={this.indexStateBack}>
                                返回
                              </Button>
                              <Button onClick={this.finish}>确认</Button>
                            </div>
                          </div>
                        )}
                      >
                        <Column
                          title={name}
                          key={name}
                          dataIndex="name"
                          render={(text, record) => <div>{text}</div>}
                        />
                      </Table>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <Table
              style={{ border: '1px solid #eee' }}
              size="middle"
              dataSource={dataSource}
              pagination={false}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
              footer={() => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button style={{ marginRight: 16 }} onClick={this.resetSelection}>
                    重置
                  </Button>
                  <Button type="primary" ghost onClick={this.indexStateNext}>
                    确认
                  </Button>
                </div>
              )}
            >
              <Column
                title="全选"
                key="name"
                dataIndex="name"
                render={(text, record) => <div>{text}</div>}
              />
            </Table>
          )}
        </div>
      </div>
    );
  }
}
