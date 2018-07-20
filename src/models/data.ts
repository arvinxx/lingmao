import { DvaModel } from '@/typings/dva';
import { getAnswers } from '@/utils';
import { concat } from 'lodash';
import update from 'immutability-helper';

export type TQuesData = TQuesItems[];
export type TQuesItems = IQuesItem[];
export interface IQuesItem {
  key: string;
  question: string;
  answer: {
    text: string;
    order: number;
  };
  labelKey?: string;
  labelText?: string;
  type?: number;
  typeName?: string;
}

export type TPersonaQuesData = TPersonaQuesDatum[];
export type TPersonaQuesDatum = {
  type: number;
  percent: number;
  typeName: string;
  quesData: TPersonaQuesItem[];
};

export type TPersonaQuesItem = {
  key: string;
  tagKey: string;
  tagText: string;
  question: string;
  answer: {
    text: string;
    order: number;
  };
};
export interface IKeyDimension {
  question: ITextItem;
  answers: ITextItem[];
  tagKey?: string;
  tagText?: string;
  average?: number;
}

export interface ITextItem {
  key: string;
  text: string;
}

export interface IClusterLabel {
  text: string;
  value: number;
  tagText: string;
}

export interface IPCAResult {
  eigenValues: number[];
  componentMatrix: number[][];
  corr: number[][];
  percent: number[];
}
export interface IClusterResult {
  dimensions: IClusterLabel[];
  percent: number;
  title: string;
}
export type TClusterResults = IClusterResult[];

export type TSelectedLabels = string[];

export interface IDataState {
  quesData: TQuesData; // 问卷数据
  keyDimensions: IKeyDimension[]; // 参与聚类的维度
  personaQuesData: TPersonaQuesData;
  reductionSelectedLabels: TSelectedLabels; //参与降维的维度标签
  clusterSelectedLabels: TSelectedLabels; // 参与聚类的维度标签
  selectClusterIndex: number;
  clusterResults: TClusterResults;
  FAResult: IPCAResult;
  PCAResult: IPCAResult;
  KMO: number;
  sig: number;
  displayText: boolean;
  displayPanel: boolean;
}

const model: DvaModel & { state: IDataState } = {
  state: {
    quesData: [],
    keyDimensions: [],
    personaQuesData: [],
    clusterSelectedLabels: [],
    matchSelectedLabels: [],
    reductionSelectedLabels: [],
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
    handleKeyDimensions(state, { payload: questions }) {
      return {
        ...state,
        keyDimensions: questions.map((question: string) => ({
          question: { text: question, key: question },
          answers: getAnswers(state.quesData, question),
        })),
      };
    },

    // 降维维度选择
    addReductionSelectedLabels(state, { payload: newLabels }) {
      return { ...state, reductionSelectedLabels: [...state.reductionSelectedLabels, newLabels] };
    },
    removeReductionSelectedLabels(state, { payload: removeId }) {
      return {
        ...state,
        reductionSelectedLabels: state.reductionSelectedLabels.filter((id) => id !== removeId),
      };
    },
    handleReductionSelectedLabels(state, { payload: reductionSelectedLabels }) {
      return { ...state, reductionSelectedLabels };
    },

    // 聚类维度选择
    addClusterSelectedLabels(state, { payload: newLabels }) {
      return { ...state, clusterSelectedLabels: [...state.clusterSelectedLabels, newLabels] };
    },
    removeClusterSelectedLabels(state, { payload: removeId }) {
      return {
        ...state,
        clusterSelectedLabels: state.clusterSelectedLabels.filter((id) => id !== removeId),
      };
    },
    handleClusterSelectedLabels(state, { payload: clusterSelectedLabels }) {
      return { ...state, clusterSelectedLabels };
    },

    addOrderToQuesData(state, { payload: keyDimensions }) {
      const quesData: TQuesData = concat(state.quesData);
      keyDimensions.forEach((selectedQue: IKeyDimension) => {
        const { question: keyDimensionstion, answers: selectedAnswers } = selectedQue;
        selectedAnswers.forEach((selectedAnswer, index) => {
          quesData.forEach((TQuesDataRecord) => {
            TQuesDataRecord.forEach((TQuesDataItem) => {
              const { answer, question } = TQuesDataItem;
              if (question === keyDimensionstion.text && selectedAnswer.text === answer.text) {
                answer.order = index;
              }
            });
          });
        });
      });
      return { ...state, quesData };
    },

    addMatchTagToQuesData(state, action) {
      const { quesData, keyDimensions } = state;

      return {
        ...state,
        quesData: quesData.map((quesRecord: TQuesItems) => {
          return quesRecord.map((quesDataItem) => {
            const { question } = quesDataItem;
            keyDimensions.forEach((item: IKeyDimension) => {
              const { tagKey, tagText } = item;
              if (item.question.text === question) {
                quesDataItem.labelText = tagText;
                quesDataItem.labelKey = tagKey;
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
          item.map((quesDataItem: IQuesItem) => {
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
    handlePersonaQuesData(state, { payload: personaQuesData }) {
      return { ...state, personaQuesData };
    },

    changePersonaTypeName(state, { payload }) {
      const { value, index } = payload;
      console.log(value, index);
      try {
        return {
          ...state,
          personaQuesData: update(state.personaQuesData, {
            [index]: {
              typeName: {
                $set: value,
              },
            },
          }),
        };
      } catch (e) {
        console.log(e);
      }
      return state;
    },
  },
};
export default model;
