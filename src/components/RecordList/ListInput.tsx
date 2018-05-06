import React, {Component} from 'react';
import _ from 'lodash';
import ListInputItem from '../ListInput/ListInputItem';
import {connect} from 'dva';


@connect(({interview}) => ({interview}))
export default class ListInput extends Component {
  constructor(props) {
    super(props);
    console.log('AppView props', props);
    this.state = {
      focusId: 'default',
      releations: {
        id: 'root',
        parent: null,
        left_id: null,
        right_id: null,
      }
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'interview/fetchNode',
    });
  }

  componentWillUnmount() {
    // this.save();
  };

  /**
   * 将获得的数据解析为可读数据
   * @param  root id 属性
   * @param data 传入数据
   */
  parseOriginData = (root: { id: string }, data: object[]) => {

    let nodes: object[] = [];
    let releations: object[] = [];

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
    const levelReleations = _.map(levelNodes, (node) => {
      let left_id = null;
      const right_id = null;
      if (lastNode) {
        left_id = lastNode.id;
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

    data.map((d) => {
      const children = d.children;
      if (!_.isEmpty(children)) {
        const result = this.parseOriginData(d, children);
        nodes = _.concat(nodes, result.nodes);
        releations = _.concat(releations, result.releations);
      }
    });

    return {
      nodes,
      releations,
    };
  };

  /**
   * 解析数据成展示数据
   * @param
   */
  generateStateData = (root, nodes, releations) => {
    const node = root;
    let parentNode: string, leftNode: string, rightNode: string, parentParentNode: object = null;
    if (node) {
      parentNode = _.find(releations, (d) => d.id === node.parent_id);
      leftNode = _.find(releations, (d) => d.id === node.left_id);
      rightNode = _.find(releations, (d) => d.id === node.right_id);
    }
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


  onTextChange = (id, text) => {
    const {data, nodes, releations} = this.state;
    console.log('onTextChange', id, text, data);
    const rootNode = {id: 'root'};
    _.find(nodes, (d) => d.id === id).text = text;
    this.generateStateData(rootNode, nodes, releations);
    this.setState(
      {
        data: rootNode,
        nodes,
        releations,
      },
      () => this.save(),
    );


    console.log('setState', data);
  };
  onTabChange = (id, isLeft) => {
    const {data, nodes, releations} = this.state;
    console.log('begin----------------------onTabChange------------------------------------begin');
    this.printReleations(_.cloneDeep(releations));
    console.log('begin onTabChange　setState', _.cloneDeep(releations));
    // console.log('clone releations', _.cloneDeep(releations))

    console.log('onTabChange', id, isLeft ? 'left' : 'right', isLeft);
    const rootNode = {id: 'root'};
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
        }
        else if (parentNode && parentNode.id == 'root') {
        }
      }
      if (node && !node.left_id) {
        if (node.parent_id !== 'root') {
          const childLastId = releations.filter(
            (d) => d.parent_id == parentNode.parent_id && d.right_id == null,
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
            }
            else {
              console.log('left', childLastId, childLastNode);

              if (childLastId) {
                childLastId.right_id = node.id;
                node.left_id = childLastId.id;
              }
            }
          }
        }
      }
    }
    else {
      // right => set this.parent = right_id
      if (node && node.left_id) {
        const childLastId = releations.filter(
          (d) => d.parent_id == leftNode.id && d.right_id == null,
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
      () => this.save(),
    );

    // _.flattenDeep(data).find( (obj)=> obj.id == id).text = text
    // this.setState({data})
    console.log('end onTabChange　setState', rootNode, nodes, _.cloneDeep(releations));
    this.printReleations(_.cloneDeep(releations));

    console.log('end----------------------onTabChange------------------------------------end');
  };

  onFocusChanged = (id, isFocus) => {
    console.log('onFocusChanged', id, isFocus);
    let {focusId} = this.state;
    if (isFocus) {
      focusId = id;
    }
    else {
      focusId = null;
    }
    this.setState({focusId});
  };
  onPressEnter = (id) => {
    console.log('onPressEnter', id);
    let {data, nodes, releations} = this.state;
    const new_id = _.uniqueId('new_');
    nodes = _.concat(nodes, [{id: new_id, text: ''}]);
    const new_releation = {id: new_id};
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
    }
    else {
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

    const rootNode = {id: 'root'};
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
      () => this.save(),
    );
    console.log('end onPressEnter setState', rootNode, nodes, _.cloneDeep(releations));
    this.printReleations(_.cloneDeep(releations));
  };
  onDelete = (id) => {
    console.log('onDelete', id);
    let {data, nodes, releations} = this.state;
    console.log('begin----------------------onDelete------------------------------------begin');
    this.printReleations(_.cloneDeep(releations));
    console.log('begin onDelete', _.cloneDeep(releations));
    // console.log('clone releations', _.cloneDeep(releations))

    console.log('onDelete', id);
    const rootNode = {id: 'root'};
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
      }
      else {
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
      }
      else if (parentNode) new_releation = parentNode;
      const focusId = new_releation ? new_releation.id : null;
      this.check(_.clone(releations));

      this.setState({focusId}, () => {
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
          () => this.save(),
        );
        this.domFocus(focusId);
        console.log('end onDelete setState', rootNode, nodes, _.cloneDeep(releations), focusId);
        this.printReleations(_.cloneDeep(releations));
      });
    }
  };
  onDirectionChange = (id, direction) => {
    console.log('onDirectionChange', id, direction);
    const {data, nodes, releations} = this.state;
    // console.log('begin----------------------onDirectionChange------------------------------------begin')
    // this.printReleations(_.cloneDeep(releations))
    // console.log('begin onDirectionChange' , _.cloneDeep(releations))
    // console.log('clone releations', _.cloneDeep(releations))

    // console.log('onDirectionChange', id)
    const rootNode = {id: 'root'};
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
        this.setState({focusId}, () => {
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
        this.setState({focusId}, () => {
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


  save = () => {
    const json = this.toJson();
    localStorage.setItem('NodeJSON', json);
  };
  toJson = () => {
    const {data} = this.state;
    return JSON.stringify(data.children);
  };
  parseJson = (json) => {
    const object = JSON.parse(json);
    const {nodes, releations} = this.parseOriginData({id: 'root'}, object);
    const rootNode = {id: 'root'};
    this.generateStateData(rootNode, nodes, releations);
    this.setState({
      data: rootNode,
      nodes,
      releations,
    });
  };

  render() {
    const indent = 8; // 控制缩进的尺寸
    const {interview} = this.props;
    const {node} = interview;
    console.log(node);
    console.log('----------');
    const {nodes, releations} = this.parseOriginData({id: 'root'}, node);
    console.log(nodes);
    console.log('----------');
    console.log(releations);
    console.log('----------');
    const rootNode = {id: 'root'};
    this.generateStateData(rootNode, nodes, releations);

    return (

      <ListInputItem
        root // 传递该节点是否为根节点
        children={rootNode.children} // 传递数据流
        onTabChange={this.onTabChange} // Tab 键功能-缩进
        onTextChange={this.onTextChange} // 文本数据输入
        focusId={this.state.focusId} // 聚焦对象
        onFocusChanged={this.onFocusChanged} // 改变聚焦对象
        onPressEnter={this.onPressEnter} // 按回车的效果
        onDelete={this.onDelete} // delete 键效果
        onDirectionChange={this.onDirectionChange} // 上下左右键光标位置移动控制
        indent={indent} // 缩进尺寸
      />
    );
  }
}
