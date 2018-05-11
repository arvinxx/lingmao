import path from 'path';

export default {
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['react-hot-loader/babel'],
    },
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  alias: {
    'pages': path.resolve(__dirname, './src/pages'),
    'models': path.resolve(__dirname, './src/models'),
    'common': path.resolve(__dirname, './src/common'),
    'components': path.resolve(__dirname, './src/components'),
    'services': path.resolve(__dirname, './src/services'),
    'styles': path.resolve(__dirname, './src/styles'),
    'utils': path.resolve(__dirname, './src/utils'),
  },
  proxy: process.env.NO_PROXY
    ? {
        '/api': {
          target: 'http://localhost:7001/',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      }
    : {},
};
