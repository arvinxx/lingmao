import { uniq, dropRight } from 'lodash';
/**
 * 获得个数值与百分比
 * @param  array 数组
 */
export const getCountAndPercent = <T>(array: T[]): { count; percent }[] => {
  const length = array.length;
  const clusterArr = uniq(array).sort();
  return clusterArr.map((cluster) => {
    let count = 0;
    array.forEach((number) => {
      if (cluster === number) {
        count++;
      }
    });
    return { count, percent: (count / length) * 100 };
  });
};
/**
 * 获得累计值
 * @param percents 百分比数组
 */
export const getAccumulation = (percents: number[]): number[] => {
  let a = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  percents.forEach((i) => {
    a = [percents.reduce(reducer), ...a];
    percents = dropRight(percents);
  });
  return a;
};

/**
 * 从降维结果数据获得方差解释表所需数据
 */
export const getEigenValuesData = (
  eigenValues: number[],
  percent: number[],
  rEigenValues?: number[],
  rPercent?: number[]
) => {
  let isRoation = true;
  if (rEigenValues === undefined && rPercent === undefined) {
    isRoation = false;
  }
  return isRoation
    ? eigenValues.map((i, index) => ({
        key: index,
        dims: index + 1,
        eigenValue: i.toFixed(3),
        percent: (percent[index] * 100).toFixed(1) + '%',
        acc: (getAccumulation(percent)[index] * 100).toFixed(1) + '%',
        'r-eigenValue': rEigenValues[index].toFixed(3),
        'r-percent': (rPercent[index] * 100).toFixed(1) + '%',
        'r-acc': (getAccumulation(rPercent)[index] * 100).toFixed(1) + '%',
      }))
    : eigenValues.map((i, index) => ({
        key: index,
        dims: index + 1,
        eigenValue: i.toFixed(3),
        percent: (percent[index] * 100).toFixed(1) + '%',
        acc: (getAccumulation(percent)[index] * 100).toFixed(1) + '%',
      }));
};

/**
 * 从降维结果数据获得展示表所需数据
 */
export const getColumnsAndData = (componentMatrix) => {
  const columns = componentMatrix.map((comp, index) => ({
    title: (index + 1).toString(),
    dataIndex: index.toString(),
    key: index.toString(),
  }));
  const data = componentMatrix.map((i, index) => ({
    ...i.map((t) => t.toFixed(2)),
    dims: index + 1,
    key: index,
  }));
  return { columns, data };
};
