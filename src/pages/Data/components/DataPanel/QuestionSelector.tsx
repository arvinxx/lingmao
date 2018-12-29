import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { getQuestions } from '@/utils';
import styles from './QuestionSelector.less';
import { TQuesData, ITextItem } from '@/models/data';

import { DispatchProp } from 'react-redux';

const { Column } = Table;

export interface IQuestionSelectorProps {
  analysisStage: number; // 处理步骤
  quesData: TQuesData; // 问卷数据
}
export default class QuestionSelector extends Component<IQuestionSelectorProps & DispatchProp> {
  static defaultProps: IQuestionSelectorProps = {
    analysisStage: 0,
    quesData: [],
  };

  state = {
    selectedQuestionKeys: [],
  };

  selectQuestion = (question: ITextItem) => {
    const selectedQuestionKeys: string[] = [...this.state.selectedQuestionKeys];
    const index = selectedQuestionKeys.indexOf(question.key);
    if (index >= 0) {
      selectedQuestionKeys.splice(index, 1);
    } else {
      selectedQuestionKeys.push(question.key);
    }
    this.setState({ selectedQuestionKeys });
  };

  resetSelection = () => {
    this.setState({ selectedQuestionKeys: [] });
    this.props.dispatch({
      type: 'data/handleKeyDimensions',
      payload: [],
    });
  };

  finish = () => {
    const { dispatch, analysisStage } = this.props;
    const { selectedQuestionKeys } = this.state;

    // 确认后更新全局 keyDimensions
    dispatch({ type: 'data/handleKeyDimensions', payload: selectedQuestionKeys });
    if (analysisStage === 1) {
      dispatch({ type: 'stage/addAnalysisStageCount' });
      dispatch({
        type: 'stage/addActivePanelList',
        payload: '2',
      });
      dispatch({
        type: 'stage/removeActivePanelList',
        payload: '1',
      });
    }
  };

  render() {
    const { quesData } = this.props;
    const { selectedQuestionKeys } = this.state;

    const rowSelection = {
      onChange: (selectedQuestionKeys) => {
        this.setState({ selectedQuestionKeys });
      },
      selectedRowKeys: selectedQuestionKeys,
    };
    return (
      <div id="Data-Index">
        <div>选择参与分析的问题 </div>
        <div className={styles.content}>
          <div className={styles['select-table']}>
            <Table
              style={{ border: '1px solid #eee' }}
              size="middle"
              dataSource={getQuestions(quesData)}
              pagination={false}
              onRow={(questionKey) => ({
                onClick: () => {
                  this.selectQuestion(questionKey);
                },
              })}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
              footer={() => (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    id="reset"
                    style={{ marginRight: 16 }}
                    onClick={this.resetSelection}
                  >
                    重置
                  </Button>
                  <Button
                    id="confirm"
                    type="primary"
                    ghost
                    disabled={selectedQuestionKeys.length === 0}
                    onClick={this.finish}
                  >
                    确认
                  </Button>
                </div>
              )}
            >
              <Column
                title="全选"
                key="name"
                dataIndex="text"
                render={(text) => <div>{text}</div>}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
