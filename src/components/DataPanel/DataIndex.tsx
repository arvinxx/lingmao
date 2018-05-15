import React, { Component } from 'react';
import { Steps, Button, Table } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { getAnswers, getKeyArrays, getQuestions } from '../../utils';
import styles from './DataIndex.less';
import { TQuesData, TSelectQue } from '../../models/data';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const { Column } = Table;

interface IDataIndexProps {
  indexState: number;
  questionState: number;
  dispatch: Function;
  analysisStage: number;
  selectedQues: Array<TSelectQue>;
  quesData: Array<TQuesData>;
}
export default class DataIndex extends Component<IDataIndexProps> {
  static defaultProps: IDataIndexProps = {
    indexState: 0,
    analysisStage: 0,
    selectedQues: [],
    quesData: [],
    dispatch: () => {},
    questionState: 0,
  };

  questionStateNext = (answers) => {
    const { selectedQues, questionState } = this.props;
    if (questionState < selectedQues.length) {
      this.props.dispatch({ type: 'data/questionStateNext' });
    }
    this.props.dispatch({ type: 'data/handleSelectedAnswers', payload: answers });
  };
  questionStateBack = (answers) => {
    const { questionState } = this.props;
    if (questionState > 0) {
      this.props.dispatch({ type: 'data/questionStateBack' });
    }
    this.props.dispatch({ type: 'data/handleSelectedAnswers', payload: answers });
  };
  indexStateNext = () => {
    this.props.dispatch({ type: 'data/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'data/indexStateBack' });
  };
  finish = (answers) => {
    console.log(answers);
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
    const { indexState, quesData, selectedQues, questionState } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRow) => {
        this.props.dispatch({
          type: 'data/handleSelectedQuestions',
          payload: selectedRow,
        });
      },
      selectedRowKeys: getKeyArrays(selectedQues.map((selectedQue) => selectedQue.question)),
    };
    const dataSource = getQuestions(quesData);
    return (
      <div>
        <Steps size="small" current={indexState}>
          <Step title="选择问题" description="选择编码的问题" />
          <Step title="维度编码" description="拖动修改答案编码" />
        </Steps>
        <div className={styles.content}>
          {indexState ? (
            <div>
              {selectedQues.map((selectedQue, index) => {
                const { answers, question } = selectedQue;
                const { key, name } = question;
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
                                onClick={() => this.questionStateBack(answers)}
                              />
                              <Button
                                type="ghost"
                                icon="right"
                                disabled={questionState === selectedQues.length - 1}
                                onClick={() => this.questionStateNext(answers)}
                              />
                            </ButtonGroup>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button style={{ marginRight: 16 }} onClick={this.indexStateBack}>
                                返回
                              </Button>
                              <Button onClick={(e) => this.finish(answers)}>确认</Button>
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
                  <Button
                    type="primary"
                    ghost
                    disabled={selectedQues.length === 0}
                    onClick={this.indexStateNext}
                  >
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
