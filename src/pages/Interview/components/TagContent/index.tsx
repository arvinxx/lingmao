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
                    return (
                      <TreeNode
                        key={key}
                        title={
                          <Popconfirm
                            key={'ppp'}
                            title="确认要删除吗?"
                            onConfirm={() => this.deleteTag(key)}
                            okText="是"
                            cancelText="否"
                          >
                            {text}
                            {/*<Icon type="close" className={styles.close} />*/}
                          </Popconfirm>
                        }
                      />
                    );
                  })}
                </TreeNode>
              );
            })}
          </Tree>
        </div>
      </div>
    );
  }
}
