import axios from 'axios';
const { post } = axios;
export async function asyncLogin(data) {
  return post('/api/v1/login', data);
}

export async function asyncRegister(params) {
  return post('/api/v1/register', params);
}
