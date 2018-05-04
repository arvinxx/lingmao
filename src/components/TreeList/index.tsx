import React, { Component } from 'react';
import { Tree } from 'antd';
import InputCell from './Input';
import './index.less';

const TreeNode = Tree.TreeNode;

interface TreeListProps {
  records: object[];
  dispatch: any;
}

export default class TreeList extends Component<TreeListProps, any> {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    selectedKeys: [],
  };

  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info: object) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  onDragEnter = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = (info) => {
    console.log('start Drop' + info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.props.nodes];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    }
    this.setState({
      gData: data,
    });
  };

  renderTreeNodes = (records: object[]) => {
    return records.map((record: any) => {
      const { children, _id, text } = record;
      if (children) {
        return (
          <TreeNode
            title={<InputCell _id={_id} text={text} dispatch={this.props.dispatch} />}
            key={_id}
            dataRef={record}
          >
            {this.renderTreeNodes(children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={_id}
          title={<InputCell _id={_id} text={text} dispatch={this.props.dispatch} />}
        />
      );
    });
  };

  render() {
    return (
      <Tree
        // showLine
        onExpand={this.onExpand}
        //expandedKeys={this.state.expandedKeys}
        //autoExpandParent={this.state.autoExpandParent}
        //onCheck={this.onCheck}
        //checkable
        //checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        // draggable
        // onDragEnter={this.onDragEnter}
        // onDrop={this.onDrop}
        //selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.props.records)}
      </Tree>
    );
  }
}
