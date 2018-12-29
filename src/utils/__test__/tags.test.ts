import { extractTags, getStarData, getTagsArrByKey, TStarModel } from '../tags';
import { largeLabel as labels } from '@/data/labels';

describe('extractTags', () => {
  it('return array', () => {
    expect(extractTags(labels)).toEqual([
      {
        text: '少门分，用被孟',
        key: 'rJecwftRf',
      },
      {
        text: '格活最任，问',
        key: 'SJQcwMYAz',
      },
      {
        key: 'r1H89JcRz',
        text: '百管百',
      },
      {
        key: 'ry2koFcAz',
        text: '离格活最',
      },
      {
        text: '男',
        key: 'Byb9PfYRG',
      },
      {
        text: '女',
        key: 'Byb9PfY2RG',
      },
      {
        text: '约车，正各发存转论西月',
        key: 'BJhdPGt0M',
      },
      {
        text: '我柜把',
        key: 'BkjODGtAG',
      },
      {
        text: '门识二此里除青，由门之六料',
        key: 'HkJtwMFRM',
      },
      {
        text: '身门识二此里除',
        key: 'ry0twGtCM',
      },
      {
        text: '问出豆',
        key: 'rkrYvGtRz',
      },
      {
        text: '体而改几些地共类边，',
        key: 'HJetvGFRM',
      },
      {
        text: 'D候我柜',
        key: 'r1FYPftAM',
      },
      {
        text: '节受三自验始候，',
        key: 'r1U9wzFRG',
      },
      {
        text: '各发存转论',
        key: 'HJjFvfF0M',
      },
      {
        text: '节受三自验始候',
        key: 'BkwKDMKCz',
      },
      {
        text: '传门',
        key: 'Bk3twMKAf',
      },
    ]);
  });
  it('return empty array ', () => {
    //@ts-ignore
    expect(extractTags(undefined)).toEqual([]);
  });
});

describe('getTagsArrByKey', () => {
  it('should reture tag arrays', () => {
    const keys = ['Byb9PfYRG', 'BJhdPGt0M', 'rJecwftRf'];
    expect(getTagsArrByKey(labels, keys)).toEqual([
      {
        text: '男',
        key: 'Byb9PfYRG',
      },
      {
        text: '约车，正各发存转论西月',
        key: 'BJhdPGt0M',
      },
      {
        text: '少门分，用被孟',
        key: 'rJecwftRf',
      },
    ]);
  });
  it('should reture empty', () => {
    const labels = undefined;
    const tagIds = undefined;
    expect(getTagsArrByKey(labels, tagIds)).toEqual([]);
  });
});

describe('getStarData', () => {
  const labels = [
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
  expect(getStarData(labels)).toEqual(startData);
});
