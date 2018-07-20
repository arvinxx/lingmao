import { clusterArray } from '@/mock/clusterResults';
import { getAccumulation, getCountAndPercent } from '../visualization';

it('getCountAndPercent', () => {
  expect(getCountAndPercent(clusterArray)).toEqual([
    {
      count: 6,
      percent: 60,
    },
    {
      count: 2,
      percent: 20,
    },
    {
      count: 2,
      percent: 20,
    },
  ]);
});

it('getAccumulation', () => {
  const a = [1, 2, 3, 4,6];
  expect(getAccumulation(a)).toEqual([1, 3, 6, 10,16]);
});
