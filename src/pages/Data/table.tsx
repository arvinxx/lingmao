import React, { PureComponent } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';

import TableForm from './component.TableForm';
import styles from './style.less';

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

//@ts-ignore 目前会解析错误
@Form.create()
export default class AdvancedForm extends PureComponent<any, any> {
  state = {
    width: '100%',
    value: 0,
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

    return (
      <Card bordered={false} className={styles.left}>
        {getFieldDecorator('members', {
          initialValue: tableData,
        })(<TableForm />)}
      </Card>
    );
  }
}
