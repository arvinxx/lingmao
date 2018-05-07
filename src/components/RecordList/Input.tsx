import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Input } from 'antd';

import styles from './Input.less';
const { TextArea } = Input;

type TTextType = 'text' | 'comment' | '';

interface IInputCellProps {
  id: string;
  text: string;
  type: TTextType;
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
  onChange = (e, id, contentType: TTextType) => {
    const text = e.target.value;
    if (contentType === 'text') {
      this.props.dispatch({
        type: 'interview/changeRecordText',
        payload: { id, newText: text },
      });
    }
    if (isEmpty(text)) {
      this.props.dispatch({
        type: 'interview/deleteRecord',
        payload: id,
      });
    }
  };

  onTabChange = (id, bool) => {
    console.log('按下了 Tab！');
  };
  onDirectionChange = (id, dd) => {
    console.log(id + '方向变化');
  };
  /**
   * 按下键后的处理行为
   */
  onKeyDown = (e) => {
    const { id } = this.props;
    const { onDirectionChange, onTabChange } = this;
    const { keyCode, shiftKey } = e;
    console.log(keyCode);
    // console.log(`${id} onKeyDown`,e, target, key, keyCode, shiftKey, ctrlKey, altKey)
    if (keyCode === 9 && shiftKey) {
      // console.log("shift + Tab clicked!")
      if (onTabChange) {
        onTabChange(id, true);
      }
    }
    if (keyCode === 9 && !shiftKey) {
      // console.log("Tab clicked!")
      if (onTabChange) {
        e.preventDefault();
        onTabChange(id, false);
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

  onBlur = (id) => {
    // console.log(e);
  };
  onFocus = (e) => {
    // console.log(e.target.value);
  };
  onPressEnter = (e) => {
    this.props.dispatch({
      type: 'interview/addRecord',
    });
  };

  render() {
    const { text, id, type } = this.props;

    let contentType: TTextType = type;

    return (
      <div className={styles.item}>
        <Input
          key={id + '-' + contentType}
          className={styles.input}
          value={text}
          onChange={(e) => this.onChange(e, id, contentType)}
          onKeyDown={this.onKeyDown}
          // autoFocus={id === focusId}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onPressEnter={this.onPressEnter}
        />
      </div>
    );
  }
}
