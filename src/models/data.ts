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
  activePanelList: Array<string>;
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
    activePanelList: ['0'],
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

    addActivePanelList(state, { payload: key }) {
      if (state.activePanelList.some((item) => item === key)) {
        return state;
      } else
        return {
          ...state,
          activePanelList: [...state.activePanelList, key],
        };
    },
    handlePanelClick(state, { payload: activePanelList }) {
      return { ...state, activePanelList };
    },
    removeActivePanelList(state, { payload: key }) {
      return {
        ...state,
        activePanelList: state.activePanelList.filter((item) => item !== key),
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
