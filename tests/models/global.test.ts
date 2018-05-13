import model from '../../src/models/global';

const reducers = model.reducers;

describe('Reducers', () => {
  it('addTag', () => {
    const reducer = reducers.changeMenuState;
    const state = {
      showMenu: true,
    };
    const action = {
      type: 'global/changeMenuState',
    };
    expect(reducer(state, action)).toEqual({
      showMenu: false,
    });
    const state2 = {
      showMenu: false,
    };
    expect(reducer(state2, action)).toEqual({
      showMenu: true,
    });
  });
});
