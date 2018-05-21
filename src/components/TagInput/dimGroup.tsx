import React, { Component } from 'react';
import { Input, Icon, Popconfirm } from 'antd';
import styles from './styles.less';

interface IDimGroupProps {
  id: string;
  value: string;
  dispatch: Function;
}
export default class DimGroup extends Component<IDimGroupProps> {
  static defaultProps: IDimGroupProps = {
    id: '',
    value: '',
    dispatch: () => {},
  };

  changeKey = (e, id) => {
    this.props.dispatch({
      type: 'interview/changeDimensionKey',
      payload: { id, newKey: e.target.value },
    });
  };
  deleteKey = (id) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionKey',
      payload: id,
    });
  };
  render() {
    const { id, value } = this.props;

    return (
      <div key={id + 'kcc'}>
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
