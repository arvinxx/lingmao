import request from '../../../utils/request';

export async function queryNode() {
  return request('/api/node');
}
export async function queryLabels() {
  return request('/api/labels');
}
