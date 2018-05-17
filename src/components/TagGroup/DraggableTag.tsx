import React, { Component, ReactElement, ReactInstance } from 'react';
import { findDOMNode } from 'react-dom';

import { Tag } from 'antd';
import { DropTarget, DragSource } from 'react-dnd';
import { TSelectedTags, TTag } from '../../models/tag';
import styles from './DraggableTag.less';
import update from 'immutability-helper';
import { dragDirection, dragHDirection } from '../../utils';
const CheckableTag = Tag.CheckableTag;

const tagSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const tagTarget = {
  hover(props: IDraggableTagProps, monitor, component: ReactInstance) {
    const { index: dragIndex, id: dragId } = monitor.getItem();
    const { index: dropIndex, id: dropId } = props;
    // Don't replace items with themselves
    if (dragId === dropId) {
      return;
    }

    // 判断是否越界
    //@ts-ignore
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;
    if (dragIndex < dropIndex && hoverClientX < hoverMiddleX) {
      return;
    }
    if (dragIndex > dropIndex && hoverClientX > hoverMiddleX) {
      return;
    }
  },
  drop(props, monitor) {
    const { index: dragIndex, id: dragId } = monitor.getItem();
    const { index: dropIndex, id: dropId } = props;
    if (dragId === dropId) {
      return;
    }
    props.moveTags({ dragIndex, dragId }, { dropIndex, dropId });
    monitor.getItem().dragId = dropId;
  },
};

interface IDraggableTagProps {
  id: string;
  text: string;
  index: number;
  selectedTags: TSelectedTags;
  tags: TTag[];
  moveTags: Function;
  dispatch: Function;
  connectDragSource?: Function;
  connectDropTarget?: Function;
  isDragging?: boolean;
  isOver?: boolean;
  sourceTag?: any;
  clientOffset?: any;
  sourceClientOffset?: any;
  initialClientOffset?: any;
}

@(DropTarget('tag', tagTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  sourceClientOffset: monitor.getSourceClientOffset(),
})) as any)
@(DragSource('tag', tagSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  sourceTag: monitor.getItem(),
  clientOffset: monitor.getClientOffset(),
  initialClientOffset: monitor.getInitialClientOffset(),
})) as any)
export default class DraggableTag extends Component<IDraggableTagProps> {
  static defaultProps: IDraggableTagProps = {
    dispatch: () => {},
    id: '',
    text: '',
    tags: [],
    moveTags: () => {},
    index: 0,
    isDragging: false,
    selectedTags: [],
  };

  handleChange(id, checked) {
    this.props.dispatch({
      type: 'tag/changeSelectedTags',
      payload: { checked, id },
    });
  }

  render() {
    const {
      id,
      selectedTags,
      text,
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
    //@ts-ignore
    const style = { ...restProps.style, cursor: isDragging ? 'move' : 'pointer' };

    //@ts-ignore
    let className = restProps.className;

    className += isDragging ? styles.dragging : null;

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
    return connectDragSource(
      connectDropTarget(
        <div className={className}>
          <CheckableTag
            {...restProps}
            //@ts-ignore
            style={style}
            key={id + 'tag'}
            checked={selectedTags.indexOf(id) > -1}
            onChange={(checked) => this.handleChange(id, checked)}
          >
            {text}
          </CheckableTag>
        </div>
      )
    );
  }
}
