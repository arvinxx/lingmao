import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import { connect } from 'dva';
import { DragSource, DropTarget } from 'react-dnd';

import { ContextMenuTrigger } from 'react-contextmenu';
import { TTag } from '../../models/tag';
import styles from './tag.less';

const CheckableTag = Tag.CheckableTag;

const tagSource = {
  beginDrag(props) {
    console.log(props);
    return {
      id: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(dropResult);
    }
  },
};

@connect()
@(DragSource('tag', tagSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})) as any)
export default class TagComponent extends PureComponent<any> {
  state = {
    visible: false,
  };
  handleChange(id, checked) {
    this.props.dispatch({
      type: 'tag/changeSelectedTags',
      payload: { checked, id },
    });
  }

  render() {
    const { tags, selectedTags, connectDragSource } = this.props;
    return (
      <div className={styles['tag-container']}>
        {tags.map((tag: TTag) => {
          const { id, text } = tag;
          return connectDragSource(
            <div key={id + 'trigger'}>
              <ContextMenuTrigger id="some-unique-identifier">
                <CheckableTag
                  key={id + 'tag'}
                  //@ts-ignore
                  checked={selectedTags.indexOf(id) > -1}
                  onChange={(checked) => this.handleChange(id, checked)}
                >
                  {text}
                </CheckableTag>
              </ContextMenuTrigger>
            </div>
          );
        })}
      </div>
    );
  }
}
