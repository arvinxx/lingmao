import kmeans from 'ml-kmeans';
import { uniq } from 'lodash';
import { clusterArray } from '../../mock/clusterResults';
import { TClusterDim, TQuesData } from '../models/data';

export const cluster = async (params) => {
  const { data, center, K } = params;
  if (data.length <= K) {
    return new Error('聚类中心数大于等于维度值');
  } else {
    if (center !== undefined) {
      return kmeans(data, K, { initialization: center });
    } else return kmeans(data, K);
  }
};

export const getClusterPercent = (clusterArray: number[]) => {
  const length = clusterArray.length;
  const clusterArr = uniq(clusterArray).sort();
  return clusterArr.map((cluster) => {
    let count = 0;
    clusterArray.forEach((number) => {
      if (cluster === number) {
        count++;
      }
    });
    return { count, percent: count / length * 100 };
  });
};

export const getClusterDims = (
  clusterArray: number[],
  quesData: TQuesData,
  cluster: number
): TClusterDim[] => {
  const filterQuesData = quesData.filter((quesData, index) => clusterArray[index] === cluster);

  return filterQuesData[0].map((filterQuesDataItem, index) => ({
    text: filterQuesDataItem.tagText,
    value: (() => {
      let value = 0;
      filterQuesData.forEach((filterQuesDataB) => {
        value += filterQuesDataB[index].answer.order;
      });
      return value / filterQuesData.length;
    })(),
  }));
};
