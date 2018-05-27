import kmeans from 'ml-kmeans';
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
  console.log('KMO!', data);
  //TODO 向服务器发送请求
  return { kmo: Math.random(), sig: Math.random() };
};

export const getPCA = async (data: number[][], extractMethod) => {
  console.log('PCA', extractMethod);
  console.log('TODO 向服务器发送请求');
  //TODO 向服务器发送请求
  return FA;
};

export const getFA = async (data: number[][], extractMethod) => {
  console.log('FA', extractMethod);
  console.log('TODO 向服务器发送请求');
  //TODO 向服务器发送请求
  return FA;
};
