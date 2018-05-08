import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import styles from './InputTooltip.less';

const data = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text:
                  'This example shows how you can make a hovering menu appear above your content, which you can use to make text , or anything else you might want to do!',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default class HoveringMenu extends Component<any> {
  state = {
    value: Value.fromJSON(data),
    tagValue: '',
  };
  menu?;
  updateMenu = () => {
    const { value } = this.state;
    const menu = this.menu;
    if (!menu) return;

    if (value.isBlurred || value.isEmpty) {
      menu.removeAttribute('style');
      return;
    }

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
    menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
  };
  onChange = ({ value }) => {
    this.setState({ value });
  };
  changeTagValue = (e) => {
    this.setState({ tagValue: e.target.value });
  };
  menuRef = (menu) => {
    this.menu = menu;
  };
  renderMark = (props) => {
    const { children, attributes } = props;
    return (
      <Popover
        overlayClassName={styles['tag-pop']}
        content={
          <div className={styles['tag-container']}>
            <div className={styles['input-container']}>
              <Input className={styles.tag} onClick={this.changeTagValue} />
              <Popconfirm
                key={'ppp'}
                title="确认要删除吗?"
                //onConfirm={() => this.oldValueDelete(id, vid)}
                okText="是"
                cancelText="否"
              >
                <Icon key={'close'} type="close" className={styles['value-delete']} />
              </Popconfirm>
            </div>
          </div>
        }
      >
        <span className={styles.underlines} {...attributes}>
          {children}
        </span>
      </Popover>
    );
  };

  componentDidMount() {
    this.updateMenu();
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  render() {
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <Editor value={this.state.value} onChange={this.onChange} renderMark={this.renderMark} />
        </div>
        <Menu menuRef={this.menuRef} value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

class Menu extends Component<any> {
  checkState(type) {
    const { value } = this.props;
    return value.activeMarks.some((mark) => mark.type === type);
  }

  onClickMark(event, type) {
    const { value, onChange } = this.props;
    event.preventDefault();
    const change = value.change().toggleMark(type);
    onChange(change);
  }

  renderMarkButton(type, text) {
    const isActive = this.checkState(type);
    const onMouseDown = (event) => this.onClickMark(event, type);
    return (
      <div className={styles['button-container']} onMouseDown={onMouseDown} data-active={isActive}>
        <span className={styles['button-text']}>{text}</span>
      </div>
    );
  }

  render() {
    const root = window.document.getElementById('root');

    return ReactDOM.createPortal(
      <div className={styles.menu + ' ' + styles['hover-menu']} ref={this.props.menuRef}>
        {this.renderMarkButton('bold', '提取原文')}
        {this.renderMarkButton('italic', '新增标签')}
      </div>,
      root
    );
  }
}
