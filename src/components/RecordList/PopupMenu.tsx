import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './PopupMenu.less';

export default class PopupMenu extends Component<any> {
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
