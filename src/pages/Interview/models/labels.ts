import { queryLabels } from '../services/api';

export default {
  namespace: 'labels',
  state: {
    labels: [],
    selectedLabels: [],
  },
  effects: {
    *fetchLabels(_, { call, put }) {
      const response:Array<object> = yield call(queryLabels);
      yield put({
        type: 'getLabels',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    getLabels(state, action) {
      return {
        ...state,
        labels: action.payload,
      };
    },
    addLabels(state, { payload: labels }) {
      return { ...state, labels };
    },
    selectLabels(state, { payload: selectedLabels }) {
      return { ...state, selectedLabels };
    },
  },
};
