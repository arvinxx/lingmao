import { resolve } from 'path';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: true,
        antd: true, // antd 默认不开启，如有使用需自行配置
        routes: {
          exclude: [
            /model\.[jt]sx?$/,
            /\.test\.[jt]sx?$/,
            /service\.[jt]sx?$/,
            /models\//,
            /components/,
            /services\//,
          ],
        },
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/PageLoading',
        },
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
      },
    ],
  ],
  theme: './src/styles/themes/theme.js',
  alias: {
    '@/components': resolve(__dirname, './src/components'),
    '@/utils': resolve(__dirname, './src/utils'),
    '@/services': resolve(__dirname, './src/services'),
    '@/common': resolve(__dirname, './src/common'),
    '@/assets': resolve(__dirname, './src/assets'),
    '@/typings': resolve(__dirname, './typings'),
    '@/mock': resolve(__dirname, './mock'),
    '@/data': resolve(__dirname, './data'),
    '@/src': resolve(__dirname, './src'),
    styles: resolve(__dirname, './src/styles'), // less 全局样式文件
  },
  proxy: {
    '/api/v1': 'http://127.0.0.1:7001/api/v1/',
  },
};
