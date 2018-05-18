module.exports = {
  plugins: [
    'react-hot-loader/babel',
    'transform-decorators-legacy',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: './components',
          styles: './styles',
          utils: './utils',
        },
      },
    ],
  ],
};
