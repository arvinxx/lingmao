import React, { Component, Fragment } from 'react';
import { Tree } from 'antd';

import styles from './index.less';
import { TDimGroups } from '@/models/persona';
import { DispatchProp } from 'react-redux';

const TreeNode = Tree.TreeNode;

interface IDimensionListProps {
  expandedDims: string[];
  checkedDims: string[];
  dimGroups: TDimGroups;
  index: number;
}

export default class DimensionList extends Component<IDimensionListProps & DispatchProp> {
  static defaultProps: IDimensionListProps = {
    checkedDims: [],
    expandedDims: [],
    dimGroups: [],
    index: 0,
  };
  onExpand = (expandedDims) => {
    this.props.dispatch({
      type: 'persona/changeExpandedDims',
      payload: expandedDims,
    });
  };
  onCheck = (checkedDims, index) => {
    this.props.dispatch({
      type: 'persona/changeCheckedDims',
      payload: { checkedDims, index },
    });
    this.props.dispatch({
      type: 'persona/handleDisplayDimGroups',
    });
  };

  /**
   * 生成选择树列
   * @param dimGroups 维度群组
   */
  renderTreeNodes = (dimGroups: TDimGroups) => {
    return dimGroups.map((dimGroup) => {
      const { dims, text, key } = dimGroup;
      if (dims.length > 0) {
        return (
          <TreeNode title={text} key={key} dataRef={dimGroup}>
            {dims.map((dim) => <TreeNode title={dim.labelText} key={dim.labelKey} dataRef={dim} />)}
          </TreeNode>
        );
      } else return <Fragment key={key} />;
    });
  };

  render() {
    const { expandedDims, checkedDims, dimGroups, index } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>选择维度</div>
        <Tree
          className={styles.tree}
          checkable
          onExpand={this.onExpand}
          expandedKeys={expandedDims}
          onCheck={(e) => this.onCheck(e, index)}
          checkedKeys={checkedDims}
        >
          {this.renderTreeNodes(dimGroups)}
        </Tree>
      </div>
    );
  }
}
