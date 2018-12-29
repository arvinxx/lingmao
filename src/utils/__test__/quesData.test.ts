import {
  getQuestions,
  getAnswers,
  getValueFromQuesData,
  generateKey,
  getFilterQuesData,
  getAnswerByOrder,
} from '@/utils';
import { quesData as undealQuesData } from '@/data/quesData';
import update from 'immutability-helper';

jest.mock('shortid');

const quesData = update(undealQuesData, {
  0: {
    records: {
      1: {
        labelKey: { $set: 'gender' },
      },
    },
  },
  1: {
    records: {
      1: {
        labelKey: { $set: 'gender' },
      },
    },
  },
});
it('getQuestions', () => {
  expect(getQuestions(quesData)).toEqual([
    { key: '你的名字是？', text: '你的名字是？' },
    { key: '你的性别是？', text: '你的性别是？' },
    { key: '你住在？', text: '你住在？' },
  ]);
});
it('getAnswers', () => {
  expect(getAnswers(quesData, '你的性别是？')).toEqual([
    { key: generateKey(), text: 'A.女' },
    { key: generateKey(), text: 'B.男' },
  ]);
});
it('getAnswerByOrder', () => {
  expect(getAnswerByOrder(quesData, '你的性别是？', 0)).toEqual('A.女');
});
it('getFilterQuesData', () => {
  const selectedLabelKeys = ['gender'];
  expect(getFilterQuesData(quesData, selectedLabelKeys)).toEqual([
    {
      records: [
        {
          key: 'testKey',
          labelKey: 'gender',
          question: '你的性别是？',
          answer: { text: 'B.男', order: 1 },
        },
      ],
    },
    {
      records: [
        {
          key: 'testKey',
          labelKey: 'gender',
          question: '你的性别是？',
          answer: { text: 'A.女', order: 0 },
        },
      ],
    },
  ]);
});

it('getValueFromQuesData', () => {
  expect(getValueFromQuesData(quesData)).toEqual([[1, 2, 1], [2, 1, 2]]);
});
