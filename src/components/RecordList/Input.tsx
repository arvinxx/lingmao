import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Input } from 'antd';

import styles from './Input.less';
const { TextArea } = Input;

type textType = 'text' | 'comment' | '';

interface IInputCellProps {
  id: string;
  text: string;
  type: textType;
  dispatch: any;
}

export default class InputCell extends Component<IInputCellProps> {
  state = {
    tempText: '',
    isFocus: false,
  };

  /**
   * 获取得到 TextChange 函数 并根据 id 修改内容
   */
  onChange = (e, id, contentType: textType) => {
    const text = e.target.value;
    if (contentType === 'text') {
      this.props.dispatch({
        type: 'interview/changeRecordText',
        payload: { id, newText: text },
      });
    }
  };

  /**
   * 按下键后的处理行为
   */
  onKeyDown = (e) => {
    const { onTabChange, id, onDelete, onDirectionChange } = this.props;

    const { keyCode, shiftKey } = e;
    // console.log(`${id} onKeyDown`,e, target, key, keyCode, shiftKey, ctrlKey, altKey)
    if (keyCode === 9 && shiftKey) {
      // console.log("shift +  Tab clicked!")
      if (onTabChange) {
        onTabChange(id, true);
        e.preventDefault();
      }
    }
    if (keyCode === 9 && !shiftKey) {
      // console.log("Tab clicked!")
      if (onTabChange) {
        onTabChange(id, false);
        e.preventDefault();
      }
    }
    if (keyCode === 8 && isEmpty(this.props.text)) {
      // console.log("Backspace clicked");
      if (onDelete) {
        onDelete(id);
        e.preventDefault();
      }
    }
    if (keyCode >= 37 && keyCode <= 40 && onDirectionChange) {
      const temp = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
      };
      onDirectionChange(id, temp[keyCode.toString()]);
    }
  };

  onBlur = (e) => {
    console.log(e);
  };
  onFocus = (e) => {
    console.log(e.target.value);
  };
  onPressEnter = (e) => {
    this.props.dispatch({
      type: 'interview/addRecordText',
    });
  };

  render() {
    const { text, id, type } = this.props;

    let contentType: textType = type;

    return (
      <div className={styles.item}>
        <TextArea
          key={id + '-' + contentType}
          ref="input"
          className={styles.input}
          value={text}
          onChange={(e) => this.onChange(e, id, contentType)}
          //onKeyDown={this.onKeyDown}
          // autoFocus={id === focusId}
          autosize
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onPressEnter={this.onPressEnter}
        />
      </div>
    );
  }
}
