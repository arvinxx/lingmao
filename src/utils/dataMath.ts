import { uniq } from 'lodash';

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
