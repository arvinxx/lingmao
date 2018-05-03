import { queryDocument, saveDocument } from '../services/api';
import { isNull, findIndex } from 'lodash';

export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [],
    id: '',
    dimensions: [
      {
        key: '',
        values: [],
      },
    ],
    selectedLabels: [],
  },
  effects: {
    *fetchDocument(_, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryDocument',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *saveDocument({ payload }, { call }) {
      console.log(payload);
      yield call(saveDocument, payload);
    },
  },
  reducers: {
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    querryDocument(state, action) {
      let { title, records, _id, dimensions, selectedLabels } = action.payload[0];
      if (isNull(dimensions)) {
        dimensions = [
          {
            key: '',
            values: [''],
          },
        ];
      }
      if (isNull(records)) {
        records = [{ text: '', _id: 'null' }];
      }
      if (isNull(title)) {
        title = '';
      }
      if (isNull(selectedLabels)) {
        selectedLabels = [''];
      }
      return {
        ...state,
        records,
        title,
        id: _id,
        dimensions,
        selectedLabels,
      };
    },
    changeNode(state, { payload: node }) {
      return { ...state, node };
    },

    appendRecord(state, action) {
      return {
        ...state,
        record: state.record.concat(action.payload),
      };
    },
    addDimensionKey(state, { payload: newDimension }) {
      if (newDimension === '') {
        return state;
      } else
        return {
          ...state,
          dimensions: [...state.dimensions, { key: newDimension, values: [] }],
        };
    },
    deleteDimensionKey(state, { payload: oldKey }) {
      return {
        ...state,
        dimensions: state.dimensions.filter((dim) => dim.key !== oldKey),
      };
    },
    changeDimensionKey(state, { payload }) {
      const { oldKey, newKey } = payload;
      const dimensions = state.dimensions;
      const existNum = findIndex(dimensions, (dim) => dim.key === oldKey);
      if (existNum > -1) {
        dimensions[existNum].key = newKey;
        return {
          ...state,
          dimensions,
        };
      } else return state;
    },
    selectLabels(state, { payload: selectedLabels }) {
      return { ...state, selectedLabels };
    },
  },
};
