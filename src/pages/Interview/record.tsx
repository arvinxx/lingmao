import React, { Component } from 'react';
import { connect } from 'dva';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { Radio, List, Collapse, Menu, Input, Layout, Button, InputNumber, Icon } from 'antd';

import { TagInput, RecordList, Upload, Ellipsis } from '../../components';

import 'react-reflex/styles.css';
import styles from './record.less';

const { Panel } = Collapse;
const RadioGroup = Radio.Group;
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
    const { title, records, id, dimensions, selectedLabels } = this.props.interview;

    this.props.dispatch({
      type: 'interview/saveDocument',
      payload: { title, id, records, dimensions, selectedLabels },
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
        <Icon type="close" className={styles.close} />
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

  handleSelected(label: string, checked: boolean) {
    const { selectedLabels } = this.props;
    const nextSelectedLabels = checked
      ? [...selectedLabels, label]
      : selectedLabels.filter((t) => t !== label);
    this.props.dispatch({
      type: 'interview/selectLabels',
      payload: nextSelectedLabels,
    });
  }

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
  LabelComponent = (tagVisible, labels) => {
    if (tagVisible) {
      return (
        <div className={styles.right}>
          <div className={styles.title}>标签</div>
          <Menu
            onClick={this.handleClick}
            style={{ width: 200 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            {labels.map((label) => this.getLabels(label))}
          </Menu>
        </div>
      );
    }
  };
  UploadComponent = (uploadVisible) => {
    if (uploadVisible) {
      return (
        <div className={styles.left}>
          <div className={styles.upload}>
            <Upload params={UploadProps} />
            <div className={styles['button-container']}>
              <Button
                type="primary"
                ghost
                disabled
                size={'small'}
                className={styles['button-style']}
              >
                上传提纲
              </Button>
              <Button
                type="primary"
                ghost
                disabled
                size={'small'}
                className={styles['button-style']}
              >
                上传记录
              </Button>
            </div>
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
                <Panel className={styles['adv-opts']} header="高级选项" key="1">
                  <div className={styles.description}>格式化参数</div>
                  {this.AdvancedOpts()}
                  <div className={styles.delete}>
                    删除前
                    <InputNumber
                      className={styles['delete-number']}
                      min={1}
                      size="small"
                      max={10}
                      defaultValue={3}
                      onChange={(e) => console.log('changed', e)}
                    />
                    条内容
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      );
    }
  };
  RecordComponent = () => {
    const minPanelSize = 150;
    const { title, records, dimensions, selectedLabels } = this.props.interview;

    return (
      <div className={styles.center}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
            <div className={styles.wrapper}>
              <Input className={styles.title} onChange={this.titleChange} value={title} />
              <RecordList records={records} dispatch={this.props.dispatch} />
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
            <TagInput
              dimensions={dimensions}
              selectedLabels={selectedLabels}
              dispatch={this.props.dispatch}
            />
          </ReflexElement>
        </ReflexContainer>
      </div>
    );
  };

  render() {
    const { uploadVisible, tagVisible } = this.props.interview;
    return (
      <Content className={styles.content}>
        <div className={styles.container}>
          {this.UploadComponent(uploadVisible)}
          {this.RecordComponent()}
          {this.LabelComponent(tagVisible, labels)}
        </div>
      </Content>
    );
  }
}
