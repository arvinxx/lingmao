/* eslint-disable */

import React, { Component } from 'react';
import _ from 'lodash';
import { Badge, Input } from 'antd';
import styled from 'styled-components';

import styles from './ListInputItem.less';

/**
 *  styled-components 样式配置
 */
const Container = styled.div`
  margin-left: ${(props) => props.indent}px;
  padding-left: ${(props) => props.indent}px;
  border-left: ${(props) => (props.root ? '0' : '1px solid #edeff1')};
  border-color: ${(props) => (props.focusId === props.id ? '#ced1d7' : '#edeff1')};
  transition: border 0.2s;
`;
const CircleContainer = styled.div`
  width: ${(props) => props.indent * 2} px;
  height: ${(props) => props.indent * 2} px;
  border-radius: ${(props) => props.indent * 2} px;
  border: 6px solid transparent;
  cursor: pointer;
  transition: border 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class ListInputItem extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    const { root, children, onTextChange, id } = this.props;
    const text = e.target.value;
    const target = e.target;
    // console.log(`${id} onChange`, text, e, target)
    if (onTextChange) {
      onTextChange(id, text);
    }
  };
  onKeyDown = (e) => {
    const {
      root,
      children,
      onTextChange,
      onTabChange,
      id,
      onDelete,
      onDirectionChange,
    } = this.props;
    const text = e.target.text;
    const target = e.target;
    const { key, keyCode, shiftKey, ctrlKey, altKey } = e;
    // console.log(`${id} onKeyDown`,e, target, key, keyCode, shiftKey, ctrlKey, altKey)
    if (keyCode == 9 && shiftKey) {
      // console.log("shift +  Tab clicked!")
      if (onTabChange) {
        onTabChange(id, true);
        e.preventDefault();
      }
    }
    if (keyCode == 9 && !shiftKey) {
      // console.log("Tab clicked!")
      if (onTabChange) {
        onTabChange(id, false);
        e.preventDefault();
      }
    }
    if (keyCode == 8 && _.isEmpty(this.props.text)) {
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
    // console.log('onBlur',e)
    const { onFocusChanged, id } = this.props;
    if (onFocusChanged) onFocusChanged(id, false);
  };
  onFocus = (e) => {
    const { onFocusChanged, id } = this.props;
    // console.log('onFocus',e)
    if (onFocusChanged) onFocusChanged(id, true);
  };
  onPressEnter = (e) => {
    const { onPressEnter, id } = this.props;
    // console.log('onPressEnter',e)
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
          ref="input"
          className={styles.input}
          placeholder=""
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
                  children={node.children}
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
