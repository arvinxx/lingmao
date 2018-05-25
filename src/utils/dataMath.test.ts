import { clusterArray } from '../../mock/clusterResults';
import { getCountAndPercent } from './dataMath';

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
