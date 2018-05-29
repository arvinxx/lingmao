import React, { Component } from 'react';
import styles from './DraggableTag.less';
import { DragSource, DropTarget } from 'react-dnd';
import { DispatchProp } from 'react-redux';
import { dragHDirection } from '../../../utils';

const dimSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const dimTarget = {
  drop(props, monitor) {
    const { index: dragIndex, id: dragId } = monitor.getItem();
    const { index: dropIndex, id: dropId, dispatch } = props;
    if (dragId === dropId) {
      return;
    }
    console.log(dragIndex, dropIndex);

    // dispatch({
    //   type: 'tag/handleTagIndexDrag',
    //   payload: {
    //     start: { dragIndex, dragId },
    //     end: { dropIndex, dropId },
    //   },
    // });

    monitor.getItem().dragId = dropId;
  },
};

interface IDraggableTagProps {
  id: string;
  index: number;
}
interface IDnDProps {
  connectDragSource?: Function;
  connectDropTarget?: Function;
  isOver?: boolean;
  isDragging?: boolean;
  sourceTag?: any;
  clientOffset?: any;
  sourceClientOffset?: any;
  initialClientOffset?: any;
}

@(DropTarget('dim', dimTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
})) as any)
@(DragSource('dim', dimSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  sourceTag: monitor.getItem(),
  clientOffset: monitor.getClientOffset(),
  initialClientOffset: monitor.getInitialClientOffset(),
})) as any)
export default class DraggableTag extends Component<IDraggableTagProps & DispatchProp & IDnDProps> {
  static defaultProps: IDraggableTagProps = {
    index: 0,
    id: '',
  };

  render() {
    const {
      children,
      isDragging,
      connectDragSource,
      connectDropTarget,
      isOver,
      sourceTag,
      clientOffset,
      sourceClientOffset,
      initialClientOffset,
      ...restProps
    } = this.props;

    const style = { cursor: isDragging ? 'move' : 'pointer' };

    let className = isDragging ? styles.dragging : null;

    if (isOver && initialClientOffset) {
      const direction = dragHDirection(
        sourceTag.index,
        restProps.index,
        initialClientOffset,
        clientOffset,
        sourceClientOffset
      );

      if (direction === 'left') {
        className += ` ${styles['drop-left']}`;
      }
      if (direction === 'right') {
        className += ` ${styles['drop-right']}`;
      }
    }

    return connectDropTarget(
      connectDragSource(
        <div className={className} style={style}>
          {children}
        </div>
      )
    );
  }
}
