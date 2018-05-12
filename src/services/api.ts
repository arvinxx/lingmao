import request from '../utils/request';

export function saveDocument(params) {
  request('/api/documents', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: params,
  });
}
export async function saveTagGroups(params) {
  request('/api/tag-groups', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: params,
  });
}

export async function uploadDocument(params) {
  console.log(params);
  return request('/api/upload', {
    method: 'POST',
    body: params,
  });
}

export async function queryDocument() {
  return request('/api/documents');
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
