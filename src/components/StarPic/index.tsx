import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

interface IStarPicProps {
  data: Array<object>;
  links: Array<object>;
  categories: Array<object>;
}
export default class StarPic extends Component<IStarPicProps> {
  static defaultProps: IStarPicProps = {
    data: [],
    links: [],
    categories: [],
  };
  getOption = () => {
    const { data, categories, links } = this.props;
    return {
      title: { text: '项目名称' || '星球图', show: false },
      series: [
        {
          type: 'graph',
          layout: 'force',
          label: { show: true },
          draggable: true,
          symbolSize: 100,
          roam: true,
          force: { edgeLength: 200, repulsion: 300, gravity: 0 },
          data: data.map(function(data, idx) {
            data.id = idx;
            return data;
          }),
          categories,
          links,
        },
      ],
      toolbox: { show: true, feature: { saveAsImage: { show: true } }, top: 10, right: 15 },
    };
  };
  render() {
    return (
      <div className="parent">
        <ReactEcharts
          option={this.getOption()}
          style={{ height: '800px', width: '100%' }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}
