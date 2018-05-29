export default {
  loading: './src/components/loading',
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-polyfill',
      {
        extend: ['url-polyfill'],
      },
    ],
    [
      'umi-plugin-dll',
      {
        exclude: [],
        include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
      },
    ],
    [
      'umi-plugin-routes',
      {
        exclude: [/models/, /services/, /components/, /\.test\.(js|ts|tsx|jsx)$/],
      },
    ],
  ],
};
