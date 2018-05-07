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
});
