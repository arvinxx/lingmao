import axios from 'axios';

const { get } = axios;
export async function query404() {
  return get('/api/404');
}

export async function query401() {
  return get('/api/401');
}

export async function query403() {
  return get('/api/403');
}

export async function query500() {
  return get('/api/500');
}
