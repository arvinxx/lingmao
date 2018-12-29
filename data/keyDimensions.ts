import { generateKey } from '@/utils';

export default [
  {
    question: { text: '你的名字是？', key: generateKey() },
    answers: [{ text: 'A.小A', order: 0 }, { text: 'B.小B', order: 1 }],
    labelKey: 'name',
    labelText: '姓名',
  },
  {
    question: { text: '你的性别是？', key: generateKey() },
    answers: [{ text: 'B.男', order: 1 }, { text: 'A.女', order: 0 }],
    labelKey: 'gender',
    labelText: '性别',
  },
];
