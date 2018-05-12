import React, { PureComponent } from 'react';
import { Tag } from 'antd';
import { connect } from 'dva';

import { ContextMenuTrigger } from 'react-contextmenu';
import { TTag } from '../../models/tag';
import styles from './tag.less';

const CheckableTag = Tag.CheckableTag;

@connect()
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
    const { tags, selectedTags } = this.props;
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
