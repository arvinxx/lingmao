import { queryDocument, saveDocument } from '../services/interview';
import { isNull, isEmpty, concat } from 'lodash';
import { findIndexById, generateId } from '../utils/utils';
type TRecord = {
  id: '';
  text: '';
  comment: '';
};
export default {
  namespace: 'interview',
  state: {
    title: '',
    records: [],
    id: '',
    dimensions: [],
    tags: [],
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
    *saveDocument({ payload }, { call }) {
      // console.log(this.state);
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
      if (records.length > 0) {
        records.map((record) => {
          let id = record.id;
          id = id === '' ? generateId() : id;
          record.id = id;
          delete record._id;
        });
      } else {
        records = [{ id: generateId(), text: '' }];
      }

      if (isNull(title)) {
        title = '';
      }
      if (!Array.isArray(selectedValues)) {
        selectedValues = [];
      }
      if (isEmpty(id)) {
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

    addRecord(state, { payload: id }) {
      const records = concat(state.records);
      const index = findIndexById(records, id);
      records.splice(index + 1, 0, {
        text: '',
        id: generateId(),
      });
      return {
        ...state,
        records,
        recordFocusId: records[index + 1].id,
      };
    },
    changeRecordText(state, { payload }) {
      const { id, newText } = payload;
      const records = concat(state.records);
      const index = findIndexById(records, id);
      records[index].text = newText;
      return {
        ...state,
        records,
      };
    },
    deleteRecord(state, { payload: id }) {
      const records = state.records;

      // 数组中只有一个元素的情况下，直接返回原先状态，不删除
      if (records.length === 1) {
        return state;
      } else {
        const index = findIndexById(records, id);
        const focusIndex = index === 0 ? 1 : index - 1; // 判断是否是数组第一个元素
        return {
          ...state,
          records: state.records.filter((record: TRecord) => record.id !== id),
          recordFocusId: records[focusIndex].id,
        };
      }
    },
    changeRecordFocusId(state, { payload: id }) {
      return {
        ...state,
        recordFocusId: id,
      };
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
