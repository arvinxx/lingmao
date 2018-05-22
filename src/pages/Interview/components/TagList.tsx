import React, { Component } from 'react';
import { Menu, Input, Icon, Popconfirm } from 'antd';

import styles from './TagList.less';
import { TTag } from '../../../models/tag';
import { DispatchProp } from 'react-redux';
export interface ITagListProps {
  tags: TTag[];
}
export default class TagList extends Component<ITagListProps & DispatchProp> {
  static defaultProps: ITagListProps = {
    tags: [],
  };
  deleteTag = (id) => {
    this.props.dispatch({
      type: 'tag/deleteTag',
      payload: id,
    });
  };
  render() {
    const { tags } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>标签</div>
        <Menu
          style={{ width: 200 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          {tags.map((tag) => {
            const { text, id } = tag;
            return (
              <Menu.Item className={styles.labels} key={id}>
                {text}
                <Popconfirm
                  key={'ppp'}
                  title="确认要删除吗?"
                  onConfirm={() => this.deleteTag(id)}
                  okText="是"
                  cancelText="否"
                >
                  <Icon type="close" className={styles.close} />
                </Popconfirm>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
}
