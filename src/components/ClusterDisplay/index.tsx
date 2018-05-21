import React, { Component } from 'react';
import DescriptionList from '../DescriptionList';
import { MiniProgress, Pie } from '../Charts';

import styles from './index.less';
import colorPalette from './color';
const { Description } = DescriptionList;

interface IClusterDisplayProps {
  clusterResult: {
    dims: Array<{ text: string; value: number }>;
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
            total={percent.toFixed(1).toString() + '%'}
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
              <Description key={index} term={item.text}>
                <div style={{ display: 'flex' }}>
                  <MiniProgress
                    percent={item.value * 20}
                    strokeWidth={colMode ? 8 : 12}
                    target={100}
                  />
                  <span style={{ marginLeft: 8 }}>{item.value.toFixed(1)}</span>
                </div>
              </Description>
            ))}
          </DescriptionList>
        </div>
      </div>
    );
  }
}
