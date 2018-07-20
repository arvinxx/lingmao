import { extractTags, getStarData, getTagsArrById, TStarData, TStarModel } from '../tags';

describe('extractTags', () => {
  const tagGroups = [
    {
      text: 'ungroup',
      id: '222',
      tags: [
        {
          id: '1',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '2',
          text: '测试2',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    },
    {
      text: '31',
      id: '111',
      tags: [
        {
          id: '5',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '7',
          text: '测试2',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    },
  ];
  it('return array', () => {
    expect(extractTags(tagGroups)).toEqual([
      {
        id: '1',
        text: '测试1',
        refText: '',
        refId: '',
        groupId: '',
      },
      {
        id: '2',
        text: '测试2',
        refText: '',
        refId: '',
        groupId: '',
      },
      {
        id: '5',
        text: '测试1',
        refText: '',
        refId: '',
        groupId: '',
      },
      {
        id: '7',
        text: '测试2',
        refText: '',
        refId: '',
        groupId: '',
      },
    ]);
  });
  it('return empty array ', () => {
    //@ts-ignore
    expect(extractTags(undefined)).toEqual([]);
  });
});

describe('getTagsArrById', () => {
  it('should reture tag arrays', () => {
    const tagGroups = [
      {
        text: 'ungroup',
        id: '222',
        tags: [
          {
            id: '1',
            text: '测试1',
            refText: '',
            refId: '',
            groupId: '',
          },
          {
            id: '2',
            text: '测试2',
            refText: '',
            refId: '',
            groupId: '',
          },
        ],
      },
      {
        text: '31',
        id: '111',
        tags: [
          {
            id: '5',
            text: '测试1',
            refText: '',
            refId: '',
            groupId: '',
          },
          {
            id: '7',
            text: '测试2',
            refText: '',
            refId: '',
            groupId: '',
          },
        ],
      },
    ];
    const tagIds = ['1', '2', '5'];
    expect(getTagsArrById(tagGroups, tagIds)).toEqual([
      {
        id: '1',
        text: '测试1',
        refText: '',
        refId: '',
        groupId: '',
      },
      {
        id: '2',
        text: '测试2',
        refText: '',
        refId: '',
        groupId: '',
      },
      {
        id: '5',
        text: '测试1',
        refText: '',
        refId: '',
        groupId: '',
      },
    ]);
  });
  it('should reture empty', () => {
    const tagGroups = undefined;
    const tagIds = undefined;
    expect(getTagsArrById(tagGroups, tagIds)).toEqual([]);
  });
});

describe('getStarData', () => {
  const tagGroups = [
    {
      text: 'ungroup',
      id: '222',
      tags: [
        {
          id: '1',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '2',
          text: '测试2',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    },
    {
      text: '31',
      id: '111',
      tags: [
        {
          id: '5',
          text: '测试1',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '7',
          text: '测试2',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    },
    {
      text: '4123',
      id: '333',
      tags: [
        {
          id: '5',
          text: '测试51',
          refText: '',
          refId: '',
          groupId: '',
        },
        {
          id: '7',
          text: '测试53',
          refText: '',
          refId: '',
          groupId: '',
        },
      ],
    },
  ];
  const startData: TStarModel = {
    links: [
      { source: 0, target: 1 },
      { source: 1, target: 0 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 1, target: 4 },
      { source: 1, target: 5 },
    ],
    categories: [{ name: '31' }, { name: '4123' }],
    data: [
      { name: '31', value: '0', category: 0 },
      { name: '4123', value: '0', category: 1 },
      { name: '测试1', value: '0', category: 0 },
      { name: '测试2', value: '0', category: 0 },
      { name: '测试51', value: '0', category: 1 },
      { name: '测试53', value: '0', category: 1 },
    ],
  };
  expect(getStarData(tagGroups)).toEqual(startData);
});
