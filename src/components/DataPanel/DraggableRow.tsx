import React, { PureComponent } from 'react';

import { DragSource, DropTarget } from 'react-dnd';
import { dragDirection } from '../../utils';
import styles from './DraggableTable.less';

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

@DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
}))
@DragSource('row', rowSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  dragRow: monitor.getItem(),
  clientOffset: monitor.getClientOffset(),
  initialClientOffset: monitor.getInitialClientOffset(),
}))
export default class BodyRow extends PureComponent<any> {
  render() {
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
    } = this.props;
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
  }
}
