import React, { Component, ReactNode } from 'react';
import { DropTarget, DragSource, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import styles from './DraggableBlock.less';
import { connect } from 'dva';
import update from 'immutability-helper';
import { TDimGroups } from '@/models/persona';
import { DispatchProp } from 'react-redux';
import { dragHDirection } from '@/utils';

const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};
const dropTarget = {
  drop(props: IDraggableBlockProps & DispatchProp, monitor) {
    const { index: dragIndex } = monitor.getItem();
    const { index: dropIndex, dispatch, dimGroups, personaIndex, displayDimGroups } = props;
    // if (dragIndex === dropIndex) {
    //   return;
    // }
    if (dropIndex !== dragIndex) {
      const dragDimGroup = displayDimGroups[dragIndex as number];
      const dropDimGroup = displayDimGroups[dropIndex];
      const originalDragIndex = dimGroups.findIndex(
        (dimGroup) => dimGroup.key === dragDimGroup.key
      );
      const originalDropIndex = dimGroups.findIndex(
        (dimGroup) => dimGroup.key === dropDimGroup.key
      );

      dispatch({
        type: 'persona/handleDragDimGroups',
        payload: {
          dimGroups: update(dimGroups, {
            $splice: [[originalDragIndex, 1], [originalDropIndex, 0, dragDimGroup]],
          }),
          personaIndex,
        },
      });
    }
    monitor.getItem().dragIndex = dropIndex;
  },
  // hover(props: IDraggableBlockProps & DispatchProp, monitor){
  //
  // }
};

export interface IDraggableBlockProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
  connectDropTarget: Function;
  isDragging: boolean;
  personaIndex: number;
  dimGroups: TDimGroups;
  displayDimGroups: TDimGroups;
  index: number;
  text: string;
}

@(connect() as any)
@DropTarget('block', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dropClientOffset: monitor.getSourceClientOffset(),
}))
@DragSource('block', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  dragItem: monitor.getItem(),
  isDragging: monitor.isDragging(),
  clientOffset: monitor.getClientOffset(),
  dragClientOffset: monitor.getInitialClientOffset(),
}))
export default class DraggableBlock extends Component<IDraggableBlockProps & DispatchProp> {
  render() {
    const {
      connectDragSource,
      connectDragPreview,
      children,
      connectDropTarget,
      isDragging,
      text,
    } = this.props;
    const style = { cursor: 'move' };

    let className = styles.container;

    if (isDragging) {
      className += ` ${styles.dragging}`;
    }

    return connectDropTarget(
      connectDragPreview(
        <div className={className}>
          {connectDragSource(
            <div style={style} className={styles.info}>
              {text}
            </div>
          )}
          {children}
        </div>
      )
    );
  }
}
