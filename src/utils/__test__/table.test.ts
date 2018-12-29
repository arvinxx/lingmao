import {
  generateKey,
  rawToSaved,
  getColumns,
  getFilterColumns,
  getFilterTableData,
  getTableData,
} from '@/utils';
import { IKeyDimension } from '@/models/data';
import { quesData } from '@/data/quesData';


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

  expect(rawToSaved(rawData)).toEqual(quesData);
});

describe('getTableData', () => {
  const tableData = [
    {
      key: generateKey(),
      '你的名字是？': 'A.小A',
      '你的性别是？': 'B.男',
      '你住在？': 'A.A',
    },
    {
      key: generateKey(),
      '你的名字是？': 'B.小B',
      '你的性别是？': 'A.女',
      '你住在？': 'B.B',
    },
  ];
  it('should return question as key', () => {
    expect(getTableData(quesData, false)).toEqual(tableData);
  });
  describe('should return labelKey as key', () => {
    const quesDataWithLabel = [
      {
        records: [
          {
            labelKey: '1111',
            labelText: '标签1',
            ...quesData[0].records[0],
          },
          {
            labelKey: '2222',
            labelText: '标签2',
            ...quesData[0].records[1],
          },
          {
            labelKey: '3333',
            labelText: '标签2',
            ...quesData[0].records[2],
          },
        ],
      },
      {
        records: [
          {
            labelKey: '1111',
            labelText: '标签1',
            ...quesData[1].records[0],
          },
          {
            labelKey: '2222',
            labelText: '标签2',
            ...quesData[1].records[1],
          },
          {
            labelKey: '3333',
            labelText: '标签2',
            ...quesData[0].records[2],
          },
        ],
      },
    ];
    it('should return labelKey as key', () => {
      const tableData = [
        {
          key: generateKey(),
          '1111': 'A.小A',
          gender: 'B.男',
          '3333': 'A.A',
        },
        {
          key: generateKey(),
          '1111': 'B.小B',
          gender: 'A.女',
          '3333': 'A.A',
        },
      ];
      expect(getTableData(quesDataWithLabel, false)).toEqual(tableData);
    });
    it('should return order as answer', () => {
      const tableData = [
        {
          key: generateKey(),
          '1111': '1',
          gender: '2',
          '3333': '1',
        },
        {
          key: generateKey(),
          '1111': '2',
          gender: '1',
          '3333': '1',
        },
      ];

      expect(getTableData(quesDataWithLabel, true)).toEqual(tableData);
    });
  });
});
it('getFilterTableData ', () => {
  const keyDimensions: IKeyDimension[] = [
    {
      question: { text: '你的名字是？', key: '你的名字是？' },
      answers: [],
    },
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
    const column = [
      { key: generateKey(), title: '你的名字是？', dataIndex: '你的名字是？' },
      { key: generateKey(), title: '你的性别是？', dataIndex: '你的性别是？' },
      { key: generateKey(), title: '你住在？', dataIndex: '你住在？' },
    ];
    expect(getColumns(quesData)).toEqual(column);
  });
  it('should return LabelKey as dataIndex', () => {
    const quesDataWithLabel = [
      {
        records: [
          {
            labelKey: '1111',
            labelText: '标签1',
            ...quesData[0].records[0],
          },
          {
            labelKey: '2222',
            labelText: '标签2',
            ...quesData[0].records[1],
          },
          {
            labelKey: '3333',
            labelText: '标签2',
            ...quesData[0].records[2],
          },
        ],
      },
      {
        records: [
          {
            labelKey: '1111',
            labelText: '标签1',
            ...quesData[1].records[0],
          },
          {
            labelKey: '2222',
            labelText: '标签2',
            ...quesData[1].records[1],
          },
          {
            labelKey: '3333',
            labelText: '标签2',
            ...quesData[0].records[2],
          },
        ],
      },
    ];
    const column = [
      { key: generateKey(), title: '你的名字是？', dataIndex: '1111' },
      { key: generateKey(), title: '你的性别是？', dataIndex: 'gender' },
      { key: generateKey(), title: '你住在？', dataIndex: '3333' },
    ];
    expect(getColumns(quesDataWithLabel)).toEqual(column);
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
