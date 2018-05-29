import { DvaModel } from '../../typings/dva';
import { getAnswers } from '../utils';
import { concat } from 'lodash';
import update from 'immutability-helper';

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
  type: number;
  typeName: string;
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

export type TClusterDim = { text: string; value: number; tagText: string };

export interface IPCAResult {
  eigenValues: number[];
  componentMatrix: number[][];
  corr: number[][];
  percent: number[];
}
export type TClusterResult = {
  dims: Array<TClusterDim>;
  percent: number;
  title: string;
};
export type TClusterResults = TClusterResult[];
export type TSelectedQue = {
  question: TTableData;
  answers: Array<TTableData>;
  tagId: string;
  tagText: string;
  average: number;
};
export type TSelectedDims = string[];

export type TDataModel = {
  quesData: TQuesData;
  selectedQues: Array<TSelectedQue>;
  matchSelectedDims: TSelectedDims;
  reductionSelectedDims: TSelectedDims;
  clusterSelectedDims: TSelectedDims;
  selectClusterIndex: number;
  clusterResults: TClusterResults;
  FAResult: IPCAResult;
  PCAResult: IPCAResult;
  KMO: number;
  sig: number;
  displayText: boolean;
  displayPanel: boolean;
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
    selectClusterIndex: 0,
    clusterResults: [],
    KMO: 0,
    sig: 0,
    PCAResult: {
      eigenValues: [],
      componentMatrix: [],
      corr: [],
      percent: [],
    },
    FAResult: {
      eigenValues: [],
      componentMatrix: [],
      corr: [],
      percent: [],
    },
    displayText: false,
    displayPanel: true,
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
        })),
      };
    },
    addAnswersToSelectQues(state, action) {
      {
        return {
          ...state,
          selectedQues: state.selectedQues.map((selectedQue) => ({
            question: selectedQue.question,
            answers: getAnswers(state.quesData, selectedQue.question.name),
          })),
        };
      }
    },

    handleSelectedQues(state, { payload: selectedQues }) {
      return { ...state, selectedQues };
    },
    reorderSelectedAnswers(state, { payload }) {
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
    handleReductionSelectedDims(state, { payload: reductionSelectedDims }) {
      return { ...state, reductionSelectedDims };
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
    handleClusterSelectedDims(state, { payload: clusterSelectedDims }) {
      return { ...state, clusterSelectedDims };
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

    addMatchTagToQuesData(state, action) {
      const { quesData, selectedQues } = state;

      return {
        ...state,
        quesData: quesData.map((quesRecord: TQuesRecord) => {
          return quesRecord.map((quesDataItem) => {
            const { question } = quesDataItem;
            selectedQues.forEach((item: TSelectedQue) => {
              const { tagId, tagText } = item;
              if (item.question.name === question) {
                quesDataItem.tagText = tagText;
                quesDataItem.tagId = tagId;
              }
            });
            return quesDataItem;
          });
        }),
      };
    },

    handleClusterResults(state, { payload: clusterResults }) {
      return { ...state, clusterResults };
    },
    addClusterTypeToQuesData(state, { payload: cluster }) {
      return {
        ...state,
        quesData: state.quesData.map((item, index) =>
          item.map((quesDataItem: TQuesDataItem) => {
            quesDataItem.type = cluster[index];
            return quesDataItem;
          })
        ),
      };
    },
    handleKMO(state, { payload: KMO }) {
      return { ...state, KMO };
    },
    handleSig(state, { payload: sig }) {
      return { ...state, sig };
    },
    handlePCAResult(state, { payload }: { payload: IPCAResult }) {
      const { eigenValues, componentMatrix, corr, percent } = payload;
      return { ...state, PCAResult: { eigenValues, componentMatrix, corr, percent } };
    },
    handleFAResult(state, { payload }: { payload: IPCAResult }) {
      const { eigenValues, componentMatrix, corr, percent } = payload;
      const FAResult = { eigenValues, componentMatrix, corr, percent };
      console.log(FAResult);
      return { ...state, FAResult };
    },
    handleDisplayText(state, action) {
      return { ...state, displayText: !state.displayText };
    },
    handleDisplayPanel(state, action) {
      return { ...state, displayPanel: !state.displayPanel };
    },
  },
};
export default model;
