export default {
  namespace: 'menu',

  state: {
    collapsed: false,
    showMenu: true,
  },
  reducers: {
    changeMenuCollapsed(state, { payload: collapsed }) {
      return { ...state, collapsed };
    },
    changeMenuState(state) {
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    },
  },
};
