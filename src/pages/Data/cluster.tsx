import React, { Component } from 'react';
import { ClusterDisplay } from '../../components';
import styles from './cluster.less';
import { connect } from 'dva';
import { TClusterResults } from '../../models/data';

interface IClusterProps {
  clusterResults: TClusterResults;
}
@connect(({ data }) => ({ clusterResults: data.clusterResults }))
export default class Cluster extends Component<IClusterProps> {
  static defaultProps: IClusterProps = {
    clusterResults: [],
  };
  render() {
    const { clusterResults } = this.props;
    return clusterResults.length > 0 ? (
      <div className={styles.container}>
        {clusterResults.map((clusterResult, index) => (
          <ClusterDisplay key={index + 'DISPLAY'} index={index} clusterResult={clusterResult} />
        ))}
      </div>
    ) : (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        没有数据 请准备聚类
      </div>
    );
  }
}
