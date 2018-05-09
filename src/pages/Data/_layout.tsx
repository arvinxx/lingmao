import React, { PureComponent, Fragment, ReactNode } from 'react';
import { data as header } from '../../common/header';
import { Layout, Card, Tabs, Collapse, Upload, Button, Icon, message } from 'antd';
import { Header } from '../../components';
import styles from './layout.less';

const { Content } = Layout;

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class InterviewLayout extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
    analysisStage: 9,
  };

  callback = (key) => {
    console.log(key);
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });
  };

  UploadComponent = () => {
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          className="upload-demo-start"
          type="primary"
          onClick={this.handleUpload}
          disabled={this.state.fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  };

  PanelComponent = () => {
    const { analysisStage } = this.state;
    const Collapse1 = [
      { text: '数据文件', component: this.UploadComponent() },
      { text: '数据编码', component: <div>数据编码</div> },
      { text: '维度匹配', component: <div>维度匹配</div> },
      { text: '有效性检验', component: <div>有效性检验</div> },
      { text: '选择维度', component: <div>选择维度</div> },
      { text: '维度选项', component: <div>维度选项</div> },
      { text: '选择维度', component: <div>选择维度</div> },
      { text: '聚类方法', component: <div>选择维度</div> },
    ];
    const PanelComponent = (from: number, end: number): ReactNode => {
      {
        return Collapse1.map((panel, index) => {
          if (index >= from && index < end) {
            return (
              <Panel
                className={styles.panel}
                disabled={index > analysisStage}
                header={panel.text}
                key={index.toString()}
              >
                {panel.component}
              </Panel>
            );
          }
        });
      }
    };
    return (
      <Card bordered={false} className={styles.right}>
        <Tabs defaultActiveKey="1" onChange={this.callback} size="large">
          <TabPane tab="预处理" key="1">
            <div className={styles.advanced}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                {PanelComponent(0, 4)}
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="降维" key="2">
            <Collapse bordered={false} defaultActiveKey={['4']}>
              {PanelComponent(4, 6)}
            </Collapse>
          </TabPane>
          <TabPane tab="聚类" key="3">
            <Collapse bordered={false} defaultActiveKey={['6']}>
              {PanelComponent(6, 9)}
            </Collapse>
          </TabPane>
        </Tabs>
      </Card>
    );
  };

  render() {
    return (
      <Fragment>
        <Header header={header} />
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
