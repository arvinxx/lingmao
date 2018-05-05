import { findIndexById, generateId } from './utils';
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
  it('should return none when don\'t find id', () => {
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
    expect(findIndexById(arr, '3')).toEqual(undefined);
  });
});

describe('generateId', () => {
  it('should return id', () => {
    set('2/4/2017');
    const id = generateId();
    expect(id).toEqual(new Date().valueOf());
    reset();
  });
});
