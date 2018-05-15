import { findIndexById, generateId } from './utils';

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
    expect(findIndexById(arr, '3')).toThrowError('id 不正确，请重试');
  });
});

describe('generateId', () => {
  it('should return id', () => {
    const id = generateId();
    expect(typeof id).toEqual('string');
    expect(id).toEqual('testKey');
  });
});
