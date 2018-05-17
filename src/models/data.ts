import { DvaModel } from '../../typings/dva';
import { generateId, getAnswers } from '../utils';
import { isEqual, sortBy, concat } from 'lodash';

import { TTag } from './tag';

export type TDim = {
  id: string;
  text: string;
};

export type TSelectQue = {
  question: TTableData;
  answers: Array<TTableData>;
  tagId: string;
  tagText: string;
};
export type TQuesDataItem = {
  key: string;
  tagId: string;
  tagText: string;
  question: string;
  answer: {
    text: string;
    order: number;
  };
};

export type TQuesData = TQuesRecord[];
export type TQuesRecord = TQuesDataItem[];
export type TAnswer = {
  text: string;
  id: string;
};

export type TTableData = {
  key: string;
  name: string;
};

export type TColumn = {
  key: string;
  title: string;
  dataIndex: string;
};

export type TDimsSelect = string[];
export type TDataModel = {
  quesData: Array<TQuesData>;
  selectedQues: Array<TSelectQue>;
  matchSelectedDims: TDimsSelect;
  reductionSelectedDims: TDimsSelect;
  clusterSelectedDims: TDimsSelect;
};
interface model extends DvaModel {
  state: TDataModel;
}
const model: model = {
  namespace: 'data',
  state: {
    quesData: [],
    selectedQues: [],
    clusterSelectedDims: [],
    matchSelectedDims: [],
    reductionSelectedDims: [],
  },
  reducers: {
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
    handleSelectedQues(state, { payload: selectedQues }) {
      return { ...state, selectedQues };
    },
    handleSelectedAnswers(state, { payload: newAnswers }: { payload: Array<TTableData> }) {
      const selectedQues: Array<TSelectQue> = concat(state.selectedQues);
      let replaceIndex = -1;
      if (
        selectedQues.some((selectedQue) => {
          replaceIndex++;
          return isEqual(sortBy(selectedQue.answers, ['key']), sortBy(newAnswers, ['key']));
        })
      ) {
        selectedQues[replaceIndex].answers = newAnswers;

        return { ...state, selectedQues };
      } else return state;
    },

    addSelectionDims(state, { payload: newDimId }) {
      return { ...state, matchSelectedDims: [...state.matchSelectedDims, newDimId] };
    },

    changeMatchSelectedDims(state, { payload }) {
      const { oldId, newId } = payload;
      return {
        ...state,
        matchSelectedDims: [...state.matchSelectedDims.filter((id) => id !== oldId), newId],
      };
    },

    addReductionSelectedDims(state, { payload: newDims }) {
      return { ...state, reductionSelectedDims: [...state.reductionSelectedDims, newDims] };
    },

    removeReductionSelectedDims(state, { payload: removeId }) {
      return {
        ...state,
        reductionSelectedDims: state.reductionSelectedDims.filter((id) => id !== removeId),
      };
    },
    addClusterSelectedDims(state, { payload: newDims }) {
      return { ...state, clusterSelectedDims: [...state.clusterSelectedDims, newDims] };
    },
    removeClusterSelectedDims(state, { payload: removeId }) {
      return {
        ...state,
        clusterSelectedDims: state.clusterSelectedDims.filter((id) => id !== removeId),
      };
    },

    addOrderToquesData(state, { payload: selectedQues }) {
      const quesData: TQuesData = concat(state.quesData);
      selectedQues.forEach((selectedQue: TSelectQue) => {
        const { question: selectedQuestion, answers: selectedAnswers } = selectedQue;
        selectedAnswers.forEach((selectedAnswer, index) => {
          quesData.forEach((TQuesDataRecord) => {
            TQuesDataRecord.forEach((TQuesDataItem) => {
              const { answer, question } = TQuesDataItem;
              if (question === selectedQuestion.name && selectedAnswer.name === answer.text) {
                answer.order = index;
              }
            });
          });
        });
      });
      return { ...state, quesData };
    },
  },
};
export default model;
