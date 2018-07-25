import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts';

import styles from './charts.less';
import {
  getFilterLabels,
  getFilterQuesData,
  getChartsDataSets,
  initDataSets,
  getMatchLabelKeys,
} from '@/utils';
import { connect } from 'dva';

import { IDataState } from '@/models/data';
import { ILabel } from '@/models/tag';
import { DispatchProp } from 'react-redux';

interface IChartsProps {
  data: IDataState;
  labels: ILabel[];
  showCharts: boolean;
}

@connect(({ data, tag, stage }) => ({
  data,
  labels: tag.labels,
  showCharts: stage.showCharts,
}))
export default class Charts extends Component<IChartsProps & DispatchProp> {
  render() {
    const { data, labels, showCharts } = this.props;
    const { quesData, keyDimensions } = data;
    const matchedLabelKeys = getMatchLabelKeys(labels);
    const matchLabels = getFilterLabels(labels, false);
    const filteredQuesData = getFilterQuesData(quesData, matchedLabelKeys);

    return !showCharts ||
      matchedLabelKeys.length === 0 ||
      filteredQuesData.every((quesDataItem) => quesDataItem.length === 0) ? (
      <div> no data</div>
    ) : (
      <div className={styles.container}>
        {matchLabels.map((label) => {
          const keyDimension = keyDimensions.find(
            (keyDimension) => keyDimension.labelKey === label.key
          );
          console.log(keyDimension);
          if (keyDimension !== undefined) {
            const data = getChartsDataSets(filteredQuesData, label.key, keyDimension);
            const { cols, dv } = initDataSets(data);
            return (
              <div key={label.key}>
                <div style={{ textAlign: 'center' }}> {label.text}</div>
                <Chart height={400} data={dv} scale={cols} padding={[80, 100, 80, 80]} forceFit>
                  <Coord type="theta" radius={0.75} />
                  <Axis name="percent" />
                  <Legend position="right" offsetY={-100} offsetX={-50} />
                  <Tooltip
                    showTitle={false}
                    itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name} ： {value}</li>"
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color="item"
                    tooltip={[
                      'item*percent',
                      (item, percent) => ({
                        name: item,
                        value: Math.floor(percent * 100) + '%',
                      }),
                    ]}
                    style={{ lineWidth: 1, stroke: '#fff' }}
                  >
                    <Label
                      content="percent"
                      formatter={(val, item) => {
                        return item.point.item + ': ' + val;
                      }}
                    />
                  </Geom>
                </Chart>
              </div>
            );
          } else return <div>no data</div>;
        })}
      </div>
    );
  }
}
