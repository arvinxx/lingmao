import { getBlockData, getBlockText } from './persona';

it('getBlockData ', () => {
  const data = [
    {
      tagId: '1',
      tagGroupId: '31',
      tagGroupText: '12321',
      value: 1.32,
      type: 'aaa',
      tagText: '4127dsf',
    },
    {
      tagId: '455',
      tagGroupId: '31',
      tagGroupText: '12321',
      value: 3.5432,
      type: 'b',
      tagText: 'stringds',
    },
    {
      tagId: '1',
      tagGroupId: '31',
      tagGroupText: '12321',
      value: 1.2,
      type: 'c',
      tagText: 'string',
    },
    {
      tagId: '143',
      tagGroupId: '3341',
      tagGroupText: '125435321',
      value: 1.5,
      type: 'c',
      tagText: 'stdfsfring',
    },
  ];
  expect(getBlockData(data)).toEqual([{
    type: 'aaa',
    values: [
      {
        text: '4127dsf',
        value: 1.32,
      }]
  },{    type: 'b',
    values: [
      {
        text: 'stringds',
        value: 3.5432,
      }]},{
    type: 'c',
    values: [
      {
        text: 'string',
        value: 1.2,
      },
      {
        text: 'stdfsfring',
        value: 1.5,
      },
    ],
  }]);
});
describe('getBlockText', () => {
  it('should return text', () => {
    const block = {
      type: 'motivations',
      values: [
        {
          text: 'string',
          value: 1.2,
        },
        {
          text: 'stdfsfring',
          value: 1.5,
        },
      ],
    };
    expect(getBlockText(block)).toEqual('动机');
  });
  it('should return empty', () => {
    const block = {
      type: 'dasd',
      values: [
        {
          text: 'string',
          value: 1.2,
        },
        {
          text: 'stdfsfring',
          value: 1.5,
        },
      ],
    };
    expect(getBlockText(block)).toEqual('');
  });
});
