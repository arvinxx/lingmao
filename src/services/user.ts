import axios from 'axios';
import qs from 'qs';
import config from '@/src/globalconfig';
const { post } = axios;
export async function asyncLogin(data) {
  return post(config.backendurl + 'login', qs.stringify(data));
}

export async function asyncRegister(params) {
  return post(config.backendurl + 'register', qs.stringify(params));
}
