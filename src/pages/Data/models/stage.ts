import { DvaModel } from '@/typings/dva';

export type TReductionDiagrams = string[];
export interface IReduction {
  isReduced: boolean;
  reductionDiagrams: TReductionDiagrams;
  rotation: boolean;
}
export interface IStageState {
  indexState: number;
  questionState: number;
  tagMatchState: number;
  analysisStage: number;
  tabStage: string;
  showCharts: boolean;
  activePanelList: Array<string>;
  reduction: IReduction;
}
const stage: DvaModel<IStageState> = {
  state: {
    indexState: 0,
    questionState: 0,
    analysisStage: 0,
    tagMatchState: 0,
    tabStage: '1',
    showCharts: false,
    activePanelList: ['0'],
    reduction: {
      isReduced: false,
      reductionDiagrams: [],
      rotation: false,
    },
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

    questionStateNext(state) {
      return {
        ...state,
        questionState: state.questionState + 1,
      };
    },
    questionStateBack(state) {
      return {
        ...state,
        questionState: state.questionState - 1,
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

    showCharts(state, { payload }) {
      return {
        ...state,
        showCharts: payload,
      };
    },

    handleTagMatchState(state, { payload: tagMatchState }) {
      return { ...state, tagMatchState };
    },

    handleReductionDiagrams(state, { payload: reductionDiagrams }) {
      return { ...state, reduction: { ...state.reduction, reductionDiagrams } };
    },

    startReducing(state, action) {
      return {
        ...state,
        reduction: { ...state.reduction, isReduced: true },
      };
    },

    handleReductionRotation(state, { payload: rotation }) {
      return {
        ...state,
        reduction: { ...state.reduction, rotation },
      };
    },
  },
};
export default stage;
