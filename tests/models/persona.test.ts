import model from '../../src/models/persona';
const reducers = model.reducers;

describe('Persona Model', () => {
  it('loads', () => {
    expect(model);
  });
  it('namespace is persona', () => {
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
  it('changeExpandedDims', () => {
    const reducer = reducers.changeExpandedDims;
    const state = {
      expandedDims: [],
    };

    const action = {
      type: 'persona/changeExpandedDims',
      payload: ['1', '3'],
    };

    expect(reducer(state, action)).toEqual({
      expandedDims: ['1', '3'],
    });
  });
  it('changeCheckedDims', () => {
    const reducer = reducers.changeCheckedDims;
    const state = {
      checkedDims: [],
    };

    const action = {
      type: 'persona/changeCheckedDims',
      payload: ['1', '3'],
    };

    expect(reducer(state, action)).toEqual({
      checkedDims: ['1', '3'],
    });
  });
});
