import { findIndexById, generateId, extractTags } from 'utils';
import { set, reset } from 'mockdate';

describe('findIndexById', () => {
  it('should return index when find id', () => {
    const arr = [
      {
        id: '34',
        value: '21',
      },
      {
        id: '1',
        value: '111',
      },
    ];
    expect(findIndexById(arr, '34')).toEqual(0);
    expect(findIndexById(arr, '1')).toEqual(1);
  });
  it("should return Error when don't find id", () => {
    const arr = [
      {
        id: '34',
        value: '21',
      },
      {
        id: '1',
        value: '111',
      },
    ];
    expect(findIndexById(arr, '3')).toThrowError('id 不正确，请重试');
  });
});

describe('generateId', () => {
  it('should return id', () => {
    set('2/4/2017');
    const id = generateId();
    expect(typeof id).toEqual('string');
    expect(id).toEqual(new Date().valueOf().toString());
    reset();
  });
});

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
  it('return empty array ', () => {
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
