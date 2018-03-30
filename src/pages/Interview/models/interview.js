import { queryNode, queryLabels } from '../services/api';

export default {
  namespace: 'interview',
  state: {
    title: '记录',
    node: [],
    labels: [],
    selectedLabels: [],
  },
  effects: {
    *fetchNode(_, { call, put }) {
      const response = yield call(queryNode);
      yield put({
        type: 'saveNode',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchLabels(_, { call, put }) {
      const response = yield call(queryLabels);
      yield put({
        type: 'getLabels',
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

    appendRecord(state, action) {
      return {
        ...state,
        record: state.record.concat(action.payload),
      };
    },
  },
};
