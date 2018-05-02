import React, { PureComponent } from 'react';
import { Card, Form, Radio, Collapse } from 'antd';

import { connect } from 'dva';
import TableForm from './TableForm';
import styles from './style.less';
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

//@ts-ignore
@Form.create()
class AdvancedForm extends PureComponent<any, any> {
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
      <div className={styles.container}>
        <Card bordered={false} className={styles.left}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
        <Card title="数据情况" bordered={false} className={styles.right}>
          <div className={styles.advanced}>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel className={styles.sss} header="数据编码" key="encode">
                {getFieldDecorator('members', {
                  initialValue: tableData,
                })(<TableForm />)}
              </Panel>
            </Collapse>
          </div>
        </Card>
      </div>
    );
  }
}

export default AdvancedForm;
