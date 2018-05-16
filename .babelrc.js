module.exports = {
  plugins: [
    'react-hot-loader/babel',
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
