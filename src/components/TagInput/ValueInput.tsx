import React, { PureComponent } from 'react';
import { DispatchProp } from 'react-redux';
import { Tag, Input, Icon } from 'antd';

import styles from './styles.less';

export interface IValueInputProps {
  id: string;
  inputVisible: boolean;
}
export default class ValueInput extends PureComponent<IValueInputProps & DispatchProp> {
  static defaultProps: IValueInputProps = {
    id: '',
    inputVisible: false,
  };
  state = { newValue: '' };

  newValueOnInput = (e) => {
    this.setState({ newValue: e.target.value });
  };
  newValueOnBlur = (id) => {
    const { newValue } = this.state;
    this.props.dispatch({
      type: 'recordDims/addDimensionValue',
      payload: { id, newValue },
    });
    this.props.dispatch({
      type: 'recordDims/hideValueInput',
      payload: id,
    });
    this.setState({ newValue: '' });
  };
  newValueOnConfirm = (id) => {
    const { newValue } = this.state;
    this.props.dispatch({
      type: 'recordDims/addDimensionValue',
      payload: { id, newValue },
    });
    this.setState({ newValue: '' });
  };

  cancelVOnEsc = (e, id) => {
    if (e.key === 'Escape') {
      this.props.dispatch({
        type: 'recordDims/hideValueInput',
        payload: id,
      });
      this.setState({ newValue: '' });
    }
  };

  showValueInput = (id) => {
    this.props.dispatch({
      type: 'recordDims/showValueInput',
      payload: id,
    });
  };
  render() {
    const { id, inputVisible } = this.props;
    const { newValue } = this.state;
    if (inputVisible)
      return (
        <Input
          key={`${id}-add`}
          type="text"
          size="small"
          autoFocus={inputVisible}
          className={styles.input}
          value={newValue}
          onKeyDown={(e) => this.cancelVOnEsc(e, id)}
          onChange={this.newValueOnInput}
          onPressEnter={() => this.newValueOnConfirm(id)}
          onBlur={() => this.newValueOnBlur(id)}
        />
      );
    else {
      return (
        <Tag
          key={`${id}-plus+++++++`}
          //@ts-ignore Antd 未定义事件 props TODO
          onClick={() => this.showValueInput(id)}
          className={styles.plus}
        >
          <Icon key={`${id}----icon`} type="plus" />
        </Tag>
      );
    }
  }
}
