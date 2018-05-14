import { getQuestions, getAnswers, generateIndexData } from './data';

it('translate rawData to header', () => {
  const rawData = [{ aaa: 'das', bbb: 'dsadf', ccc: 'dadfre' }];
  expect(getQuestions(rawData)).toEqual([
    { key: 'aaa', name: 'aaa' },
    { key: 'bbb', name: 'bbb' },
    { key: 'ccc', name: 'ccc' },
  ]);
});

it('translate rawData to values', () => {
  const rawData = [
    { aaa: '3as', bbb: 'ds63df', ccc: 'dad64fre' },
    { aaa: 'da6', bbb: 'dsadf', ccc: 'dasfdfre' },
    { aaa: 'das', bbb: 'ds3ad4f', ccc: 'dadfre' },
    { aaa: 'das', bbb: 'dsad4f', ccc: 'dadfre' },
  ];
  expect(getAnswers(rawData, 'aaa')).toEqual([
    { key: '3as', name: '3as' },
    { key: 'da6', name: 'da6' },
    { key: 'das', name: 'das' },
  ]);
});

it('generateIndexData ', () => {
  const savedData = [
    {
      name: {
        id: '1312345',
        alias: 'name',
        question: '你的名字是？',
        answer: { text: 'xxxx', order: 3 },
      },
      gender: {
        id: '456234',
        alias: 'gender',
        question: '你的性别是？',
        answer: { text: '男', order: 4 },
      },
    },
  ];
  expect(generateIndexData(savedData)).toEqual([
    {key:'1312345'}
  ])
});
