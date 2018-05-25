import { DvaModel } from '../../typings/dva';
import { generateId, initRecords } from '../utils';

export interface IInterview {
  title: string;
  records: object;
  id: string;
  uploadVisible: boolean;
  tagVisible: boolean;
}

interface IInterviewModel extends DvaModel {
  state: IInterview;
}
const interview: IInterviewModel = {
  namespace: 'interview',
  state: {
    title: '',
    records: initRecords(''),
    id: generateId(),
    uploadVisible: true,
    tagVisible: true,
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
