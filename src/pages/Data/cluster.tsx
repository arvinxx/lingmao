import React, { Component } from 'react';
import { ClusterDisplay } from '../../components';
import styles from './cluster.less';
import clusterResults from '../../../mock/cluster';

export default class Cluster extends Component {
  render() {
    return (
      <div className={styles.container}>
        {clusterResults.map((clusterResult, index) => (
          <ClusterDisplay key={index + 'DISPLAY'} index={index} clusterResult={clusterResult} />
        ))}
      </div>
    );
  }
}
