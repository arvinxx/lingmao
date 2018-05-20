import { getClusterDims, getClusterPercent } from './ml';
import { clusterArray } from '../../mock/clusterResults';

it('getClusterPercent', () => {
  expect(getClusterPercent(clusterArray)).toEqual([
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

it('getClusterDims', () => {
  const quesData = [
    [
      { tagText: '1', type: 1, answer: { order: 0 } },
      { tagText: '2', type: 1, answer: { order: 3 } },
      { tagText: '3', type: 1, answer: { order: 4 } },
    ],
    [
      { tagText: '1', type: 2, answer: { order: 3 } },
      { tagText: '2', type: 2, answer: { order: 1 } },
      { tagText: '3', type: 2, answer: { order: 2 } },
    ],
    [
      { tagText: '1', type: 1, answer: { order: 2 } },
      { tagText: '2', type: 1, answer: { order: 3 } },
      { tagText: '3', type: 1, answer: { order: 2 } },
    ],
  ];
  const clusterArray = [1, 2, 1];
  expect(getClusterDims(clusterArray, quesData, 1)).toEqual([
    { text: '1', value: 1 },
    { text: '2', value: 3 },
    { text: '3', value: 3 },
  ]);
});
