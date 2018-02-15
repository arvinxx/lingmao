const path = require('path');
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.less$/,
    loaders: ['style-loader', 'css-loader', 'less-loader'],
    include: path.resolve(__dirname, '../'),
  });
  return storybookBaseConfig;
};
// TODO: 优化 Storybook 的 debug 体验：添加
