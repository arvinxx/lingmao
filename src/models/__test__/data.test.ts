import model from '../data';
import { getAnswers } from '@/utils';

const reducers = model.reducers;

it('handleQuesData', () => {
  const reducer = reducers.handleQuesData;
  const state = {
    quesData: [],
  };
  const action = {
    type: 'data/handleQuesData',
    payload: [
      [
        {
          tagKey: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagKey: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
  });
});
it('handleKeyDimensions', () => {
  const reducer = reducers.handleKeyDimensions;
  const state = {
    quesData: [
      [
        {
          tagKey: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    keyDimensions: [],
  };
  const action = {
    type: 'data/handleKeyDimensions',
    payload: ['aaaaa', 'gdfycvh'],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagKey: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    keyDimensions: [
      { question: { key: 'aaaaa', text: 'aaaaa' }, answers: getAnswers(state.quesData, 'aaaaa') },
      {
        question: { key: 'gdfycvh', text: 'gdfycvh' },
        answers: getAnswers(state.quesData, 'gdfycvh'),
      },
    ],
  });
});

it('removeMatchSelectedLabels', () => {
  const reducer = reducers.removeMatchSelectedLabels;
  const state = {
    matchSelectedDims: ['2', '5', '6'],
    keyDimensions: [{ tagId: '1' }, { tagId: '2' }, { tagId: '5', tagText: 'dsda' }],
  };
  const action = {
    type: 'data/removeMatchSelectedLabels',
    payload: 2,
  };
  expect(reducer(state, action)).toEqual({
    matchSelectedDims: ['2', '6'],
    keyDimensions: [{ tagKey: '1' }, { tagKey: '2' }, { tagKey: '', tagText: '' }],
  });
});

it('addMatchTagToQuesData ', () => {
  const reducer = reducers.addMatchTagToQuesData;
  const state = {
    quesData: [
      [
        {
          tagKey: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    keyDimensions: [
      {
        question: { name: 'aaaaa', key: 'aaaaa' },
        answers: [{ name: '1345', key: 'dsad' }, { name: '5463121', key: 'fdsfg' }],
        tagId: '123',
        tagText: '标签1',
      },
      {
        question: { name: 'gdfycvh', key: 'gdfycvh' },
        answers: [{ name: '3464', key: 'fgrew' }, { name: '357323bvf', key: 'vcxnnh' }],
        tagKey: '3334',
        tagText: '标签2',
      },
    ],
  };
});

it('addClusterTypeToQuesData ', () => {
  const reducer = reducers.addClusterTypeToQuesData;
  const state = {
    quesData: [
      [
        {
          tagKey: '123',
          tagText: '标签1',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '3334',
          tagText: '标签2',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '123',
          tagText: '标签1',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '3334',
          tagText: '标签2',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
  };
  const action = {
    type: 'data/addClusterTypeToQuesData',
    payload: [0, 1],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagKey: '123',
          tagText: '标签1',
          key: '12433241231',
          type: 0,
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagKey: '3334',
          tagText: '标签2',
          key: '12453241231',
          type: 0,
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagKey: '123',
          tagText: '标签1',
          key: '124324871231',
          type: 1,
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagKey: '3334',
          tagText: '标签2',
          key: '12432411231',
          type: 1,
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
  });
});

it('changePersonaTypeName', () => {
  const reducer = reducers.changePersonaTypeName;
  const state = {
    personaQuesData: [
      {
        typeName: '1',
      },
      {
        typeName: '2',
      },
    ],
  };
  const action = {
    type: 'data/changePersonaTypeName',
    payload: { value: 'das', index: 1 },
  };
  expect(reducer(state, action)).toEqual({
    personaQuesData: [
      {
        typeName: '1',
      },
      {
        typeName: 'das',
      },
    ],
  });
});
