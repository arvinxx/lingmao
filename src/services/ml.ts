import kmeans from 'ml-kmeans';
import request from '../utils/request';
import { meanBy } from 'lodash';

import { TClusterDim, TQuesData, TQuesRecord, TSelectedQue } from '../models/data';
import FA from '../../mock/FA';
import { getAnswers, getAnswersByOrder } from '../utils';

/**
 * 聚类函数
 */
export const cluster = async (params) => {
  const { data, center, K } = params;
  if (data.length <= K) {
    return new Error('聚类中心数大于等于数据个数');
  } else {
    if (center !== undefined) {
      return kmeans(data, K, { initialization: center });
    } else return kmeans(data, K);
  }
};

/**
 * 获取某一类的维度平均值与最接近的回答结果
 * @param clusterArray 聚类数组
 * @param quesData 问卷数据
 * @param cluster 要获取的类编号
 * @param selectedQues 选择的问题信息
 */
export const getClusterDims = (
  clusterArray: number[],
  quesData: TQuesData,
  cluster: number,
  selectedQues: TSelectedQue[]
): TClusterDim[] => {
  const filterQuesData = quesData.filter((quesData, index) => clusterArray[index] === cluster);

  return filterQuesData[0].map((item, index) => {
    const mean = meanBy(filterQuesData, (i) => i[index].answer.order); //求得平均数
    const filterSelectedQue = selectedQues.find((s) => s.tagId === item.tagId); //取出那个回答
    return {
      tagText: item.tagText,
      value: mean,
      text: filterSelectedQue.answers[Math.round(mean)].name,
    };
  });
};

export const getPersonaQuesData = (
  quesData: TQuesData,
  clusterArray: number[],
  cIndex: number
): TQuesRecord => {
  return quesData[0].map((item, index) => {
    //求得平均数
    const mean = meanBy(
      quesData.filter((i) => i.some((j) => j.type === clusterArray[cIndex])),
      (i) => i[index].answer.order
    );
    return {
      ...item,
      key: 'persona-' + cIndex + '-' + index,
      type: clusterArray[cIndex],
      answer: {
        text: getAnswersByOrder(quesData, item.question, Math.round(mean)),
        order: mean,
      },
    };
  });
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
  console.log(data);
  return await request('/ml/pca', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: { data },
  });
};

export const getFA = async (data: number[][], extractMethod) => {
  console.log('FA', extractMethod);
  // TODO 不同抽取方法
  const res = await request('/ml/fa', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: { data },
  });
  console.log(res);
  return FA;
};
