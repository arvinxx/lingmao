import React, { Component } from 'react';

import { Tag, Input, Icon, Popconfirm, message } from 'antd';
import { findIndex } from 'lodash';

import styles from './styles.less';

const CheckableTag = Tag.CheckableTag;

interface ILabelSelectProps {
  dimensions: Array<{
    id: string;
    key: string;
    values: [string];
    inputVisible: boolean;
    valueEditable: boolean;
  }>;
  selectedLabels: Array<string>;
  dispatch: any;
}
interface ILabelSelectStates {
  newKey: string;
  newValue: string;
}

export default class Index extends Component<ILabelSelectProps, ILabelSelectStates> {
  state = {
    newKey: '',
    newValue: '',
  };

  oldKeyChange = (e, id) => {
    this.props.dispatch({
      type: 'interview/changeDimensionKey',
      payload: { id, newKey: e.target.value },
    });
  };
  oldKeyDelete = (id) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionKey',
      payload: id,
    });
  };

  oldValueDelete = (id, value) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionValue',
      payload: { id, value },
    });
  };

  newKeyOnInput = (e) => {
    this.setState({ newKey: e.target.value });
  };
  newKeyOnBlur = (e) => {
    this.props.dispatch({
      type: 'interview/addDimensionKey',
      payload: this.state.newKey,
    });
    this.state.newKey = '';
  };

  handleValuesClick = (e) => {
  };

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
    this.setState({
      newValue: '',
    });
  };
  newValueOnConfirm = (id) => {
    const { newValue } = this.state;
    this.props.dispatch({
      type: 'interview/addDimensionValue',
      payload: { id, newValue },
    });
    this.setState({
      newValue: '',
    });
  };

  showValueInput = (id) => {
    this.props.dispatch({
      type: 'interview/showValueInput',
      payload: id,
    });
  };
  hideValueInput = (id) => {
    this.props.dispatch({
      type: 'interview/hideValueInput',
      payload: id,
    });
  };
  showValueEdit = (id) => {
    this.props.dispatch({
      type: 'interview/showValueEdit',
      payload: id,
    });
  };
  hideValueEdit = (id) => {
    this.props.dispatch({
      type: 'interview/hideValueEdit',
      payload: id,
    });
  };
  ValueLabelComponent = (id, valueEditable, text) => {
    const { selectedLabels } = this.props;
    if (valueEditable) {
      return <div>111</div>;
    } else {
      return (
        <CheckableTag
          key={id}
          checked={selectedLabels.indexOf(id) > -1}
          // onClick={this.handleValuesClick}
          onChange={(checked) => this.handleSelected(id, checked)}
        >
          {text}
        </CheckableTag>
      );
    }
  };

  ValueInputComponent = (id, inputVisible, inputValue) => {
    if (inputVisible)
      return (
        <Input
          key={`${id}-add`}
          type="text"
          size="small"
          className={styles.input}
          value={inputValue}
          onChange={this.newValueOnInput}
          onPressEnter={(e) => this.newValueOnConfirm(id)}
          onBlur={() => this.newValueOnBlur(id)}
        />
      );
    else {
      return (
        <Tag key={`${id}-addk`} onClick={() => this.showValueInput(id)} className={styles.plus}>
          <Icon key={`${id}-icon`} type="plus" />
        </Tag>
      );
    }
  };
  keyComponent = (id, key) => {
    return (
      <div>
        <Popconfirm
          title="确认要删除吗?"
          onConfirm={() => this.oldKeyDelete(id)}
          okText="是"
          cancelText="否"
        >
          <Icon type="close" className={styles.delete} />
        </Popconfirm>
        <Input
          key={'keyof' + id}
          className={styles['exist-key']}
          value={key}
          placeholder={key}
          onChange={(e) => {
            this.oldKeyChange(e, id);
          }}
        />
      </div>
    );
  };

  handleSelected(id: string, checked: boolean) {
    const { selectedLabels } = this.props;
    const nextSelectedLabels = checked
      ? [...selectedLabels, id]
      : selectedLabels.filter((t) => t !== id);

    this.props.dispatch({
      type: 'interview/selectLabels',
      payload: nextSelectedLabels,
    });
  }

  render() {
    const { newValue } = this.state;
    const { dimensions } = this.props;
    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          const { key, values, id, inputVisible, valueEditable } = dimension;
          return (
            <div key={id} className={styles['dimension-container']}>
              <div className={styles['key-container']}>{this.keyComponent(id, key)}</div>
              <div className={styles['tag-container']}>
                {values.map((value: any) => {
                  const { text, id } = value;
                  return this.ValueLabelComponent(id, valueEditable, text);
                })}
                {this.ValueInputComponent(id, inputVisible, newValue)}
              </div>
            </div>
          );
        })}
        <div className={styles['dimension-container']}>
          <Input
            className={styles['add-key']}
            value={this.state.newKey}
            placeholder="添加条目"
            onChange={this.newKeyOnInput}
            onBlur={this.newKeyOnBlur}
            onPressEnter={this.newKeyOnBlur}
          />
        </div>
      </div>
    );
  }
}
