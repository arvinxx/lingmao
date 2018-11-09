import { generateKey } from '@/utils';
export const quesData = [
  {
    records: [
      {
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: 'A.小A', order: 0 },
      },
      {
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'B.男', order: 1 },
      },
      {
        key: generateKey(),
        question: '你住在？',
        answer: { text: 'A.A', order: 0 },
      },
    ],
  },
  {
    records: [
      {
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: 'B.小B', order: 1 },
      },
      {
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'A.女', order: 0 },
      },
      {
        key: generateKey(),
        question: '你住在？',
        answer: { text: 'B.B', order: 1 },
      },
    ],
  },
];

export const keyDimensions = [
  {
    question: { text: 'aaaaa', key: 'aaaaa' },
    answers: [{ text: '1345', key: 'dsad' }, { text: '5463121', key: 'fdsfg' }],
    labelKey: '123',
    labelText: '标签1',
  },
  {
    question: { text: 'gdfycvh', key: 'gdfycvh' },
    answers: [{ text: '3464', key: 'fgrew' }, { text: '357323bvf', key: 'vcxnnh' }],
    labelKey: '3334',
    labelText: '标签2',
  },
];
