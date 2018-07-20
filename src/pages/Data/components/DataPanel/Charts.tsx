import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import router from 'umi/router';
import { getBaseUrl } from '@/utils';
import styles from './Charts.less';
import { DispatchProp } from 'react-redux';

interface IValidationProps {
  analysisStage: number;
  tabStage: string;
  pathname: string;
}
export default class Charts extends Component<IValidationProps & DispatchProp> {
  static defaultProps: IValidationProps = {
    analysisStage: 0,
    pathname: '',
    tabStage: '1',
  };

  showCharts = () => {
    this.props.dispatch({ type: 'stage/showCharts', payload: true });
  };
  finish = () => {
    // 解锁下一条面板
    if (this.props.analysisStage === 3) {
      // 解锁降维与聚类面板
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });
      this.props.dispatch({ type: 'stage/addAnalysisStageCount' });

      // 展开降维与聚类面板
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '4' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '5' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '6' });
      this.props.dispatch({ type: 'stage/addActivePanelList', payload: '7' });
      this.props.dispatch({ type: 'stage/removeActivePanelList', payload: '3' });
    }
    // 完成Tab切换
    this.props.dispatch({ type: 'stage/changeTabStage', payload: '2' });

    // 完成路由跳转
    router.push(`${getBaseUrl(this.props.pathname)}/reduction`);
  };
  render() {
    return (
      <div className={styles.container}>
        {/*TODO: 添加图标类型控制
        <div className={styles.charts}>*/}
        {/*<Icon type="plus-circle-o" />*/}
        {/*</div>*/}
        <div>
          <Button type="primary" onClick={this.showCharts} style={{ marginRight: 16 }}>
            生成图表
          </Button>
          <Button type="primary" ghost onClick={this.finish}>
            跳转
          </Button>
        </div>
        <div className={styles.notice}>
          <Icon type="exclamation-circle-o" style={{ marginRight: 8 }} />
          <div>点击跳转进入下一环节</div>
        </div>
      </div>
    );
  }
}
