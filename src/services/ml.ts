import kmeans from 'ml-kmeans';
import axios from 'axios';
import { meanBy } from 'lodash';

import { IKeyDimension, IClusterLabel, IUserModel, TQuesData } from '@/models/data';
import { getAnswerByOrder } from '@/utils';
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
 * @param keyDimensions 选择的问题信息
 */
export const getClusterDims = (
  clusterArray: number[],
  quesData: TQuesData,
  cluster: number,
  keyDimensions: IKeyDimension[]
): IClusterLabel[] => {
  const filterQuesData = quesData.filter((quesData, index) => clusterArray[index] === cluster);

  return filterQuesData[0].map((item, index) => {
    const mean = meanBy(filterQuesData, (i) => i[index].answer.order); //求得平均数
    const filterKeyDimension = keyDimensions.find((s) => s.labelKey === item.labelKey); //取出那个回答
    return {
      tagText: item.labelText,
      value: mean,
      text: filterKeyDimension.answers[Math.round(mean)].text,
    };
  });
};
/**
 * 获得单个聚类用户数据
 * @param quesData 输入数据
 * @param cType 聚类类型
 * @param percent 用户占比
 */
export const getUserModel = (quesData: TQuesData, cType: number, percent: number): IUserModel => {
  return {
    percent,
    typeName: '类别' + (cType + 1),
    type: cType + 1,
    quesData: quesData[0].map((quesDataItem, index) => {
      //求得平均数
      const mean = meanBy(
        quesData.filter((quesDataItems) => quesDataItems.some((item) => item.type === cType)),
        (quesDataItems) => quesDataItems[index].answer.order
      );
      const { type, typeName, ...restItem } = quesDataItem;
      return {
        ...restItem,
        key: 'persona-' + cType + '-' + index,
        answer: {
          text: getAnswerByOrder(quesData, quesDataItem.question, Math.round(mean)),
          order: mean,
        },
      };
    }),
  };
};

export const getKMO = async (quesData: number[][]): Promise<{ kmo: number; sig: number }> => {
  const { data } = await axios.post('/ml/kmo', { quesData });
  let { kmo, sig } = data;
  kmo = kmo === undefined ? 0 : kmo;
  sig = sig === undefined ? 0 : sig;
  return { kmo, sig };
};

export const getPCA = async (data: number[][], extractMethod) => {
  console.log('PCA', extractMethod);
  // TODO 不同抽取方法
  console.log(data);
  const res = await axios.post('/ml/pca', { data });

  return await res.data;
};

export const getFA = async (data: number[][], extractMethod) => {
  console.log('FA', extractMethod);
  // TODO 不同抽取方法
  const res = await axios.post('/ml/fa', { data });
  console.log(res);
  return res.data;
};
