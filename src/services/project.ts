import config from '@/src/globalconfig';
import qs from 'qs';
import axios from 'axios';
const { get, post } = axios;

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
  const sendData = { projectName, projectDescription };
  return post(config.backendurl + 'projects', qs.stringify(sendData));
}

export async function deleteOneProject(id) {
  // delete method: api/v1/projects/15
  const data = {id};
  return post(config.backendurl + 'projects/delproject', qs.stringify(data));
}

export async function fetchPersonaData(pid) {
  return get(config.backendurl + 'projects/' + pid + '/personas');
}
