import React, { Component } from 'react';
import { Input } from 'antd';
import ValueInput from './valueInput';
import DimGroup from './dimGroup';
import DimValue from './dimValue';

import styles from './styles.less';
import { TDimensions, TSelectedValues } from '../../models/recordDims';

interface ILabelSelectProps {
  dimensions: TDimensions;
  selectedValues: TSelectedValues;
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

  newKeyOnInput = (e) => {
    this.setState({ newKey: e.target.value });
  };
  newKeyOnFocus = (e) => {
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
              <div key={id + 'k-container'} className={styles['key-container']}>
                <DimGroup dispatch={dispatch} id={id} value={key} />
              </div>
              <div key={id + 'tag-container'} className={styles['tag-container']}>
                {values.map((value: any) => {
                  const { text, id: vid, editable } = value;
                  return (
                    <DimValue
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
