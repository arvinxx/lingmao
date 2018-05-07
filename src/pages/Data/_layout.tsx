import React, { PureComponent, Fragment } from 'react';
import { data as header } from '../../common/header';
import { Layout, Card, Tabs, Collapse } from 'antd';

import { Header } from '../../components';
import styles from './layout.less';

const { Content } = Layout;

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class InterviewLayout extends PureComponent {
  callback = (key) => {
    console.log(key);
  };
  PanelComponent = () => {
    return (
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
    );
  };
  render() {
    return (
      <Fragment>
        <Header header={header}  />
        <Content>
          <div className={styles.container}>
            {this.props.children}
            {this.PanelComponent()}
          </div>
        </Content>
      </Fragment>
    );
  }
}
