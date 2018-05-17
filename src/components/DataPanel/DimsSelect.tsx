import React, { Component } from 'react';
import { TDim } from '../../models/data';
import { Tag } from 'antd';
import styles from './DimsSelect.less';
const { CheckableTag } = Tag;

interface IDimsSelectProps {
  dims: TDim[];
  selectedDims: string[];
  handleSelect: Function;
}
export default class DimsSelect extends Component<IDimsSelectProps> {
  static defaultProps: IDimsSelectProps = {
    dims: [],
    selectedDims: [],
    handleSelect: () => {},
  };

  render() {
    const { dims, selectedDims, handleSelect } = this.props;
    return (
      <div className={styles['tag-container']}>
        {dims.map((dim: TDim) => {
          const { id, text } = dim;
          return (
            <CheckableTag
              key={id}
              checked={selectedDims.indexOf(id) > -1}
              onChange={(e) => handleSelect(e, id)}
            >
              {text}
            </CheckableTag>
          );
        })}
      </div>
    );
  }
}
