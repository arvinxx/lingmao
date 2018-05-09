import React, { Component, Ref, RefObject } from 'react';
import ReactDOM from 'react-dom';
import styles from './PopupMenu.less';
import { Value } from 'slate';

interface IPopupMenuProps {
  menuRef: Ref<string>;
  onChange: Function;
  value: Value;
}

export default class PopupMenu extends Component<IPopupMenuProps> {
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
