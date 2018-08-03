export default {
  state: {
    collapsed: false,
    visible: true,
  },
  reducers: {
    handleCollapsed(state, { payload: collapsed }) {
      return { ...state, collapsed };
    },
    handleVisibility(state) {
      return {
        ...state,
        visible: !state.visible,
      };
    },
  },
};
