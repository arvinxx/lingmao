import React, { Component } from 'react';
import { Tag, Input, Icon, Popconfirm } from 'antd';

import styles from './styles.less';

const { CheckableTag } = Tag;

type Value = {
  id: string;
  text: string;
};
interface ILabelSelectProps {
  dimensions: Array<{
    id: string;
    key: string;
    values: Array<Value>;
    inputVisible: boolean;
    valueEditable: boolean;
  }>;
  selectedValues: Array<string>;
  dispatch: any;
}
interface ILabelSelectStates {
  newKey: string;
  newValue: string;
  newKeyPlaceHolder: string;
}

export default class TagInput extends Component<ILabelSelectProps, ILabelSelectStates> {
  static defaultProps: ILabelSelectProps = {
    dimensions: [],
    dispatch: () => {},
    selectedValues: [],
  };
  state = { newKey: '', newValue: '', newKeyPlaceHolder: '添加条目' };

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

  newKeyOnInput = (e) => {
    this.setState({ newKey: e.target.value });
  };
  newKeyOnFocus = (e) => {
    this.setState({ newKeyPlaceHolder: '' });
  };
  newKeyOnBlur = () => {
    this.props.dispatch({
      type: 'interview/addDimensionKey',
      payload: this.state.newKey,
    });
    this.setState({ newKeyPlaceHolder: '添加条目', newKey: '' });
  };
  newKeyOnPressEnter = () => {
    this.props.dispatch({
      type: 'interview/addDimensionKey',
      payload: this.state.newKey,
    });
    this.setState({ newKeyPlaceHolder: '', newKey: '' });
  };

  oldValueChange = (e, id, vid) => {
    this.props.dispatch({
      type: 'interview/changeDimensionValue',
      payload: { id, vid, newValue: e.target.value },
    });
  };
  oldValueDelete = (id, vid) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionValue',
      payload: { id, vid },
    });
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
  hideValueInput = (id) => {
    this.props.dispatch({
      type: 'interview/hideValueInput',
      payload: id,
    });
  };

  showValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'interview/showValueEdit',
      payload: { id, vid },
    });
  };
  hideValueEdit = (id, vid) => {
    this.props.dispatch({
      type: 'interview/hideValueEdit',
      payload: { id, vid },
    });
  };

  keyComponent = (id, key) => {
    return (
      <div key={id + 'kcc'}>
        <Popconfirm
          key={id + 'pop'}
          title="确认要删除吗?"
          onConfirm={() => this.oldKeyDelete(id)}
          okText="是"
          cancelText="否"
        >
          <Icon key={id + 'icon'} type="close" className={styles.delete} />
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

  ValueLabelComponent = (id, vid, editable, text) => {
    const { selectedValues } = this.props;
    if (editable) {
      return (
        <Input
          key={`${vid}-edit`}
          type="text"
          size="small"
          className={styles['value-input']}
          value={text}
          onChange={(e) => this.oldValueChange(e, id, vid)}
          onPressEnter={() => this.hideValueEdit(id, vid)}
          onBlur={() => this.hideValueEdit(id, vid)}
        />
      );
    } else {
      return (
        <div key={vid + 'v-cont'} className={styles['value-container']}>
          <CheckableTag
            key={vid + 'checkbleTag'}
            checked={selectedValues.indexOf(vid) > -1}
            //@ts-ignore Antd 未定义事件 props
            onDoubleClick={() => this.showValueEdit(id, vid)}
            onChange={(checked) => this.handleSelected(vid, checked)}
          >
            {text}
          </CheckableTag>
          <Popconfirm
            key={vid + 'ppp'}
            title="确认要删除吗?"
            onConfirm={() => this.oldValueDelete(id, vid)}
            okText="是"
            cancelText="否"
          >
            <Icon key={id + 'close'} type="close" className={styles['value-delete']} />
          </Popconfirm>
        </div>
      );
    }
  };
  ValueInputComponent = (id, inputVisible) => {
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
  };

  handleSelected(id: string, checked: boolean) {
    const { selectedValues } = this.props;
    const nextSelectedValues = checked
      ? [...selectedValues, id]
      : selectedValues.filter((t) => t !== id);

    this.props.dispatch({
      type: 'interview/changeSelectedValues',
      payload: nextSelectedValues,
    });
  }

  render() {
    const { dimensions } = this.props;
    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          const { key, values, id, inputVisible } = dimension;
          return (
            <div key={id + 'd-container'} className={styles['dimension-container']}>
              <div key={id + 'k-container'} className={styles['key-container']}>
                {this.keyComponent(id, key)}
              </div>
              <div key={id + 'tag-container'} className={styles['tag-container']}>
                {values.map((value: any) => {
                  const { text, id: vid, editable } = value;
                  return this.ValueLabelComponent(id, vid, editable, text);
                })}
                {this.ValueInputComponent(id, inputVisible)}
              </div>
            </div>
          );
        })}
        <div className={styles['dimension-container']}>
          <Input
            className={styles['add-key']}
            value={this.state.newKey}
            placeholder={this.state.newKeyPlaceHolder}
            onChange={this.newKeyOnInput}
            onFocus={this.newKeyOnFocus}
            onBlur={this.newKeyOnBlur}
            onPressEnter={this.newKeyOnPressEnter}
          />
        </div>
      </div>
    );
  }
}
