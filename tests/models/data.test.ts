import model from '../../src/models/data';
import { generateId } from '../../src/utils/utils';
import { getAnswers } from '../../src/utils';
const reducers = model.reducers;

describe('Reducers', () => {
  it('indexStateNext', () => {
    const reducer = reducers.indexStateNext;
    const state = { indexState: 0 };
    const action = { type: 'data/indexStateNext' };
    expect(reducer(state, action)).toEqual({ indexState: 1 });
  });
  it('indexStateBack', () => {
    const reducer = reducers.indexStateBack;
    const state = { indexState: 1 };
    const action = { type: 'data/indexStateBack' };
    expect(reducer(state, action)).toEqual({ indexState: 0 });
  });

  it('addAnalysisStageCount', () => {
    const reducer = reducers.addAnalysisStageCount;
    const state = { analysisStage: 0 };
    const action = { type: 'data/addAnalysisStageCount' };
    expect(reducer(state, action)).toEqual({ analysisStage: 1 });
  });
  it('reduceAnalysisStageCount', () => {
    const reducer = reducers.reduceAnalysisStageCount;
    const state = { analysisStage: 1 };
    const action = { type: 'data/reduceAnalysisStageCount' };
    expect(reducer(state, action)).toEqual({ analysisStage: 0 });
  });

  it('changeTabStage', () => {
    const reducer = reducers.changeTabStage;
    const state = { tabStage: '1' };
    const action = { type: 'data/changeTabStage', payload: '2' };
    expect(reducer(state, action)).toEqual({ tabStage: '2' });
  });

  it('addActivePanelList', () => {
    const reducer = reducers.addActivePanelList;
    const state = { activePanelList: ['0'] };
    const action = { type: 'data/addActivePanelList', payload: '1' };
    expect(reducer(state, action)).toEqual({ activePanelList: ['0', '1'] });

    const action2 = { type: 'data/addActivePanelList', payload: '0' };
    expect(reducer(state, action2)).toEqual({ activePanelList: ['0'] });
  });
  it('removeActivePanelList', () => {
    const reducer = reducers.removeActivePanelList;
    const state = { activePanelList: ['0', '3'] };
    const action = { type: 'data/removeActivePanelList', payload: '3' };
    expect(reducer(state, action)).toEqual({ activePanelList: ['0'] });
  });

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
            question: '2',
            answers: [{ id: '13', text: '1' }, { id: '43', text: '41' }, { id: '435', text: '51' }],
          },
          {
            question: '3',
            answers: [
              { id: '315', text: '653' },
              { id: '758', text: 'ghdf' },
              { id: '546', text: 'dsf' },
            ],
          },
        ],
      };
      const action = {
        type: 'data/handleSelectedAnswers',
        payload: [{ id: '43', text: '41' }, { id: '13', text: '1' }, { id: '435', text: '51' }],
      };
      expect(reducer(state, action)).toEqual({
        selectedQues: [
          {
            question: '2',
            answers: [{ id: '43', text: '41' }, { id: '13', text: '1' }, { id: '435', text: '51' }],
          },
          {
            question: '3',
            answers: [
              { id: '315', text: '653' },
              { id: '758', text: 'ghdf' },
              { id: '546', text: 'dsf' },
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
            answers: [{ id: '13', text: '1' }, { id: '43', text: '41' }, { id: '435', text: '51' }],
          },
          {
            question: '3',
            answers: [
              { id: '315', text: '653' },
              { id: '758', text: 'ghdf' },
              { id: '546', text: 'dsf' },
            ],
          },
        ],
      };
      const action = {
        type: 'data/handleSelectedAnswers',
        payload: [{ id: '13', text: '1' }, { id: '43', text: '41' }, { id: '435', text: '51' }],
      };
      expect(reducer(state, action)).toEqual({
        selectedQues: [
          {
            question: '2',
            answers: [{ id: '13', text: '1' }, { id: '43', text: '41' }, { id: '435', text: '51' }],
          },
          {
            question: '3',
            answers: [
              { id: '315', text: '653' },
              { id: '758', text: 'ghdf' },
              { id: '546', text: 'dsf' },
            ],
          },
        ],
      });
    });
  });
});
