module.exports = {
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': require.resolve('identity-obj-proxy'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '@/models/(.*)$': '<rootDir>/src/models/$1',
    '@/mock/(.*)$': '<rootDir>/mock/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
