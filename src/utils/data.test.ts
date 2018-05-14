import { getQuestions, getAnswers } from './data';

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
