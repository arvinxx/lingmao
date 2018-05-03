// import { effects } from 'dva/saga';
import model from './models/interview';
const reducers = model.reducers;

describe('Interview Model', () => {
  it('loads', () => {
    expect(model);
  });

  describe('Reducers', () => {

    describe('changeDimensionKey', () => {
      it('should return new Key', () => {
        const reducers = model.reducers;
        const reducer = reducers.changeDimensionKey;
        const state = {
          dimensions: [
            {
              key: '',
              values: [],
            },
          ],
        };
        const action = {
          type: 'interview/changeDimension',
          payload: { oldKey: '', newKey: 'eed' },
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              key: 'eed',
              values: [],
            },
          ],
        });
      });
      it('should not return new Key', () => {
        const reducer = reducers.changeDimensionKey;
        const state = {
          dimensions: [
            {
              key: '1',
              values: [],
            },
            {
              key: '3',
              values: ['111', '113'],
            },
          ],
        };
        const action = {
          type: 'interview/changeDimension',
          payload: { oldKey: '', newKey: 'eed' },
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              key: '1',
              values: [],
            },
            {
              key: '3',
              values: ['111', '113'],
            },
          ],
        });
      });
    });

    describe('addDimensionKey', () => {
      it('should add a new Key', () => {
        const reducer = reducers.addDimensionKey;
        const state = {
          dimensions: [],
        };
        const action = {
          type: 'interview/addDimension',
          payload: 'dsa',
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              key: 'dsa',
              values: [],
            },
          ],
        });
      });
    });

    describe('deleteDimensionKey', () => {
      it('should return new Key', () => {
        const reducers = model.reducers;
        const reducer = reducers.deleteDimensionKey;
        const state = {
          dimensions: [
            { key: '1', values: [] },
            { key: '2', values: [] },
            { key: '3', values: [] },
          ],
        };
        const action = {
          type: 'interview/deleteDimensionKey',
          payload: '1',
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [{ key: '2', values: [] }, { key: '3', values: [] }],
        });
      });
    });
  });
});
