import { DvaModel } from '@/typings/dva';
import { getAnswers } from '@/utils';
import { concat } from 'lodash';
import update from 'immutability-helper';
import { ILabel } from '@/models/label';

import { userModels } from '@/mock/userModels';

export type TQuesData = IQuesRecord[];

export interface IQuesRecord {
  type?: number; // 聚类后的值
  typeName?: string; // 类型名称
  percent?: number; // 类型百分比
  records: IQuesItem[]; //单条记录
}

export interface IQuesItem {
  key: string;
  question: string;
  answer: {
    text: string;
    order: number;
  };
  labelKey?: string;
  labelText?: string;
}

export interface IKeyDimension {
  question: ITextItem;
  answers: ITextItem[];
  labelKey?: string;
  labelText?: string;
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

export interface IDataState {
  quesData: TQuesData; // 问卷数据
  keyDimensions: IKeyDimension[]; // 参与聚类的维度
  userModels: TQuesData; // 聚类后得到的用户数据
  selectClusterIndex: number; // 选中的聚类次数
  clusterResults: TClusterResults; // 聚类结果
  FAResult: IPCAResult; // FA降维结果
  PCAResult: IPCAResult; // PCA降维结果
  KMO: number;
  sig: number;
  displayText: boolean;
  displayPanel: boolean;
}

const model: DvaModel<IDataState> = {
  state: {
    quesData: [],
    keyDimensions: [],
    userModels: userModels,
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
    handleQuesData(state: IDataState, { payload: quesData }) {
      return { ...state, quesData };
    },
    handleKeyDimensions(state: IDataState, { payload: questions }) {
      return {
        ...state,
        keyDimensions: questions.map((question: string) => ({
          question: { text: question, key: question },
          answers: getAnswers(state.quesData, question),
        })),
      };
    },
    addLabelsToKeyDimensions(state: IDataState, { payload: labels }: { payload: ILabel[] }) {
      return {
        ...state,
        keyDimensions: state.keyDimensions.map((keyDimension) => {
          // 判断 label 中是否包含关键维度中的问题 key
          const index = labels.findIndex(
            (label) => label.questionKey === keyDimension.question.key
          );
          // 如果没有则返回原值,如果有则更新其 labelKey 和 labelText
          return index < 0
            ? keyDimension
            : update(keyDimension, {
                labelKey: { $set: labels[index].key },
                labelText: { $set: labels[index].text },
              });
        }),
      };
    },
    addMatchLabelToQuesData(state: IDataState, action) {
      const { quesData, keyDimensions } = state;
      return {
        ...state,
        quesData: quesData.map((quesRecord: IQuesRecord) => ({
          ...quesRecord,
          records: quesRecord.records.map((quesItem) => {
            const { question } = quesItem;
            // 查询问题
            const questionIndex = keyDimensions.findIndex(
              (keyDimension) => keyDimension.question.text === question
            );
            // 如果没查到则返回原值 查到则更新 label
            if (questionIndex === -1) {
              return quesItem;
            } else {
              const { labelKey, labelText } = keyDimensions[questionIndex];
              return update(quesItem, {
                labelKey: { $set: labelKey },
                labelText: { $set: labelText },
              });
            }
          }),
        })),
      };
    },

    handleClusterResults(state, { payload: clusterResults }) {
      return { ...state, clusterResults };
    },
    addClusterTypeToQuesData(state: IDataState, { payload: cluster }) {
      return {
        ...state,
        quesData: state.quesData.map((quesRecord: IQuesRecord, index) => ({
          ...quesRecord,
          type: cluster[index],
        })),
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
    handleUserModels(state, { payload: userModels }) {
      return { ...state, userModels };
    },

    changePersonaTypeName(state, { payload }) {
      const { value, index } = payload;
      try {
        return {
          ...state,
          userModels: update(state.userModels, {
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
  subscriptions: {},
};
export default model;
