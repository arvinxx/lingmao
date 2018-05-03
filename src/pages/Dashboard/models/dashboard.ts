import { queryTags } from '../services/api';

export default {
  namespace: 'dashboard',

  state: {
    tags: [],
  },

  effects: {
    * fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
