import { DvaModel } from '@/typings/dva';
import { message } from 'antd';
import router from 'umi/router';
import { asyncRegister } from '@/services';

export interface IRegisterState {
  userName: string;
  phoneNumber: string;
  password: string;
}

const register: DvaModel<IRegisterState> = {
  state: {
    userName: '',
    phoneNumber: '',
    password: '',
  },
  reducers: {
    changeUserName(state, { payload: data }) {
      const userName = data.temp;
      return { ...state, userName };
    },
    changePhoneNumber(state, { payload: data }) {
      const phoneNumber = data.temp;
      return { ...state, phoneNumber };
    },
    changePassword(state, { payload: data }) {
      const password = data.temp;
      return { ...state, password };
    },
  },
  effects: {
    *register({ payload }, { put, select }) {
      const { phoneNumber, password, userName } = yield select((state) => state.register);
      // check it right:
      console.log(phoneNumber, password, userName);
      const data = {
        phoneNumber: phoneNumber,
        password: password,
        userName: userName,
      };
      asyncRegister(data).then(function(response) {
          console.log(response);
          if (response.data.isSuccess) {
            message.success('登录成功', 1, function() {
              router.push('/login');
            });
          } else {
            message.warning('该用户已被注册', 2.5);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};

export default register;
