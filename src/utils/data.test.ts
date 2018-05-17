import {
  getQuestions,
  getAnswers,
  rawToSaved,
  getTableData,
  getColumns,
  getFilterDims,
  getFilterTableData,
  getFilterColumns,
} from './data';
import { generateId } from './utils';
import { TSelectQue } from '../models/data';

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
    expect(getTableData(quesData, false)).toEqual(tableData);
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
    expect(getTableData(quesData, false)).toEqual(tableData);
  });
  it('should return order as answer', () => {
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
        '11111': '1',
        '22222': '1',
      },
      {
        key: generateId(),

        '11111': '1',
        '22222': '1',
      },
      {
        key: generateId(),

        '11111': '1',
        '22222': '1',
      },
      {
        key: generateId(),

        '11111': '1',
        '22222': '1',
      },
    ];
    expect(getTableData(quesData, true)).toEqual(tableData);
  });
});

it('getFilterDims ', () => {
  const dims = [
    {
      _id: '5afb98a5aec4ec586cd4bd86',
      text: '少门分，用被孟',
      id: 'rJecwftRf',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd84',
      text: '格活最任，问',
      id: 'SJQcwMYAz',
      refId: 'HJ@OwGtAG',
    },
    {
      refId: 'ryaD76uCz',
      id: 'r1H89JcRz',
      text: '百管百',
      _id: '5afc6a4e29917c234c05ecbd',
    },
    {
      refId: 'ryaD76uCz',
      id: 'ry2koFcAz',
      text: '离格活最',
      _id: '5afd0b062f3b5f43084de099',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd85',
      text: '。体而改几些地共类',
      id: 'Byb9PfYRG',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8f',
      text: '约车，正各发存转论西月',
      id: 'BJhdPGt0M',
      refId: 'ryaD76uCz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd90',
      text: '我柜把',
      id: 'BkjODGtAG',
      refId: 'ryaD76uCz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8e',
      text: '门识二此里除青，由门之六料',
      id: 'HkJtwMFRM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd87',
      text: '身门识二此里除',
      id: 'ry0twGtCM',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8c',
      text: '问出豆',
      id: 'rkrYvGtRz',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8d',
      text: '体而改几些地共类边，',
      id: 'HJetvGFRM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8a',
      text: 'D候我柜',
      id: 'r1FYPftAM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd83',
      text: '节受三自验始候，',
      id: 'r1U9wzFRG',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd89',
      text: '各发存转论',
      id: 'HJjFvfF0M',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8b',
      text: '节受三自验始候',
      id: 'BkwKDMKCz',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd88',
      text: '传门',
      id: 'Bk3twMKAf',
      refId: 'HkavwGKRz',
    },
  ];
  const selectDims = ['rJecwftRf', 'SJQcwMYAz', 'Byb9PfYRG'];
  expect(getFilterDims(dims, selectDims)).toEqual([
    {
      refId: 'ryaD76uCz',
      id: 'r1H89JcRz',
      text: '百管百',
      _id: '5afc6a4e29917c234c05ecbd',
    },
    {
      refId: 'ryaD76uCz',
      id: 'ry2koFcAz',
      text: '离格活最',
      _id: '5afd0b062f3b5f43084de099',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8f',
      text: '约车，正各发存转论西月',
      id: 'BJhdPGt0M',
      refId: 'ryaD76uCz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd90',
      text: '我柜把',
      id: 'BkjODGtAG',
      refId: 'ryaD76uCz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8e',
      text: '门识二此里除青，由门之六料',
      id: 'HkJtwMFRM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd87',
      text: '身门识二此里除',
      id: 'ry0twGtCM',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8c',
      text: '问出豆',
      id: 'rkrYvGtRz',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8d',
      text: '体而改几些地共类边，',
      id: 'HJetvGFRM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8a',
      text: 'D候我柜',
      id: 'r1FYPftAM',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd83',
      text: '节受三自验始候，',
      id: 'r1U9wzFRG',
      refId: 'HJ@OwGtAG',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd89',
      text: '各发存转论',
      id: 'HJjFvfF0M',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd8b',
      text: '节受三自验始候',
      id: 'BkwKDMKCz',
      refId: 'HkavwGKRz',
    },
    {
      _id: '5afb98a5aec4ec586cd4bd88',
      text: '传门',
      id: 'Bk3twMKAf',
      refId: 'HkavwGKRz',
    },
  ]);
});

it('getFilterTableData ', () => {
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
  const selectedQues: TSelectQue[] = [
    {
      question: { name: '你的名字是？', key: '你的名字是？' },
      tagText: '',
      tagId: '',
      answers: [],
    },
  ];
  expect(getFilterTableData(tableData, selectedQues, true)).toEqual([
    {
      key: generateId(),
      '你的名字是？': '小A',
    },
    {
      key: generateId(),

      '你的名字是？': '小B',
    },
    {
      key: generateId(),

      '你的名字是？': '小A',
    },
    {
      key: generateId(),
      '你的名字是？': '小B',
    },
  ]);
});
it('getFilterColumns ', () => {
  const columns = [
    { key: generateId(), title: '你的名字是？', dataIndex: '你的名字是？' },
    { key: generateId(), title: '你的性别是？', dataIndex: '你的性别是？' },
    { key: generateId(), title: 'dasfdsd', dataIndex: 'dasfdsd' },
  ];
  const selectedQues: TSelectQue[] = [
    {
      question: { name: '你的名字是？', key: '你的名字是？' },
      tagText: '',
      tagId: '',
      answers: [],
    },
    {
      question: { name: 'dasfdsd', key: 'dasfdsd' },
      tagText: '',
      tagId: '',
      answers: [],
    },
  ];
  expect(getFilterColumns(columns, selectedQues, true)).toEqual([
    { key: generateId(), title: '你的名字是？', dataIndex: '你的名字是？' },
    { key: generateId(), title: 'dasfdsd', dataIndex: 'dasfdsd' },
  ]);
});
