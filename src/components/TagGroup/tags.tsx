import React, { PureComponent } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { ContextMenuTrigger } from 'react-contextmenu';
import { TSelectedTags, TTag, TTagModel } from '../../models/tag';
import styles from './tag.less';
import DraggableTag from './DraggableTag';

interface ITagComponentProps {
  dispatch: Function;
  tags: TTag[];
  selectedTags: TSelectedTags;
}

@(DragDropContext(HTML5Backend) as any)
export default class TagComponent extends PureComponent<ITagComponentProps> {
  static defaultProps: ITagComponentProps = {
    dispatch: () => {},
    selectedTags: [],
    tags: [],
  };

  moveTags = (dragSource, dropSource) => {
    this.props.dispatch({
      type: 'tag/handleTagIndexDrag',
      payload: {
        start: dragSource,
        end: dropSource,
      },
    });
  };
  render() {
    const { tags, selectedTags, dispatch } = this.props;
    return (
      <div className={styles['tag-container']}>
        {tags.map((tag: TTag, index) => {
          const { id, text } = tag;
          return (
            <DraggableTag
              key={id}
              dispatch={dispatch}
              tags={tags}
              text={text}
              id={id}
              moveTags={this.moveTags}
              selectedTags={selectedTags}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}
//            <ContextMenuTrigger id="some-unique-identifier" key={id + 'trigger'}/>
