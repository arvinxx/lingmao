import axios from 'axios';

export async function query() {
  return axios.get('/api/users');
}

export async function queryCurrent() {
  const res = await axios.get('/api/currentUser');
  console.log(res);
  return res;
  // return request('/api/currentUser');
}
