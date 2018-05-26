import { uniq, dropRight, concat } from 'lodash';

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
    return { count, percent: count / length * 100 };
  });
};

export const getAccumulation = (percents: number[]): number[] => {
  let a = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  percents.forEach((i) => {
    a = [percents.reduce(reducer), ...a];
    percents = dropRight(percents);
  });
  return a;
};
