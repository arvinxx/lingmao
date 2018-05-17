import { findIndexById, generateId, reorder } from './utils';

jest.mock('shortid');

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
    expect(() => findIndexById(arr, '3')).toThrow('id 不正确，请重试');
  });
});

describe('generateId', () => {
  it('should return id', () => {
    const id = generateId();
    expect(typeof id).toEqual('string');
    expect(id).toEqual('testKey');
  });
});

describe('reorder', () => {
  const arr = ['313', '2543', '75676'];
  expect(reorder(arr, 1, 2)).toEqual(['313', '75676', '2543']);
});
