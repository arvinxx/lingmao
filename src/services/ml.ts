import kmeans from 'ml-kmeans';

export const cluster = async (params) => {
  const { data, center, K } = params;
  console.log(kmeans);
  if (data.length <= K) {
    return new Error('聚类中心数大于等于维度值');
  } else {
    if (center !== undefined) {
      return kmeans(data, K, { initialization: center });
    } else return kmeans(data, K);
  }
};

export const clusterPercent = (cluster) => {

};
