import React, { Component } from 'react';
import styles from './DraggableList.less';
import { DropTarget } from 'react-dnd';
import DraggableTag from './DraggableTag';
import { DispatchProp } from 'react-redux';
import { TPersonaDimGroup } from '../../../models/persona';
import { TPersonaQuesData, TQuesData } from '../../../models/data';

const dimTarget = {
  drop(props: IDraggableListProps & DispatchProp, monitor) {
    const { id, groupId, dim } = monitor.getItem();
    const { dimGroup, dispatch, personaQuesData } = props;
    if (groupId === dimGroup.key) {
      return;
    }

    // Q1 判断来自问卷数据还是来自自身

    // Q1.1 来自问卷数据，直接将数据添加给自身即可。

    if (groupId === 'ques') {
      dispatch({
        type: 'persona/addDimToPersonaGroups',
        payload: { personaQuesData, personaDimId: id, groupId: dimGroup.key },
      });
      return;
    }

    // Q1.2 自身需要添加Dim到新的类别中，删除原有的那一类
    console.log(groupId, dimGroup.key, dim);
    dispatch({
      type: 'persona/changeDimGroup',
      payload: {
        dragGroup: groupId,
        dropGroup: dimGroup.key,
        dim,
      },
    });

    monitor.getItem().groupId = dimGroup.key;
  },
  canDrop(props: IDraggableListProps, monitor) {
    const { groupId } = monitor.getItem();
    const { dimGroup } = props;

    return groupId !== dimGroup.key;
  },
};

interface IDraggableListProps {
  dimGroup: TPersonaDimGroup;
  personaQuesData: TPersonaQuesData;
  index: number;
}
interface IDnDProps {
  connectDropTarget?: Function;
  isOver?: boolean;
  canDrop?: boolean;
}

@(DropTarget('dim', dimTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})) as any)
export default class DraggableList extends Component<
  IDraggableListProps & IDnDProps & DispatchProp
> {
  removeTag = (tagId, index) => {
    this.props.dispatch({
      type: 'persona/removeDimFromDimGroup',
      payload: { tagId, index },
    });
  };
  render() {
    const {
      connectDropTarget,
      dispatch,
      dimGroup,
      isOver,
      canDrop,
      index: groupIndex,
    } = this.props;
    const { text, dims, key } = dimGroup;
    return connectDropTarget(
      <div className={isOver && canDrop ? styles['board-dragging'] : styles.board}>
        <div className={styles.dims}>{text}</div>
        <div className={styles['tag-container']}>
          {dims.map((dim, index) => (
            <DraggableTag
              key={dim.tagId}
              index={index}
              dispatch={dispatch}
              groupId={key}
              dim={dim}
              id={dim.tagId}
            >
              <div
                className={styles.tag}
                onDoubleClick={() => this.removeTag(dim.tagId, groupIndex)}
              >
                {dim.tagText}
              </div>
            </DraggableTag>
          ))}
        </div>
      </div>
    );
  }
}
