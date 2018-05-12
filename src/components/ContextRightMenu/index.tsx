import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { connect } from 'dva';

import styles from './index.less';
@connect()
export default class ContextRightMenu extends Component<any> {
  addTagToNewGroup = () => {
    this.props.dispatch({
      type: 'tag/addTagToNewGroup',
    });
  };
  render() {
    const { menus } = this.props;
    return (
      <ContextMenu className={styles['context-menu']} id="some-unique-identifier">
        <MenuItem onClick={this.addTagToNewGroup}>组合</MenuItem>
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
