import React, { Component } from 'react';
import { connect } from 'dva';

import { Tag, Input, Icon } from 'antd';
import styles from './styles.less';

const CheckableTag = Tag.CheckableTag;

@connect(({interview, loading}) => ({
  interview,
  loading: loading.models.interview,
}))
export default class EditableTagGroup extends Component<any, any> {
  state = {
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'interview/fetchLabels',
    });
  }

  handleChange(label: string, checked: boolean) {
    const {selectedLabels} = this.props.interview;
    const nextSelectedLabels = checked
      ? [...selectedLabels, label]
      : selectedLabels.filter((t) => t !== label);
    this.props.dispatch({
      type: 'interview/selectLabels',
      payload: nextSelectedLabels,
    });
  }


  saveInputRef = (input) => (this.input = input); // eslint-disable-line

  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value});
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let {labels} = this.props.interview;
    if (inputValue && labels.indexOf(inputValue) === -1) {
      labels = [...labels, inputValue];
    }
    this.props.dispatch({
      type: 'interview/addLabels',
      payload: labels,
    });
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const {inputVisible, inputValue} = this.state;

    const {labels, selectedLabels} = this.props.interview;
    const AddLabels = (dimension) => (
      <div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            key={`${dimension}-add`}
            type="text"
            size="small"
            className={styles.input}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag key={`${dimension}-addk`} onClick={this.showInput} className={styles.plus}>
            <Icon key={`${dimension}-icon`} type="plus" />
          </Tag>
        )}
      </div>
    );
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
                  onChange={(checked) => this.handleChange(value, checked)}
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
