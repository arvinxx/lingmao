import model from '../../src/models/stage';
import { generateId } from '../../src/utils/utils';
import { getAnswers } from '../../src/utils';
const reducers = model.reducers;

describe('Reducers', () => {
  it('indexStateNext', () => {
    const reducer = reducers.indexStateNext;
    const state = { indexState: 0 };
    const action = { type: 'stage/indexStateNext' };
    expect(reducer(state, action)).toEqual({ indexState: 1 });
  });
  it('indexStateBack', () => {
    const reducer = reducers.indexStateBack;
    const state = { indexState: 1 };
    const action = { type: 'stage/indexStateBack' };
    expect(reducer(state, action)).toEqual({ indexState: 0 });
  });

  it('addAnalysisStageCount', () => {
    const reducer = reducers.addAnalysisStageCount;
    const state = { analysisStage: 0 };
    const action = { type: 'stage/addAnalysisStageCount' };
    expect(reducer(state, action)).toEqual({ analysisStage: 1 });
  });
  it('reduceAnalysisStageCount', () => {
    const reducer = reducers.reduceAnalysisStageCount;
    const state = { analysisStage: 1 };
    const action = { type: 'stage/reduceAnalysisStageCount' };
    expect(reducer(state, action)).toEqual({ analysisStage: 0 });
  });

  it('changeTabStage', () => {
    const reducer = reducers.changeTabStage;
    const state = { tabStage: '1' };
    const action = { type: 'stage/changeTabStage', payload: '2' };
    expect(reducer(state, action)).toEqual({ tabStage: '2' });
  });

  it('addActivePanelList', () => {
    const reducer = reducers.addActivePanelList;
    const state = { activePanelList: ['0'] };
    const action = { type: 'stage/addActivePanelList', payload: '1' };
    expect(reducer(state, action)).toEqual({ activePanelList: ['0', '1'] });

    const action2 = { type: 'stage/addActivePanelList', payload: '0' };
    expect(reducer(state, action2)).toEqual({ activePanelList: ['0'] });
  });
  it('removeActivePanelList', () => {
    const reducer = reducers.removeActivePanelList;
    const state = { activePanelList: ['0', '3'] };
    const action = { type: 'stage/removeActivePanelList', payload: '3' };
    expect(reducer(state, action)).toEqual({ activePanelList: ['0'] });
  });
});
