import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Card, Form } from 'antd';
import { connect } from 'dva';
import styles from './table.less';
const { Column } = Table;
const tableData = [
  {
    key: '1',
    index: '00001',
    name: 'John Brown',
    age: 13,
    gender: '男',
    editable: false,
  },
  {
    key: '2',
    index: '00002',
    name: 'Jim Green',
    age: 34,
    gender: '男',
    editable: false,
  },
  {
    key: '3',
    index: '00003',
    name: 'Joe Black',
    age: 54,
    gender: '男',
    editable: false,
  },
];

//@ts-ignore 目前会解析错误
@Form.create()
export default class AdvancedForm extends PureComponent<any, any> {
  state = {
    width: '100%',
    value: 0,
    data: tableData,
    loading: false,
  };
  clickedCancel?: boolean;
  index = 0;
  cacheOriginData = {};
  getRowByKey = (key, newData?) => {
    return (newData || this.state.data).filter((item) => item.key === key)[0];
  };
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  remove = (key) => {
    const newData = this.state.data.filter((item) => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  };
  newMember = () => {
    const newData = this.state.data.map((item) => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      index: '',
      gender: '',
      age: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleFieldChange = (e, fieldName, key) => {
    const newData = this.state.data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  };
  columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'form-index',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'form-age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'form-gender',
    },
  ];
  saveRow = (e, key) => {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.workId || !target.name || !target.department) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
      this.setState({
        loading: false,
      });
    }, 500);
  };
  cancel = (e, key) => {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  };

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  handleKeyPress(e) {
    console.log(e);
    this.saveRow(e, e.key);
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card bordered={false} className={styles.left}>
        {getFieldDecorator('members', {
          initialValue: tableData,
        })(
          <Fragment>
            <Button>排序</Button>
            <Button>筛选</Button>
            <Button>选择维度</Button>
            <Table
              loading={this.state.loading}
              columns={this.columns}
              dataSource={this.state.data}
              pagination={false}
              onChange={this.onChange}
              rowClassName={(record) => {
                return record.editable ? styles.editable : '';
              }}
            >
              {this.columns.map((column) => {
                const { key, title, dataIndex } = column;
                return (
                  <Column
                    title={title}
                    key={key}
                    dataIndex={dataIndex}
                    onFilter={(value, record) => record.name.indexOf(value) === 0}
                    render={(text, record) => {
                      if (record.editable) {
                        return (
                          <Input
                            value={text}
                            autoFocus
                            onChange={(e) => this.handleFieldChange(e, dataIndex, record.key)}
                            onPressEnter={(e) => this.handleKeyPress(e)}
                            placeholder="编号"
                          />
                        );
                      }
                      return text;
                    }}
                  />
                );
              })}
            </Table>
          </Fragment>
        )}
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增记录
        </Button>
      </Card>
    );
  }
}
