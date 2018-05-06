import { effects } from 'dva/saga';
import model from '../../src/models/persona';
import { set, reset } from 'mockdate';

const reducers = model.reducers;

describe('Persona Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is interview', () => {
    expect(model.namespace).toEqual('persona');
  });
});

describe('Reducers', () => {
  it('changeDimVisible', () => {
    const reducer = reducers.changeDimVisible;
    const state = {
      dimVisible: true,
    };

    const action = {
      type: 'persona/changeDimVisible',
    };

    expect(reducer(state, action)).toEqual({
      dimVisible: false,
    });
  });
  it('changeExportVisible', () => {
    const reducer = reducers.changeExportVisible;
    const state = {
      exportVisible: true,
    };

    const action = {
      type: 'persona/changeExportVisible',
    };

    expect(reducer(state, action)).toEqual({
      exportVisible: false,
    });
  });
});

describe('Effects', () => {
  const { call, put } = effects;
  const sagas = model.effects;

  // it('fetchDocument', () => {
  //   const mockData = {
  //     records: ['1'],
  //     dimensions: [],
  //     title: 'hello',
  //   };
  //   const saga = sagas.fetchDocument;
  //   const generator = saga({ type: 'model/fetchDocument' }, { call, put });
  //
  //   // 不是很懂下方的测试原理
  //   let next = generator.next();
  //   expect(next.value).toEqual(call(queryDocument));
  //   next = generator.next();
  //   expect(next.value).toEqual(put({ type: 'querryDocument', payload: [] }));
  // });
});
