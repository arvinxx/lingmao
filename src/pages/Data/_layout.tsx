import React, { PureComponent, Fragment, ReactNode } from 'react';
import { data as header } from '../../common/header';
import {
  Layout,
  Card,
  Tabs,
  Collapse,
  Checkbox,
  Row,
  Col,
  Button,
  Tabs,
  Radio,
  List,
  Icon,
  Divider,
  Progress,
  Dropdown,
  Menu,
  message,
  InputNumber,
  Upload,
} from 'antd';

import { Header } from '../../components';
import styles from './layout.less';

const { Content } = Layout;

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
//checkbox
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['年龄', '性别', '月收入', '烟费', '烟龄', '口味', '品牌忠诚度'];
const plainOptions_2 = ['相关系数表', '碎石图', '总方差解释', '成分矩阵'];
const plainOptions_3 = ['ANOVA表', '以实际个案为中心'];
const defaultCheckedList = [];
//滚动tab
const TabPanes = Tabs.TabPane;
//upload
const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  multiple: true,
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
//list
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
//dropbox
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">抽取信息量不小于</Menu.Item>
    <Menu.Item key="2">2nd menu item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
const menu_2 = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">最大方差法</Menu.Item>
    <Menu.Item key="2">方法2</Menu.Item>
    <Menu.Item key="3">方法3</Menu.Item>
  </Menu>
);
const menu_3 = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">K-Means聚类法</Menu.Item>
    <Menu.Item key="2">方法2</Menu.Item>
    <Menu.Item key="3">方法3</Menu.Item>
  </Menu>
);

//dropbox
function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

//inputnumber
function onChange(value) {
  console.log('changed', value);
}

//checkbox2

function onChange_2(checkedValues_2) {
  console.log('checked = ', checkedValues_2);
}

export default class InterviewLayout extends PureComponent {
  state = {
    fileList: [],
    uploading: false,
    analysisStage: 5,
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }

  callback = (key) => {
    console.log(key);
  };
  //checkbox
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  //滚动tab

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
  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
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
          disabled={false}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  };
  DataIndexComponent = () => {
    const { mode } = this.state;

    return (
      <div>
        <div>
          <br />
          <br />
          <p>拖动修改答案编码</p>
          <div>
            <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
              <Radio.Button value="top">横</Radio.Button>
              <Radio.Button value="left">竖</Radio.Button>
            </Radio.Group>
            <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
              <TabPane tab="年龄" key="1">
                Content of tab 1
              </TabPane>
              <TabPane tab="性别" key="2">
                Content of tab 2
              </TabPane>
              <TabPane tab="月收入" key="3">
                Content of tab 3
              </TabPane>
              <TabPane tab="烟费" key="4">
                Content of tab 4
              </TabPane>
              <TabPane tab="烟龄" key="5">
                Content of tab 5
              </TabPane>
              <TabPane tab="口味" key="6">
                Content of tab 6
              </TabPane>
              <TabPane tab="品牌忠诚度" key="7">
                Content of tab 7
              </TabPane>
            </Tabs>
          </div>
          <div style={{ padding: '26px 16px 16px' }}>
            <Button>重置</Button>
            <Button type="primary" ghost>
              确认
            </Button>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
        </div>
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <div style={{ padding: '26px 16px 16px' }}>
          <Button>重置</Button>
          <Button type="primary" ghost>
            确认
          </Button>
        </div>
      </div>
    );
  };
  DimMatchComponent = () => (
    <div>
      <p>点击维度，匹配维度</p>
      <div style={{ padding: '26px 16px 16px' }}>
        <Button>年龄</Button>
        <Button>性别</Button>
        <Button>月收入</Button>
        <Button>烟费</Button>
        <Button>烟龄</Button>
        <Button>口味</Button>
        <Button>忠诚度</Button>
        <Button>健康</Button>
        <Button>公共场合</Button>
        <Button>新鲜事物</Button>
        <Button>性价比</Button>
      </div>
      <div>
        {/*<List*/}
        {/*header={<div>Racing car sprays burning fuel into crowd.</div>}*/}
        {/*footer={<div>Racing car sprays burning fuel into crowd.</div>}*/}
        {/*size="small"*/}
        {/*bordered*/}
        {/*dataSource={data}*/}
        {/*renderItem={item => (<List.Item>{item}</List.Item>)}*/}
        {/*/>*/}
      </div>
      <div style={{ padding: '26px 16px 16px' }}>
        <Button>重置</Button>
        <Button type="primary" ghost>
          确认
        </Button>
      </div>
    </div>
  );
  ValidationComponent = () => (
    <div>
      <div>
        <Icon type="plus-circle-o" />
        <p>添加检验维度</p>
      </div>
      <div>
        <Button>生成图表</Button>
        <Button type="primary">确认并跳转</Button>
      </div>
    </div>
  );
  selectDimComponent = () => (
    <div>
      <p>点击选择参与降维的维度</p>
      <div>
        <Button>年龄</Button>
        <Button>性别</Button>
        <Button>月收入</Button>
        <Button>烟费</Button>
        <Button>烟龄</Button>
        <Button>口味</Button>
        <Button>忠诚度</Button>
        <Button>健康</Button>
        <Button>公共场合</Button>
        <Button>新鲜事物</Button>
        <Button>性价比</Button>
      </div>
      <div>
        <Divider />
        <Button>重置</Button>
        <Button type="primary" ghost>
          确认
        </Button>
      </div>
      <div>
        <p>因子分析有效性检验</p>
        <Progress percent={30} />
      </div>
    </div>
  );
  dimOptionComponent = () => (
    <div>
      <div>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            请选择降维抽取参数 <Icon type="down" />
          </Button>
        </Dropdown>
        <InputNumber
          defaultValue={100}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => Number(value.replace('%', ''))}
          onChange={onChange}
        />
      </div>
      <div>
        <Collapse bordered={false} defaultActiveKey={[]}>
          <Panel className={styles.panel} header="高级选项" key="1">
            <div>
              <p>显示图表</p>
              <CheckboxGroup options={plainOptions_2} defaultValue={[]} onChange={onChange_2} />
            </div>
            <div>
              <p>旋转方法</p>
              <Dropdown.Button onClick={handleButtonClick} overlay={menu_2}>
                请选择方法
              </Dropdown.Button>
            </div>
            <div>
              <Button type="primary" ghost>
                生成图表
              </Button>
              <Button type="primary">确认并跳转</Button>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );

  selectDim2Component = () => (
    <div>
      <p>点击选择参与降维的维度</p>
      <div>
        <Button>降维成份一</Button>
        <Button>降维成份二</Button>
        <Button>降维成份三</Button>
        <Button>年龄</Button>
        <Button>性别</Button>
        <Button>月收入</Button>
        <Button>烟费</Button>
        <Button>烟龄</Button>
        <Button>口味</Button>
        <Button>忠诚度</Button>
        <Button>健康</Button>
        <Button>公共场合</Button>
        <Button>新鲜事物</Button>
        <Button>性价比</Button>
      </div>
      <div>
        <Divider />
        <Button>重置</Button>
        <Button type="primary" ghost>
          确认
        </Button>
      </div>
      <div>
        <Icon type="info-circle-o" />
        <p>聚类数预估参考 3，5</p>
      </div>
    </div>
  );
  ClusterMethodComponent = () => (
    <div>
      <div>
        <Dropdown overlay={menu_3}>
          <Button style={{ marginLeft: 8 }}>
            请选择聚类方法 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
      <div>
        <p>聚类数</p>
        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
      </div>
      <div>
        <CheckboxGroup options={plainOptions_3} defaultValue={[]} onChange={onChange_2} />
      </div>
      <div>
        <Button type="primary">生成图表</Button>
      </div>
    </div>
  );

  PanelComponent = () => {
    const { analysisStage } = this.state;
    const CollapseArray = [
      { text: '数据文件', component: this.UploadComponent() },
      { text: '数据编码', component: this.DataIndexComponent() },
      { text: '维度匹配', component: this.DimMatchComponent() },
      { text: '有效性检验', component: this.ValidationComponent() },
      { text: '选择维度', component: this.selectDimComponent() },
      { text: '维度选项', component: this.dimOptionComponent() },
      { text: '选择维度', component: this.selectDim2Component() },
      { text: '聚类方法', component: this.ClusterMethodComponent() },
    ];
    const PanelComponent = (from: number, end: number): ReactNode => {
      {
        return CollapseArray.map((panel, index) => {
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
