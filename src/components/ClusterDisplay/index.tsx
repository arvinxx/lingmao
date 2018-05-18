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
}
export default class ClusterDisplay extends Component<IClusterDisplayProps> {
  static defaultProps: IClusterDisplayProps = {
    clusterResult: {
      dims: [],
      percent: 0,
      title: '',
    },
    index: 0,
  };

  render() {
    const { clusterResult, index } = this.props;
    const { dims, percent, title } = clusterResult;
    const color = colorPalette[index];
    console.log(color);
    return (
      <div className={styles.container}>
        <div className={styles.pie}>
          <Pie
            percent={percent}
            subTitle={title}
            color={color}
            total={percent.toString() + '%'}
            height={160}
          />
        </div>
        <div className={styles.description}>
          <DescriptionList size="large" title={''} col={2} layout="vertical">
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
