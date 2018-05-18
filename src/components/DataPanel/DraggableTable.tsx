import React, { PureComponent } from 'react';
import { Button, Table } from 'antd';
import update from 'immutability-helper';
import BodyRow from './DraggableRow';
import styles from './DraggableTable.less';
import { TSelectedQue, TTableData } from '../../models/data';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const { Column } = Table;
const ButtonGroup = Button.Group;

interface IDragSortingTableProps {
  selectedQues: TSelectedQue[];
  questionState: number;
  dispatch: Function;
  dataSource: TTableData[];
  analysisStage: number;
  name: string;
  tableIndex: number;
}

@(DragDropContext(HTML5Backend) as any)
export default class DragSortingTable extends PureComponent<IDragSortingTableProps> {
  moveRow = (dragIndex, hoverIndex, index) => {
    this.props.dispatch({
      type: 'data/reorderSelectedAnswers',
      payload: { dragIndex, hoverIndex, index },
    });
  };

  questionStateNext = () => {
    const { selectedQues, questionState } = this.props;
    if (questionState < selectedQues.length) {
      this.props.dispatch({ type: 'stage/questionStateNext' });
    }
  };
  questionStateBack = () => {
    const { questionState } = this.props;
    if (questionState > 0) {
      this.props.dispatch({ type: 'stage/questionStateBack' });
    }
  };
  indexStateNext = () => {
    this.props.dispatch({ type: 'stage/indexStateNext' });
  };
  indexStateBack = () => {
    this.props.dispatch({ type: 'stage/indexStateBack' });
  };
  finish = (selectedQues) => {
    this.props.dispatch({ type: 'data/addOrderToQuesData', payload: selectedQues });
    if (this.props.analysisStage === 1) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '2' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '1' });
    }
  };

  render() {
    const { name, dataSource, questionState, selectedQues, tableIndex } = this.props;
    return (
      <Table
        className={styles['index-table']}
        size="middle"
        dataSource={dataSource}
        components={{ body: { row: BodyRow } }}
        pagination={false}
        onRow={(record, index) => ({ index, tableIndex, moveRow: this.moveRow })}
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
                disabled={questionState === selectedQues.length - 1}
                onClick={this.questionStateNext}
              />
            </ButtonGroup>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 16 }} onClick={this.indexStateBack}>
                返回
              </Button>
              <Button onClick={() => this.finish(selectedQues)}>确认</Button>
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
