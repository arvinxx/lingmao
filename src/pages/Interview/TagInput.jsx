import React from 'react';

import { Tag, Input, Icon } from 'antd';
import styles from './TagInput.less';

const CheckableTag = Tag.CheckableTag;

export default class EditableTagGroup extends React.Component {
  state = {
    dimensions: [
      {
        key: '年龄',
        values: ['小于18', '18 - 25', '26 -30'],
      },
      {
        key: '性别',
        values: ['男', '女'],
      },
      {
        key: '用过的产品',
        values: ['空调', '大型取暖器', '小型取暖器', '中型取暖器', '电油汀'],
      },
    ],
    inputVisible: false,
    inputValue: '',
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input); // eslint-disable-line

  render() {
    const { dimensions, inputVisible, inputValue, selectedTags } = this.state;
    const getDimension = (key, values) => {
      return (
        <div className={styles['dimension-container']}>
          <div className={styles['key-container']}>
            <div>{key}</div>
          </div>
          <div className={styles['tag-container']}>
            {values.map((value) => {
              return (
                <CheckableTag
                  key={value}
                  checked={selectedTags.indexOf(value) > -1}
                  onChange={checked => this.handleChange(value, checked)}
                >
                  {value}
                </CheckableTag>
              );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                key={`${key}-add`}
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
              <Tag onClick={this.showInput} className={styles.plus}>
                <Icon type="plus" />
              </Tag>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          return getDimension(dimension.key, dimension.values);
        })}
        <div className={styles['dimension-container']}>
          <div className={styles['add-key']}>添加条目</div>
          <div className={styles['tag-container']}>
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
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
              <Tag onClick={this.showInput} className={styles.plus}>
                <Icon type="plus" />
              </Tag>
            )}
          </div>
        </div>
      </div>
    );
  }
}
