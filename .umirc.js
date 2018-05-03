export default {
  loading: './src/components/loading',
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [/component.*/, /models/, /services/, /\.test\.(js|ts)$/],
      },
    ],
  ],
};
