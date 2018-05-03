import React, { Component } from 'react';

import { Tag, Input, Icon, Popconfirm, message } from 'antd';

import styles from './styles.less';

const CheckableTag = Tag.CheckableTag;

interface ILabelSelectProps {
  dimensions: Array<object>;
  selectedLabels: Array<string>;
  dispatch: any;
}

export default class Index extends Component<ILabelSelectProps, any> {
  state = {
    inputVisible: true,
    inputValue: '',
    newKey: '',
    oldTempKey: '',
    ChangeKey: false,
  };
  input: object[] = [];
  selectedInput = {};

  componentDidMount() {
    this.setState({
      inputVisible: false,
    });
  }

  handleSelected(label: string, checked: boolean) {
    const { selectedLabels } = this.props;
    const nextSelectedLabels = checked
      ? [...selectedLabels, label]
      : selectedLabels.filter((t) => t !== label);

    this.props.dispatch({
      type: 'interview/selectLabels',
      payload: nextSelectedLabels,
    });
  }

  saveInputRef = (input, dimension) => {
    const inputObj = { dimension, input };
    const inputArr = this.input;
    if (inputArr.length === 0) {
      this.input = [...inputArr, inputObj];
    } else {
      this.input = inputArr.some((item: object) => item.dimension === dimension)
        ? inputArr
        : [...inputArr, inputObj];
    }
  };

  showInput = (dimension) => {
    console.log(dimension);
    const getInput = this.input.filter((item: object) => item.dimension === dimension);
    console.log(getInput);
    this.selectedInput = getInput.length > 0 ? getInput[0].input : {};
    console.log(this.selectedInput);
    this.setState(
      { inputVisible: true }
      // , () => {
      //   if (this.selectedInput !== {}) this.selectedInput.focus();
      // }
    );
  };

  OldKeyChange = (e) => {
    // 只能填入一次信息
    this.setState({ ChangeKey: true });
    this.setState({ oldTempKey: e.target.value });
  };
  OldKeyBlur = (oldKey) => {
    // 只能填入一次信息
    this.props.dispatch({
      type: 'interview/changeDimensionKey',
      payload: { oldKey, newKey: this.state.oldTempKey },
    });
    this.setState({ ChangeKey: false });
  };

  OldKeyDelete = (oldKey) => {
    this.props.dispatch({
      type: 'interview/deleteDimensionKey',
      payload: oldKey,
    });
  };

  NewKeyOnInput = (e) => {
    this.setState({ newKey: e.target.value });
  };
  NewKeyOnBlur = (e) => {
    console.log(e);
    this.props.dispatch({
      type: 'interview/addDimensionKey',
      payload: this.state.newKey,
    });
    this.state.newKey = '';
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { dimensions } = this.props;
    if (inputValue && dimensions.indexOf(inputValue) === -1) {
      dimensions = [...dimensions, { inputValue }];
    }
    this.props.dispatch({
      type: 'interview/addLabels',
      payload: dimensions,
    });
    this.setState({
      inputVisible: false,
    });
  };

  AddLabels = (dimension, inputVisible, inputValue) => {
    if (inputVisible)
      return (
        <Input
          ref={(input) => this.saveInputRef(input, dimension)}
          key={`${dimension}-add`}
          type="text"
          size="small"
          className={styles.input}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      );
    else {
      return (
        <Tag
          key={`${dimension}-addk`}
          onClick={(e) => this.showInput(dimension)}
          className={styles.plus}
        >
          <Icon key={`${dimension}-icon`} type="plus" />
        </Tag>
      );
    }
  };

  confirmMessage = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };

  cancelMessage = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  render() {
    const { inputVisible, inputValue } = this.state;

    const { dimensions, selectedLabels } = this.props;
    const getDimension = (key, values, _id) => {
      return (
        <div key={_id} className={styles['dimension-container']}>
          <div className={styles['key-container']}>
            <div>
              <Popconfirm
                title="确认要删除吗?"
                onConfirm={() => this.OldKeyDelete(key)}
                okText="是"
                cancelText="否"
              >
                <Icon type="close" className={styles.delete} />
              </Popconfirm>
              <Input
                key={'keyof' + key}
                className={styles['exist-key']}
                value={this.state.ChangeKey === true ? this.state.oldTempKey : key}
                placeholder={key}
                onChange={this.OldKeyChange}
                onBlur={() => this.OldKeyBlur(key)}
              />
            </div>
          </div>
          <div className={styles['tag-container']}>
            {values.map((value) => {
              return (
                <CheckableTag
                  key={`${value}-tags`}
                  checked={selectedLabels.indexOf(value) > -1}
                  onChange={(checked) => this.handleSelected(value, checked)}
                >
                  {value}
                </CheckableTag>
              );
            })}
            {this.AddLabels(key, inputVisible, inputValue)}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          console.log(dimension);
          const { key, values, _id } = dimension;

          return getDimension(key, values, _id);
        })}
        <div className={styles['dimension-container']}>
          <Input
            className={styles['add-key']}
            value={this.state.newKey}
            placeholder="添加条目"
            onChange={this.NewKeyOnInput}
            onBlur={this.NewKeyOnBlur}
          />
          <div className={styles['tag-container']}>
            {this.AddLabels('new', inputVisible, inputValue)}
          </div>
        </div>
      </div>
    );
  }
}
