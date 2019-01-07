import axios from 'axios';
import config from '@/src/globalconfig';
const { post } = axios;
export async function asyncLogin(data) {
  return post(config.backendurl + 'login', data);
}

export async function asyncRegister(params) {
  return post(config.backendurl + 'register', params);
}
