import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Popover, Input, Popconfirm, Icon } from 'antd';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import PopupMenu from './PopupMenu';

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

  menuRef = (menu) => {
    this.menu = menu;
  };

  componentDidMount() {
    this.updateMenu();
  }

  componentDidUpdate() {
    this.updateMenu();
  }

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
  onChange = (data) => {
    console.log(data);
    this.setState({ value: data.value });
  };
  onKeyDown = (event, change) => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      return false;
    }
  };

  changeTagValue = (e) => {
    this.setState({ tagValue: e.target.value });
  };

  underLineComponent = (props) => {
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

  render() {
    return (
      <div className={styles.input}>
        <div className={styles.editor}>
          <Editor
            value={this.state.value}
            onKeyDown={this.onKeyDown}
            onChange={this.onChange}
            renderMark={this.underLineComponent}
          />
        </div>
        <PopupMenu menuRef={this.menuRef} value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}
