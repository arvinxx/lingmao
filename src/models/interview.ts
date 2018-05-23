import { DvaModel } from '../../typings/dva';

export interface IInterview {
  title: string;
  records: object;
  id: string;
  uploadVisible: boolean;
  tagVisible: boolean;
  tagUpdate: boolean; // 让悬浮标签可以正常更新
}

interface IInterviewModel extends DvaModel {
  state: IInterview;
}
const interview: IInterviewModel = {
  namespace: 'interview',
  state: {
    title: '',
    records: {},
    id: '',
    uploadVisible: true,
    tagVisible: true,
    tagUpdate: false,
  },
  reducers: {
    changeUploadVisible(state, action) {
      return {
        ...state,
        uploadVisible: !state.uploadVisible,
      };
    },
    changeTagVisible(state, action) {
      return {
        ...state,
        tagVisible: !state.tagVisible,
      };
    },
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    querryDocument(state, { payload }) {
      const { title, records, docId: id } = payload;
      return { ...state, records, title, id };
    },

    changeRecords(state, { payload: records }) {
      return { ...state, records };
    },
  },
};

export default interview;
