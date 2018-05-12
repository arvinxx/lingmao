import React, { Component, Fragment } from 'react';
import { Layout, Modal, Slider, Tree, InputNumber, Row, Col, Radio } from 'antd';
import { connect } from 'dva';
import { persona as header } from '../../common/header';
import { Header, DimensionList } from '../../components';
import { mockDimList } from '../../../mock/tags';
import personaImg from '../../assets/persona.png';

import styles from './layout.less';
import { TPersona } from '../../models/persona';

const { Content } = Layout;
const RadioGroup = Radio.Group;

interface IPersonaLayoutProps {
  persona: TPersona;
  dispatch: Function;
}

@connect(({ persona, tag }) => ({ persona, tag }))
export default class PersonaLayout extends Component<IPersonaLayoutProps> {
  state = {
    inputValue: 1,
    value: 1,
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'tag/fetchTagGroups',
    });
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
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

  ExportModalComponent = () => (
    <Modal
      wrapClassName={styles['modal-wrapper']}
      title="导出画像"
      visible
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
                <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
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
              <Radio className={styles.radio} value={1}>
                导出为 JPG
              </Radio>
              <Radio className={styles.radio} value={2}>
                导出为 PNG
              </Radio>
              <Radio className={styles.radio} value={3}>
                导出为 PDF
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
      </div>
    </Modal>
  );

  render() {
    const { dimVisible, exportVisible, expandedDims, checkedDims } = this.props.persona;
    const { dispatch} = this.props;
    const tagGroups = this.props.tag.tagGroups || [];
    return (
      <Fragment>
        <Header header={header} />
        <Content>
          <div className={styles.container}>
            {this.props.children}
            {dimVisible ? (
              <DimensionList
                tagGroups={tagGroups}
                checkedDims={checkedDims}
                expandedDims={expandedDims}
                dispatch={dispatch}
              />
            ) : null}
            {exportVisible ? this.ExportModalComponent() : null}
          </div>
        </Content>
      </Fragment>
    );
  }
}
