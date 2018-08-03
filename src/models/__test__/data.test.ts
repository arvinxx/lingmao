import model from '../data';
import { getAnswers } from '@/utils';
import { quesData, keyDimensions } from '@/mock/data';

const reducers = model.reducers;

it('handleQuesData', () => {
  const reducer = reducers.handleQuesData;
  const state = {
    quesData: [],
  };
  const action = {
    type: 'data/handleQuesData',
    payload: quesData,
  };
  expect(reducer(state, action)).toEqual({ quesData });
});
it('handleKeyDimensions', () => {
  const reducer = reducers.handleKeyDimensions;
  const state = {
    quesData,
    keyDimensions: [],
  };
  const action = {
    type: 'data/handleKeyDimensions',
    payload: ['aaaaa', 'gdfycvh'],
  };
  expect(reducer(state, action)).toEqual({
    quesData,
    keyDimensions: [
      { question: { key: 'aaaaa', text: 'aaaaa' }, answers: getAnswers(state.quesData, 'aaaaa') },
      {
        question: { key: 'gdfycvh', text: 'gdfycvh' },
        answers: getAnswers(state.quesData, 'gdfycvh'),
      },
    ],
  });
});

it('addLabelsToKeyDimensions ', () => {
  const reducer = reducers.addLabelsToKeyDimensions;
  const state = {
    keyDimensions: [
      {
        question: {
          text: '2.您的性别',
          key: '2.您的性别',
        },
      },
      {
        question: {
          text: '3.您的年龄',
          key: '3.您的年龄',
        },
      },
    ],
  };
  const action = {
    type: 'data/addLabelsToKeyDimensions',
    payload: [
      {
        text: '标签的撒',
        key: 'S1a3uMt0M',
        questionKey: '2.您的性别',
      },
      {
        text: '未的方式',
        key: 'Sy4JKMF0M',
        questionKey: '3.您的年龄',
      },
    ],
  };
  expect(reducer(state, action)).toEqual({
    keyDimensions: [
      {
        question: {
          text: '2.您的性别',
          key: '2.您的性别',
        },
        labelText: '标签的撒',
        labelKey: 'S1a3uMt0M',
      },
      {
        question: {
          text: '3.您的年龄',
          key: '3.您的年龄',
        },
        labelText: '未的方式',
        labelKey: 'Sy4JKMF0M',
      },
    ],
  });
});

it('addMatchLabelToQuesData ', () => {
  const reducer = reducers.addMatchLabelToQuesData;
  const state = {
    quesData,
    keyDimensions,
  };
  const action = {
    type: 'data/addMatchLabelToQuesData',
  };

  expect(reducer(state, action)).toEqual({
    quesData: [
      {
        records: [
          {
            labelKey: '123',
            labelText: '标签1',
            ...quesData[0].records[0],
          },
          {
            labelKey: '3334',
            labelText: '标签2',
            ...quesData[0].records[1],
          },
        ],
      },
      {
        records: [
          {
            labelKey: '123',
            labelText: '标签1',
            ...quesData[1].records[0],
          },
          {
            labelKey: '3334',
            labelText: '标签2',
            ...quesData[1].records[1],
          },
        ],
      },
    ],
    keyDimensions,
  });
});

it('addClusterTypeToQuesData ', () => {
  const reducer = reducers.addClusterTypeToQuesData;
  const state = { quesData };
  const action = {
    type: 'data/addClusterTypeToQuesData',
    payload: [0, 1],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      {
        type: 0,
        records: quesData[0].records,
      },
      {
        type: 1,
        records: quesData[1].records,
      },
    ],
  });
});

it('changePersonaTypeName', () => {
  const reducer = reducers.changePersonaTypeName;
  const state = {
    userModels: [
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
    userModels: [
      {
        typeName: '1',
      },
      {
        typeName: 'das',
      },
    ],
  });
});
