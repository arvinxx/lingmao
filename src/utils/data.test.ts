import { getQuestions, getAnswers, rawToSaved, getTableData, getColumns } from './data';
import { generateId } from './utils';

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
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '男', order: 0 },
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '女', order: 0 },
      },
    ],
  ];
  expect(rawToSaved(rawData)).toEqual(saveData);
});
it('getQuestions', () => {
  const quesData = [
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '男', order: 0 },
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
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
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '男', order: 0 },
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '女', order: 0 },
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小A', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '不男不女', order: 0 },
      },
    ],
    [
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的名字是？',
        answer: { text: '小B', order: 0 },
      },
      {
        tagId: '',
        tagText: '',
        key: generateId(),
        question: '你的性别是？',
        answer: { text: '女', order: 0 },
      },
    ],
  ];

  expect(getAnswers(quesData, '你的性别是？')).toEqual([
    { key: generateId(), name: '男' },
    { key: generateId(), name: '女' },
    { key: generateId(), name: '不男不女' },
  ]);
});

describe('getColumns', () => {
  it('should return question as dataIndex', () => {
    const quesData = [
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const column = [
      { key: generateId(), title: '你的名字是？', dataIndex: '你的名字是？' },
      { key: generateId(), title: '你的性别是？', dataIndex: '你的性别是？' },
    ];
    expect(getColumns(quesData)).toEqual(column);
  });
  it('should return tagId as dataIndex', () => {
    const quesData = [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const column = [
      { key: generateId(), title: '你的名字是？', dataIndex: '11111' },
      { key: generateId(), title: '你的性别是？', dataIndex: '22222' },
    ];
    expect(getColumns(quesData)).toEqual(column);
  });
});
describe('getTableData', () => {
  it('should return question as key', () => {
    const quesData = [
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const tableData = [
      {
        key: generateId(),
        '你的名字是？': '小A',
        '你的性别是？': '男',
      },
      {
        key: generateId(),

        '你的名字是？': '小B',
        '你的性别是？': '女',
      },
      {
        key: generateId(),

        '你的名字是？': '小A',
        '你的性别是？': '不男不女',
      },
      {
        key: generateId(),

        '你的名字是？': '小B',
        '你的性别是？': '女',
      },
    ];
    expect(getTableData(quesData)).toEqual(tableData);
  });
  it('should return tagId as key', () => {
    const quesData = [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const tableData = [
      {
        key: generateId(),
        '11111': '小A',
        '22222': '男',
      },
      {
        key: generateId(),

        '11111': '小B',
        '22222': '女',
      },
      {
        key: generateId(),

        '11111': '小A',
        '22222': '不男不女',
      },
      {
        key: generateId(),

        '11111': '小B',
        '22222': '女',
      },
    ];
    expect(getTableData(quesData)).toEqual(tableData);
  });
});
