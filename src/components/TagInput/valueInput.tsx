import React, { Component } from 'react';
import { Tag, Input, Icon } from 'antd';

import styles from './styles.less';

interface IValueInputProps {
  id: string;
  inputVisible: boolean;
  dispatch: Function;
}
export default class Index extends Component<IValueInputProps> {
  static defaultProps: IValueInputProps = {
    id: '',
    inputVisible: false,
    dispatch: () => {},
  };
  state = { newKey: '', newValue: '', newKeyPlaceHolder: '添加条目' };

  newValueOnInput = (e) => {
    this.setState({ newValue: e.target.value });
  };
  newValueOnBlur = (id) => {
    const { newValue } = this.state;
    this.props.dispatch({
      type: 'interview/addDimensionValue',
      payload: { id, newValue },
    });
    this.props.dispatch({
      type: 'interview/hideValueInput',
      payload: id,
    });
    this.setState({ newValue: '' });
  };
  newValueOnConfirm = (id) => {
    const { newValue } = this.state;
    this.props.dispatch({
      type: 'interview/addDimensionValue',
      payload: { id, newValue },
    });
    this.setState({ newValue: '' });
  };

  showValueInput = (id) => {
    this.props.dispatch({
      type: 'interview/showValueInput',
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
          className={styles.input}
          value={newValue}
          onChange={this.newValueOnInput}
          onPressEnter={(e) => this.newValueOnConfirm(id)}
          onBlur={() => this.newValueOnBlur(id)}
        />
      );
    else {
      return (
        <Tag
          key={`${id}-plus+++++++`}
          //@ts-ignore Antd 未定义事件 props
          onClick={() => this.showValueInput(id)}
          className={styles.plus}
        >
          <Icon key={`${id}----icon`} type="plus" />
        </Tag>
      );
    }
  }
}
