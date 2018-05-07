import { effects } from 'dva/saga';
import model from '../../src/models/interview';
import { queryDocument, saveDocument } from '../../src/services/interview';
import { generateId } from '../../src/utils/utils';

import { set, reset } from 'mockdate';

const reducers = model.reducers;

describe('Interview Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is interview', () => {
    expect(model.namespace).toEqual('interview');
  });
});

describe('Reducers', () => {
  it('changeTitle', () => {
    const reducer = reducers.changeTitle;
    const state = {
      title: '',
    };

    const action = {
      type: 'interview/changeTitle',
      payload: 'sda',
    };

    expect(reducer(state, action)).toEqual({
      title: 'sda',
    });
  });

  it('addRecord', () => {
    set('1/1/2000'); // Mock datetime
    const reducer = reducers.addRecord;
    const state = {
      records: [],
    };
    const action = {
      type: 'interview/addRecord',
    };
    expect(reducer(state, action)).toEqual({
      records: [
        {
          text: '',
          id: generateId(),
          description: '',
        },
      ],
    });

    reset(); // reset to realtime
  });
  describe('deleteRecord', () => {
    it('should delete when text and description is empty', () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteRecord;
      const state = {
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '',
            description: '',
          },
        ],
      };
      const action = {
        type: 'interview/deleteRecord',
        payload: '3',
      };

      expect(reducer(state, action)).toEqual({
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
        ],
      });
    });
    it('should keep state when text and description is not empty', () => {
      const reducers = model.reducers;
      const reducer = reducers.deleteRecord;
      const state1 = {
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '3432654',
            description: '345dfs',
          },
        ],
      };
      const state2 = {
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '',
            description: '345dfs',
          },
        ],
      };
      const state3 = {
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '12345',
            description: '',
          },
        ],
      };

      const action = {
        type: 'interview/deleteRecord',
        payload: '3',
      };

      expect(reducer(state1, action)).toEqual({
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '3432654',
            description: '345dfs',
          },
        ],
      });
      expect(reducer(state2, action)).toEqual({
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '',
            description: '345dfs',
          },
        ],
      });
      expect(reducer(state3, action)).toEqual({
        records: [
          {
            id: '1',
            text: 'delete',
            description: '345',
          },
          {
            id: '3',
            text: '12345',
            description: '',
          },
        ],
      });

    });
  });

  it('changeRecordText', () => {
    const reducers = model.reducers;
    const reducer = reducers.changeRecordText;
    const state = {
      records: [
        {
          id: '1',
          text: 'delete',
          collapsed: false,
          children: [],
        },
        {
          id: '3',
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
          id: '1',
          text: 'delete',
          collapsed: false,
          children: [],
        },
        {
          id: '3',
          text: 'hello',
          collapsed: false,
          children: [],
        },
      ],
    });
  });

  it('addDimensionKey', () => {
    set('1/1/2000'); // Mock datetime

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
          id: generateId(),
          values: [],
        },
      ],
    });

    reset(); // reset to realtime
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
      type: 'interview/deleteDimensionKey',
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
      type: 'interview/changeDimension',
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

  it('addDimensionValue', () => {
    set('1/1/2000'); // Mock datetime

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
      type: 'interview/addDimensionValue',
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
    reset();
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
      type: 'interview/addDimensionValue',
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
      type: 'interview/deleteDimensionValue',
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
      type: 'interview/showValueInput',
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
      type: 'interview/hideValueInput',
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
      type: 'interview/showValueInput',
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
      type: 'interview/hideValueEdit',
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
      type: 'interview/changeSelectedValues',
      payload: ['1234', '1235175'],
    };

    expect(reducer(state, action)).toEqual({
      selectedValues: ['1234', '1235175'],
    });
  });
  it('changeTagVisible', () => {
    const reducer = reducers.changeTagVisible;
    const state = {
      tagVisible: true,
    };

    const action = {
      type: 'interview/changeTagVisible',
    };

    expect(reducer(state, action)).toEqual({
      tagVisible: false,
    });
  });
  it('changeUploadVisible', () => {
    const reducer = reducers.changeUploadVisible;
    const state = {
      uploadVisible: true,
    };

    const action = {
      type: 'interview/changeUploadVisible',
    };

    expect(reducer(state, action)).toEqual({
      uploadVisible: false,
    });
  });
});

describe('Effects', () => {
  const { call, put } = effects;
  const sagas = model.effects;

  it('fetchDocument', () => {
    const mockData = {
      records: ['1'],
      dimensions: [],
      title: 'hello',
    };
    const saga = sagas.fetchDocument;
    const generator = saga({ type: 'model/fetchDocument' }, { call, put });

    // 不是很懂下方的测试原理
    let next = generator.next();
    expect(next.value).toEqual(call(queryDocument));
    next = generator.next();
    expect(next.value).toEqual(put({ type: 'querryDocument', payload: [] }));
  });
});
