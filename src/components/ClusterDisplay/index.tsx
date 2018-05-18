import React, { Component } from 'react';
import DescriptionList from '../DescriptionList';
import { Pie } from '../Charts';
import styles from './index.less';
import colorPalette from './color';

const { Description } = DescriptionList;

interface IClusterDisplayProps {
  clusterResult: {
    dims: Array<{ term; descr }>;
    percent: number;
    title: string;
  };
  index: number;
  colMode?: boolean;
}
export default class ClusterDisplay extends Component<IClusterDisplayProps> {
  static defaultProps: IClusterDisplayProps = {
    clusterResult: {
      dims: [],
      percent: 0,
      title: '',
    },
    colMode: false,
    index: 0,
  };

  render() {
    const { clusterResult, index, colMode } = this.props;
    const { dims, percent, title } = clusterResult;
    const color = colorPalette[index];
    return (
      <div className={colMode ? styles['col-container'] : styles['row-container']}>
        <div className={colMode ? styles['col-pie'] : styles.pie}>
          <Pie
            percent={percent}
            subTitle={title}
            color={color}
            total={percent.toString() + '%'}
            height={160}
          />
        </div>
        <div className={colMode ? '' : styles.description}>
          <DescriptionList
            size="large"
            title={''}
            col={colMode ? 1 : 2}
            layout={colMode ? 'vertical' : 'horizontal'}
          >
            {dims.map((item, index) => (
              <Description key={index} term={item.term}>
                {item.descr}
              </Description>
            ))}
          </DescriptionList>
        </div>
      </div>
    );
  }
}
