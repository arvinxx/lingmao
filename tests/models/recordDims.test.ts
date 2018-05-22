import { generateId } from "../../src/utils";
import model from "../../src/models/recordDims";

jest.mock('shortid');

const reducers = model.reducers;


describe('Reducer', () => {

  describe('addDimensionKey', () => {
    it("should add a dimension key if it's not empty", () => {
      const reducer = reducers.addDimensionKey;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'recordDims/addDimensionKey',
        payload: 'dsa',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            key: 'dsa',
            id: generateId(),
            values: [],
          },
        ],
      });
    });
    it("should remain if it's empty", () => {
      const reducer = reducers.addDimensionKey;
      const state = {
        dimensions: [],
      };
      const action = {
        type: 'recordDims/addDimensionKey',
        payload: '',
      };
      expect(reducer(state, action)).toEqual({
        dimensions: [],
      });
    });
  });
  it('deleteDimensionKey', () => {
    const reducers = model.reducers;
    const reducer = reducers.deleteDimensionKey;
    const state = {
      dimensions: [
        { key: '1', id: '34', values: [] },
        { key: '2', id: '21', values: [] },
        { key: '3', id: '4', values: [] },
      ],
    };
    const action = {
      type: 'recordDims/deleteDimensionKey',
      payload: '21',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [{ key: '1', id: '34', values: [] }, { key: '3', id: '4', values: [] }],
    });
  });
  it('changeDimensionKey', () => {
    const reducers = model.reducers;
    const reducer = reducers.changeDimensionKey;
    const state = {
      dimensions: [
        {
          key: '34',
          id: '222',
          values: [],
        },
        {
          key: '31',
          id: '111',
          values: [],
        },
      ],
    };
    const action = {
      type: 'recordDims/changeDimension',
      payload: { id: '222', newKey: 'eed' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          key: 'eed',
          id: '222',
          values: [],
        },
        {
          key: '31',
          id: '111',
          values: [],
        },
      ],
    });
  });

  describe('addDimensionValue', () => {
    it("should add a dimension value if it's not empty", () => {
      const reducer = reducers.addDimensionValue;
      const state = {
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      };
      const action = {
        type: 'recordDims/addDimensionValue',
        payload: { id: '3', newValue: 'dsa' },
      };

      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [
              {
                id: generateId(),
                text: 'dsa',
              },
            ],
          },
        ],
      });
    });
    it("should add a dimension value if it's empty", () => {
      const reducer = reducers.addDimensionValue;
      const state = {
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      };
      const action = {
        type: 'recordDims/addDimensionValue',
        payload: { id: '3', newValue: '' },
      };

      expect(reducer(state, action)).toEqual({
        dimensions: [
          {
            id: '3',
            key: '1',
            values: [],
          },
        ],
      });
    });
  });
  it('changeDimensionValue', () => {
    const reducer = reducers.changeDimensionValue;
    const state = {
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ text: '31', id: '22' }, { text: '42', id: '1' }],
        },
        {
          id: '43',
          key: '1',
          values: [{ text: 'sad', id: '1' }, { text: 'daqw', id: '4' }],
        },
      ],
    };
    const action = {
      type: 'recordDims/addDimensionValue',
      payload: { id: '3', vid: '22', newValue: 'dsa' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ text: 'dsa', id: '22' }, { text: '42', id: '1' }],
        },
        {
          id: '43',
          key: '1',
          values: [{ text: 'sad', id: '1' }, { text: 'daqw', id: '4' }],
        },
      ],
    });
  });
  it('deleteDimensionValue', () => {
    const reducer = reducers.deleteDimensionValue;
    const state = {
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
        {
          id: '5',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
      ],
    };
    const action = {
      type: 'recordDims/deleteDimensionValue',
      payload: { id: '3', vid: '5' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }],
        },
        {
          id: '5',
          key: '1',
          values: [{ id: 'ed', text: 'eee' }, { id: '4', text: '444' }, { id: '5', text: 's3' }],
        },
      ],
    });
  });

  it('showValueInput', () => {
    const reducer = reducers.showValueInput;
    const state = {
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    };

    const action = {
      type: 'recordDims/showValueInput',
      payload: '3',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          inputVisible: true,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    });
  });
  it('hideValueInput', () => {
    const reducer = reducers.hideValueInput;
    const state = {
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: true,
        },
      ],
    };

    const action = {
      type: 'recordDims/hideValueInput',
      payload: '4',
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          inputVisible: false,
        },
        {
          id: '4',
          inputVisible: false,
        },
      ],
    });
  });

  it('showValueEdit', () => {
    const reducer = reducers.showValueEdit;
    const state = {
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    };

    const action = {
      type: 'recordDims/showValueEdit',
      payload: { id: '3', vid: '1' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: true,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    });
  });
  it('hideValueEdit', () => {
    const reducer = reducers.hideValueEdit;
    const state = {
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: true },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    };

    const action = {
      type: 'recordDims/hideValueEdit',
      payload: { id: '3', vid: '2' },
    };

    expect(reducer(state, action)).toEqual({
      dimensions: [
        {
          id: '3',
          values: [
            {
              id: '1',
              editable: false,
            },
            { id: '2', editable: false },
          ],
        },
        {
          id: '4',
          values: [
            {
              id: '2',
              editable: false,
            },
          ],
        },
      ],
    });
  });

  it('changeSelectedValues', () => {
    const reducer = reducers.changeSelectedValues;
    const state = {
      selectedValues: [],
    };

    const action = {
      type: 'recordDims/changeSelectedValues',
      payload: ['1234', '1235175'],
    };

    expect(reducer(state, action)).toEqual({
      selectedValues: ['1234', '1235175'],
    });
  });
});
