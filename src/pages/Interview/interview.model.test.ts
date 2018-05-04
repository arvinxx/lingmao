import { effects } from 'dva/saga';
import model from './models/interview';
import { queryDocument, saveDocument } from './services/api';

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

  it('addRecordText', () => {
    set('1/1/2000'); // Mock datetime
    const reducer = reducers.addRecordText;
    const state = {
      records: [],
    };
    const action = {
      type: 'interview/addRecordText',
      payload: 'dsa',
    };
    expect(reducer(state, action)).toEqual({
      records: [
        {
          text: 'dsa',
          _id: Date.parse(new Date().toString()),
        },
      ],
    });

    reset(); // reset to realtime
  });

  it('changeRecordText', () => {
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
          _id: Date.parse(new Date().toString()),
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

  it('changeDimensionKey', () => {
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

  it('addDimensionValue', () => {
    set('1/1/2000'); // Mock datetime

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
          values: [
            {
              _id: Date.parse(new Date().toString()),
              text: 'dsa',
            },
          ],
        },
      ],
    });
    reset();
  });
  it('deleteDimensionValue', () => {
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

  it('showValueInput', () => {
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
  it('hideValueInput', () => {
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

  it('selectLabels', () => {
    const reducer = reducers.selectLabels;
    const state = {
      selectedLabels: [],
    };

    const action = {
      type: 'interview/selectLabels',
      payload: ['1234', '1235175'],
    };

    expect(reducer(state, action)).toEqual({
      selectedLabels: ['1234', '1235175'],
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
