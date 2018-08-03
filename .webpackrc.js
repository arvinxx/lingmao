import { resolve } from 'path';

export default {
  theme: './src/styles/themes/theme.js',
  alias: {
    '@/components': resolve(__dirname, './src/components'),
    '@/utils': resolve(__dirname, './src/utils'),
    '@/services': resolve(__dirname, './src/services'),
    '@/common': resolve(__dirname, './src/common'),
    '@/assets': resolve(__dirname, './src/assets'),
    '@/typings': resolve(__dirname, './typings'),
    '@/mock': resolve(__dirname, './mock'),
    styles: resolve(__dirname, './src/styles'), // less 全局样式文件
  },
};
