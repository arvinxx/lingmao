import React, { PureComponent } from 'react';
import { Button, Table } from 'antd';
import update from 'immutability-helper';
import BodyRow from './DraggableRow';
import styles from './DraggableTable.less';
import { TSelectQue, TTableData } from '../../models/data';
import { DragDropContext } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

const { Column } = Table;
const ButtonGroup = Button.Group;

interface IDragSortingTableProps {
  selectedQues: TSelectQue[];
  questionState: number;
  dispatch: Function;
  dataSource: TTableData[];
  analysisStage: number;
  name: string;
}


@(DragDropContext(HTML5Backend) as any)
export default class DragSortingTable extends PureComponent<IDragSortingTableProps> {
  moveRow = (dragIndex, hoverIndex) => {
    const { dataSource } = this.props;
    const dragRow = dataSource[dragIndex];

    const newData = update(dataSource, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
    });
    this.props.dispatch({
      type: 'data/handleSelectedAnswers',
      payload: newData,
    });
  };

  questionStateNext = (answers) => {
    const { selectedQues, questionState } = this.props;
    if (questionState < selectedQues.length) {
      this.props.dispatch({ type: 'stage/questionStateNext' });
    }
    this.props.dispatch({ type: 'data/handleSelectedAnswers', payload: answers });
  };
  questionStateBack = (answers) => {
    const { questionState } = this.props;
    if (questionState > 0) {
      this.props.dispatch({ type: 'stage/questionStateBack' });
    }
    this.props.dispatch({ type: 'data/handleSelectedAnswers', payload: answers });
  };
  indexStateNext = () => {
    this.props.dispatch({ type: 'stage/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'stage/indexStateBack' });
  };
  finish = (answers) => {
    console.log(answers);
    //TODO: ADD Order
    if (this.props.analysisStage === 1) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '2' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '1' });
    }
  };

  render() {
    const { name, dataSource, questionState, selectedQues } = this.props;
    return (
      <Table
        className={styles['index-table']}
        size="middle"
        dataSource={dataSource}
        components={{
          body: { row: BodyRow },
        }}
        pagination={false}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow,
        })}
        footer={() => (
          <div className={styles['button-group']}>
            <ButtonGroup>
              <Button
                type="ghost"
                icon="left"
                disabled={questionState === 0}
                onClick={() => this.questionStateBack(dataSource)}
              />
              <Button
                type="ghost"
                icon="right"
                disabled={questionState === selectedQues.length - 1}
                onClick={() => this.questionStateNext(dataSource)}
              />
            </ButtonGroup>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 16 }} onClick={this.indexStateBack}>
                返回
              </Button>
              <Button onClick={(e) => this.finish(dataSource)}>确认</Button>
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
    );
  }
}
