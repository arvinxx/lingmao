import React, { Component, Ref, RefObject } from 'react';
import ReactDOM from 'react-dom';
import styles from './PopupMenu.less';
import { Value } from 'slate';
import { DispatchProp } from 'react-redux';

export interface IPopupMenuProps {
  menuRef;
  onChange: Function;
  value: Value;
}

export default class PopupMenu extends Component<IPopupMenuProps & DispatchProp> {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }
  node: HTMLElement;
  checkState(type) {
    const { value } = this.props;
    return value.activeMarks.some((mark) => mark.type === type);
  }

  onClickMark = (event, type) => {
    const { value, onChange, dispatch } = this.props;
    event.preventDefault();
    if (type === 'add') {
      const text: string = window.getSelection().toString();
      onChange(value.change().addMark('underline'));
      dispatch({
        type: 'tag/addTag',
        payload: { text },
      });
    }
  };

  renderMarkButton(type, text) {
    const isActive = this.checkState(type);
    return (
      <div
        className={styles['button-container']}
        onMouseDown={(e) => this.onClickMark(e, type)}
        data-active={isActive}
      >
        <span className={styles['button-text']}>{text}</span>
      </div>
    );
  }

  render() {
    return ReactDOM.createPortal(
      <div className={styles.menu + ' ' + styles['hover-menu']} ref={this.props.menuRef}>
        {this.renderMarkButton('add', '新增标签')}
      </div>,
      this.node
    );
  }
}
