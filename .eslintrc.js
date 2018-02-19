// 配置参数详解请参见 https://gist.github.com/arvinxx/ded06b2bd53095669445598b7b117dc3
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['compat'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }], // 取消 jsx 格式限制
    'jsx-a11y/anchor-is-valid': [0], // 不用在 Link 中添加 anchor
    'react/prop-types': [0], // 暂时不进行 prop-types 验证
    'object-curly-newline': [0], // 对象不用新建一行
    'import/prefer-default-export': [0], // 不提醒 default export
    'import/no-extraneous-dependencies': [0], // 不提醒非 dev 的依赖包
    'generator-star-spacing': [0],
    'consistent-return': [0],
    'react/forbid-prop-types': [0],
    'global-require': [1],
    'react/jsx-no-bind': [0],
    'react/prefer-stateless-function': [0],
    'no-else-return': [0],
    'no-restricted-syntax': [0],
    'no-use-before-define': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'no-nested-ternary': [0],
    'arrow-body-style': [0],
    'import/extensions': [0],
    'no-bitwise': [0],
    'no-cond-assign': [0],
    'import/no-unresolved': [0],
    'no-mixed-operators': [0],
    'prefer-destructuring': [0],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'function-paren-newline': [0],
    'no-restricted-globals': [0],
    'require-yield': [1],
    'compat/compat': 'error',
  },

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true, // 启用对实验性的objectRest/spreadProperties的支持
    },
  },
  settings: {
    polyfills: ['fetch', 'promises'],
  },
};
