import { generateId } from '../utils';
import { rawToSaved } from './table';
jest.mock('shortid');

it('rawToSaved ', () => {
  const rawData = [
    {
      '你的名字是？': 'A.小A',
      '你的性别是？': 'B.男',
      '你住在？': 'A.A',
    },
    {
      '你的名字是？': 'B.小B',
      '你的性别是？': 'A.女',
      '你住在？': 'B.B',
    },
  ];
  const saveData = [
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: 'A.小A', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: 'B.男', order: 1 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你住在？',
        answer: { text: 'A.A', order: 0 },
        type: null,
        typeName: '',
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: 'B.小B', order: 1 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: 'A.女', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你住在？',
        answer: { text: 'B.B', order: 1 },
        type: null,
        typeName: '',
      },
    ],
  ];

  expect(rawToSaved(rawData)).toEqual(saveData);
});

it('addMissData', () => {
  // TODO: 补充缺失数据 #54
});
