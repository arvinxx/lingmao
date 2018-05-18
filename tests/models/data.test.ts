import model from '../../src/models/data';
import { generateId, getAnswers } from '../../src/utils/';

const reducers = model.reducers;

it('handleSelectedQuestions', () => {
  const reducer = reducers.handleSelectedQuestions;
  const state = {
    quesData: [
      [
        {
          tagId: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    selectedQues: [],
  };
  const action = {
    type: 'data/handleSelectedQuestions',
    payload: [{ key: 'aaaaa', name: 'aaaaa' }, { key: 'gdfycvh', name: 'gdfycvh' }],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagId: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    selectedQues: [
      { question: { key: 'aaaaa', name: 'aaaaa' } },
      {
        question: { key: 'gdfycvh', name: 'gdfycvh' },
      },
    ],
  });
});
it('addAnswersToSelectQues', () => {
  const reducer = reducers.addAnswersToSelectQues;
  const state = {
    quesData: [
      [
        {
          tagId: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    selectedQues: [
      { question: { key: 'aaaaa', name: 'aaaaa' } },
      { question: { key: 'gdfycvh', name: 'gdfycvh' } },
    ],
  };
  const action = {
    type: 'data/addAnswersToSelectQues',
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagId: '',
          tagText: '',
          key: '12433241231',
          question: 'aaaaa',
          answer: { text: '1345', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12453241231',
          question: 'gdfycvh',
          answer: { text: '3464', order: 0 },
        },
      ],
      [
        {
          tagId: '',
          tagText: '',
          key: '124324871231',
          question: 'aaaaa',
          answer: { text: '5463121', order: 0 },
        },
        {
          tagId: '',
          tagText: '',
          key: '12432411231',
          question: 'gdfycvh',
          answer: { text: '357323bvf', order: 0 },
        },
      ],
    ],
    selectedQues: [
      { question: { key: 'aaaaa', name: 'aaaaa' }, answers: getAnswers(state.quesData, 'aaaaa') },
      {
        question: { key: 'gdfycvh', name: 'gdfycvh' },
        answers: getAnswers(state.quesData, 'gdfycvh'),
      },
    ],
  });
});

it('reorderSelectedAnswersr', () => {
  const reducer = reducers.reorderSelectedAnswers;
  const state = {
    selectedQues: [
      {
        question: {
          name: '2.您的性别',
          key: '2.您的性别',
        },
        answers: [
          {
            name: 'A.男',
            key: 'SyttOw%Cf',
          },
          {
            name: 'B.女',
            key: 'HkZYtOP%CM',
          },
        ],
      },
      {
        question: {
          name: '3.您的年龄',
          key: '3.您的年龄',
        },
        answers: [
          {
            name: 'E.49-60',
            key: 'rJErYtOvuAz',
          },
          {
            name: 'D.36-48',
            key: 'SkSHFtODdAM',
          },
          {
            name: 'B.18-26',
            key: 'Bk8rKFdvu0f',
          },
          {
            name: 'C.27-35',
            key: 'ry7DYK%wuCM',
          },
          {
            name: 'A.18岁以下',
            key: 'SkY%Yt%wd0M',
          },
        ],
      },
    ],
  };
  const action = {
    type: 'data/reorderSelectedAnswers',
    payload: { dragIndex: 0, hoverIndex: 1, index: 0 },
  };
  expect(reducer(state, action)).toEqual({
    selectedQues: [
      {
        question: {
          name: '2.您的性别',
          key: '2.您的性别',
        },
        answers: [
          {
            name: 'B.女',
            key: 'HkZYtOP%CM',
          },
          {
            name: 'A.男',
            key: 'SyttOw%Cf',
          },
        ],
      },
      {
        question: {
          name: '3.您的年龄',
          key: '3.您的年龄',
        },
        answers: [
          {
            name: 'E.49-60',
            key: 'rJErYtOvuAz',
          },
          {
            name: 'D.36-48',
            key: 'SkSHFtODdAM',
          },
          {
            name: 'B.18-26',
            key: 'Bk8rKFdvu0f',
          },
          {
            name: 'C.27-35',
            key: 'ry7DYK%wuCM',
          },
          {
            name: 'A.18岁以下',
            key: 'SkY%Yt%wd0M',
          },
        ],
      },
    ],
  });
});

it('removeMatchSelectionDims', () => {
  const reducer = reducers.removeMatchSelectionDims;
  const state = {
    matchSelectedDims: ['2', '5', '6'],
    selectedQues: [{ tagId: '1' }, { tagId: '2' }, { tagId: '5', tagText: 'dsda' }],
  };
  const action = {
    type: 'data/removeMatchSelectionDims',
    payload: 2,
  };
  expect(reducer(state, action)).toEqual({
    matchSelectedDims: ['2', '6'],
    selectedQues: [{ tagId: '1' }, { tagId: '2' }, { tagId: '', tagText: '' }],
  });
});

it('addOrderToQuesData', () => {
  const reducer = reducers.addOrderToQuesData;
  const state = {
    quesData: [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 0 },
        },
      ],
    ],
  };
  const action = {
    type: 'data/addOrderToQuesData',
    payload: [
      {
        question: { key: '你的性别是？', name: '你的性别是？' },
        answers: [
          { name: '男', key: 'dsad' },
          { name: '不男不女', key: '34141' },
          { name: '女', key: '34141' },
        ],
      },
    ],
  };
  expect(reducer(state, action)).toEqual({
    quesData: [
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '男', order: 0 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 2 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小A', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '不男不女', order: 1 },
        },
      ],
      [
        {
          tagId: '11111',
          tagText: '姓名',
          key: generateId(),
          question: '你的名字是？',
          answer: { text: '小B', order: 0 },
        },
        {
          tagId: '22222',
          tagText: '性别',
          key: generateId(),
          question: '你的性别是？',
          answer: { text: '女', order: 2 },
        },
      ],
    ],
  });
});
