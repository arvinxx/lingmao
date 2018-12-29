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
import update from 'immutability-helper';

const quesDataWithLabel = update(quesData, {
  0: {
    records: {
      0: {
        labelKey: { $set: 'name' },
        labelText: { $set: '姓名' },
      },
      1: {
        labelKey: { $set: 'gender' },
        labelText: { $set: '性别' },
      },
      2: {
        labelKey: { $set: 'address' },
        labelText: { $set: '地址' },
      },
    },
  },
  1: {
    records: {
      0: {
        labelKey: { $set: 'name' },
        labelText: { $set: '姓名' },
      },
      1: {
        labelKey: { $set: 'gender' },
        labelText: { $set: '性别' },
      },
      2: {
        labelKey: { $set: 'address' },
        labelText: { $set: '地址' },
      },
    },
  },
});
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
    it('should return labelKey as key', () => {
      const tableData = [
        {
          key: generateKey(),
          name: 'A.小A',
          gender: 'B.男',
          address: 'A.A',
        },
        {
          key: generateKey(),
          name: 'B.小B',
          gender: 'A.女',
          address: 'B.B',
        },
      ];
      expect(getTableData(quesDataWithLabel, false)).toEqual(tableData);
    });
    it('should return order as answer', () => {
      const tableData = [
        {
          key: generateKey(),
          name: '1',
          gender: '2',
          address: '1',
        },
        {
          key: generateKey(),
          name: '2',
          gender: '1',
          address: '2',
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
      { key: generateKey(), title: '你的性别是？', dataIndex: '2222' },
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
