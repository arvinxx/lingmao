import { queryNode } from '../services/api';

export default {
  namespace: 'interview',
  state: {
    title: '记录',
    node: [],
  },
  effects: {
    * fetchNode(_, { call, put }) {
      const response = yield call(queryNode);
      yield put({
        type: 'saveNode',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    saveNode(state, action) {
      return {
        ...state,
        node: action.payload,
      };
    },
    changeNode(state, { payload: node }) {
      return { ...state, node };
    },

    appendRecord(state, action) {
      return {
        ...state,
        record: state.record.concat(action.payload),
      };
    },
  },
};
