import React, { Component } from 'react';
import { Button, Progress, Icon, Tooltip } from 'antd';
import LabelSelector from '../LabelSelector';

import styles from './RecuceDims.less';

import { getFilterQuesData, getValueFromQuesData } from '@/utils';
import { getKMO } from '@/services';

import { TQuesData } from '@/models/data';
import { ILabel, TKeys } from '@/models/label';
import { DispatchProp } from 'react-redux';

export interface IReduceDimsProps {
  labels: ILabel[];
  percent: number;
  sig: number;
  quesData: TQuesData;
  selectedLabels: TKeys;
}
export default class ReduceDims extends Component<IReduceDimsProps & DispatchProp> {
  static defaultProps: IReduceDimsProps = {
    labels: [],
    percent: 0,
    sig: 0,
    selectedLabels: [],
    quesData: [],
  };
  selectLabels = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'label/addReductionLabels', payload: id });
    } else {
      this.props.dispatch({ type: 'label/removeReductionLabels', payload: id });
    }
  };

  resetSelection = () => {
    this.props.dispatch({ type: 'label/handleReductionLabels', payload: [] });
  };
  confirmSelection = async () => {
    const { quesData, selectedLabels, dispatch } = this.props;
    const filterData = getFilterQuesData(quesData, selectedLabels);
    const data = getValueFromQuesData(filterData);
    try {
      const { kmo, sig } = await getKMO(data);
      dispatch({ type: 'data/handleKMO', payload: kmo });
      dispatch({ type: 'data/handleSig', payload: sig });
    } catch (e) {
      //TODO 错误处理

      console.log(e);
    }
  };

  getStatus = (percent) => {
    if (percent <= 50) {
      return 'exception';
    } else if (percent >= 80) {
      return 'success';
    } else return null;
  };

  render() {
    const { percent, labels, selectedLabels, sig } = this.props;
    const percentValue = Math.floor(percent * 100);

    const status = this.getStatus(percentValue);

    return (
      <div className={styles.container}>
        <p>点击选择参与降维的维度</p>
        <LabelSelector
          selectedLabels={selectedLabels}
          labels={labels}
          handleSelect={this.selectLabels}
        />
        <div>
          <Button
            disabled={selectedLabels.length === 0}
            onClick={this.resetSelection}
            style={{ marginRight: 16 }}
          >
            重置
          </Button>
          <Button
            id="check"
            type="primary"
            ghost
            disabled={selectedLabels.length <= 1}
            onClick={this.confirmSelection}
          >
            检验
          </Button>
        </div>
        {percent ? (
          <div className={styles.down}>
            <div className={styles.text}>
              <div>有效性百分比</div>
              <Tooltip
                title={
                  <div>
                    采用 KMO 检验 <br />大于 80% 适合因子分析<br />50%-80% 勉强合适<br />小于 50%
                    不适合因子分析（旋转方法请选择「不旋转」）
                  </div>
                }
              >
                <Icon type="exclamation-circle-o" className={styles.info} />
              </Tooltip>
            </div>
            <div className={styles.bar}>
              <Progress
                className={percentValue > 50 && percentValue <= 70 ? styles.yellow : null}
                percent={percentValue}
                status={status}
              />
            </div>

            <div>
              可信度： {((1 - sig) * 100).toFixed(1)} %
              <Tooltip
                title={
                  <div>
                    采用 Bartlett 球形检验 <br />可信度大于 95% 视为有效
                  </div>
                }
              >
                <Icon type="exclamation-circle-o" className={styles.info} />
              </Tooltip>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
