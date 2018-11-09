import React, { Component } from 'react';
import { Menu, Icon, Popconfirm, Tree } from 'antd';
import { ILabel } from '@/models/label';
import { DispatchProp } from 'react-redux';

import styles from './index.less';

const { TreeNode } = Tree;
export interface ITagContentProps {
  labels: ILabel[];
}
export default class TagContent extends Component<ITagContentProps & DispatchProp> {
  static defaultProps: ITagContentProps = {
    labels: [],
  };
  deleteTag = (key) => {
    this.props.dispatch({
      type: 'tag/deleteTag',
      payload: key,
    });
  };
  filterRecord = (key) => {
    console.log(key);
    //TODO #38 点击标签目录筛选对应的记录
    this.props.dispatch({
      type: 'record/filterRecord',
      payload: key,
    });
  };
  render() {
    const { labels } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>标签</div>
        <div className={styles['tag-container']}>
          <Tree multiple className={styles.tree} defaultExpandAll draggable>
            {labels.map((label) => {
              const { key, tags, text } = label;
              return (
                <TreeNode title={text} key={key}>
                  {tags.map((tag) => {
                    const { key, text } = tag;
                    return <TreeNode key={key} title={text} />;
                  })}
                </TreeNode>
              );
            })}
          </Tree>
          {/*<Menu*/}
          {/*style={{ width: 200 }}*/}
          {/*defaultSelectedKeys={['1']}*/}
          {/*defaultOpenKeys={['sub1']}*/}
          {/*mode="inline"*/}
          {/*>*/}
          {/*{labels.map((tag) => {*/}
          {/*const { text, key } = tag;*/}
          {/*return (*/}
          {/*<Menu.Item*/}
          {/*className={styles.labels}*/}
          {/*key={key}*/}
          {/*onClick={() => this.filterRecord(key)}*/}
          {/*>*/}
          {/*{text}*/}
          {/*<Popconfirm*/}
          {/*key={'ppp'}*/}
          {/*title="确认要删除吗?"*/}
          {/*onConfirm={() => this.deleteTag(key)}*/}
          {/*okText="是"*/}
          {/*cancelText="否"*/}
          {/*>*/}
          {/*<Icon type="close" className={styles.close} />*/}
          {/*</Popconfirm>*/}
          {/*</Menu.Item>*/}
          {/*);*/}
          {/*})}*/}
          {/*</Menu>*/}
        </div>
      </div>
    );
  }
}
