export default {
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [/models/, /services/, /components/, /\.test\.(js|ts|tsx|jsx)$/],
      },
    ],
  ],
};
