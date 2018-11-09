import axios from 'axios';

export const queryPersonaModels = async () => {
  return await axios.get('/api/persona');
};
