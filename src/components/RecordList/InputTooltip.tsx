import React, { Component } from 'react';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { TTag } from '../../models/tag';
import styles from './InputTooltip.less';
import { DispatchProp } from 'react-redux';
import { Value } from 'slate';
export interface IInputTooltipProps {
  tags: TTag[];
  props: { children; attributes; editor };
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
    },
    value: undefined,
    onChange: () => {},
  };
  count: number = 0;
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
    const { children, attributes, editor } = props;
    this.count++;
    console.log(this.count);
    return (
      <span {...attributes}>
        <Popover
          overlayClassName={styles['tag-pop']}
          getPopupContainer={() => document.getElementById('tooltip') || document.body}
          content={tags.map((tag: TTag) => {
            const { id, refId, offset, text } = tag;
            return props.node.key === refId && props.offset === offset ? (
              <div key={id + 'tag-container'} className={styles['tag-container']}>
                <div key={id + 'input-container'} className={styles['input-container']}>
                  <Input
                    className={styles.tag}
                    onChange={(e) => this.changeTagText(e, id)}
                    value={text}
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
