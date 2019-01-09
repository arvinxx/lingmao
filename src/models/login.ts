import { DvaModel } from '@/typings/dva';
import { message } from 'antd';
import router from 'umi/router';
import { setAuthority } from '@/utils';
import { reloadAuthorized } from '@/utils';
import { asyncLogin } from '@/services';

export interface ILoginState {
  phoneNumber: string;
  password: string;
  isLogin: boolean;
  userInfo: object;
}

const login: DvaModel<ILoginState> = {
  state: {
    phoneNumber: '',
    password: '',
    isLogin: false,
    userInfo: null,
  },
  reducers: {
    changePhoneNumber(state, { payload: data }) {
      const phoneNumber = data.temp;
      return { ...state, phoneNumber };
    },
    changePassword(state, { payload: data }) {
      const password = data.temp;
      return { ...state, password };
    },
    changeIsLogin(state, { payload: data }) {
      const isLogin = data.isLogin;
      // console.log('islogin:',isLogin);
      return { ...state, isLogin };
    },
    changeUserInfo(state, { payload: data }) {
      const userInfo = data.userInfo;
      // console.log('userinfo', userInfo);
      return { ...state, userInfo };
    },
    logout(state) {
      return { ...state, userInfo: null, isLogin: false };
    },
  },
  effects: {
    *login({ payload }, { put, select, call }) {
      const { phoneNumber, password } = yield select((state) => state.login);
      // check it right:
      // console.log(phoneNumber, password);
      const data = {
        mobile: phoneNumber,
        password,
      };
      let isLogin = false;
      const { data: resData } = yield call(asyncLogin, data);
      const { userInfo, isValid } = resData;
      if (isValid) {
        isLogin = true;
        reloadAuthorized();
      } else message.warning('密码与用户名不匹配', 2.5);
      yield put({
        type: 'changeIsLogin',
        payload: { isLogin },
      });
      yield put({
        type: 'changeUserInfo',
        payload: { userInfo },
      });
      yield router.push('/project');
    },
  },
};

export default login;
