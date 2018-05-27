import React, { Component, Fragment } from 'react';
import { Tree } from 'antd';

import styles from './index.less';
import { TPersonaDimGroups, TPersonaDims } from '../../models/persona';
import { DispatchProp } from 'react-redux';

const TreeNode = Tree.TreeNode;

interface IDimensionListProps {
  expandedDims: Array<string>;
  checkedDims: Array<string>;
  personaDimGroups: TPersonaDimGroups;
}

export default class DimensionList extends Component<IDimensionListProps & DispatchProp> {
  static defaultProps: IDimensionListProps = {
    checkedDims: [],
    expandedDims: [],
    personaDimGroups: [],
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
    this.props.dispatch({
      type: 'persona/handleDisplayDimGroups',
    });
  };

  renderTreeNodes = (personaDimGroups: TPersonaDimGroups) => {
    return personaDimGroups.map((personaDimGroup) => {
      const { dims, text, key } = personaDimGroup;
      if (dims.length > 0) {
        return (
          <TreeNode title={text} key={key} dataRef={personaDimGroup}>
            {dims.map((dim) => <TreeNode title={dim.tagText} key={dim.tagId} dataRef={dim} />)}
          </TreeNode>
        );
      } else return <Fragment key={key} />;
    });
  };

  render() {
    const { expandedDims, checkedDims, personaDimGroups } = this.props;
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
          {this.renderTreeNodes(personaDimGroups)}
        </Tree>
      </div>
    );
  }
}
