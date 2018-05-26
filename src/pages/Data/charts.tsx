import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord, Label } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { compact } from 'lodash';

import styles from './charts.less';
import { extractTags, getCountAndPercent, getFilterDims, getFilterQuesData } from '../../utils';
import { connect } from 'dva';

import { TDataModel, TDim } from '../../models/data';
import { DispatchProp } from 'react-redux';
import { TTag } from '../../models/tag';
import { getChartsDataSets, initDataSets } from '../../utils/charts';

interface IChartsProps {
  data: TDataModel;
  tags: TTag[];
  showCharts: boolean;
}

@connect(({ data, tag, stage }) => ({
  data,
  tags: extractTags(tag.tagGroups),
  showCharts: stage.showCharts,
}))
export default class Charts extends Component<IChartsProps & DispatchProp> {
  render() {
    const { data, tags: dims, showCharts } = this.props;
    const { matchSelectedDims, quesData, selectedQues } = data;
    const matchDims = getFilterDims(dims, matchSelectedDims, false);
    const dimData = getFilterQuesData(quesData, matchSelectedDims);

    if (showCharts) {
      if (matchSelectedDims.length === 0 || dimData.every((dim) => dim.length === 0)) {
        return <div> no data</div>;
      } else {
        return (
          <div className={styles.container}>
            {matchDims.map((dim, index) => {
              const selectedQue = selectedQues.find((selectedQue) => selectedQue.tagId === dim.id);
              if (selectedQue !== undefined) {
                const data = getChartsDataSets(dimData, index, selectedQue);
                const { cols, dv } = initDataSets(data);
                return (
                  <div key={dim.id}>
                    {dim.text}
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
            })}}
          </div>
        );
      }
    } else return <div>no data</div>;
  }
}
