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
  return post('/api/v1/projects', { projectName, projectDescription });
}

export async function deleteOneProject(id) {
  return axios.delete('/api/v1/projects/' + id);
}

export async function fetchPersonaData(pid) {
  return get('/api/v1/projects/' + pid + '/personas');
}
