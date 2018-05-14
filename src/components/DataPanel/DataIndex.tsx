import React, { Component } from 'react';
import { Steps, Tabs, Button, Table } from 'antd';

const Step = Steps.Step;
const TabPane = Tabs.TabPane;

const columns = [
  {
    title: '全选',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <div>{text}</div>,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
  },
  {
    key: '2',
    name: 'Jim Green',
  },
  {
    key: '3',
    name: 'Joe Black',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

interface IDataIndexProps {
  indexState: number;
}
export default class DataIndex extends Component<IDataIndexProps> {
  static defaultProps = {
    indexState: 0,
  };

  render() {
    const { indexState } = this.props;
    return (
      <div>
        <div>
          <Steps size="small" current={indexState}>
            <Step title="选择问题" description="选择编码的问题" />
            <Step title="维度编码" description="拖动修改答案编码" />
          </Steps>
          <div>
            {indexState ? (
              <div>
                <Tabs defaultActiveKey="1" style={{ height: 400 }}>
                  <TabPane tab="选择问题" key="1" />
                  <TabPane tab="维度编码" key="2">
                    Content of tab 2
                  </TabPane>
                </Tabs>
                <Button
                  onClick={() => {
                    this.setState({ indexState: 0 });
                  }}
                >
                  返回
                </Button>
              </div>
            ) : (
              <Table
                style={{ border: '1px solid #eee' }}
                size="middle"
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={rowSelection}
                footer={() => (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button style={{ marginRight: 16 }}>重置</Button>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        console.log('选择完毕');
                        this.setState({ indexState: 1 });
                      }}
                    >
                      确认
                    </Button>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
