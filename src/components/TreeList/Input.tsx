import React, {PureComponent} from 'react';
import _ from 'lodash';
import {Input} from 'antd';
import {connect} from 'dva';

import styles from './Input.less';

interface InputCellProps {
  id: string,
  text: string
}

export default class InputCell extends PureComponent<InputCellProps> {
  /**
   * 获取得到 TextChange 函数 并根据 id 修改内容
   * @param e 触发事件
   */
  onChange = (e) => {
    const text = e.target.value;
    console.log(text);
    // this.props.dispatch({
    //   type: 'interview/changed',
    //   payload: text
    // });
  };


  /**
   * 按下键后的处理行为
   */
  onKeyDown = (e) => {
    const {onTabChange, id, onDelete, onDirectionChange} = this.props;

    const {keyCode, shiftKey} = e;
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
    if (keyCode === 8 && _.isEmpty(this.props.text)) {
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

// onBlur = (e) => {
//   console.log(e);
// };
  onFocus = (e) => {
    console.log(e);
  };
// onPressEnter = (e) => {
//   console.log(e);
// };

  render() {
    const {text, id} = this.props;
    return (
      <div className={styles.item}>
        <Input
          id={`input_of_${id}`}
          ref="input" //eslint-disable-line
          className={styles.input}
          value={text}
          defaultValue={text}
          onChange={this.onChange}
          //onKeyDown={this.onKeyDown}
          // autoFocus={id === focusId}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onPressEnter={this.onPressEnter}
        />
      </div>
    );
  }
}
