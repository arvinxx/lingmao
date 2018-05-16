import { resolve } from 'path';

export default {
  theme: './src/theme.js',
  alias: {
    components: resolve(__dirname, './src/components'),
    styles: resolve(__dirname, './src/styles'),
    utils: resolve(__dirname, './src/utils'),
    services: resolve(__dirname, './src/services'),
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
