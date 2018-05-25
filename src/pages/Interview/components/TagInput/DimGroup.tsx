import React, { PureComponent } from 'react';
import { Input, Icon, Popconfirm } from 'antd';
import styles from './DimGroup.less';
import { DispatchProp } from 'react-redux';

export interface IDimGroupProps {
  id: string;
  value: string;
}
export default class DimGroup extends PureComponent<IDimGroupProps & DispatchProp> {
  static defaultProps: IDimGroupProps = {
    id: '',
    value: '',
  };

  changeKey = (e, id) => {
    this.props.dispatch({
      type: 'recordDims/changeDimensionKey',
      payload: { id, newKey: e.target.value },
    });
  };
  deleteKey = (id) => {
    this.props.dispatch({
      type: 'recordDims/deleteDimensionKey',
      payload: id,
    });
  };
  render() {
    const { id, value } = this.props;

    return (
      <div key={id + 'kcc'} className={styles.container}>
        <Popconfirm
          key={id + 'pop'}
          title="确认要删除吗?"
          onConfirm={() => this.deleteKey(id)}
          okText="是"
          cancelText="否"
        >
          <Icon key={id + 'icon'} type="close" className={styles.delete} />
        </Popconfirm>
        <Input
          key={'keyof' + id}
          className={styles['exist-key']}
          value={value}
          placeholder={value}
          onChange={(e) => {
            this.changeKey(e, id);
          }}
        />
      </div>
    );
  }
}
