import model from '../../src/models/data';
import { generateId } from '../../src/utils';
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
});
