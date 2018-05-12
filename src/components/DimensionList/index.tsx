import React, { Component } from 'react';
import { Tree } from 'antd';

import styles from './index.less';
import { TTagGroup } from '../../models/tag';

const TreeNode = Tree.TreeNode;

interface IDimensionListProps {
  tagGroups: Array<TTagGroup>;
  expandedDims: Array<string>;
  checkedDims: Array<string>;
  dispatch: Function;
}

export default class DimensionList extends Component<IDimensionListProps> {
  onExpand = (expandedDims) => {
    this.props.dispatch({
      type: 'persona/changeExpandedDims',
      payload: expandedDims,
    });
  };
  onCheck = (checkedDims) => {
    this.props.dispatch({
      type: 'persona/changeCheckedDims',
      payload: checkedDims,
    });
  };

  renderTreeNodes = (tagGroups) => {
    if (tagGroups !== undefined) {
      return tagGroups.map((tagGroup) => {
        if (tagGroup.tags) {
          return (
            <TreeNode title={tagGroup.text} key={tagGroup.id} dataRef={tagGroup}>
              {this.renderTreeNodes(tagGroup.tags)}
            </TreeNode>
          );
        }
        return <TreeNode title={tagGroup.text} key={tagGroup.id} dataRef={tagGroup} />;
      });
    }
  };

  render() {
    const { tagGroups, expandedDims, checkedDims } = this.props;
    return (
      <div className={styles.right}>
        <div className={styles.title}>选择维度</div>
        <Tree
          className={styles.tree}
          checkable
          onExpand={this.onExpand}
          expandedKeys={expandedDims}
          onCheck={this.onCheck}
          checkedKeys={checkedDims}
        >
          {this.renderTreeNodes(tagGroups)}
        </Tree>
      </div>
    );
  }
}
