import { DvaModel } from '../../typings/dva';
import { findIndexById, generateId } from '../utils';
import { queryDocument } from '../services/api';

export type TDimensionValue = {
  id: string;
  text: string;
  editable: boolean;
};
export type TDimensionValues = TDimensionValue[];
export type TDimension = {
  values: TDimensionValues;
  id: string;
  inputVisible: boolean;
  key: string;
};
export type TDimensions = TDimension[];

export type TSelectedValues = string[];
export type TRecordModel = {
  dimensions: TDimensions;
  selectedValues: TSelectedValues;
};
interface IRecordDims extends DvaModel {
  state: TRecordModel;
}
const recordDims: IRecordDims = {
  namespace: 'recordDims',
  state: {
    selectedValues: [],
    dimensions: [],
  },
  effects: {
    *fetchRecordDims(action, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryRecordDims',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    querryRecordDims(state, { payload: documents }) {
      let { dimensions, selectedValues } = documents[0];

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

      if (selectedValues === null) {
        selectedValues = [];
      }
      return {
        ...state,
        dimensions,
        selectedValues,
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

      const dimensions: TDimensions = state.dimensions;
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

    changeSelectedValues(state, { payload: selectedValues }: { payload: TSelectedValues }) {
      return { ...state, selectedValues };
    },
  },
};
export default recordDims;
