import React, { Component } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';

import { Radio, List, Collapse, Menu } from 'antd';

import { TagInput, TreeList, Upload, Ellipsis } from '../../components';
import styles from './styles.less';

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

const data = [
  'Racing car sprays burning fuel into crowd.',
  '考察重点在你分析问题的全面性，以及说服能力',
  '考察重点在于分析问题本质，抓住问本质的能力',
  '考察重点在于分析问题本质，抓住问题本质的能力',
];

const labels = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
export default class Interview extends Component {
  state = {
    value: 0,
  };
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

  render() {
    const minPanelSize = 150;

    const AdvancedOpts = () => {
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

    const LabelDisplay = () => (
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
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.upload}>
            <Upload />
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
                  <AdvancedOpts />
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
        <div className={styles.center}>
          <ReflexContainer orientation="horizontal">
            <ReflexElement flex="0.6" className={styles['up-container']} minSize={minPanelSize}>
              <TreeList />
            </ReflexElement>
            <ReflexSplitter>
              <div className={styles.touch}>
                <div className={styles['splitter-container']}>
                  <div className={styles.splitter} />
                </div>
              </div>
            </ReflexSplitter>
            <ReflexElement flex="0.4" className={styles['down-container']} minSize={minPanelSize}>
              <TagInput />
            </ReflexElement>
          </ReflexContainer>
        </div>
        <div className={styles.right}>
          标签
          <LabelDisplay />
        </div>
      </div>
    );
  }
}
