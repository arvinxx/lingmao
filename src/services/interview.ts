import request from '../utils/request';

export async function queryDocument() {
  return request('/api/documents');
}
export async function saveDocument(params) {
  const { id, title, dimensions, records, selectedValues, tags } = params;
  const data = { id, title, dimensions, records, selectedValues, tags };
  return request('/api/documents', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: data,
  });
}
export async function queryLabels() {
  return request('/api/labels');
}

export async function uploadDocument(params) {
  console.log(params);
  return request('/api/upload', {
    method: 'POST',
    body: params,
  });
}
