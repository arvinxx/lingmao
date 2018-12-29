import { generateKey, getChartsDataSets } from '@/utils';
import { quesData } from '@/data/quesData';

const selectedQue = {
  question: { key: '你的名字是?', name: '你的名字是?' },
  answers: [
    {
      name: '小A',
      key: '1',
    },
    {
      name: '小B',
      key: '2',
    },
  ],
};

it('getChartsDataSets', () => {
  expect(getChartsDataSets(quesData, '1', selectedQue)).toEqual([
    {
      count: 1,
      item: '小A',
    },
    {
      count: 1,
      item: '小B',
    },
  ]);
});
