import React, { Component } from 'react';

import { Tag, Input, Icon, Popconfirm, message } from 'antd';
import { findIndex } from 'lodash';

import styles from './styles.less';

const CheckableTag = Tag.CheckableTag;

interface ILabelSelectProps {
  dimensions: Array<{
    _id: string;
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

export default class Index extends Component<ILabelSelectProps, any> {
  state = {
    newKey: '',
    newValue: '',
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

  newValueOnInput = (e) => {
    this.setState({ newValue: e.target.value });
  };
  handleValuesClick = (e) => {};
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
    const { dimensions, selectedLabels } = this.props;

    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          const { key, values, _id, inputVisible, valueEditable } = dimension;
          return (
            <div key={_id} className={styles['dimension-container']}>
              <div className={styles['key-container']}>
                <div>
                  <Popconfirm
                    title="确认要删除吗?"
                    onConfirm={() => this.oldKeyDelete(_id)}
                    okText="是"
                    cancelText="否"
                  >
                    <Icon type="close" className={styles.delete} />
                  </Popconfirm>
                  <Input
                    key={'keyof' + _id}
                    className={styles['exist-key']}
                    value={key}
                    placeholder={key}
                    onChange={(e) => {
                      this.oldKeyChange(e, _id);
                    }}
                  />
                </div>
              </div>
              <div className={styles['tag-container']}>
                {values.map((value: any) => {
                  const { text, _id } = value;
                  if (valueEditable) {
                  } else {
                    return (
                      <CheckableTag
                        key={_id}
                        checked={selectedLabels.indexOf(_id) > -1} // onClick={this.handleValuesClick}
                        onChange={(checked) => this.handleSelected(_id, checked)}
                      >
                        {text}
                      </CheckableTag>
                    );
                  }
                })}
                {this.ValueInputComponent(_id, inputVisible, newValue)}
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
