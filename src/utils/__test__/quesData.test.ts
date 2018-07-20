import {
  getQuestions,
  getAnswers,
  getValueFromQuesData,
  generateKey,
  getFilterQuesData,
} from '@/utils';

jest.mock('shortid');

it('getQuestions', () => {
  const quesData = [
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '男', order: 0 },
      },
    ],
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '女', order: 0 },
      },
    ],
  ];
  expect(getQuestions(quesData)).toEqual([
    { key: '你的名字是？', name: '你的名字是？' },
    { key: '你的性别是？', name: '你的性别是？' },
  ]);
});
it('getAnswers', () => {
  const quesData = [
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'A.男', order: 0 },
      },
    ],
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'C.女', order: 0 },
      },
    ],
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'B.不男不女', order: 0 },
      },
    ],
    [
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        labelKey: '',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'C.女', order: 0 },
      },
    ],
  ];

  expect(getAnswers(quesData, '你的性别是？')).toEqual([
    { key: generateKey(), name: 'A.男' },
    { key: generateKey(), name: 'B.不男不女' },
    { key: generateKey(), name: 'C.女' },
  ]);
});


it('getFilterQuesData', () => {
  const quesData = [
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 1 },
      },
      {
        labelKey: '2',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '男', order: 1 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '1', order: 0 },
      },
      {
        labelKey: '4',
        labelText: '',
        key: generateKey(),
        question: 'br gvdsc？',
        answer: { text: 'trhytyhr', order: 1 },
      },
    ],
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 2 },
      },
      {
        labelKey: '2',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '女', order: 2 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '2', order: 1 },
      },
      {
        labelKey: '4',
        labelText: '',
        key: generateKey(),
        question: 'br gvdsc？',
        answer: { text: 'dsf', order: 0 },
      },
    ],
  ];
  const selectDims = ['1', '3'];
  expect(getFilterQuesData(quesData, selectDims)).toEqual([
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 1 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '1', order: 0 },
      },
    ],
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 2 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '2', order: 1 },
      },
    ],
  ]);
});

it('getValueFromQuesData', () => {
  const quesData = [
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小A', order: 1 },
      },
      {
        labelKey: '2',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '男', order: 1 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '1', order: 0 },
      },
      {
        labelKey: '4',
        labelText: '',
        key: generateKey(),
        question: 'br gvdsc？',
        answer: { text: 'trhytyhr', order: 1 },
      },
    ],
    [
      {
        labelKey: '1',
        labelText: '',
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: '小B', order: 2 },
      },
      {
        labelKey: '2',
        labelText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: '女', order: 2 },
      },
      {
        labelKey: '3',
        labelText: '',
        key: generateKey(),
        question: 'fdsfdsf？',
        answer: { text: '2', order: 1 },
      },
      {
        labelKey: '4',
        labelText: '',
        key: generateKey(),
        question: 'br gvdsc？',
        answer: { text: 'dsf', order: 0 },
      },
    ],
  ];
  expect(getValueFromQuesData(quesData)).toEqual([[2, 2, 1, 2], [3, 3, 2, 1]]);
});

