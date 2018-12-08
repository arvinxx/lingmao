import { pca } from '@/data/ml';

export default {
  'post /ml/kmo': { kmo: Math.random().toFixed(2), sig: Math.random().toFixed(3) },
  'post /ml/pca': pca,
  'post /ml/fa': pca,
};
