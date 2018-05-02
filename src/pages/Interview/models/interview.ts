import { queryDocument, saveDocument } from '../services/api';

export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [],
    id: '',
    dimensions: [],
    selectedLabels: [],
  },
  effects: {
    *fetchDocument(_, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryDocument',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *saveDocument({ payload }, { call }) {
      console.log(payload);
      yield call(saveDocument, payload);
    },
  },
  reducers: {
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    querryDocument(state, action) {
      const { title, records, _id, dimensions } = action.payload[0];
      return {
        ...state,
        records,
        title,
        id: _id,
        dimensions,
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
