import { getClusterDims, getPersonaQuesDatum } from './ml';

it('getClusterDims', () => {
  const quesData = [
    [
      { tagText: '1', tagId: '1', type: 1, answer: { order: 0, text: 'a' } },
      { tagText: '2', tagId: '2', type: 1, answer: { order: 0, text: 'q' } },
      { tagText: '3', tagId: '3', type: 1, answer: { order: 1, text: '1' } },
    ],
    [
      { tagText: '1', tagId: '1', type: 2, answer: { order: 2, text: 'b' } },
      { tagText: '2', tagId: '2', type: 2, answer: { order: 1, text: 'w' } },
      { tagText: '3', tagId: '3', type: 2, answer: { order: 1, text: '1' } },
    ],
    [
      { tagText: '1', tagId: '1', type: 1, answer: { order: 1, text: 'c' } },
      { tagText: '2', tagId: '2', type: 1, answer: { order: 0, text: 'q' } },
      { tagText: '3', tagId: '3', type: 1, answer: { order: 0, text: '2' } },
    ],
  ];
  const clusterArray = [1, 2, 1];
  const selectQues = [
    {
      tagId: '1',
      answers: [
        { key: 'qweqwfsd', name: 'a' },
        { key: 'qsdweqwfsd', name: 'c' },
        { key: 'qsdweqwdssfsd', name: 'b' },
      ],
    },
    { tagId: '2', answers: [{ key: '143', name: 'q' }, { key: '13', name: 'w' }] },
    { tagId: '3', answers: [{ key: '143', name: '2' }, { key: '13', name: '1' }] },
  ];
  expect(getClusterDims(clusterArray, quesData, 1, selectQues)).toEqual([
    { text: 'c', value: 0.5, tagText: '1' },
    { text: 'q', value: 0, tagText: '2' },
    { text: '1', value: 0.5, tagText: '3' },
  ]);
});

it('getPersonaQuesDatum ', () => {
  const quesData = [
    [
      { tagText: '1', type: 0, answer: { order: 0, text: '1' }, question: 'b' },
      { tagText: '2', type: 0, answer: { order: 3, text: 'q' }, question: 'd' },
      { tagText: '3', type: 0, answer: { order: 4, text: 'z' }, question: 'c' },
    ],
    [
      { tagText: '1', type: 1, answer: { order: 2, text: '2' }, question: 'b' },
      { tagText: '2', type: 1, answer: { order: 1, text: 'w' }, question: 'd' },
      { tagText: '3', type: 1, answer: { order: 2, text: 'x' }, question: 'c' },
    ],
    [
      { tagText: '1', type: 0, answer: { order: 1, text: '3' }, question: 'b' },
      { tagText: '2', type: 0, answer: { order: 3, text: 'q' }, question: 'd' },
      { tagText: '3', type: 0, answer: { order: 3, text: 'c' }, question: 'c' },
    ],
  ];
  expect(getPersonaQuesDatum(quesData, 0, 2 / 3)).toEqual({
    typeName: '类别1',
    percent: 2 / 3,
    type: 1,
    quesData: [
      {
        tagText: '1',
        key: 'persona-0-0',
        answer: { order: 0.5, text: '3' },
        question: 'b',
      },
      { tagText: '2', key: 'persona-0-1', answer: { order: 3, text: 'q' }, question: 'd' },
      {
        tagText: '3',
        key: 'persona-0-2',
        answer: { order: 3.5, text: 'z' },
        question: 'c',
      },
    ],
  });
  expect(getPersonaQuesDatum(quesData, 1, 1 / 3)).toEqual({
    typeName: '类别2',
    percent: 1 / 3,
    type: 2,
    quesData: [
      { tagText: '1', key: 'persona-1-0', answer: { order: 2, text: '2' }, question: 'b' },
      { tagText: '2', key: 'persona-1-1', answer: { order: 1, text: 'w' }, question: 'd' },
      { tagText: '3', key: 'persona-1-2', answer: { order: 2, text: 'x' }, question: 'c' },
    ],
  });
});
