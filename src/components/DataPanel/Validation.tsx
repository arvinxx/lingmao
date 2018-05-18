import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import router from 'umi/router';
import { getBaseUrl } from '../../utils';

interface IValidationProps {
  dispatch: Function;
  analysisStage: number;
  tabStage: string;
  pathname: string;
}
export default class Validation extends Component<IValidationProps> {
  static defaultProps: IValidationProps = {
    analysisStage: 0,
    dispatch: () => {},
    pathname: '',
    tabStage: '1',
  };

  finish = () => {
    // 解锁下一条面板
    if (this.props.analysisStage === 3) {
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '4' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '3' });

    }
    // 完成Tab切换
    this.props.dispatch({ type: 'stage/changeTabStage', payload: '2' });

    // 完成路由跳转
    router.push(`${getBaseUrl(this.props.pathname)}/reduction`);
  };
  render() {
    return (
      <div>
        <div>
          <Icon type="plus-circle-o" />
          <p>添加检验维度</p>
        </div>
        <div>
          <Button>生成图表</Button>
          <Button type="primary" onClick={this.finish}>
            确认并跳转
          </Button>
        </div>
      </div>
    );
  }
}
