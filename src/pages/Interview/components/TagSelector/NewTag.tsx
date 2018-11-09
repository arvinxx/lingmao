import React, { PureComponent } from 'react';
import { DispatchProp } from 'react-redux';
import { Tag, Input, Icon } from 'antd';

import styles from './NewTag.less';

export interface IValueInputProps {
  labelKey: string;
  inputVisible: boolean;
}
export default class NewTag extends PureComponent<IValueInputProps & DispatchProp> {
  static defaultProps: IValueInputProps = {
    labelKey: '',
    inputVisible: false,
  };
  state = { text: '' };

  newTagOnInput = (e) => {
    this.setState({ text: e.target.value });
  };

  handleKeyDown = (e, key) => {
    if (e.key === 'Escape') {
      this.props.dispatch({
        type: 'label/hideTagInput',
        payload: key,
      });
      this.setState({ text: '' });
    }

    if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault();
      const { text } = this.state;
      if (text !== '') {
        this.props.dispatch({
          type: 'label/addTag',
          payload: { key, text },
        });
      }
      if (e.key === 'Enter') {
        this.props.dispatch({
          type: 'label/hideTagInput',
          payload: key,
        });
      }
      this.setState({ text: '' });
    }
  };

  showTagInput = (key) => {
    this.props.dispatch({
      type: 'label/showTagInput',
      payload: key,
    });
  };
  newTagOnBlur = (key) => {
    const { text } = this.state;
    if (text !== '') {
      this.props.dispatch({
        type: 'label/addTag',
        payload: { key, text },
      });
    }
    this.props.dispatch({
      type: 'label/hideTagInput',
      payload: key,
    });
    this.setState({ text: '' });
  };

  render() {
    const { labelKey: key, inputVisible } = this.props;
    const { text } = this.state;

    return inputVisible ? (
      <Input
        key={`${key}-add`}
        type="text"
        size="small"
        autoFocus={inputVisible}
        className={styles.input}
        value={text}
        onKeyDown={(e) => this.handleKeyDown(e, key)}
        onChange={this.newTagOnInput}
        onBlur={() => this.newTagOnBlur(key)}
      />
    ) : (
      <Tag
        key={`${key}-plus`}
        //@ts-ignore Antd 未定义事件 props TODO
        onClick={() => this.showTagInput(key)}
        className={styles.plus}
      >
        <Icon type="plus" />
      </Tag>
    );
  }
}
