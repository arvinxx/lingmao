/* eslint-disable */

import React, { Component } from 'react';
import _ from 'lodash';
import ListInputItem from './ListInputItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 2 * 2,
  margin: `0 0 2px 0`,

  borderTop: isDragging ? '1px solid lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class ListInput extends Component {
  constructor(props) {
    super(props);
    console.log('AppView props', props);
    this.buildDefaultData();
    // this.state = {
    //   items: getItems(10),
    // };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillUnmount = () => {
    this.save();
  };

  save = () => {
    const json = this.toJson();
    localStorage.setItem('NodeJSON', json);
  };

  buildTestData = () => {
    const originData = [
      {
        id: 1,
        text: '1',
        children: [
          {
            id: 2,
            text: '2',
          },
          {
            id: 3,
            text: '3',
          },
        ],
      },
      {
        id: 4,
        text: '4',
        children: [
          {
            id: 5,
            text: '5',
          },
          {
            id: 6,
            text: '6',
          },
        ],
      },
    ];
    const { nodes, releations } = this.parseOriginData({ id: 'root' }, originData);
    const rootNode = { id: 'root' };
    this.generateStateData(rootNode, nodes, releations);
    this.state = {
      data: rootNode,
      nodes,
      releations,
    };
  };

  buildDefaultData = () => {
    const originData = [
      {
        id: 'default',
        text: '',
      },
    ];
    const { nodes, releations } = this.parseOriginData({ id: 'root' }, originData);
    const rootNode = { id: 'root' };
    this.generateStateData(rootNode, nodes, releations);
    this.state = {
      data: rootNode,
      nodes,
      releations,
      focusId: 'default',
    };
  };

  toJson = () => {
    const { data } = this.state;
    return JSON.stringify(data.children);
  };

  parseJson = (json) => {
    const object = JSON.parse(json);
    const { nodes, releations } = this.parseOriginData({ id: 'root' }, object);
    const rootNode = { id: 'root' };
    this.generateStateData(rootNode, nodes, releations);
    this.setState({
      data: rootNode,
      nodes,
      releations,
    });
  };

  parseOriginData = (root, data) => {
    let nodes = [];
    let releations = [];
    if (root.id === 'root') {
      nodes.push(root);
      releations.push({
        id: 'root',
        parent: null,
        left_id: null,
        right_id: null,
      });
    }

    const levelNodes = data.map((d) => _.omit(d, ['children']));
    nodes = _.concat(nodes, levelNodes);

    let lastNode = null;
    // let nextNode = null
    const levelReleations = _.map(levelNodes, (node) => {
      let left_id = null;
      const right_id = null;
      if (lastNode) {
        left_id = lastNode.id;
        // lastNode
      }

      lastNode = node;

      return {
        id: node.id,
        parent_id: root.id,
        left_id,
        right_id,
      };
    });
    lastNode = null;
    _.forEach(levelReleations, (node, k) => {
      if (lastNode && node.left_id === lastNode.id) {
        lastNode.right_id = node.id;
      }
      lastNode = node;
    });
    releations = _.concat(releations, levelReleations);

    // let children = data.map(d => _.omit(d,['children']))
    data.map((d) => {
      const children = d.children;
      if (!_.isEmpty(children)) {
        const result = this.parseOriginData(d, children);
        nodes = _.concat(nodes, result.nodes);
        releations = _.concat(releations, result.releations);
      }
    });

    // nodes.push(data.)
    return {
      nodes,
      releations,
    };
  };

  generateStateData = (root, nodes, releations) => {
    const node = root;
    let parentNode = null;
    if (node) parentNode = _.find(releations, (d) => d.id === node.parent_id);
    let leftNode = null;
    if (node) leftNode = _.find(releations, (d) => d.id === node.left_id);
    let rightNode = null;
    if (node) rightNode = _.find(releations, (d) => d.id === node.right_id);
    let parentParentNode = null;
    if (parentNode) {
      parentParentNode = _.find(releations, (d) => d.id === parentNode.parent_id);
    }

    const data = Array.new;
    const childrenIds = releations.filter((d) => d.parent_id === root.id).map((d) => d.id);
    const childrenNodes = nodes.filter((d) => _.includes(childrenIds, d.id));
    let childFirstId = releations.filter((d) => d.parent_id === root.id && d.left_id === null)[0];
    let childFirstNode = null;
    if (childFirstId) {
      childFirstNode = _.find(nodes, (d) => d.id === childFirstId.id);
    }
    // console.log(childFirstId, childFirstNode)
    const chainChildren = new Array();
    while (childFirstId && childFirstNode) {
      // console.log('while',childFirstId, childFirstNode)

      chainChildren.push(_.clone(childFirstNode));
      childFirstId = _.find(releations, (d) => d.id === childFirstId.right_id);
      childFirstNode = null;
      if (childFirstId) {
        childFirstNode = _.find(nodes, (d) => d.id === childFirstId.id);
      }
    }
    _.forEach(chainChildren, (tempNode) => {
      if (tempNode === root) alert('死循环了');
      this.generateStateData(tempNode, nodes, releations);
    });
    root.children = chainChildren;

    // _.forEach(rootNodes, (node)=>{
    //   let children = Array.new
    //   let rootNodeIds = releations.filter(d => d.parent_id === root.id).map(d=>d.id)
    //   let rootNodes = nodes.filter(d => _.includes(rootNodeIds, d.id))
    //   if (!_.isEmpty(children)) node.children = children
    // })
    // this.state = {
    //   data,
    //   nodes,
    //   releations
    // }
  };

  /**
   * 拖动效果
   * @param  result 拖动后的文件样式
   */
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items,
    });
  }

  onTextChange = (id, text) => {
    const { data, nodes, releations } = this.state;
    console.log('onTextChange', id, text, data);
    const rootNode = { id: 'root' };
    _.find(nodes, (d) => d.id === id).text = text;
    this.generateStateData(rootNode, nodes, releations);
    this.setState(
      {
        data: rootNode,
        nodes,
        releations,
      },
      () => this.save()
    );

    // let temp = data
    // while(!_.isEmpty(temp)) {
    //   let temp2 = _.flattenDeep(temp).find( (obj)=> obj.id == id);
    //   if (temp2) {temp2.text = text; break;}
    //   else {
    //     let children = _.flattenDeep(_.map(temp, obj => obj.children))
    //     temp2 = children.find( (obj)=> obj.id == id);
    //     if (temp2){ temp2.text = text; break;}
    //     else temp = children
    //   }
    //   console.log(temp ,temp2)
    // }

    // _.flattenDeep(data).find( (obj)=> obj.id == id).text = text
    // this.setState({data})
    console.log('setState', data);
  };

  //
  // printNode = (releations, node, depth) => {
  //   console.log(_.times(depth, () => '--').join('') + node.id);
  //   const children = _.filter(releations, (d) => d.parent_id == node.id);
  //   let leftNode = _.find(releations, (d) => d.parent_id == node.id && d.left_id == null);
  //   while (leftNode) {
  //     this.printNode(releations, leftNode, depth + 1);
  //     leftNode = _.find(releations, (d) => d.parent_id == node.id && d.left_id == leftNode.id);
  //   }
  //   return node;
  // };
  // printReleations = (releations) => {
  //   // console.log('')
  //   const node = _.find(releations, (d) => d.id == 'root');
  //   this.printNode(releations, node, -1);
  // };

  onTabChange = (id, isLeft) => {
    const { data, nodes, releations } = this.state;
    console.log('begin----------------------onTabChange------------------------------------begin');
    this.printReleations(_.cloneDeep(releations));
    console.log('begin onTabChange　setState', _.cloneDeep(releations));
    // console.log('clone releations', _.cloneDeep(releations))

    console.log('onTabChange', id, isLeft ? 'left' : 'right', isLeft);
    const rootNode = { id: 'root' };
    // _.find(releations, d => d.id == id).text = text
    const node = _.find(releations, (d) => d.id == id);
    let parentNode = null;
    if (node) parentNode = _.find(releations, (d) => d.id == node.parent_id);
    let leftNode = null;
    if (node) leftNode = _.find(releations, (d) => d.id == node.left_id);
    let rightNode = null;
    if (node) rightNode = _.find(releations, (d) => d.id == node.right_id);
    let parentParentNode = null;
    if (parentNode) {
      parentParentNode = _.find(releations, (d) => d.id == parentNode.parent_id);
    }

    console.log('curentNode', node);
    console.log('parentNode', parentNode);
    console.log('leftNode', leftNode);
    console.log('rightNode', rightNode);
    console.log('parentParentNode', parentParentNode);

    if (isLeft) {
      // left => set this.parent = left_id

      if (node && node.left_id) {
        if (node.parent_id !== 'root') {
          node.right_id = null;
          node.left_id = node.parent_id;
          if (leftNode) leftNode.right_id = null;
          const parentRightNode = _.find(releations, (d) => d.id == parentNode.right_id);
          if (parentRightNode) {
            node.right_id = parentRightNode.id;
            parentRightNode.left_id = node.id;
          }
          if (parentNode) parentNode.right_id = node.id;
          if (rightNode && leftNode) {
            leftNode.right_id = rightNode.id;
            rightNode.left_id = leftNode.id;
          }
        }

        if (parentParentNode) {
          node.parent_id = parentParentNode.id;
          // parentNode.right_id = node.id
        } else if (parentNode && parentNode.id == 'root') {
        }
      }
      if (node && !node.left_id) {
        if (node.parent_id !== 'root') {
          const childLastId = releations.filter(
            (d) => d.parent_id == parentNode.parent_id && d.right_id == null
          )[0];
          let childLastNode = null;
          if (childLastId) {
            childLastNode = _.find(nodes, (d) => d.id == childLastId.id);
          }

          node.right_id = null;
          if (rightNode) rightNode.left_id = null;
          if (parentParentNode) node.parent_id = parentParentNode.id;
          if (parentNode) {
            // parentNode.right_id = node.id
            // node.left_id = parentNode.id

            if (parentNode.right_id) {
              const parentRightNode = _.find(releations, (d) => d.id == parentNode.right_id);
              if (parentRightNode) {
                node.right_id = parentRightNode.id;
                parentRightNode.left_id = node.id;
              }
              node.left_id = parentNode.id;
              parentNode.right_id = node.id;
            } else {
              console.log('left', childLastId, childLastNode);

              if (childLastId) {
                childLastId.right_id = node.id;
                node.left_id = childLastId.id;
              }
            }
          }
        }
      }
    } else {
      // right => set this.parent = right_id
      if (node && node.left_id) {
        const childLastId = releations.filter(
          (d) => d.parent_id == leftNode.id && d.right_id == null
        )[0];
        let childLastNode = null;
        if (childLastId) {
          childLastNode = _.find(nodes, (d) => d.id == childLastId.id);
        }

        node.parent_id = node.left_id;
        if (leftNode) leftNode.right_id = null;
        if (leftNode && rightNode) {
          leftNode.right_id = rightNode.id;
          rightNode.left_id = leftNode.id;
        }

        node.left_id = null;
        node.right_id = null;

        console.log('right', childLastId, childLastNode);
        if (childLastId) {
          childLastId.right_id = node.id;
          node.left_id = childLastId.id;
        }
      }
      if (node && !node.left_id) {
      }
    }
    this.check(_.clone(releations));

    this.generateStateData(rootNode, nodes, releations);
    this.setState(
      {
        data: rootNode,
        nodes,
        releations,
      },
      () => this.save()
    );

    // _.flattenDeep(data).find( (obj)=> obj.id == id).text = text
    // this.setState({data})
    console.log('end onTabChange　setState', rootNode, nodes, _.cloneDeep(releations));
    this.printReleations(_.cloneDeep(releations));

    console.log('end----------------------onTabChange------------------------------------end');
  };

  check = (releations) => {
    _.forEach(releations, (v, k) => {
      const temp = _.compact([v.parent_id, v.left_id, v.right_id]);
      if (_.size(temp) !== _.size(_.uniq(temp))) {
        console.log('出错的 releations', releations);
        alert('错误了');
      }
    });
    const left_ids = _.compact(_.map(releations, (d) => d.left_id));
    const right_ids = _.compact(_.map(releations, (d) => d.right_id));
    if (_.size(left_ids) !== _.size(_.uniq(left_ids))) {
      console.log('出错的 releations', releations);

      alert('错误了');
    }
    if (_.size(right_ids) !== _.size(_.uniq(right_ids))) {
      console.log('出错的 releations', releations);

      alert('错误了');
    }
    const groups = _.groupBy(releations, (d) => d.parent_id);
    _.forEach(groups, (v, k) => {
      const ids = _.map(v, (d) => d.id);
      const temp_left_ids = _.compact(_.map(v, (d) => d.left_id));
      const temp_right_ids = _.compact(_.map(v, (d) => d.right_id));
      if (_.size(temp_left_ids) !== _.size(_.uniq(temp_left_ids))) {
        console.log('出错的 releations', releations);

        alert('错误了');
      }
      if (_.size(temp_right_ids) !== _.size(_.uniq(temp_right_ids))) {
        console.log('出错的 releations', releations);

        alert('错误了');
      }
    });
  };

  onFocusChanged = (id, isFocus) => {
    console.log('onFocusChanged', id, isFocus);
    let { focusId } = this.state;
    if (isFocus) {
      focusId = id;
    } else {
      focusId = null;
    }
    this.setState({ focusId });
  };

  onPressEnter = (id) => {
    console.log('onPressEnter', id);
    let { data, nodes, releations } = this.state;
    const new_id = _.uniqueId('new_');
    nodes = _.concat(nodes, [{ id: new_id, text: '' }]);
    const new_releation = { id: new_id };
    const node = _.find(releations, (d) => d.id == id);
    const firstChild = _.find(releations, (d) => d.parent_id == id && d.left_id == null);
    const rightNode = _.find(releations, (d) => d.parent_id == node.parent_id && d.left_id == id);

    if (firstChild) {
      // 插入第一个孩子位置
      console.log('插入第一个孩子位置', node, firstChild);
      new_releation.parent_id = node.id;
      new_releation.left_id = null;
      new_releation.right_id = firstChild.id;
      firstChild.left_id = new_releation.id;
    } else {
      // 插入当前位置后面
      console.log('插入当前位置后面', node, rightNode);

      new_releation.parent_id = node.parent_id;
      new_releation.left_id = node.id;
      new_releation.right_id = null;
      node.right_id = new_releation.id;
      if (rightNode) {
        new_releation.right_id = rightNode.id;
        rightNode.left_id = new_releation.id;
      }
    }

    releations = _.concat(releations, [new_releation]);

    const rootNode = { id: 'root' };
    console.log('begin generateStateData', rootNode, nodes, _.cloneDeep(releations));

    this.generateStateData(rootNode, nodes, releations);
    console.log('after generateStateData', rootNode, nodes, _.cloneDeep(releations));

    this.setState(
      {
        data: rootNode,
        nodes,
        releations,
        focusId: new_releation.id,
      },
      () => this.save()
    );
    console.log('end onPressEnter setState', rootNode, nodes, _.cloneDeep(releations));
    this.printReleations(_.cloneDeep(releations));
  };
  onDelete = (id) => {
    console.log('onDelete', id);
    let { data, nodes, releations } = this.state;
    console.log('begin----------------------onDelete------------------------------------begin');
    this.printReleations(_.cloneDeep(releations));
    console.log('begin onDelete', _.cloneDeep(releations));
    // console.log('clone releations', _.cloneDeep(releations))

    console.log('onDelete', id);
    const rootNode = { id: 'root' };
    // _.find(releations, d => d.id == id).text = text
    const node = _.find(releations, (d) => d.id == id);
    let parentNode = null;
    if (node) parentNode = _.find(releations, (d) => d.id == node.parent_id);
    let leftNode = null;
    if (node) leftNode = _.find(releations, (d) => d.id == node.left_id);
    let rightNode = null;
    if (node) rightNode = _.find(releations, (d) => d.id == node.right_id);
    let parentParentNode = null;
    if (parentNode) {
      parentParentNode = _.find(releations, (d) => d.id == parentNode.parent_id);
    }

    console.log('curentNode', node);
    console.log('parentNode', parentNode);
    console.log('leftNode', leftNode);
    console.log('rightNode', rightNode);
    console.log('parentParentNode', parentParentNode);
    // if (n)
    if (parentNode.id == 'root' && !leftNode) {
      console.log('only one node , skip delete ');
      return;
    }
    const children = _.find(releations, (d) => d.parent_id == id);
    if (_.isEmpty(children)) {
      // DO Delete
      console.log(' DO Delete ');
      // node.parent_id = parentNode.id

      if (leftNode && rightNode) {
        leftNode.right_id = rightNode.id;
        rightNode.left_id = leftNode.id;
      } else {
        if (leftNode && !rightNode) {
          leftNode.right_id = null;
        }
        if (rightNode && !leftNode) {
          rightNode.left_id = null;
        }
      }
      let new_releation = null;
      if (leftNode) {
        new_releation = leftNode;
      } else if (parentNode) new_releation = parentNode;
      const focusId = new_releation ? new_releation.id : null;
      this.check(_.clone(releations));

      this.setState({ focusId }, () => {
        releations = _.filter(releations, (d) => d.id !== id);
        nodes = _.filter(nodes, (d) => d.id !== id);
        // this.setState({releations, nodes})
        // let rootNode = {id: 'root'}
        this.generateStateData(rootNode, nodes, releations);
        this.setState(
          {
            data: rootNode,
            nodes,
            releations,
            focusId,
          },
          () => this.save()
        );
        this.domFocus(focusId);
        console.log('end onDelete setState', rootNode, nodes, _.cloneDeep(releations), focusId);
        this.printReleations(_.cloneDeep(releations));
      });
    }
  };

  onDirectionChange = (id, direction) => {
    console.log('onDirectionChange', id, direction);
    const { data, nodes, releations } = this.state;
    // console.log('begin----------------------onDirectionChange------------------------------------begin')
    // this.printReleations(_.cloneDeep(releations))
    // console.log('begin onDirectionChange' , _.cloneDeep(releations))
    // console.log('clone releations', _.cloneDeep(releations))

    // console.log('onDirectionChange', id)
    const rootNode = { id: 'root' };
    // _.find(releations, d => d.id == id).text = text
    const node = _.find(releations, (d) => d.id === id);
    let parentNode = null;
    if (node) parentNode = _.find(releations, (d) => d.id === node.parent_id);
    let leftNode = null;
    if (node) leftNode = _.find(releations, (d) => d.id === node.left_id);
    let rightNode = null;
    if (node) rightNode = _.find(releations, (d) => d.id === node.right_id);
    let parentParentNode = null;
    if (parentNode) {
      parentParentNode = _.find(releations, (d) => d.id === parentNode.parent_id);
    }
    const childFirstId = releations.filter((d) => d.parent_id === node.id && d.left_id === null)[0];

    let focusId = null;
    if (direction === 'up') {
      if (leftNode) focusId = leftNode.id;
      if (!leftNode && parentNode) focusId = parentNode.id;
      if (focusId) {
        this.setState({ focusId }, () => {
          this.domFocus(focusId);
        });
      }
    }
    if (direction === 'down') {
      focusId = null;
      if (rightNode) focusId = rightNode.id;
      if (!rightNode && childFirstId && childFirstId.id) {
        focusId = childFirstId.id;
      }

      if (focusId) {
        this.setState({ focusId }, () => {
          this.domFocus(focusId);
        });
      }
    }
  };

  domFocus = (id) => {
    const input_id = `input_of_${id}`;
    const element = document.getElementById(input_id);
    console.log('domFocus', id, input_id, element);
    if (!id) return;
    // if(!ele)
    setTimeout(() => {
      if (element) element.focus();
    }, 0);
  };

  render() {
    const indent = 8; // 控制缩进的尺寸
    return (
      <ListInputItem
        root // 传递该节点是否为根节点
        children={this.state.data.children} // 传递数据流
        onTabChange={this.onTabChange} // Tab 键功能-缩进
        onTextChange={this.onTextChange} // 文本数据输入
        focusId={this.state.focusId} // 聚焦对象
        onFocusChanged={this.onFocusChanged} // 改变聚焦对象
        onPressEnter={this.onPressEnter} // 按回车的效果
        onDelete={this.onDelete} // delete 键效果
        onDirectionChange={this.onDirectionChange} // 上下左右键光标位置移动控制
        indent={indent} // 缩进尺寸
      />
      // <DragDropContext onDragEnd={this.onDragEnd}>
      //   <Droppable droppableId="droppable">
      //     {(provided, snapshot) => (
      //       <div ref={provided.innerRef}>
      //         {this.state.items.map((item, index) => (
      //           <Draggable key={item.id} draggableId={item.id} index={index}>
      //             {(provided, snapshot) => (
      //               <div>
      //                 <div
      //                   ref={provided.innerRef}
      //                   {...provided.draggableProps}
      //                   {...provided.dragHandleProps}
      //                   style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      //                 >
      //                   {item.content}
      //
      //                 </div>
      //                 {provided.placeholder}
      //               </div>
      //             )}
      //           </Draggable>
      //         ))}
      //         {provided.placeholder}
      //       </div>
      //     )}
      //   </Droppable>
      // </DragDropContext>
    );
  }
}
