import {
  generateKey,
  rawToSaved,
  getColumns,
  getFilterColumns,
  getFilterTableData,
  getTableData,
} from '@/utils';
import { IKeyDimension } from '@/models/data';
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
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: 'A.小A', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'B.男', order: 1 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateKey(),
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
        key: generateKey(),
        question: '你的名字是？',
        answer: { text: 'B.小B', order: 1 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateKey(),
        question: '你的性别是？',
        answer: { text: 'A.女', order: 0 },
        type: null,
        typeName: '',
      },
      {
        tagId: '',
        tagText: '',
        key: generateKey(),
        question: '你住在？',
        answer: { text: 'B.B', order: 1 },
        type: null,
        typeName: '',
      },
    ],
  ];

  expect(rawToSaved(rawData)).toEqual(saveData);
});

describe('getTableData', () => {
  it('should return question as key', () => {
    const quesData = [
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const tableData = [
      {
        key: generateKey(),
        '你的名字是？': '小A',
        '你的性别是？': '男',
      },
      {
        key: generateKey(),

        '你的名字是？': '小B',
        '你的性别是？': '女',
      },
      {
        key: generateKey(),

        '你的名字是？': '小A',
        '你的性别是？': '不男不女',
      },
      {
        key: generateKey(),

        '你的名字是？': '小B',
        '你的性别是？': '女',
      },
    ];
    expect(getTableData(quesData, false)).toEqual(tableData);
  });
  it('should return tagId as key', () => {
    const quesData = [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const tableData = [
      {
        key: generateKey(),
        '11111': '小A',
        '22222': '男',
      },
      {
        key: generateKey(),

        '11111': '小B',
        '22222': '女',
      },
      {
        key: generateKey(),

        '11111': '小A',
        '22222': '不男不女',
      },
      {
        key: generateKey(),

        '11111': '小B',
        '22222': '女',
      },
    ];
    expect(getTableData(quesData, false)).toEqual(tableData);
  });
  it('should return order as answer', () => {
    const quesData = [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const tableData = [
      {
        key: generateKey(),
        '11111': '1',
        '22222': '1',
      },
      {
        key: generateKey(),

        '11111': '1',
        '22222': '1',
      },
      {
        key: generateKey(),

        '11111': '1',
        '22222': '1',
      },
      {
        key: generateKey(),

        '11111': '1',
        '22222': '1',
      },
    ];
    expect(getTableData(quesData, true)).toEqual(tableData);
  });
});
it('getFilterTableData ', () => {
  const tableData = [
    {
      key: generateKey(),
      '你的名字是？': '小A',
      '你的性别是？': '男',
    },
    {
      key: generateKey(),

      '你的名字是？': '小B',
      '你的性别是？': '女',
    },
    {
      key: generateKey(),

      '你的名字是？': '小A',
      '你的性别是？': '不男不女',
    },
    {
      key: generateKey(),

      '你的名字是？': '小B',
      '你的性别是？': '女',
    },
  ];
  const keyDimensions: IKeyDimension[] = [
    {
      question: { text: '你的名字是？', key: '你的名字是？' },
      answers: [],
    },
  ];
  expect(getFilterTableData(tableData, keyDimensions, true)).toEqual([
    {
      key: generateKey(),
      '你的名字是？': '小A',
    },
    {
      key: generateKey(),
      '你的名字是？': '小B',
    },
    {
      key: generateKey(),

      '你的名字是？': '小A',
    },
    {
      key: generateKey(),
      '你的名字是？': '小B',
    },
  ]);
});

describe('getColumns', () => {
  it('should return question as dataIndex', () => {
    const quesData = [
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const column = [
      { key: generateKey(), title: '你的名字是？', dataIndex: '你的名字是？' },
      { key: generateKey(), title: '你的性别是？', dataIndex: '你的性别是？' },
    ];
    expect(getColumns(quesData)).toEqual(column);
  });
  it('should return tagId as dataIndex', () => {
    const quesData = [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateKey(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateKey(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ];
    const column = [
      { key: generateKey(), title: '你的名字是？', dataIndex: '11111' },
      { key: generateKey(), title: '你的性别是？', dataIndex: '22222' },
    ];
    expect(getColumns(quesData)).toEqual(column);
  });
});
it('getFilterColumns ', () => {
  const columns = [
    { key: generateKey(), title: '你的名字是？', dataIndex: '你的名字是？' },
    { key: generateKey(), title: '你的性别是？', dataIndex: '你的性别是？' },
    { key: generateKey(), title: 'dasfdsd', dataIndex: 'dasfdsd' },
  ];
  const keyDimensions: IKeyDimension[] = [
    {
      question: { text: '你的名字是？', key: '你的名字是？' },
      answers: [],
    },
    {
      question: { text: 'dasfdsd', key: 'dasfdsd' },
      answers: [],
    },
  ];
  expect(getFilterColumns(columns, keyDimensions, true)).toEqual([
    { key: generateKey(), title: '你的名字是？', dataIndex: '你的名字是？' },
    { key: generateKey(), title: 'dasfdsd', dataIndex: 'dasfdsd' },
  ]);
});

it('addMissData', () => {
  // TODO: 补充缺失数据 #54
});
