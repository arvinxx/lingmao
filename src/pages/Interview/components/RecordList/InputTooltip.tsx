import React, { Component } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { ITag } from '../../../../models/label';
import styles from './InputTooltip.less';
import { DispatchProp } from 'react-redux';
import { Value } from 'slate';
export interface IInputTooltipProps {
  tags: ITag[];
  props: { children; attributes; editor; text };
  onChange: Function;
  value: Value;
}
export default class InputTooltip extends Component<IInputTooltipProps & DispatchProp> {
  static defaultProps: IInputTooltipProps = {
    tags: [],
    props: {
      attributes: undefined,
      children: undefined,
      editor: undefined,
      text: '',
    },
    value: undefined,
    onChange: () => {},
  };
  changeTagText = (e, id) => {
    const { dispatch, value, onChange } = this.props;
    onChange(value.change().blur());

    dispatch({
      type: 'tag/changeTagText',
      payload: { id, newText: e.target.value },
    });
  };

  deleteTag = (id, props, editor) => {
    const { dispatch } = this.props;
    const { node, offset, text } = props;
    dispatch({
      type: 'tag/deleteTag',
      payload: id,
    });
    editor.change((change) => change.removeMarkByKey(node.key, offset, text.length, 'underline'));
  };

  render() {
    const { props, tags } = this.props;
    const { children, attributes, editor, text } = props;
    return (
      <span {...attributes}>
        <Popover
          overlayClassName={styles['tag-pop']}
          getPopupContainer={() => document.getElementById('tooltip') || document.body}
          content={tags.map((tag: ITag) => {
            const { id, text: value, refText } = tag;
            return text === refText ? (
              <div key={id + 'tag-container'} className={styles['tag-container']}>
                <div key={id + 'input-container'} className={styles['input-container']}>
                  <Input
                    className={styles.tag}
                    style={{ width: value.length * 14 + 32 }}
                    onChange={(e) => this.changeTagText(e, id)}
                    value={value}
                  />
                  <Popconfirm
                    key={'ppp'}
                    title="确认要删除吗?"
                    onConfirm={() => this.deleteTag(id, props, editor)}
                    okText="是"
                    cancelText="否"
                  >
                    <Icon key={'close'} type="close" className={styles['value-delete']} />
                  </Popconfirm>
                </div>
              </div>
            ) : null;
          })}
        >
          <span className={styles.underlines}>{children}</span>
        </Popover>
      </span>
    );
  }
}
