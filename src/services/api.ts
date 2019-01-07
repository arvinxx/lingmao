import axios from 'axios';
import config from '@/src/globalconfig';
const { get, post } = axios;
export function saveDocument(params) {
  post('/api/documents', params);
  // request('/api/documents', {
  //   method: 'POST',
  //   'Content-Type': 'application/json; charset=utf-8',
  //   body: params,
  // });
}
export async function saveTagGroups(params) {
  post('/api/tag-groups', params);

  // request('/api/tag-groups', {
  //   method: 'POST',
  //   'Content-Type': 'application/json; charset=utf-8',
  //   body: params,
  // });
}

export async function uploadDocument(params) {
  console.log(params);
  return post('/api/upload', params);
  // return request('/api/upload', {
  //   method: 'POST',
  //   body: params,
  // });
}

export async function queryDocument() {
  return get('/api/documents');
}

export async function fakeAccountLogin(params) {
  return post('/api/login/account', params);
}

export async function fakeRegister(params) {
  return post('/api/register', params);
}

export async function queryNotices() {
  return get('/api/notices');
}

export async function fetchProjectData() {
  return get(config.backendurl + 'projects');
}

export async function fetchProjectStarData() {
  return post(config.backendurl + 'projects/starred');
}

export async function fetchProjectRecentData() {
  return post(config.backendurl + 'projects/recent');
}

export async function createNewProject(data) {
  const projectName = data.name;
  const projectDescription = data.description;
  return post(config.backendurl + 'projects', { projectName, projectDescription });
}

export async function deleteOneProject(id) {
  return axios.delete(config.backendurl + 'projects/' + id);
}

export async function fetchPersonaData(pid) {
  return get(config.backendurl + 'projects/' + pid + '/personas');
}
