import { generateId } from './utils';
import { getChartsDataSets } from './charts';
const quesData = [
  [
    {
      tagId: '1',
      tagText: '',
      key: generateId(),
      question: '你的名字是？',
      answer: { text: '小A', order: 1 },
    },
    {
      tagId: '2',
      tagText: '',
      key: generateId(),
      question: '你的性别是？',
      answer: { text: '男', order: 1 },
    },
  ],
  [
    {
      tagId: '1',
      tagText: '',
      key: generateId(),
      question: '你的名字是？',
      answer: { text: '小B', order: 2 },
    },
    {
      tagId: '2',
      tagText: '',
      key: generateId(),
      question: '你的性别是？',
      answer: { text: '女', order: 2 },
    },
  ],
];
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
