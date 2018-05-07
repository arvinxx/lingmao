import { queryDocument, saveDocument } from '../services/interview';
import { isNull } from 'lodash';
import { findIndexById, generateId } from '../utils/utils';

export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [
      {
        id: '',
        text: '',
        description: '',
      },
    ],
    id: '',
    dimensions: [
      {
        id: '',
        key: '',
        values: [
          {
            id: '',
            text: '',
            editable: false,
          },
        ],
        inputVisible: false,
      },
    ],
    tags:[],
    selectedValues: [],
    uploadVisible: true,
    tagVisible: true,
  },
  effects: {
    *fetchDocument(_, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryDocument',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *saveDocument(_, { call }) {
      const { payload, state } = _;
      console.log(state);
      yield call(saveDocument, payload);
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
      let { title, records, id, dimensions,  selectedValues } = documents[0];
      if (isNull(dimensions)) {
        dimensions = [
          {
            id: '',
            key: '',
            values: [],
          },
        ];
      }
      if (records.length === 0) {
        records = [{ text: '', id: '' }];
      }
      if (isNull(title)) {
        title = '';
      }
      if (isNull(selectedValues)) {
        selectedValues = [];
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

    addRecord(state, action) {
      return {
        ...state,
        records: state.records.concat({ text: '', id: generateId(), description: '' }),
      };
    },
    changeRecordText(state, { payload }) {
      const { id, newText } = payload;
      const records = state.records;
      const index = findIndexById(records, id);
      records[index].text = newText;
      return {
        ...state,
        records,
      };
    },
    deleteRecord(state, { payload: id }) {
      const records = state.records;
      const index = findIndexById(records, id);

      const { text, description } = records[index];
      if (text === '' && description === '') {
        return {
          ...state,
          records: records.filter((record) => record.id !== id),
        };
      } else return state;
    },

    addDimensionKey(state, { payload: newDimension }) {
      if (newDimension === '') {
        return state;
      } else
        return {
          ...state,
          dimensions: [...state.dimensions, { key: newDimension, values: [], id: generateId() }],
        };
    },
    deleteDimensionKey(state, { payload: id }) {
      return {
        ...state,
        dimensions: state.dimensions.filter((dimension) => dimension.id !== id),
      };
    },
    changeDimensionKey(state, { payload }) {
      const { id, newKey } = payload;
      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      dimensions[index].key = newKey;
      return {
        ...state,
        dimensions,
      };
    },

    addDimensionValue(state, { payload }) {
      const { id, newValue } = payload;
      const dimensions = state.dimensions;
      //不加入空值标签
      if (newValue !== '') {
        const index = findIndexById(dimensions, id);
        dimensions[index].values.push({ text: newValue, id: generateId() });
        return { ...state, dimensions };
      } else return state;
    },
    deleteDimensionValue(state, { payload }) {
      const { id, vid } = payload;
      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      // 直接使用 oldValues.filter((value) => value !== deleteValue) 无法改变数组内容
      const oldValues = dimensions[index].values;
      dimensions[index].values = oldValues.filter((v) => v.id !== vid);
      return {
        ...state,
        dimensions: dimensions,
      };
    },
    changeDimensionValue(state, { payload }) {
      const { id, vid, newValue } = payload;
      const dimensions = state.dimensions;
      // dimensions
      //   .findIndex((i) => i.id === id)
      //   .values.findIndex((i) => i.id === vid).text = newValue;
      const index = findIndexById(dimensions, id);
      const newValues = dimensions[index].values;
      const vIndex = findIndexById(newValues, vid);
      newValues[vIndex].text = newValue;
      dimensions[index].values = newValues;
      return {
        ...state,
        dimensions,
      };
    },

    showValueInput(state, { payload: id }) {
      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      dimensions[index].inputVisible = true;
      return {
        ...state,
        dimensions,
      };
    },
    hideValueInput(state, { payload: id }) {
      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      dimensions[index].inputVisible = false;
      return {
        ...state,
        dimensions,
      };
    },
    showValueEdit(state, { payload }) {
      const { id, vid } = payload;
      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      const newValues = dimensions[index].values;
      const vIndex = findIndexById(newValues, vid);
      newValues[vIndex].editable = true;
      dimensions[index].values = newValues;
      return {
        ...state,
        dimensions,
      };
    },
    hideValueEdit(state, { payload }) {
      const { id, vid } = payload;

      const dimensions = state.dimensions;
      const index = findIndexById(dimensions, id);
      const newValues = dimensions[index].values;
      const vIndex = findIndexById(newValues, vid);
      newValues[vIndex].editable = false;
      dimensions[index].values = newValues;
      return {
        ...state,
        dimensions,
      };
    },

    changeSelectedValues(state, { payload: selectedValues }) {
      return { ...state, selectedValues };
    },
  },
};
