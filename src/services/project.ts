import config from '@/src/globalconfig';
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
  return post(config.backendurl + 'projects', { projectName, projectDescription });
}

export async function deleteOneProject(id) {
  return axios.delete(config.backendurl + 'projects/' + id);
}

export async function fetchPersonaData(pid) {
  return get(config.backendurl + 'projects/' + pid + '/personas');
}
