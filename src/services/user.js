import axios from 'axios';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const res = await axios.get('/api/currentUser');
  console.log(res);
  return res;
  // return request('/api/currentUser');
}
