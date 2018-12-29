import { concat } from 'lodash';
import { generateKey, reorder } from '@/utils';
import { findIndex } from 'lodash';

import { queryTags } from '@/services';

import update from 'immutability-helper';

import { DvaModel } from '@/typings/dva';

export interface ITag {
  key: string;
  text: string;
  refText?: string;
  value?: number;
  editable?: boolean;
}

export interface ILabel {
  text: string;
  key: string;
  tags: Array<ITag>;
  questionKey?: string;
  inputVisible?: boolean;
}

export type TKeys = string[];

export interface ILabelState {
  tagVisible: boolean;
  selectedTags: TKeys;
  labels: Array<ILabel>;
  exportDisplay: string;
  reductionLabels: TKeys; //参与降维的维度标签
  clusterLabels: TKeys; // 参与聚类的维度标签
}

const label: DvaModel<ILabelState> = {
  state: {
    tagVisible: true,
    labels: [
      { text: '未分组', key: generateKey(), tags: [], inputVisible: false, questionKey: 'none' },
    ],
    selectedTags: [],
    exportDisplay: '1',
    clusterLabels: [],
    reductionLabels: [],
  },
  reducers: {
    handleTags(state, { payload: labels }) {
      return { ...state, labels };
    },

    addTag(state, { payload }) {
      const { text, key } = payload;
      const labels = state.labels;
      return {
        ...state,
        labels: update(labels, {
          [findIndex(labels, ['key', key])]: {
            tags: {
              $push: [
                {
                  text,
                  key: generateKey(),
                },
              ],
            },
          },
        }),
      };
    },
    deleteTag(state, { payload: key }) {
      return {
        ...state,
        labels: state.labels.map((label: ILabel) => ({
          ...label,
          tags: label.tags.filter((tag) => tag.key !== key),
        })),
      };
    },
    changeTagText(state, { payload }) {
      const { key, text } = payload;
      return {
        ...state,
        labels: state.labels.map((label: ILabel) => {
          const { tags } = label;
          const index = findIndex(label.tags, ['key', key]);
          // 如果没找到 key 则返回原值，如果找到 key 就修改值
          return index < 0
            ? label
            : {
                ...label,
                tags: update(tags, {
                  [index]: {
                    text: { $set: text },
                  },
                }),
              };
        }),
      };
    },

    addLabel(state, { payload: text }) {
      return text === ''
        ? state
        : { ...state, labels: [...state.labels, { text, tags: [], key: generateKey() }] };
    },
    deleteLabel(state, { payload: key }) {
      return findIndex(state.labels, ['key', key]) <= 0
        ? state
        : {
            ...state,
            labels: state.labels.filter((label) => label.key !== key),
          };
    },
    changeLabelText(state, { payload }) {
      const { key, text } = payload;
      const index = findIndex(state.labels, ['key', key]);
      return index <= 0
        ? state
        : {
            ...state,
            labels: update(state.labels, {
              [index]: {
                text: { $set: text },
              },
            }),
          };
    },

    selectMatchLabel(state, { payload }) {
      const { questionKey, labelKey } = payload;
      const { labels } = state;
      const index = labels.findIndex((label: ILabel) => label.key === labelKey);
      return {
        ...state,
        labels: update(labels, {
          [index]: {
            questionKey: {
              $set: questionKey,
            },
          },
        }),
      };
    },
    removeMatchLabel(state, { payload: labelIndex }) {
      const { labels } = state;
      return {
        ...state,
        labels: update(labels, {
          [labelIndex]: {
            questionKey: {
              $set: '',
            },
          },
        }),
      };
    },

    handleSelectedTags(state, { payload }) {
      const { key, checked } = payload;
      return {
        ...state,
        // 如果为真则添加到 tags 中，否则过滤掉
        selectedTags: checked
          ? [...state.selectedTags, key]
          : state.selectedTags.filter((t) => t !== key),
      };
    },

    handleTagIndexDrag(
      state,
      {
        payload,
      }: {
        payload: {
          start: { dragIndex: number; dragId: string };
          end: { dropIndex: number; dropId: string };
        };
      }
    ) {
      const labels: Array<ILabel> = state.labels;
      const { start, end } = payload;
      const { dragId, dragIndex } = start;
      const { dropId, dropIndex } = end;

      const isInTagsGroup = (key, tags: Array<ITag>) => tags.some((tag: ITag) => tag.key === key);
      let isSameGroup = false;
      // 判断是否属于同一组
      labels.forEach((label: ILabel) => {
        const { tags } = label;
        if (isInTagsGroup(dragId, tags) && isInTagsGroup(dropId, tags)) {
          const newTags = reorder(tags, dragIndex, dropIndex);
          isSameGroup = true;
          label.tags = newTags;
          return { ...state, labels };
        }
      });
      //不是同一组的情况下，将加入那一组
      if (!isSameGroup) {
        let removed: ITag;
        labels.forEach((label: ILabel) => {
          const { tags } = label;
          if (isInTagsGroup(dragId, tags)) {
            [removed] = tags.splice(dragIndex, 1);
            label.tags = concat(tags);
            return { ...state, labels };
          }
        });
        labels.forEach((label: ILabel) => {
          const { tags } = label;
          if (isInTagsGroup(dropId, tags)) {
            tags.splice(dropIndex, 0, removed);
            label.tags = concat(tags);
            return { ...state, labels };
          }
        });
      }
      const newLabels = concat(labels);
      return { ...state, labels: newLabels };
    },

    showTagInput(state, { payload: key }) {
      const labels = state.labels;
      const index = findIndex(labels, ['key', key]);
      return {
        ...state,
        labels: update(labels, {
          [index]: {
            inputVisible: { $set: true },
          },
        }),
      };
    },
    hideTagInput(state, { payload: key }) {
      const labels = state.labels;
      const index = findIndex(labels, ['key', key]);
      return {
        ...state,
        labels: update(labels, {
          [index]: {
            inputVisible: { $set: false },
          },
        }),
      };
    },

    showTagEdit(state, { payload: key }) {
      return {
        ...state,
        labels: state.labels.map((label: ILabel) => {
          const { tags } = label;
          const index = findIndex(label.tags, ['key', key]);
          // 如果没找到 key 则返回原值，如果找到 key 就修改值
          return index < 0
            ? label
            : {
                ...label,
                tags: update(tags, {
                  [index]: {
                    editable: { $set: true },
                  },
                }),
              };
        }),
      };
    },
    hideTagEdit(state, { payload: key }) {
      return {
        ...state,
        labels: state.labels.map((label: ILabel) => {
          const { tags } = label;
          const index = findIndex(label.tags, ['key', key]);
          // 找到 key 对应的 index 修改 editable 为 false
          return index < 0
            ? label
            : {
                ...label,
                tags: update(tags, {
                  [index]: {
                    editable: { $set: false },
                  },
                }),
              };
        }),
      };
    },

    // 降维维度选择
    addReductionLabels(state, { payload: newLabels }) {
      return { ...state, reductionLabels: [...state.reductionLabels, newLabels] };
    },
    removeReductionLabels(state, { payload: removedKey }) {
      return {
        ...state,
        reductionLabels: state.reductionLabels.filter((key) => key !== removedKey),
      };
    },
    handleReductionLabels(state, { payload: reductionLabels }) {
      return { ...state, reductionLabels };
    },

    // 聚类维度选择
    addClusterLabels(state, { payload: newLabels }) {
      return { ...state, clusterLabels: [...state.clusterLabels, newLabels] };
    },
    removeClusterLabels(state, { payload: removeId }) {
      return {
        ...state,
        clusterLabels: state.clusterLabels.filter((id) => id !== removeId),
      };
    },
    handleClusterLabels(state, { payload: clusterLabels }) {
      return { ...state, clusterLabels };
    },
  },
  effects: {
    *queryTags(payload, { call, put }) {
      const { data } = yield call(queryTags);
      yield put({
        type: 'handleTags',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/data/table') {
          dispatch({ type: 'queryTags' });
        }
      });
    },
  },
};
export default label;
