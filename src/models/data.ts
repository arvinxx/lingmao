import { DvaModel } from '../../typings/dva';
import { generateId, getAnswers } from '../utils';
import { isEqual, sortBy, concat } from 'lodash';
import update from 'immutability-helper';

import { TTag } from './tag';

export type TQuesData = TQuesRecord[];
export type TQuesRecord = TQuesDataItem[];
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

export type TTableData = {
  key: string;
  name: string;
};
export type TColumn = {
  key: string;
  title: string;
  dataIndex: string;
};

export type TDim = {
  id: string;
  text: string;
};

export type TSelectedQue = {
  question: TTableData;
  answers: Array<TTableData>;
  tagId: string;
  tagText: string;
};
export type TSelectedDims = string[];

export type TDataModel = {
  quesData: TQuesData;
  selectedQues: Array<TSelectedQue>;
  matchSelectedDims: TSelectedDims;
  reductionSelectedDims: TSelectedDims;
  clusterSelectedDims: TSelectedDims;
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
    handleSelectedAnswers(state, { payload }) {
      const { dragIndex, hoverIndex, index } = payload;
      const dragRow = state.selectedQues[index].answers[dragIndex];
      return {
        ...state,
        selectedQues: update(state.selectedQues, {
          [index]: {
            answers: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          },
        }),
      };
    },

    addMatchSelectionDims(state, { payload: newDimId }) {
      return { ...state, matchSelectedDims: [...state.matchSelectedDims, newDimId] };
    },
    changeMatchSelectedDims(state, { payload }) {
      const { oldId, newId } = payload;
      return {
        ...state,
        matchSelectedDims: [...state.matchSelectedDims.filter((id) => id !== oldId), newId],
      };
    },
    removeMatchSelectionDims(state, { payload: index }) {
      const oldId = state.selectedQues[index].tagId;
      return {
        ...state,
        selectedQues: update(state.selectedQues, {
          [index]: { tagId: { $set: '' }, tagText: { $set: '' } },
        }),
        matchSelectedDims: state.matchSelectedDims.filter((id) => id !== oldId),
      };
    },

    // 降维维度选择
    addReductionSelectedDims(state, { payload: newDims }) {
      return { ...state, reductionSelectedDims: [...state.reductionSelectedDims, newDims] };
    },
    removeReductionSelectedDims(state, { payload: removeId }) {
      return {
        ...state,
        reductionSelectedDims: state.reductionSelectedDims.filter((id) => id !== removeId),
      };
    },

    // 聚类维度选择
    addClusterSelectedDims(state, { payload: newDims }) {
      return { ...state, clusterSelectedDims: [...state.clusterSelectedDims, newDims] };
    },
    removeClusterSelectedDims(state, { payload: removeId }) {
      return {
        ...state,
        clusterSelectedDims: state.clusterSelectedDims.filter((id) => id !== removeId),
      };
    },

    addOrderToQuesData(state, { payload: selectedQues }) {
      const quesData: TQuesData = concat(state.quesData);
      selectedQues.forEach((selectedQue: TSelectedQue) => {
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
