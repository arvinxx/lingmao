import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import styles from './DraggableBlock.less';

const dragSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const dropTarget = {
  drop(props, monitor) {
    const { index: dragIndex } = monitor.getItem();
    const { index: dropIndex, dispatch } = props;
    if (dragIndex === dropIndex) {
      return;
    }
    console.log(dropIndex, dragIndex);
    if (dropIndex !== undefined) {
      dispatch({ type: 'persona/handleDragPersonaData', payload: { dragIndex, dropIndex } });
    }
    monitor.getItem().dragIndex = dropIndex;
  },
};
interface IDraggableBlockProps {}

@DragSource('block', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  dragItem: monitor.getItem(),
  isDragging: monitor.isDragging(),
}))
@DropTarget('block', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
export default class DraggableBlock extends Component<any> {
  render() {
    const { connectDragSource, children, isDragging, connectDropTarget } = this.props;
    return connectDragSource(
      connectDropTarget(
        <div className={isDragging ? styles.dragging : styles.block}>{children}</div>
      )
    );
  }
}
