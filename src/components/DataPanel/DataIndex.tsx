import React, { Component } from 'react';
import { Steps, Button, Table } from 'antd';
import { getAnswers, getKeyArrays, getQuestions } from '../../utils';
import styles from './DataIndex.less';
import { TQuesData, TSelectQue } from '../../models/data';

import DraggableTable from './DraggableTable';

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

  indexStateNext = () => {
    this.props.dispatch({ type: 'stage/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'stage/indexStateBack' });
  };
  finish = (answers) => {
    console.log(answers);
    if (this.props.analysisStage === 1) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '2' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '1' });
    }
  };

  resetSelection = () => {
    this.props.dispatch({
      type: 'data/handleSelectedQuestions',
      payload: [],
    });
  };
  render() {
    const {
      indexState,
      quesData,
      selectedQues,
      questionState,
      dispatch,
      analysisStage,
    } = this.props;
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
                      <DraggableTable
                        name={name}
                        dataSource={answers}
                        selectedQues={selectedQues}
                        analysisStage={analysisStage}
                        questionState={questionState}
                        dispatch={dispatch}
                      />
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
