import React, { Component } from 'react';
import { ClusterDisplay } from './components';
import styles from './cluster.less';
import { connect } from 'dva';
import { TClusterResults, TUserModels } from '@/models/data';
import { DispatchProp } from 'react-redux';

interface IClusterProps {
  userModels: TUserModels;
  displayText: boolean;
}
interface IClusterDefaultProps {
  clusterResults: TClusterResults;
}
@connect(({ data }) => ({
  clusterResults: data.clusterResults,
  displayText: data.displayText,
  userModels: data.userModels,
}))
export default class Cluster extends Component<
  IClusterProps & IClusterDefaultProps & DispatchProp
> {
  static defaultProps: IClusterDefaultProps = {
    clusterResults: [],
  };
  render() {
    const { clusterResults, displayText, dispatch, userModels } = this.props;

    return clusterResults.length > 0 ? (
      <div className={styles.container}>
        {clusterResults.map((clusterResult, index) => (
          <ClusterDisplay
            key={index + 'DISPLAY'}
            index={index}
            clusterResult={clusterResult}
            personaQuesDatum={userModels.length > 0 ? userModels[index] : null}
            displayText={displayText}
            dispatch={dispatch}
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
