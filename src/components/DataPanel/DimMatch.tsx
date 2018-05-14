import React, { Component } from 'react';
import { Button, Tag } from 'antd';
const { CheckableTag } = Tag;

import { TDim } from '../../models/data';
import { baseUrl } from '../../utils';
import router from 'umi/router';

interface IDimMatchProps {
  dispatch: Function;
  analysisStage: number;
  dims: Array<TDim>;
  pathname: string;
}
export default class DimMatch extends Component<IDimMatchProps> {
  static defaultProps: IDimMatchProps = {
    analysisStage: 0,
    dispatch: () => {},
    dims: [],
    pathname: '',
  };

  handleChange = (checked) => {
    this.setState({ checked });
  };

  finish = () => {
    if (this.props.analysisStage === 2) {
      this.props.dispatch({ type: 'data/addAnalysisStageCount' });
      this.props.dispatch({ type: 'data/addActivePanelList', payload: '3' });
      this.props.dispatch({ type: 'data/removeActivePanelList', payload: '2' });
    }
    router.push(`${baseUrl(this.props.pathname)}/validation`);
  };
  render() {
    const { dims } = this.props;

    return (
      <div>
        <p>点击维度，匹配维度</p>
        <div style={{ padding: '26px 16px 16px' }}>
          {dims.map((dim: TDim) => {
            const { id, selected, text } = dim;
            return (
              <CheckableTag key={id} checked={selected} onChange={this.handleChange}>
                {text}
              </CheckableTag>
            );
          })}
        </div>
        <div />
        <div style={{ padding: '26px 16px 16px' }}>
          <Button>重置</Button>
          <Button type="primary" ghost onClick={this.finish}>
            确认
          </Button>
        </div>
      </div>
    );
  }
}
