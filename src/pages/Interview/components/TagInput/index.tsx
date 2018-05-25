import React, { Component } from 'react';
import { Input } from 'antd';
import { DispatchProp } from 'react-redux';

import ValueInput from './ValueInput';
import DimGroup from './DimGroup';
import DimValue from './DimValue';

import styles from './styles.less';
import { TDimensions, TSelectedValues } from '../../../../models/recordDims';

export interface ITagInputProps {
  dimensions: TDimensions;
  selectedValues: TSelectedValues;
}
interface ITagInputStates {
  newKey: string;
  newKeyPlaceHolder: string;
}

export default class TagInput extends Component<ITagInputProps & DispatchProp, ITagInputStates> {
  static defaultProps: ITagInputProps = {
    dimensions: [],
    selectedValues: [],
  };
  state = { newKey: '', newKeyPlaceHolder: '添加条目' };

  newKeyOnInput = (e) => {
    this.setState({ newKey: e.target.value });
  };
  newKeyOnFocus = () => {
    this.setState({ newKeyPlaceHolder: '' });
  };
  newKeyOnBlur = () => {
    this.props.dispatch({
      type: 'recordDims/addDimensionKey',
      payload: this.state.newKey,
    });
    this.setState({ newKeyPlaceHolder: '添加条目', newKey: '' });
  };
  newKeyOnPressEnter = () => {
    this.props.dispatch({
      type: 'recordDims/addDimensionKey',
      payload: this.state.newKey,
    });
    this.setState({ newKeyPlaceHolder: '', newKey: '' });
  };

  render() {
    const { dimensions, dispatch, selectedValues } = this.props;
    return (
      <div className={styles.container}>
        {dimensions.map((dimension) => {
          const { key, values, id, inputVisible } = dimension;
          return (
            <div key={id + 'd-container'} className={styles['dimension-container']}>
              <DimGroup key={id + 'dimGroup'} dispatch={dispatch} id={id} value={key} />
              <div className={styles['tag-container']}>
                {values.map((value: any) => {
                  const { text, id: vid, editable } = value;
                  return (
                    <DimValue
                      key={vid + 'tag-container'}
                      id={id}
                      vid={vid}
                      dispatch={dispatch}
                      editable={editable}
                      selectedValues={selectedValues}
                      text={text}
                    />
                  );
                })}
                <ValueInput id={id} inputVisible={inputVisible} dispatch={dispatch} />
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
