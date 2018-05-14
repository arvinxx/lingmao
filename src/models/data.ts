import { DvaModel } from '../../typings/dva';

export type TDim = {
  text: string;
  selected: boolean;
  id: string;
};
export type TDataModel = {
  indexState: number;
  analysisStage: number;
  tabStage: string;
};

interface model extends DvaModel {
  state: TDataModel;
}
const model: model = {
  namespace: 'data',
  state: {
    indexState: 0,
    analysisStage: 0,
    tabStage: '1',
  },
  reducers: {
    indexStateNext(state) {
      return {
        ...state,
        indexState: 1,
      };
    },
    indexStateBack(state) {
      return {
        ...state,
        indexState: 0,
      };
    },

    addAnalysisStageCount(state) {
      return {
        ...state,
        analysisStage: state.analysisStage + 1,
      };
    },
    reduceAnalysisStageCount(state) {
      return {
        ...state,
        analysisStage: state.analysisStage - 1,
      };
    },

    changeTabStage(state, { payload: key }) {
      return {
        ...state,
        tabStage: key,
      };
    },
  },
};

export default model;
