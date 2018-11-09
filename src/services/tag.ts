import axios from 'axios';

export const queryTags = async () => {
  return await axios.get('/api/tags');
};
