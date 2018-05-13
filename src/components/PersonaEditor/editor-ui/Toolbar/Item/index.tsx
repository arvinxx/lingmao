import React, { Component } from 'react';
import { List, Tooltip, Icon, Avatar } from 'antd';
import draggable from '../Draggable';
import { Plugin } from 'ory-editor-core';

const { Item } = List;
const { Meta } = Item;
type props = { plugin: Plugin; insert: any };

export default class ItemPart extends Component<any> {
  render() {
    const { plugin, insert } = this.props;
    if (!plugin.IconComponent && !plugin.text) {
      return null;
    }
    const Draggable = draggable(plugin.name);
    return (
      <Item className="ory-toolbar-item">
        <Meta
          avatar={
            <Avatar size="large" icon={plugin.IconComponent} style={{ background: '#bbb' }} />

          }
          title={plugin.text}
          description={plugin.description}
        />
        <span className="ory-toolbar-item-drag-handle-button">
          <Draggable insert={insert}>
            <Tooltip style={{ zIndex: 1600 }} placement="bottomLeft" title="Drag me!">
              <Icon type="appstore-o" className="drag-handle" />
            </Tooltip>
          </Draggable>
        </span>
      </Item>
    );
  }
}
