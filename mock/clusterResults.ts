import Mock from 'mockjs';

export const clusterResult = () =>
  Mock.mock({
    'array|1-5': [
      {
        tagId: '@guid',
        'value|1-5.1': 1,
        tagText: '@ctitle',
        'type|1': ['activities', 'skill', 'attitude'],
        tagGroupText: '@ctitle',
        tagGroupId: '@guid',
      },
    ],
  });
// const clusterResults = Mock.mock({
//   'array|2-7': [() => clusterResult.array],
// });
// export default clusterResults.array;

export const clusterArray = [0, 0, 0, 1, 2, 1, 0, 0, 2, 0];
