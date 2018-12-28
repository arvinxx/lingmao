import { generateKey } from '@/utils';
import { TQuesData } from '@/models/data';
export const quesData: TQuesData = [
  {
    records: [
      {
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: 'A.小A', order: 0 },
      },
      {
        key: generateKey(),
        labelKey: 'gender',
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
        labelKey: 'gender',
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
