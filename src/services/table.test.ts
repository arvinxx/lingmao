import { generateId } from '../utils/utils';
import { rawToSaved } from './table';
jest.mock('shortid');

it('rawToSaved ', () => {
  const rawData = [
    {
      '你的名字是？': '小A',
      '你的性别是？': '男',
    },
    {
      '你的名字是？': '小B',
      '你的性别是？': '女',
    },
  ];
  const saveData = [
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '男', order: 0 },
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
        answer: { text: '小B', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '女', order: 0 },
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
