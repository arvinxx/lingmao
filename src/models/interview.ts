import { queryDocument } from '../services/api';
import { concat } from 'lodash';
import { findIndexById, generateId } from '../utils';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { TTagGroup } from './tag';

export type TInterview = {
  title: string;
  records: object;
  id: string;
  recordFocusId: string;
  uploadVisible: boolean;
  tagVisible: boolean;
  tagGroups: Array<TTagGroup>;
};

export const initRawData = () => {
  return Plain.deserialize('').toJSON();
};

export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [],
    id: '',
    uploadVisible: true,
    tagVisible: true,
  },
  effects: {
    *fetchDocument(action, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryDocument',
        payload: Array.isArray(response) ? response : [],
      });
    },
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

    querryDocument(state, { payload: documents }) {
      let { title, records, id, dimensions, selectedValues } = documents[0];

      dimensions.map((dimension) => {
        let { id, values } = dimension;
        id = id === '' ? generateId() : id;
        values.map((value) => {
          let { id } = value;
          id = id === '' ? generateId() : id;
          value.editable = false;
          value.id = id;
          delete value._id;
        });
        delete dimension._id;
        dimension.values = values;
        dimension.id = id;
        dimension.inputVisible = false;
      });
      if (records === undefined) {
        records = initRawData();
      }
      if (title === undefined) {
        title = '';
      }
      if (selectedValues === null) {
        selectedValues = [];
      }
      if (id === '') {
        id = generateId();
      }
      return {
        ...state,
        records,
        title,
        id,
        dimensions,
        selectedValues,
      };
    },

    changeRecordRawData(state, { payload: records }) {
      return { ...state, records };
    },
  },
};
