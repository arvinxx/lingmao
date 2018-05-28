import kmeans from 'ml-kmeans';
import request from '../utils/request';

import { TClusterDim, TQuesData } from '../models/data';
import FA from '../../mock/FA';

/**
 * 聚类函数
 */
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

/**
 * 获取某一类的维度平均值
 * @param clusterArray 聚类数组
 * @param quesData 问卷数据
 * @param cluster 要获取的类编号
 */
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

export const getKMO = async (data: number[][]): Promise<{ kmo: number; sig: number }> => {
  let { kmo, sig } = await request('/ml/kmo', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: { data },
  });
  kmo = kmo === undefined ? 0 : kmo;
  sig = sig === undefined ? 0 : sig;
  return { kmo, sig };
};

export const getPCA = async (data: number[][], extractMethod) => {
  console.log('PCA', extractMethod);
  // TODO 不同抽取方法
  return await request('/ml/pca', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: data,
  });
};

export const getFA = async (data: number[][], extractMethod) => {
  console.log('FA', extractMethod);
  // TODO 不同抽取方法
  const res = await request('/ml/fa', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: data,
  });
  console.log(res);
  return FA;
};
