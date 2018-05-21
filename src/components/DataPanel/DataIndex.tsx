import React, { Component } from 'react';
import { Steps, Button, Table } from 'antd';
import { getAnswers, getKeyArrays, getQuestions } from '../../utils';
import styles from './DataIndex.less';
import { TQuesData, TSelectedQue } from '../../models/data';

import DraggableTable from './DraggableTable';
import update from 'immutability-helper';

const Step = Steps.Step;
const ButtonGroup = Button.Group;
const { Column } = Table;

interface IDataIndexProps {
  indexState: number;
  questionState: number;
  dispatch: Function;
  analysisStage: number;
  selectedQues: Array<TSelectedQue>;
  quesData: TQuesData;
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
    this.props.dispatch({ type: 'data/addAnswersToSelectQues' });
    this.props.dispatch({ type: 'stage/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'stage/indexStateBack' });
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
        console.log(selectedRow);
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
                        tableIndex={index}
                      />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className={styles['select-table']}>
              <Table
                style={{ border: '1px solid #eee' }}
                size="middle"
                dataSource={dataSource}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => {
                    const selectRow = selectedQues.map((selectedQue) => selectedQue.question);
                    const selectRowKey = selectedQues.map(
                      (selectedQue) => selectedQue.question.key
                    );
                    const index = selectRowKey.indexOf(record.key);

                    //取消选择
                    if (index > -1) {
                      this.props.dispatch({
                        type: 'data/handleSelectedQuestions',
                        payload: update(selectRow, {
                          $splice: [[index, 1]],
                        }),
                      });
                    } else {
                      // TODO：增加选择
                    }
                  },
                })}
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
            </div>
          )}
        </div>
      </div>
    );
  }
}
