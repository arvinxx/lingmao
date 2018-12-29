import { getFilterLabels } from '@/utils';
import { mediumLabel } from '@/data/labels';
import update from 'immutability-helper';

const labels = update(mediumLabel, {
  1: {
    questionKey: { $set: '你的性别是?' },
  },
});
describe('getFilterLabels', () => {
  it('should return filtered Dims ', () => {
    expect(getFilterLabels(labels)).toEqual([]);
  });
  it('should return selected Dims ', () => {
    expect(getFilterLabels(labels, false)).toEqual([
      {
        text: '性别',
        key: 'S1a3uMt0M',
        questionKey: '你的性别是?',
        tags: [
          {
            text: '男',
            key: 'Byb9PfYRG',
          },
          {
            text: '女',
            key: 'Byb9PfY2RG',
          },
        ],
      },
    ]);
  });
});
