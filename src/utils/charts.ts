import { getCountAndPercent } from './index';
import { DataView } from '@antv/data-set';
import { TQuesData, IKeyDimension } from '@/models/data';

/**
 * 从选择的维度获得所需的图表数据
 * @param quesData:问卷数据
 * @param key:label Key
 * @param keyDimension:选择维度
 */
export const getChartsDataSets = (
  quesData: TQuesData,
  key: string,
  keyDimension: IKeyDimension
) => {
  const answersOrders = quesData.map((quesRecord) => {
    if (quesRecord.records.length > 0) {
      const index = quesRecord.records.findIndex((i) => i.labelKey === key);
      return quesRecord.records[index].answer.order;
    } else return [];
  });
  const percent = getCountAndPercent(answersOrders);
  return percent.map((result, index) => {
    return {
      count: result.count,
      item: keyDimension.answers[index].text,
    };
  });
};

export const initDataSets = (data) => {
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent',
  });
  const cols = {
    percent: {
      formatter: (val) => {
        val = Math.floor(val * 100) + '%';
        return val;
      },
    },
  };
  return { dv, cols };
};
