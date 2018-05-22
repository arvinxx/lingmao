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

  onClickMark = (event, type) => {
    const { value, onChange, dispatch } = this.props;
    event.preventDefault();
    if (type === 'add') {
      // 可用状态时
      const text: string = window.getSelection().toString();
      dispatch({
        type: 'tag/addTag',
        payload: { text },
      });
      onChange(value.change().addMark(''));
      console.log('新增标签');
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
    const root = window.document.getElementById('root');

    return ReactDOM.createPortal(
      <div className={styles.menu + ' ' + styles['hover-menu']} ref={this.props.menuRef}>
        {this.renderMarkButton('add', '新增标签')}
      </div>,
      root
    );
  }
}
