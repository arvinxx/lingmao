import model from '../menu';

const reducers = model.reducers;

describe('Reducers', () => {
  it('handleVisibility', () => {
    const reducer = reducers.handleVisibility;
    const state = {
      visible: true,
    };
    const action = {
      type: 'menu/handleVisibility',
    };
    expect(reducer(state)).toEqual({
      visible: false,
    });
  });
  it('handleCollapsed', () => {
    const reducer = reducers.handleCollapsed;
    const state = {
      collapsed: false,
    };
    const action = {
      type: 'menu/handleCollapsed',
      payload: true,
    };
    expect(reducer(state, action)).toEqual({
      collapsed: true,
    });
  });
});
