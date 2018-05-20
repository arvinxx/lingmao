import React, { Component } from 'react';
import { Tree } from 'antd';

import styles from './index.less';
import { TPersonaRecord } from "../../models/persona";

const TreeNode = Tree.TreeNode;

interface IDimensionListProps {
  clusterResult: TPersonaRecord;
  expandedDims: Array<string>;
  checkedDims: Array<string>;
  dispatch: Function;
}

export default class DimensionList extends Component<IDimensionListProps> {
  static defaultProps: IDimensionListProps = {
    checkedDims: [],
    expandedDims: [],
    dispatch: () => {},
    clusterResult: [],
  };
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

  renderTreeNodes = (clusterResult: TPersonaRecord) => {
    return clusterResult.map((cluster) => {
      //TODO : 生成树形节点
      // if (cluster.tagGroupId) {
      //   return (
      //     <TreeNode title={cluster.text} key={cluster.id} dataRef={cluster}>
      //       {this.renderTreeNodes(cluster)}
      //     </TreeNode>
      //   );
      // }
      return <TreeNode title={cluster.tagText} key={cluster.tagId} dataRef={cluster} />;
    });
  };

  render() {
    const { clusterResult, expandedDims, checkedDims } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>选择维度</div>
        <Tree
          className={styles.tree}
          checkable
          onExpand={this.onExpand}
          expandedKeys={expandedDims}
          onCheck={this.onCheck}
          checkedKeys={checkedDims}
        >
          {this.renderTreeNodes(clusterResult)}
        </Tree>
      </div>
    );
  }
}
