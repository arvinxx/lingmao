import React, { Component } from 'react';
import { Layout, Modal, Slider, Tree, InputNumber, Row, Col, Radio } from 'antd';
import { connect } from 'dva';
import { mockDimList } from '../../../mock/tags';
import personaImg from '../../assets/persona.png';

import styles from './index.less';

const { Content } = Layout;

const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;

@connect(({ persona }) => ({
  persona,
}))
export default class Index extends Component {
  state = {
    inputValue: 1,
    value: 1,
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  };
  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  };
  onExpand = (expandedKeys) => {
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
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };
  exportOptionChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  exportConfirm = () => {
    console.log('成功导出');
  };
  hideExportModal = () => {
    this.props.dispatch({
      type: 'persona/changeExportVisible',
    });
  };

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };

  dimensionList = () => {
    const { dimVisible } = this.props.persona;
    if (dimVisible) {
      return (
        <div className={styles.right}>
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
          >
            {this.renderTreeNodes(mockDimList)}
          </Tree>
        </div>
      );
    }
  };
  PersonaComponent = () => {
    return (
      <div className={styles.left}>
        <div>desigen</div>
      </div>
    );
  };
  ExportModalComponent = () => {
    const { exportVisible } = this.props.persona;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    if (exportVisible) {
      return (
        <Modal
          wrapClassName={styles['modal-wapper']}
          title="导出画像"
          visible={exportVisible}
          onOk={this.exportConfirm}
          onCancel={this.hideExportModal}
        >
          <p>预览</p>
          <img className={styles['preview-img']} src={personaImg} alt="用户画像" />
          <div className={styles['option-container']}>
            <Row>
              <Col span={18}>
                <div>样式选择</div>
                <div>
                  背景
                  <div>颜色</div>
                  <div>间距</div>
                </div>
                阴影
                <Row>
                  <Col span={12}>
                    大小
                    <Slider
                      min={1}
                      max={20}
                      onChange={this.onChange}
                      value={this.state.inputValue}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{ marginLeft: 16 }}
                      value={this.state.inputValue}
                      onChange={this.onChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <div>导出选项</div>
                <RadioGroup onChange={this.exportOptionChange} value={this.state.value}>
                  <Radio style={radioStyle} value={1}>
                    导出为 JPG
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    导出为 PNG
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    导出为 PDF
                  </Radio>
                </RadioGroup>
              </Col>
            </Row>
          </div>{' '}
        </Modal>
      );
    }
  };
  render() {
    return (
      <Content>
        <div className={styles.container}>
          {this.PersonaComponent()} {this.dimensionList()}
          {this.ExportModalComponent()}
        </div>
      </Content>
    );
  }
}
