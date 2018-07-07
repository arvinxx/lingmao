export default {
  plugins: [
    ['umi-plugin-dva', { immer: true }],
    [
      'umi-plugin-routes',
      {
        exclude: [
          /model\.[jt]sx?$/,
          /\.test\.[jt]sx?$/,
          /service\.[jt]sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
    ],
    [
      'umi-plugin-dll',
      {
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
      },
    ],
  ],
};
