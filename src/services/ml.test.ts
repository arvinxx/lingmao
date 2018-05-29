import { getClusterDims, getPersonaQuesData } from './ml';

it('getClusterDims', () => {
  const quesData = [
    [
      { tagText: '1', type: 1, answer: { order: 0 } },
      { tagText: '2', type: 1, answer: { order: 3 } },
      { tagText: '3', type: 1, answer: { order: 4 } },
    ],
    [
      { tagText: '1', type: 2, answer: { order: 3 } },
      { tagText: '2', type: 2, answer: { order: 1 } },
      { tagText: '3', type: 2, answer: { order: 2 } },
    ],
    [
      { tagText: '1', type: 1, answer: { order: 2 } },
      { tagText: '2', type: 1, answer: { order: 3 } },
      { tagText: '3', type: 1, answer: { order: 2 } },
    ],
  ];
  const clusterArray = [1, 2, 1];
  expect(getClusterDims(clusterArray, quesData, 1)).toEqual([
    { text: '1', value: 1 },
    { text: '2', value: 3 },
    { text: '3', value: 3 },
  ]);
});

it('getPersonaQuesData ', () => {
  const quesData = [
    [
      { tagText: '1', type: 1, answer: { order: 0, text: '1' }, question: 'b' },
      { tagText: '2', type: 1, answer: { order: 3, text: 'q' }, question: 'd' },
      { tagText: '3', type: 1, answer: { order: 4, text: 'z' }, question: 'c' },
    ],
    [
      { tagText: '1', type: 2, answer: { order: 2, text: '2' }, question: 'b' },
      { tagText: '2', type: 2, answer: { order: 1, text: 'w' }, question: 'd' },
      { tagText: '3', type: 2, answer: { order: 2, text: 'x' }, question: 'c' },
    ],
    [
      { tagText: '1', type: 1, answer: { order: 1, text: '3' }, question: 'b' },
      { tagText: '2', type: 1, answer: { order: 3, text: 'q' }, question: 'd' },
      { tagText: '3', type: 1, answer: { order: 3, text: 'c' }, question: 'c' },
    ],
  ];
  const cluster = [1, 2, 1];
  expect(getPersonaQuesData(quesData, cluster, 0)).toEqual([
    { tagText: '1', key: 'persona-0-0', type: 1, answer: { order: 0.5, text: '3' }, question: 'b' },
    { tagText: '2', key: 'persona-0-1', type: 1, answer: { order: 3, text: 'q' }, question: 'd' },
    { tagText: '3', key: 'persona-0-2', type: 1, answer: { order: 3.5, text: 'z' }, question: 'c' },
  ]);
});
