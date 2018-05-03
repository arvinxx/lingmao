import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';

export default class TableForm extends PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }
  clickedCancel?: boolean;
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }
  getRowByKey(key, newData?) {
    return (newData || this.state.data).filter((item) => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
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
  remove(key) {
    const newData = this.state.data.filter((item) => item.key !== key);
    this.setState({ data: newData });
    this.props.onChange(newData);
  }
  newMember = () => {
    const newData = this.state.data.map((item) => ({ ...item }));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      idex: '',
      gender: '',
      age: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e) {
    console.log(e);
    this.saveRow(e, e.key);
  }
  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map((item) => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
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
  }
  cancel(e, key) {
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
  }
  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'index',
        key: 'form-index',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={(e) => this.handleFieldChange(e, 'form-index', record.key)}
                onPressEnter={(e) => this.handleKeyPress(e)}
                placeholder="编号"
              />
            );
          }
          return text;
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'form-age',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={(e) => this.handleFieldChange(e, 'workId', record.key)}
                onPressEnter={(e) => this.handleKeyPress(e)}
                placeholder="年龄"
              />
            );
          }
          return text;
        },
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'form-gender',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={(e) => this.handleFieldChange(e, 'form-gender', record.key)}
                onPressEnter={(e) => this.handleKeyPress(e)}
                placeholder="性别"
              />
            );
          }
          return text;
        },
      },
    ];

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={(record) => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增记录
        </Button>
      </Fragment>
    );
  }
}
