import Mock from 'mockjs';
// Mock.Random.extend({
// })

const clusterResult = Mock.mock({
  'array|10-30': [
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
const clusterResults = Mock.mock({
  'array|2-7': [() => clusterResult.array],
});
console.log(clusterResults.array);
export default clusterResults.array;
