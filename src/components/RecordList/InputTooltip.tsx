import React, { Component } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { TTag } from '../../models/tag';
import styles from './InputTooltip.less';

export default class InputTooltip extends Component<any> {
  componentWillUpdate() {
    console.log('count');
    return false;
  }
  changeTagText = (e, id) => {
    console.log(e.target.value);
    this.props.dispatch({
      type: 'tag/changeTagText',
      payload: { id, newText: e.target.value },
    });
  };

  deleteTag = (id, editor) => {
    const { dispatch, tags } = this.props;
    dispatch({
      type: 'tag/deleteTag',
      payload: id,
    });
    if (tags.length <= 1) {
      editor.change((change) => change.removeMark(''));
      console.log('取消下划线');
    }
  };
  render() {
    const { props, tags } = this.props;
    const { children, attributes, editor } = props;
    return (
      <Popover
        overlayClassName={styles['tag-pop']}
        getPopupContainer={() => document.getElementById('tooltip') || document.body}
        content={tags.map((tag: TTag) => {
          const { id: tid, refId, text } = tag;
          return (
            <div key={tid + 'tag-container'} className={styles['tag-container']}>
              <div key={tid + 'input-container'} className={styles['input-container']}>
                <Input
                  className={styles.tag}
                  onChange={(e) => this.changeTagText(e, tid)}
                  value={text}
                />
                <Popconfirm
                  key={'ppp'}
                  title="确认要删除吗?"
                  onConfirm={() => this.deleteTag(tid, editor)}
                  okText="是"
                  cancelText="否"
                >
                  <Icon key={'close'} type="close" className={styles['value-delete']} />
                </Popconfirm>
              </div>
            </div>
          );
        })}
      >
        <span className={styles.underlines} {...attributes}>
          {children}
        </span>
      </Popover>
    );
  }
}
