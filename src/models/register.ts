import { register } from '../pages/User/servers/register';
// import { setAuthority } from '../utils/authority';
// import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
      console.log(response);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      // setAuthority('user');
      // reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
