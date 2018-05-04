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
              key: '34',
              _id: '222',
              values: [],
            },
            {
              key: '31',
              _id: '111',
              values: [],
            },
          ],
        };
        const action = {
          type: 'interview/changeDimension',
          payload: { id: '222', newKey: 'eed' },
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              key: 'eed',
              _id: '222',
              values: [],
            },
            {
              key: '31',
              _id: '111',
              values: [],
            },
          ],
        });
      });
    });
    describe('changeRecordText', () => {
      it('should return new Key', () => {
        const reducers = model.reducers;
        const reducer = reducers.changeRecordText;
        const state = {
          records: [
            {
              _id: '1',
              text: 'delete',
              collapsed: false,
              children: [],
            },
            {
              _id: '3',
              text: '',
              collapsed: false,
              children: [],
            },
          ],
        };
        const action = {
          type: 'interview/changeRecordText',
          payload: { id: '3', newText: 'hello' },
        };

        expect(reducer(state, action)).toEqual({
          records: [
            {
              _id: '1',
              text: 'delete',
              collapsed: false,
              children: [],
            },
            {
              _id: '3',
              text: 'hello',
              collapsed: false,
              children: [],
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
            { key: '1', _id: '34', values: [] },
            { key: '2', _id: '21', values: [] },
            { key: '3', _id: '4', values: [] },
          ],
        };
        const action = {
          type: 'interview/deleteDimensionKey',
          payload: '21',
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [{ key: '1', _id: '34', values: [] }, { key: '3', _id: '4', values: [] }],
        });
      });
    });

    describe('addDimensionValue', () => {
      it('should add a new value', () => {
        const reducer = reducers.addDimensionValue;
        const state = {
          dimensions: [
            {
              _id: '3',
              key: '1',
              values: [],
            },
          ],
        };
        const action = {
          type: 'interview/addDimensionValue',
          payload: { id: '3', newValue: 'dsa' },
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              _id: '3',
              key: '1',
              values: ['dsa'],
            },
          ],
        });
      });
    });
    describe('deleteDimensionValue', () => {
      it('should delete a value', () => {
        const reducer = reducers.deleteDimensionValue;
        const state = {
          dimensions: [
            {
              _id: '3',
              key: '1',
              values: ['eee', '444', 's3'],
            },
          ],
        };
        const action = {
          type: 'interview/deleteDimensionValue',
          payload: { id: '3', deleteValue: '444' },
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              _id: '3',
              key: '1',
              values: ['eee', 's3'],
            },
          ],
        });
      });
    });
    describe('showValueInput', () => {
      it('inputVisible should return true', () => {
        const reducer = reducers.showValueInput;
        const state = {
          dimensions: [
            {
              _id: '3',
              inputVisible: false,
            },
            {
              _id: '4',
              inputVisible: false,
            },
          ],
        };

        const action = {
          type: 'interview/showValueInput',
          payload: '3',
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              _id: '3',
              inputVisible: true,
            },
            {
              _id: '4',
              inputVisible: false,
            },
          ],
        });
      });
    });
    describe('hideValueInput', () => {
      it('inputVisible should return false', () => {
        const reducer = reducers.showValueInput;
        const state = {
          dimensions: [
            {
              _id: '3',
              inputVisible: false,
            },
            {
              _id: '4',
              inputVisible: true,
            },
          ],
        };

        const action = {
          type: 'interview/showValueInput',
          payload: '4',
        };

        expect(reducer(state, action)).toEqual({
          dimensions: [
            {
              _id: '3',
              inputVisible: false,
            },
            {
              _id: '4',
              inputVisible: true,
            },
          ],
        });
      });
    });
  });
});
