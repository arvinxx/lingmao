import React, { PureComponent } from 'react';
import { Card, Form, Tabs, Collapse } from 'antd';

import { connect } from 'dva';

import { Header } from '../../components';
import TableForm from './component.TableForm';
import styles from './style.less';
const TabPane = Tabs.TabPane;

const Panel = Collapse.Panel;

const tableData = [
  {
    key: '1',
    index: '00001',
    name: 'John Brown',
    age: 13,
    gender: '男',
  },
  {
    key: '2',
    index: '00002',
    name: 'Jim Green',
    age: 34,
    gender: '男',
  },
  {
    key: '3',
    index: '00003',
    name: 'Joe Black',
    age: 54,
    gender: '男',
  },
];

const header = {
  left: ['left', 'right', 'down'],
  center: ['数据表格', '检验图表', '降维图表', '聚类结果', '分析汇总'],
  right: ['calendar', 'desktop'],
};

//@ts-ignore
@Form.create()
class AdvancedForm extends PureComponent<any, any> {
  state = {
    width: '100%',
    value: 0,
  };
  callback = (key) => {
    console.log(key);
  };
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return [
      <Header data={header} />,
      <div className={styles.container}>
        <Card bordered={false} className={styles.left}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <Card bordered={false} className={styles.right}>
          <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
            <TabPane tab="预处理" key="1">
              <div className={styles.advanced}>
                <Collapse bordered={false} defaultActiveKey={['1']}>
                  <Panel className={styles.panel} header="数据文件" key="1">
                    数据
                  </Panel>
                  <Panel className={styles.panel} header="数据编码" key="2">
                    数据编码
                  </Panel>
                  <Panel className={styles.panel} header="维度匹配" key="3">
                    维度匹配
                  </Panel>
                  <Panel className={styles.panel} header="有效性检验" key="4">
                    有效性检验
                  </Panel>
                </Collapse>
              </div>
            </TabPane>
            <TabPane tab="降维" key="2">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel className={styles.panel} header="选择维度" key="1">
                  选择维度
                </Panel>
                <Panel className={styles.panel} header="维度选项" key="2" disabled>
                  维度选项
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="聚类" key="3">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel className={styles.panel} header="选择维度" key="1">
                  选择维度
                </Panel>
                <Panel className={styles.panel} header="聚类方法" key="2" disabled>
                  聚类方法
                </Panel>
              </Collapse>
            </TabPane>
          </Tabs>
        </Card>
      </div>,
    ];
  }
}

export default AdvancedForm;
