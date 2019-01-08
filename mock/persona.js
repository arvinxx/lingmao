import shortid from 'shortid';

const generateKey = () => {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%@');
  return shortid.generate();
};
const quesData = [
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

import Mock from 'mockjs';
const Random = Mock.Random;

const userModels = quesData.map((item) => ({
  ...item,
  type: Random.natural(1, 5),
  typeName: Random.cword(),
  percent: Random.natural(1, 40),
}));

export default {
  'get /api/v1/project/123/personas': userModels,
};
