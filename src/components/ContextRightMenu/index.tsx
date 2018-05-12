import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import styles from './index.less';

export default class ContextRightMenu extends Component<any> {
  render() {
    const menus = this.props.menus;
    return (
      <ContextMenu className={styles['context-menu']} id="some-unique-identifier">
        <MenuItem
          onClick={(e) => {
            console.log('1');
          }}
        >
          组合
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log('2');
          }}
        >
          合并标签
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log('3');
          }}
        >
          重命名
        </MenuItem>
      </ContextMenu>
    );
  }
}
