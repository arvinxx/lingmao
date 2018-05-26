import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import React, { Component } from 'react';
interface IPlotsProps {
  data: object[];
}
const cols = {
  value: {
    min: 0,
  },
  n: {
    alias: '成分',
    range: [0, 1],
  },
};
export default class Plots extends Component<IPlotsProps> {
  static defaultProps: IPlotsProps = {
    data: [],
  };

  render() {
    const { data } = this.props;

    return (
      <Chart height={400} data={data} scale={cols}>
        <Axis name="n" />
        <Axis
          name="value"
          label={{
            formatter: (val) => {
              return Number(val).toFixed(1);
            },
          }}
        />
        <Tooltip crosshairs={{ type: 'line' }} />
        <Geom type="area" position="n*value" />
        <Geom type="line" position="n*value" size={2} />
      </Chart>
    );
  }
}
