import { queryNode } from '../services/api';

export default {
  namespace: 'interview',
  state: {
    record: [],
    label: [],
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryNode);
      yield put({
        type: 'queryRecord',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    queryRecord(state, action) {
      return {
        ...state,
        record: action.payload,
      };
    },
    appendRecord(state, action) {
      return {
        ...state,
        record: state.record.concat(action.payload),
      };
    },
  },
};
