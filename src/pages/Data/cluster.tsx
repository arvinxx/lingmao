import React, { Component } from 'react';
import { ClusterDisplay } from '../../components';
import styles from './cluster.less';
import { connect } from 'dva';
import { TClusterResults } from '../../models/data';

interface IClusterProps {
  clusterResults: TClusterResults;
  displayText: boolean;
}
@connect(({ data }) => ({ clusterResults: data.clusterResults, displayText: data.displayText }))
export default class Cluster extends Component<IClusterProps> {
  static defaultProps: IClusterProps = {
    clusterResults: [],
    displayText: false,
  };
  render() {
    const { clusterResults, displayText } = this.props;
    return clusterResults.length > 0 ? (
      <div className={styles.container}>
        {clusterResults.map((clusterResult, index) => (
          <ClusterDisplay
            key={index + 'DISPLAY'}
            index={index}
            clusterResult={clusterResult}
            displayText={displayText}
          />
        ))}
      </div>
    ) : (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        没有数据 请准备聚类
      </div>
    );
  }
}
