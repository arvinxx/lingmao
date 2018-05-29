import React, { Component } from 'react';
import { Button, Progress, Icon, Tooltip } from 'antd';
import { DispatchProp } from 'react-redux';
import DimsSelect from './DimsSelect';
import styles from './RecuceDims.less';
import { TDim, TQuesData, TSelectedDims } from '../../../../models/data';
import { getFilterQuesData, getNumberDataFromQuesData } from '../../../../utils';
import { getKMO } from '../../../../services/ml';

export interface IReduceDimsProps {
  dims: Array<TDim>;
  percent: number;
  sig: number;
  quesData: TQuesData;

  selectedDims: TSelectedDims;
}
export default class ReduceDims extends Component<IReduceDimsProps & DispatchProp> {
  static defaultProps: IReduceDimsProps = {
    dims: [],
    percent: 0,
    sig: 0,
    selectedDims: [],
    quesData: [],
  };
  selectDims = (checked, id) => {
    if (checked) {
      this.props.dispatch({ type: 'data/addReductionSelectedDims', payload: id });
    } else {
      this.props.dispatch({ type: 'data/removeReductionSelectedDims', payload: id });
    }
  };

  resetSelection = () => {
    this.props.dispatch({ type: 'data/handleReductionSelectedDims', payload: [] });
  };
  confirmSelection = async () => {
    const { quesData, selectedDims, dispatch } = this.props;
    const filterData = getFilterQuesData(quesData, selectedDims);
    const data = getNumberDataFromQuesData(filterData);
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
    const { percent, dims, selectedDims, sig } = this.props;
    const percentValue = Math.floor(percent * 100);

    const status = this.getStatus(percentValue);

    return (
      <div className={styles.container}>
        <p>点击选择参与降维的维度</p>
        <DimsSelect selectedDims={selectedDims} dims={dims} handleSelect={this.selectDims} />
        <div>
          <Button
            disabled={selectedDims.length === 0}
            onClick={this.resetSelection}
            style={{ marginRight: 16 }}
          >
            重置
          </Button>
          <Button
            id="check"
            type="primary"
            ghost
            disabled={selectedDims.length <= 1}
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
