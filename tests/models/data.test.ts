import model from '../../src/models/data';
import { generateId } from '../../src/utils/utils';
import { getAnswers } from '../../src/utils';

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
      { question: { key: 'aaaaa', name: 'aaaaa' }, answers: getAnswers(state.quesData, 'aaaaa') },
      {
        question: { key: 'gdfycvh', name: 'gdfycvh' },
        answers: getAnswers(state.quesData, 'gdfycvh'),
      },
    ],
  });
});
describe('handleSelectedAnswers', () => {
  it('should change answers order', () => {
    const reducer = reducers.handleSelectedAnswers;
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
      type: 'data/handleSelectedAnswers',
      payload: [
        {
          name: 'B.女',
          key: 'HkZYtOP%CM',
        },
        {
          name: 'A.男',
          key: 'SyttOw%Cf',
        },
      ],
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
  it('should remain if nothing change', () => {
    const reducer = reducers.handleSelectedAnswers;
    const state = {
      selectedQues: [
        {
          question: '2',
          answers: [
            { key: '13', name: '1' },
            { key: '43', name: '41' },
            { key: '435', name: '51' },
          ],
        },
        {
          question: '3',
          answers: [
            { key: '315', name: '653' },
            { key: '758', name: 'ghdf' },
            { key: '546', name: 'dsf' },
          ],
        },
      ],
    };
    const action = {
      type: 'data/handleSelectedAnswers',
      payload: [{ key: '13', name: '1' }, { key: '43', name: '41' }, { key: '435', name: '51' }],
    };
    expect(reducer(state, action)).toEqual({
      selectedQues: [
        {
          question: '2',
          answers: [
            { key: '13', name: '1' },
            { key: '43', name: '41' },
            { key: '435', name: '51' },
          ],
        },
        {
          question: '3',
          answers: [
            { key: '315', name: '653' },
            { key: '758', name: 'ghdf' },
            { key: '546', name: 'dsf' },
          ],
        },
      ],
    });
  });
});

it('changeSelectionDims', () => {
  const reducer = reducers.changeSelectionDims;
  const state = {
    selectedDims: ['rJecwftRf', 'Byb9PfYRG', 'HkJtwMFRM'],
  };
  const action = {
    type: 'data/changeSelectionDims',
    payload: { oldId: 'rJecwftRf', newId: 'SJQcwMYAz' },
  };
  expect(reducer(state, action)).toEqual({
    selectedDims: ['Byb9PfYRG', 'HkJtwMFRM', 'SJQcwMYAz'],
  });
});
