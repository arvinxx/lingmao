import model from '@/models/menu';

const reducers = model.reducers;

describe('Reducers', () => {
  it('changeMenuState', () => {
    const reducer = reducers.changeMenuState;
    const state = {
      showMenu: true,
    };
    const action = {
      type: 'menu/changeMenuState',
    };
    expect(reducer(state)).toEqual({
      showMenu: false,
    });
  });
  it('changeMenuCollapsed', () => {
    const reducer = reducers.changeMenuCollapsed;
    const state = {
      collapsed: false,
    };
    const action = {
      type: 'menu/changeMenuCollapsed',
      payload: true,
    };
    expect(reducer(state, action)).toEqual({
      collapsed: true,
    });
  });
});
