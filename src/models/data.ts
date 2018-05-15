import { DvaModel } from '../../typings/dva';
import { generateId, getAnswers } from '../utils';
import { isEqual, sortBy } from 'lodash';

export type TDim = {
  text: string;
  selected: boolean;
  id: string;
};
export type TDataModel = {
  indexState: number;
  questionState: number;
  analysisStage: number;
  tabStage: string;
  activePanelList: Array<string>;
  quesData: Array<TQuesData>;
  questions: Array<TTableData>;
  selectedQues: Array<TSelectQue>;
};

export type TSelectQue = {
  question: TTableData;
  answers: Array<TTableData>;
};

export type TQuesData = Array<{
  key: string;
  tagId: string;
  tagText: string;
  question: string;
  answer: {
    text: string;
    order: number;
  };
}>;

export type TTableData = {
  key: string;
  name: string;
};

export type TAnswer = {
  text: string;
  id: string;
};

export type TColumn = {
  key: string;
  title: string;
  dataIndex: string;
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
    quesData: [],
    questions: [],
    selectedQues: [],
    questionState: 0,
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

    handleQuesData(state, { payload: quesData }) {
      return { ...state, quesData };
    },

    handleSelectedQuestions(state, { payload: selectedQuestions }: { payload: TTableData[] }) {
      return {
        ...state,
        selectedQues: selectedQuestions.map((selectedQuestion) => ({
          question: selectedQuestion,
          answers: getAnswers(state.quesData, selectedQuestion.name),
        })),
      };
    },
    handleSelectedAnswers(state, { payload: newAnswers }: { payload: Array<TTableData> }) {
      const selectedQues: Array<TSelectQue> = state.selectedQues;
      let replaceIndex = -1;
      if (
        selectedQues.some((selectedQue) => {
          replaceIndex++;
          return isEqual(sortBy(selectedQue.answers, ['id']), sortBy(newAnswers, ['id']));
        })
      ) {
        console.log(replaceIndex);
        selectedQues[replaceIndex].answers = newAnswers;
        return { ...state, selectedQues };
      } else return state;
    },
  },
};

export default model;
