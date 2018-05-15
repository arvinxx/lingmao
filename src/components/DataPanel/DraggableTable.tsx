import React, { Component } from 'react';

import { Steps, Button, Table } from 'antd';

import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { dragDirection } from '../../utils';
import styles from './DraggableTable.less';
import { TSelectQue, TTableData } from '../../models/data';

const { Column } = Table;
const ButtonGroup = Button.Group;

let BodyRow = (props) => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    dragRow,
    clientOffset,
    sourceClientOffset,
    initialClientOffset,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: 'move' };

  let className = restProps.className;
  if (isOver && initialClientOffset) {
    const direction = dragDirection(
      dragRow.index,
      restProps.index,
      initialClientOffset,
      clientOffset,
      sourceClientOffset
    );

    if (direction === 'downward') {
      className += ` ${styles['drop-over-downward']}`;
    }
    if (direction === 'upward') {
      className += ` ${styles['drop-over-upward']}`;
    }
  }

  return connectDragSource(
    connectDropTarget(<tr {...restProps} className={className} style={style} />)
  );
};

const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

BodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))(
  DragSource('row', rowSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset(),
  }))(BodyRow)
);

interface IDragSortingTableProps {
  selectedQues: TSelectQue[];
  questionState: number;
  dispatch: Function;
  dataSource: TTableData[];
  analysisStage: number;
  name: string;
}
class DragSortingTable extends Component<IDragSortingTableProps> {
  state = {
    data: [
      {
        key: '1',
        name: 'John Brown',
      },
      {
        key: '2',
        name: 'Jim Green',
      },
      {
        key: '3',
        name: 'Joe Black',
      },
    ],
  };

  components = {
    body: {
      row: BodyRow,
    },
  };

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
    const { name, dataSource, questionState, selectedQues } = this.props;
    return (
      <Table
        className={styles['index-table']}
        size="middle"
        // dataSource={this.state.data}
        dataSource={dataSource}
        components={this.components}
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

export default DragDropContext(HTML5Backend)(DragSortingTable);
