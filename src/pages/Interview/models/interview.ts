import { queryDocument, saveDocument } from '../services/api';
import { isNull, findIndex } from 'lodash';

export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [
      {
        _id: '',
        text: '',
        collapsed: false,
        children: [],
      },
    ],
    _id: '',
    dimensions: [
      {
        _id: '',
        key: '',
        values: [],
        inputVisible: false,
        valueEditable: false,
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
      // console.log(this.state);
      yield call(saveDocument, payload);
    },
  },
  reducers: {
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    querryDocument(state, action) {
      let { title, records, _id, dimensions, selectedLabels } = action.payload[0];
      console.log(action.payload[0]);
      if (isNull(dimensions)) {
        dimensions = [
          {
            _id: '',
            key: '',
            values: [],
          },
        ];
      }
      if (records.length === 0) {
        records = [{ text: '', _id: '' }];
      }
      if (isNull(title)) {
        title = '';
      }
      if (isNull(selectedLabels)) {
        selectedLabels = [];
      }
      return {
        ...state,
        records,
        title,
        _id,
        dimensions,
        selectedLabels,
      };
    },

    addRecordText(state, { payload: newRecord }) {
      return {
        ...state,
        records: state.records.concat({ text: newRecord, _id: Date.parse(new Date().toString()) }),
      };
    },
    changeRecordText(state, { payload }) {
      const { id, newText } = payload;
      const records = state.records;

      const index = findIndex(records, (record: any) => record._id === id);
      // 判断是否存在含有该 id 的元素，如果存在 index 必然大于 -1
      if (index > -1) {
        records[index].text = newText;
        return {
          ...state,
          records,
        };
      } else return state;
    },

    addDimensionKey(state, { payload: newDimension }) {
      if (newDimension === '') {
        return state;
      } else
        return {
          ...state,
          dimensions: [
            ...state.dimensions,
            { key: newDimension, values: [], _id: Date.parse(new Date().toString()) },
          ],
        };
    },
    deleteDimensionKey(state, { payload: id }) {
      return {
        ...state,
        dimensions: state.dimensions.filter((dim) => dim._id !== id),
      };
    },
    changeDimensionKey(state, { payload }) {
      const { id, newKey } = payload;
      const dimensions = state.dimensions;
      const index = findIndex(dimensions, (dim: any) => dim._id === id);
      // 判断是否存在含有该 id 的元素，如果存在 index 必然大于 -1
      if (index > -1) {
        dimensions[index].key = newKey;
        return {
          ...state,
          dimensions,
        };
      } else return state;
    },

    addDimensionValue(state, { payload }) {
      const { id, newValue } = payload;
      const dimensions = state.dimensions;

      const index = findIndex(dimensions, (dim: any) => dim._id === id);
      if (index > -1) {
        dimensions[index].values.push({ text: newValue, _id: Date.parse(new Date().toString()) });
        return {
          ...state,
          dimensions,
        };
      } else return state;
    },
    deleteDimensionValue(state, { payload }) {
      const { id, deleteValue } = payload;
      const dimensions = state.dimensions;
      const index = findIndex(dimensions, (dim: any) => dim._id === id);
      if (index > -1) {
        // 直接使用 oldValues.filter((value) => value !== deleteValue) 无法改变数组内容
        const oldValues = dimensions[index].values;
        dimensions[index].values = oldValues.filter((value) => value !== deleteValue);
        return {
          ...state,
          dimensions: dimensions,
        };
      }
    },

    showValueInput(state, { payload: id }) {
      const dimensions = state.dimensions;
      const index = findIndex(dimensions, (dim: any) => dim._id === id);
      if (index > -1) {
        dimensions[index].inputVisible = true;
        return {
          ...state,
          dimensions,
        };
      } else return state;
    },
    hideValueInput(state, { payload: id }) {
      const dimensions = state.dimensions;
      const index = findIndex(dimensions, (dim: any) => dim._id === id);
      if (index > -1) {
        dimensions[index].inputVisible = false;
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
