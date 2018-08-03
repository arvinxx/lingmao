import React, { Component } from 'react';
import { Input } from 'antd';
import { isEmpty } from 'lodash';

import { DescriptionList, MiniProgress, Pie } from '@/components';

import styles from './index.less';
import colorPalette from './color';
import { TClusterResult, TUserModels, IUserModel } from '@/models/data';
import { DispatchProp } from 'react-redux';
const { Description } = DescriptionList;

interface IClusterDisplayProps {
  displayText: boolean;
  clusterResult: TClusterResult;
  index: number;
  colMode?: boolean;
  personaQuesDatum?: IUserModel;
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

  handleTitleChange = (e, index) => {
    this.props.dispatch({
      type: 'data/changePersonaTypeName',
      payload: { value: e.target.value, index },
    });
  };

  render() {
    const { clusterResult, index, colMode, displayText, personaQuesDatum } = this.props;
    const { dims, percent, title } = clusterResult;
    const color = colorPalette[index];
    return (
      <div className={colMode ? styles['col-container'] : styles['row-container']}>
        <div className={colMode ? styles['col-pie'] : styles.pie}>
          <Pie
            percent={percent}
            subTitle={
              <Input
                className={styles.title}
                value={isEmpty(personaQuesDatum) ? 'no-data' : personaQuesDatum.typeName}
                onChange={(e) => this.handleTitleChange(e, index)}
              />
            }
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
