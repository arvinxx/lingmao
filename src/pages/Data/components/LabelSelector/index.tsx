import React, { Component } from 'react';
import { ILabel } from '@/models/tag';
import { Tag } from 'antd';
import styles from './index.less';
const { CheckableTag } = Tag;

interface ILabelSelectorProps {
  labels: ILabel[];
  selectedLabels: string[];
  handleSelect: Function;
}
export default class LabelSelector extends Component<ILabelSelectorProps> {
  static defaultProps: ILabelSelectorProps = {
    labels: [],
    selectedLabels: [],
    handleSelect: () => {},
  };

  render() {
    const { labels, selectedLabels, handleSelect } = this.props;
    return (
      <div className={styles['tag-container']}>
        {labels.map((label: ILabel) => {
          const { key, text } = label;
          return (
            <CheckableTag
              key={key}
              checked={selectedLabels.indexOf(key) > -1}
              onChange={(e) => handleSelect(e, key)}
            >
              {text}
            </CheckableTag>
          );
        })}
      </div>
    );
  }
}
