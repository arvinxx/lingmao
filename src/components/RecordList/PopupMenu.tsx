import React, { Component, Ref, RefObject } from 'react';
import ReactDOM from 'react-dom';
import styles from './PopupMenu.less';
import { Value } from 'slate';

interface IPopupMenuProps {
  menuRef: any;
  onChange: Function;
  value: Value;
  dispatch: any;
}

export default class PopupMenu extends Component<IPopupMenuProps> {
  checkState(type) {
    const { value } = this.props;
    return value.activeMarks.some((mark) => mark.type === type);
  }

  onClickMark(event, type) {
    const { value, onChange, dispatch } = this.props;
    event.preventDefault();
    const change = value.change().toggleMark(type);
    onChange(change);
    switch (type) {
      case 'extract':
        console.log('提取原文');
        // dispatch({
        //   type: 'interview/addTag',
        //   payload: '',
        // });
        return;
      case 'add':
        console.log('新增标签');
        dispatch({
          type: 'interview/addTag',
          payload: '',
        });
        return;
    }
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
        {this.renderMarkButton('extract', '提取原文')}
        {this.renderMarkButton('add', '新增标签')}
      </div>,
      root
    );
  }
}
