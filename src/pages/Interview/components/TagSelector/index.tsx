import React, { Component } from 'react';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';

import Label from './Label';
import EditableTags from './EditableTags';
import NewTag from './NewTag';

import styles from './index.less';

import { ILabel, ITag } from '@/models/label';

export interface ITagSelectorProps {
  labels: ILabel[];
  selectedTags: string[];
}
interface ITagSelectorStates {
  newLabel: string;
  newLabelPlaceHolder: string;
}

export default class TagSelector extends Component<
  ITagSelectorProps & DispatchProp,
  ITagSelectorStates
> {
  static defaultProps: ITagSelectorProps = {
    labels: [],
    selectedTags: [],
  };
  state = { newLabel: '', newLabelPlaceHolder: '添加条目' };

  newLabelOnInput = (e) => {
    this.setState({ newLabel: e.target.value });
  };
  newLabelOnFocus = () => {
    this.setState({ newLabelPlaceHolder: '' });
  };
  newLabelOnBlur = () => {
    const text = this.state.newLabel;
    if (text !== '') {
      this.props.dispatch({
        type: 'label/addLabel',
        payload: text,
      });
    }
    this.setState({ newLabelPlaceHolder: '添加条目', newLabel: '' });
  };
  newLabelOnPressEnter = () => {
    const text = this.state.newLabel;
    if (text !== '') {
      this.props.dispatch({
        type: 'label/addLabel',
        payload: text,
      });
    }
    this.setState({ newLabelPlaceHolder: '', newLabel: '' });
  };

  render() {
    const { labels, dispatch, selectedTags } = this.props;
    return (
      <div className={styles.container}>
        {labels.map((label) => {
          const { key, text, tags, inputVisible } = label;
          return (
            <div key={key + 'd-container'} className={styles['dimension-container']}>
              <Label labelKey={key} dispatch={dispatch} value={text} />
              <div className={styles['tag-container']}>
                {tags.map((tag: ITag) => {
                  const { text, key: tagKey, editable } = tag;
                  return (
                    <EditableTags
                      key={tagKey}
                      tagKey={tagKey}
                      labelKey={key}
                      dispatch={dispatch}
                      editable={editable}
                      selected={selectedTags}
                      text={text}
                    />
                  );
                })}
                <NewTag labelKey={key} inputVisible={inputVisible} dispatch={dispatch} />
              </div>
            </div>
          );
        })}
        <div className={styles['dimension-container']}>
          <Input
            className={styles['add-key']}
            value={this.state.newLabel}
            placeholder={this.state.newLabelPlaceHolder}
            onChange={this.newLabelOnInput}
            onFocus={this.newLabelOnFocus}
            onBlur={this.newLabelOnBlur}
            onPressEnter={this.newLabelOnPressEnter}
          />
        </div>
      </div>
    );
  }
}
