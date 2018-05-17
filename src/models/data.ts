import { DvaModel } from '../../typings/dva';
import { generateId, getAnswers } from '../utils';
import { isEqual, sortBy } from 'lodash';

export type TDim = {
  text: string;
  selected: boolean;
  id: string;
};
export type TDataModel = {
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
    quesData: [],
    questions: [],
    selectedQues: [],
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
    handleSelectedAnswers(state, { payload: newAnswers }: { payload: Array<TTableData> }) {
      const selectedQues: Array<TSelectQue> = state.selectedQues;
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
  },
};

export default model;
