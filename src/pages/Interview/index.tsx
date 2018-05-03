import React, { Component } from 'react';
import { connect } from 'dva';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { Radio, List, Collapse, Menu, Input, Layout } from 'antd';
import 'react-reflex/styles.css';

import { TagInput, TreeList, Upload, Ellipsis, Header } from '../../components';
import styles from './styles.less';
import { uploadDocument } from './services/api';

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;
const { Content } = Layout;

const data = [
  'Racing car sprays burning fuel into crowd.',
  '考察重点在你分析问题的全面性，以及说服能力',
  '考察重点在于分析问题本质，抓住问本质的能力',
  '考察重点在于分析问题本质，抓住问题本质的能力',
];

const labels = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const UploadProps = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:8000/api/upload',
  // customRequest:uploadDocument
};

const header = {
  left: ['left', 'right', 'down'],
  center: ['记录', '标签'],
  right: ['warning', 'unlock'],
};

@connect(({ interview, loading }) => ({
  interview,
  loading: loading.models.interview,
}))
export default class Interview extends Component<any, any> {
  state = {
    value: 0,
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'interview/fetchDocument',
    });
  }
  componentWillUnmount() {
    const { title, records, id } = this.props.interview;

    this.props.dispatch({
      type: 'interview/saveDocument',
      payload: { title, id },
    });
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleClick = (e) => {
    console.log('click ', e);
  };

  getLabels = (item) => {
    return (
      <Menu.Item className={styles.labels} key={item}>
        {item}
      </Menu.Item>
    );
  };

  titleChange = (e) => {
    const text = e.target.value;
    this.props.dispatch({
      type: 'interview/changeTitle',
      payload: text,
    });
  };
  AdvancedOpts = () => {
    return (
      <RadioGroup
        className={styles['radio-group']}
        onChange={this.onChange}
        value={this.state.value}
      >
        <Radio className={styles['radio-style']} value={1}>
          基于分号
        </Radio>
        <Radio className={styles['radio-style']} value={2}>
          基于换行
        </Radio>
        <Radio className={styles['radio-style']} value={3}>
          基于逗号
        </Radio>
        <Radio className={styles['radio-style']} value={4}>
          基于句号
        </Radio>
      </RadioGroup>
    );
  };
  LabelDisplay = () => (
    <Menu
      onClick={this.handleClick}
      style={{ width: 200 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {labels.map((label) => this.getLabels(label))}
    </Menu>
  );
  render() {
    const minPanelSize = 150;
    const { title, records, dimensions } = this.props.interview;

    return [
      <Header data={header} />,
      <Content className={styles.content}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.upload}>
              <Upload params={UploadProps} />
              <div className={styles.preview}>
                <List
                  header={<div style={{ textAlign: 'center' }}>前三行预览</div>}
                  footer={<div />}
                  size="small"
                  dataSource={data.slice(0, 3)}
                  renderItem={(item) => (
                    <div className={styles['pre-container']}>
                      <div className={styles.circle} />
                      <Ellipsis length={20}>{item}</Ellipsis>
                    </div>
                  )}
                  split={false}
                />
              </div>
              <div className={styles.advanced}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                  <Panel className={styles.sss} header="高级选项" key="advanced-1">
                    {this.AdvancedOpts()}
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
          <div className={styles.center}>
            <ReflexContainer orientation="horizontal">
              <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
                <div className={styles.warpper}>
                  <Input className={styles.title} onChange={this.titleChange} value={title} />
                  <TreeList records={records} />
                </div>
              </ReflexElement>
              <ReflexSplitter>
                <div className={styles.touch}>
                  <div className={styles['splitter-container']}>
                    <div className={styles.splitter} />
                  </div>
                </div>
              </ReflexSplitter>
              <ReflexElement flex="0.4" className={styles['down-container']} minSize={minPanelSize}>
                <TagInput dimensions={dimensions} />
              </ReflexElement>
            </ReflexContainer>
          </div>
          <div className={styles.right}>
            标签
            {this.LabelDisplay()}
          </div>
        </div>
      </Content>,
    ];
  }
}
