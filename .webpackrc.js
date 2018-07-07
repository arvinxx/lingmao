import { resolve } from 'path';

export default {
  theme: './src/styles/themes/theme.js',
  alias: {
    '@/components': resolve(__dirname, './src/components'),
    '@/utils': resolve(__dirname, './src/utils'),
    '@/services': resolve(__dirname, './src/services'),
    '@/common': resolve(__dirname, './src/common'),
    '@/assets': resolve(__dirname, './src/assets'),
    styles: resolve(__dirname, './src/styles'),
  },
  proxy: process.env.MOCK
    ? {}
    : {
        '/api': 'http://localhost:7001/',
        '/ml': 'http://localhost:9898',
      },
};
