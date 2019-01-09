import config from '@/src/globalconfig';
import qs from 'qs';
import axios from 'axios';
const { get, post } = axios;

export async function fetchProjectData() {
  return get('/api/v1/projects');
}

export async function fetchProjectStarData() {
  return post('/api/v1/projects/starred');
}

export async function fetchProjectRecentData() {
  return post('/api/v1/projects/recent');
}

export async function createNewProject(data) {
  const projectName = data.name;
  const projectDescription = data.description;
  const sendData = { projectName, projectDescription };
  return post('/api/v1/projects', qs.stringify(sendData));
}

export async function deleteOneProject(id) {
  const data = {id};
  return post('/api/v1/projects/delproject', qs.stringify(data));
}

export async function fetchPersonaData(pid) {
  return get('/api/v1/projects/' + pid + '/personas');
}
