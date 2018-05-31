import React, { Component } from 'react';
import DescriptionList from '../DescriptionList';
import { MiniProgress, Pie } from '../Charts';

import styles from './index.less';
import colorPalette from './color';
import { TClusterResult, TPersonaQuesData, TPersonaQuesDatum } from '../../models/data';
import { DispatchProp } from 'react-redux';
const { Description } = DescriptionList;

interface IClusterDisplayProps {
  displayText: boolean;
  clusterResult: TClusterResult;
  index: number;
  colMode?: boolean;
  personaQuesDatum?: TPersonaQuesDatum;
}
export default class ClusterDisplay extends Component<IClusterDisplayProps & DispatchProp> {
  static defaultProps: IClusterDisplayProps = {
    clusterResult: {
      dims: [],
      percent: 0,
      title: '',
    },
    colMode: false,
    index: 0,
    displayText: false,
  };

  render() {
    const { clusterResult, index, colMode, displayText } = this.props;
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
              <Description key={index} term={item.tagText}>
                {displayText ? (
                  <div>{item.text}</div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <MiniProgress
                      percent={item.value * 20}
                      strokeWidth={colMode ? 8 : 12}
                      target={100}
                    />
                    <span style={{ marginLeft: 8 }}>{item.value.toFixed(1)}</span>
                  </div>
                )}
              </Description>
            ))}
          </DescriptionList>
        </div>
      </div>
    );
  }
}
