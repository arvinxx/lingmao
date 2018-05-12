import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import { ContextMenuTrigger } from 'react-contextmenu';
import { TTag } from '../../models/tag';
import styles from './tag.less';

const CheckableTag = Tag.CheckableTag;

export default class TagComponent extends PureComponent<any> {
  state = {
    visible: false,
    selectedTags: [''],
  };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { tags } = this.props;
    const { selectedTags } = this.state;
    return (
      <div className={styles['tag-container']}>
        {tags.map((tag: TTag) => {
          const { id, text } = tag;
          return (
            <ContextMenuTrigger id="some-unique-identifier" key={id + 'trigger'}>
              <CheckableTag
                key={id + 'tag'}
                //@ts-ignore
                checked={selectedTags.indexOf(id) > -1}
                onChange={(checked) => this.handleChange(id, checked)}
              >
                {text}
              </CheckableTag>
            </ContextMenuTrigger>
          );
        })}
      </div>
    );
  }
}
