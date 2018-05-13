import { extractTags, getTagsArrById } from './tags';

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
