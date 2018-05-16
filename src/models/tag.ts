import { findIndexById, generateId } from '../utils';
import { concat } from 'lodash';
import { queryDocument } from '../services/api';
import { DvaModel } from '../../typings/dva';

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
export type TTagModel = {
  tagVisible: boolean;
  selectedTags: Array<string>;
  tagGroups: Array<TTagGroup>;
  exportDisplay: string;
};
export interface ITagModel extends DvaModel {
  state: TTagModel;
}
const tag: ITagModel = {
  namespace: 'tag',
  state: {
    tagVisible: true,
    tagGroups: [{ text: '未分组', id: generateId(), tags: [] }],
    selectedTags: [],
    exportDisplay: '1',
  },
  effects: {
    *fetchTagGroups(action, { call, put }) {
      const response = yield call(queryDocument);
      yield put({
        type: 'querryTagGroups',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },
  reducers: {
    querryTagGroups(state, { payload: documents }) {
      let { tagGroups } = documents[0];

      if (tagGroups !== undefined && tagGroups !== null && tagGroups.length > 0) {
        tagGroups.map((tagGroup, index) => {
          let id = tagGroup.id;
          id = id === '' ? generateId() : id;
          if (index === 0) {
            tagGroup.text = '未分组';
          }
          tagGroup.id = id;
          delete tagGroup._id;
        });
      } else {
        tagGroups = [{ id: generateId(), tags: [], text: '未分组' }];
      }
      return {
        ...state,
        tagGroups,
      };
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

    addTagToNewGroup(state, action) {
      const { tagGroups, selectedTags } = state;
      let tags: Array<TTag> = [];
      selectedTags.map((id) => {
        tags = tags.concat(tagGroups[0].tags.filter((tag) => tag.id === id));
        tagGroups[0].tags = tagGroups[0].tags.filter((tag) => {
          return tag.id !== id;
        });
      });
      return {
        ...state,
        tagGroups: [...tagGroups, { text: '未命名', id: generateId(), tags }],
        selectedTags: [],
      };
    },

    changeSelectedTags(state, { payload }) {
      const { id, checked } = payload;
      const selectedTags = checked
        ? [...state.selectedTags, id]
        : state.selectedTags.filter((t) => t !== id);
      return { ...state, selectedTags };
    },

    handleExportDisplay(state, { payload: exportDisplay }) {
      return { ...state, exportDisplay };
    },
  },
};
export default tag;
