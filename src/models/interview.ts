import { queryDocument, saveDocument } from '../services/interview';
import { concat } from 'lodash';
import { findIndexById, generateId } from '../utils';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

export type TRecord = {
  id: string;
  text: string;
  rawData: JSON;
};
export type TTag = {
  id: string;
  text: string;
  refText: string;
  refId: string;
  groupId: string;
};
export type TTagGroup = {
  text: string;
  id: string;
  tags: Array<TTag>;
};

export type TInterview = {
  title: string;
  records: Array<TRecord>;
  id: string;
  dimensions;
  selectedValues: Array<string>;
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
    recordFocusId: '',
    id: '',
    dimensions: [],
    tags: [],
    tagGroups: [],
    selectedValues: [],
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
      let { title, records, id, dimensions, selectedValues, tagGroups } = documents[0];

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
        records = [
          {
            id: generateId(),
            text: '',
            rawData: initRawData(),
          },
        ];
      }
      if (tagGroups !== undefined && tagGroups !== null && tagGroups.length > 0) {
        tagGroups.map((tagGroup, index) => {
          let id = tagGroup.id;
          id = id === '' ? generateId() : id;
          if (index === 0) {
            tagGroup.text = 'ungroup';
          }
          tagGroup.id = id;
          delete tagGroup._id;
        });
      } else {
        tagGroups = [{ id: generateId(), tags: [], text: 'ungroup' }];
      }

      if (title === undefined) {
        title = '';
      }
      if (!Array.isArray(selectedValues)) {
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
        tagGroups,
        dimensions,
        selectedValues,
        recordFocusId: records[0].id,
      };
    },

    addRecord(state, { payload: id }) {
      const records: Array<TRecord> = concat(state.records);
      const index = findIndexById(records, id);
      records.splice(index + 1, 0, {
        text: '',
        id: generateId(),
        rawData: initRawData(),
      });
      return {
        ...state,
        records,
        recordFocusId: records[index + 1].id,
      };
    },
    changeRecordText(state, { payload }) {
      const { id, newText } = payload;
      const records: Array<TRecord> = concat(state.records);
      const index = findIndexById(records, id);
      records[index].text = newText;
      return {
        ...state,
        records,
      };
    },
    deleteRecord(state, { payload: id }) {
      const oldRecords: Array<TRecord> = state.records;

      // 数组中只有一个元素的情况下，直接返回原先状态，不删除
      if (oldRecords.length === 1) {
        return state;
      } else {
        const index = findIndexById(oldRecords, id);
        const focusIndex = index === 0 ? 0 : index - 1; // 判断是否是数组第一个元素
        const records = oldRecords.filter((record: TRecord) => record.id !== id);
        const recordFocusId = records[focusIndex].id;
        return {
          ...state,
          records,
          recordFocusId,
        };
      }
    },
    changeRecordRawData(state, { payload }) {
      const { id, rawData } = payload;
      const records: Array<TRecord> = concat(state.records);
      const index = findIndexById(records, id);
      records[index].rawData = rawData;
      return {
        ...state,
      };
    },

    changeRecordFocusId(state, { payload: id }) {
      return {
        ...state,
        recordFocusId: id,
      };
    },
    moveUpRecordFocusId(state, { payload: id }) {
      const records = state.records;
      let index = findIndexById(records, id);
      index = index === 0 ? 0 : index - 1;
      return {
        ...state,
        recordFocusId: records[index].id,
      };
    },
    moveDownRecordFocusId(state, { payload: id }) {
      const records = state.records;
      let index = findIndexById(records, id);
      index = index + 1 === records.length ? index : index + 1;
      return {
        ...state,
        recordFocusId: records[index].id,
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

    addTag(state, { payload }) {
      const { text, refId } = payload;
      const tagGroups: Array<TTagGroup> = concat(state.tagGroups);
      tagGroups[0].tags = [...state.tagGroups[0].tags, { text: text, id: generateId(), refId }];
      return { ...state, tagGroups };
    },

    changeTagText(state, { payload }) {
      const { id, newText } = payload;
      return {
        ...state,
        tagGroups: state.tagGroups.map((tagGroup: TTagGroup) => ({
          ...tagGroup,
          tags: tagGroup.tags.map((tag) => ({ ...tag, text: tag.id === id ? newText : tag.text })),
        })),
      };
    },

    deleteTag(state, { payload: id }) {
      return {
        ...state,
        tagGroups: state.tagGroups.map((tagGroup: TTagGroup) => ({
          ...tagGroup,
          tags: tagGroup.tags.filter((tag) => tag.id !== id),
        })),
      };
    },

    addTagGroup(state, { payload: text }) {
      if (text === '') {
        return state;
      } else
        return { ...state, tagGroups: [...state.tagGroups, { text, tags: [], id: generateId() }] };
    },
    changeTagGroupText(state, { payload }) {
      const { id, newText } = payload;
      if (findIndexById(state.tagGroups, id) !== 0) {
        return {
          ...state,
          tagGroups: state.tagGroups.map((tagGroup) => ({
            ...tagGroup,
            text: tagGroup.id === id ? newText : tagGroup.text,
          })),
        };
      } else return state;
    },
    deleteTagGroup(state, { payload: id }) {
      if (findIndexById(state.tagGroups, id) !== 0) {
        return {
          ...state,
          tagGroups: state.tagGroups.filter((tagGroup) => tagGroup.id !== id),
        };
      } else return state;
    },

    addTagtoNewGroup(state, { payload: selectedTags }) {
      const { tagGroups } = state;

      const tags = tagGroups[0].tags.filter((tag) => {
        selectedTags.map((id) => {
          return tag.id === id;
        });
      });
      tagGroups[0].tags = tagGroups[0].tags.filter((tag) => {
        selectedTags.map((id) => {
          return tag.id === id;
        });
      });
      return {
        ...state,
        tagGroups: [...tagGroups, { text: '', id: generateId(), tags }],
      };
    },
  },
};
