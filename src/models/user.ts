import { query as queryUsers, queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    login: false,
  },

  effects: {
    *fetch(action, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(action, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    'login/start'(state) {
      return { ...state, loginLoading: true };
    },

    'login/end'(state) {
      return { ...state, loginLoading: false };
    },

    'login/error'(state, action) {
      return { ...state, loginErrorMsg: action.payload };
    },

    'login/success'(state, action) {
      return { ...state, ...action.payload, login: true, loginErrorMsg: '' };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
