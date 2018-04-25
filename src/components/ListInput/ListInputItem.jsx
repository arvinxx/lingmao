import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Input } from 'antd';

import { Container, CircleContainer } from './styles';
import styles from './ListInputItem.less';

class ListInputItem extends PureComponent {
  /**
   * 获取得到 TextChange 函数 并根据 id 修改内容
   * @param e 触发事件
   */
  onChange = (e) => {
    const { onTextChange, id } = this.props;
    const text = e.target.value;
    if (onTextChange) {
      onTextChange(id, text);
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

  onBlur = () => {
    const { onFocusChanged, id } = this.props;
    if (onFocusChanged) onFocusChanged(id, false);
  };
  onFocus = () => {
    const { onFocusChanged, id } = this.props;
    if (onFocusChanged) onFocusChanged(id, true);
  };
  onPressEnter = () => {
    const { onPressEnter, id } = this.props;
    if (onPressEnter) onPressEnter(id);
  };

  renderContent = () => {
    const { text, focusId, indent, id } = this.props;
    return (
      <div className={styles.item}>
        <CircleContainer indent={indent}>
          <div className={styles.circle} />
        </CircleContainer>
        <Input
          id={`input_of_${id}`}
          ref="input" //eslint-disable-line
          className={styles.input}
          value={text}
          defaultValue={text}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          autoFocus={id === focusId}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onPressEnter={this.onPressEnter}
        />
      </div>
    );
  };

  render() {
    const {
      root,
      indent,
      children,
      onTextChange,
      onTabChange,
      focusId,
      onFocusChanged,
      onDirectionChange,
      onPressEnter,
      id,
      onDelete,
    } = this.props;
    return (
      <div className={styles.container}>
        {root ? null : this.renderContent()}
        <Container root={root} id={id} focusId={focusId} indent={indent}>
          {_.map(children, (node) => {
            return (
              <div key={node.id}>
                <ListInputItem
                  id={node.id}
                  text={node.text}
                  children={node.children} // eslint-disable-line react/no-children-prop
                  onTextChange={onTextChange}
                  onTabChange={onTabChange}
                  focusId={focusId}
                  onFocusChanged={onFocusChanged}
                  indent={indent}
                  onPressEnter={onPressEnter}
                  onDelete={onDelete}
                  onDirectionChange={onDirectionChange}
                />
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default ListInputItem;
