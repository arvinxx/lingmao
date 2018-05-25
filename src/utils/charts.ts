import { getCountAndPercent } from './index';
import { DataView } from '@antv/data-set';
import { TQuesData, TSelectedQue } from '../models/data';

export const getChartsDataSetsByIndex = (
  dimData: TQuesData,
  index: number,
  selectedQue: TSelectedQue
) => {
  const answersOrders = dimData.map((dim) => {
    if (dim.length > 0) {
      return dim[index].answer.order;
    } else return [];
  });
  const percent = getCountAndPercent(answersOrders);
  return percent.map((result, rIndex) => {
    return {
      count: result.count,
      item: selectedQue.answers[rIndex].name,
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
