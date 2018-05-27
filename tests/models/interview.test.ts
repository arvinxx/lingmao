import { effects } from 'dva/saga';
import model from '../../src/models/interview';
import { queryDocument } from '../../src/services';
import { generateId, initRecords } from '../../src/utils';

jest.mock('shortid');

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
  it('querryDocument', () => {
    const reducer = reducers.querryDocument;
    const state = {
      title: '',
      records: {},
      id: '',
    };
    const action = {
      type: 'interview/querryDocument',
      payload: {
        docId: '1',
        records: initRecords(''),
        title: '213123',
      },
    };
    expect(reducer(state, action)).toEqual({
      records: initRecords(''),
      title: '213123',
      id: '1',
    });
  });

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

  it('changeRecords', () => {
    const reducer = reducers.changeRecords;
    const state = {
      records: '',
    };

    const action = {
      type: 'interview/changeRecords',
      payload: 'sda',
    };

    expect(reducer(state, action)).toEqual({
      records: 'sda',
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
