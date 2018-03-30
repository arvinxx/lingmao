import React, { Component } from 'react';
import { connect } from 'dva';

import { Tag, Input, Icon } from 'antd';
import styles from './styles.less';

const CheckableTag = Tag.CheckableTag;

@connect(({ labels, loading }) => ({
  labels,
  loading: loading.models.labels,
}))
export default class Index extends Component<any, any> {
  state = {
    inputVisible: true,
    inputValue: '',
  };
  input: object[] = [];
  selectedInput = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'labels/fetchLabels',
    });
    this.setState({
      inputVisible: false,
    });
  }

  handleSelected(label: string, checked: boolean) {
    const { selectedLabels } = this.props.labels;
    const nextSelectedLabels = checked
      ? [...selectedLabels, label]
      : selectedLabels.filter((t) => t !== label);
    this.props.dispatch({
      type: 'labels/selectLabels',
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

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { labels } = this.props.labels;
    if (inputValue && labels.indexOf(inputValue) === -1) {
      labels = [...labels, inputValue];
    }
    this.props.dispatch({
      type: 'labels/addLabels',
      payload: labels,
    });
    this.setState({
      inputVisible: false,
    });
  };

  render() {
    const { inputVisible, inputValue } = this.state;

    const { labels, selectedLabels } = this.props.labels;
    const AddLabels = (dimension) => {
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
    const getDimension = (dimension, values) => {
      return (
        <div key={dimension} className={styles['dimension-container']}>
          <div className={styles['key-container']}>
            <div>{dimension}</div>
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
            {AddLabels(dimension)}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.container}>
        {labels.map((label) => {
          return getDimension(label.key, label.values);
        })}
        <div className={styles['dimension-container']}>
          <Input className={styles['add-key']} value="添加条目" onChange={this.handleInputChange} />
          <div className={styles['tag-container']}>{AddLabels('new')}</div>
        </div>
      </div>
    );
  }
}
