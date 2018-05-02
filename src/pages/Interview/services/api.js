import request from '../../../utils/request';

export async function queryDocument() {
  return request('/api/documents');
}
export async function saveDocument(params) {
  const { id, title } = params;
  const data = { id, title };
  return request('/api/documents', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: data,
  });
}
export async function queryLabels() {
  return request('/api/labels');
}
