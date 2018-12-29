import { getChartsDataSets } from '@/utils';
import { quesData } from '@/data/quesData';
import { IKeyDimension } from '@/models/data';

const keyDimension: IKeyDimension = {
  question: { key: '你的名字是?', text: '你的名字是?' },
  answers: [
    {
      text: '小A',
      key: '1',
    },
    {
      text: '小B',
      key: '2',
    },
  ],
};

it('getChartsDataSets', () => {
  expect(getChartsDataSets(quesData, '1', keyDimension)).toEqual([
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
