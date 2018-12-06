import Mock from 'mockjs';

export const clusterResult = () =>
  Mock.mock({
    'array|1-5': [
      {
        labelKey: '@guid',
        'value|1-5.1': 1,
        text: '@ctitle',
        labelText: '@ctitle',
      },
    ],
  });

export const clusterArray = [0, 0, 0, 1, 2, 1, 0, 0, 2, 0];
