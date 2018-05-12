import React, { Component } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import styles from './index.less';

export default class ContextRightMenu extends Component<any> {
  render() {
    const menus = this.props.menus;
    return (
      <ContextMenu className={styles['context-menu']} id="some-unique-identifier">
        {menus.map((menu) => {
          const { text, click } = menu;
          return (
            <MenuItem key={text} onClick={click}>
              {text}
            </MenuItem>
          );
        })}
      </ContextMenu>
    );
  }
}
