import { generateKey, reorder } from '@/utils';

jest.mock('shortid');

describe('generateKey', () => {
  it('should return id', () => {
    const id = generateKey();
    expect(typeof id).toEqual('string');
    expect(id).toEqual('testKey');
  });
});

describe('reorder', () => {
  const arr = ['313', '2543', '75676'];
  expect(reorder(arr, 1, 2)).toEqual(['313', '75676', '2543']);
});
