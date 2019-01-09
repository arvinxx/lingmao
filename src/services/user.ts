import axios from 'axios';
import qs from 'qs';
import config from '@/src/globalconfig';
const { post } = axios;
export async function asyncLogin(data) {
  return post('/api/v1/login', qs.stringify(data));
}

export async function asyncRegister(params) {
  return post('/api/v1/register', qs.stringify(params));
}
