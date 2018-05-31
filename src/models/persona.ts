import { getTagsArrById } from '../utils';
import update from 'immutability-helper';
import { DvaModel } from '../../typings/dva';
import { TPersonaQuesData, TPersonaQuesDatum, TQuesRecord } from './data';
import { basicInfo, dimGroups } from '../common/persona';
import { generateTagId } from '../utils/persona';
import Mock from 'mockjs';

export type TPersonaDim = {
  tagId: string;
  value: number;
  text: string;
  tagText: string;
};
export type TPersonaDims = TPersonaDim[];
export type TPersonaDimGroup = {
  text: string;
  key: string;
  dims?: TPersonaDims;
};
export type TPersonaDimGroups = TPersonaDimGroup[];

export type TBasicInfo = {
  percent: number;
  keywords: string;
  name: string;
  bios: string;
  displayIndex: string;
  career: string;
  photo: {
    value: string;
    text: string;
  };
};
export type TPersonaDatum = {
  dimGroups: TPersonaDimGroups;
  checkedDims: Array<string>;
  basicInfo: TBasicInfo;
  typeName: string;
};
export type TPersonaData = TPersonaDatum[];
export type TPersona = {
  dimVisible: boolean;
  exportVisible: boolean;
  expandedDims: Array<string>;
  personaData: TPersonaData;
  personaDisplayDimGroups: TPersonaDimGroups;
  showText: boolean;
  displayIndex: string;
};
interface IPersonaModel extends DvaModel {
  state: TPersona;
}
const persona: IPersonaModel = {
  namespace: 'persona',
  state: {
    dimVisible: true,
    exportVisible: false,
    expandedDims: [],
    personaData: [],
    personaDisplayDimGroups: [],
    displayIndex: '0',
    showText: false,
  },
  effects: {},
  reducers: {
    changeDimVisible(state, action) {
      return {
        ...state,
        dimVisible: !state.dimVisible,
      };
    },
    changeExportVisible(state, action) {
      return {
        ...state,
        exportVisible: !state.exportVisible,
      };
    },
    changeExpandedDims(state, { payload: expandedDims }) {
      return {
        ...state,
        expandedDims,
      };
    },
    changeCheckedDims(state, { payload }) {
      const { checkedDims, index } = payload;
      return {
        ...state,
        personaData: update(state.personaData, {
          [index]: {
            checkedDims: {
              $set: checkedDims,
            },
          },
        }),
      };
    },
    getDisplayDims(state, { payload }) {
      const { tagGroups } = payload;
      return {
        ...state,
        disPlayDims: getTagsArrById(tagGroups, state.checkedDims),
      };
    },

    handleDisplayDimGroups(state: TPersona, action) {
      const { personaData, displayIndex } = state;
      const { dimGroups, checkedDims } = personaData[Number(displayIndex)];
      const filterDimGroups = dimGroups.filter((dimGroup: TPersonaDimGroup) =>
        dimGroup.dims.some((dim) => checkedDims.some((item) => item === dim.tagId))
      );
      return {
        ...state,
        personaDisplayDimGroups: filterDimGroups.map((dimGroup) => ({
          ...dimGroup,
          dims: dimGroup.dims.filter((dim) => checkedDims.some((id) => id === dim.tagId)),
        })),
      };
    },

    handleDragDisplayDim(state, { payload }) {
      const { dragIndex, dropIndex } = payload;
      const dragItem = state.personaDisplayDimGroups[dragIndex];
      return {
        ...state,
        personaDisplayDimGroups: update(state.personaDisplayDimGroups, {
          $splice: [[dragIndex, 1], [dropIndex, 0, dragItem]],
        }),
      };
    },
    handleKeywords(state, { payload }) {
      const { text, index } = payload;
      return {
        ...state,
        personaData: update(state.personaData, {
          [index]: {
            basicInfo: {
              keywords: {
                $set: text,
              },
            },
          },
        }),
      };
    },
    handleBios(state, { payload }) {
      const { text, index } = payload;
      return {
        ...state,
        personaData: update(state.personaData, {
          [index]: {
            basicInfo: {
              bios: {
                $set: text,
              },
            },
          },
        }),
      };
    },
    handleCareer(state, { payload }) {
      const { text, index } = payload;
      return {
        ...state,
        personaData: update(state.personaData, {
          [index]: {
            basicInfo: {
              career: {
                $set: text,
              },
            },
          },
        }),
      };
    },
    handleName(state, { payload }) {
      const { text, index } = payload;
      return {
        ...state,
        personaData: update(state.personaData, {
          [index]: {
            basicInfo: {
              name: {
                $set: text,
              },
            },
          },
        }),
      };
    },
    handleDisplayIndex(state, { payload: displayIndex }) {
      return { ...state, displayIndex };
    },
    handleShowText(state, action) {
      return { ...state, showText: !state.showText };
    },

    initPersonaData(state, { payload: personaQuesData }) {
      return {
        ...state,
        personaData: personaQuesData.map((personaQuesDatum: TPersonaQuesDatum) => {
          return {
            dimGroups,
            checkedDims: [],
            typeName: personaQuesDatum.typeName,
            basicInfo: {
              ...basicInfo(),
              percent: personaQuesDatum.percent || 0,
            },
          };
        }),
      };
    },

    addDimToPersonaGroups(
      state,
      {
        payload,
      }: {
        payload: {
          personaQuesData: TPersonaQuesData;
          personaDimId: string;
          groupId: string;
        };
      }
    ) {
      const { personaQuesData, personaDimId, groupId } = payload;
      // 前提： personaData 存在数据
      return {
        ...state,
        personaData: personaQuesData.map((personaQuesDatum: TPersonaQuesDatum, index) => {
          // 三个值用于赋给 persona 的 dim
          const { quesData } = personaQuesDatum;
          const { tagText, answer, question } = quesData.find((item) => {
            // 如果不存在 tagId 时用 question 替换，传进来的 tagId 也是一样的操作逻辑
            return generateTagId(item.tagId, item.question) === personaDimId;
          });

          const personaDatum: TPersonaDatum = state.personaData[index];
          const { dimGroups, ...resData } = personaDatum;
          // 找到丢进去的组别序号
          const dIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === groupId);
          return {
            ...resData,
            dimGroups: update(dimGroups, {
              [dIndex]: {
                dims: {
                  $push: [
                    {
                      tagId: personaDimId,
                      tagText: tagText === '' ? question : tagText,
                      text: answer.text,
                      value: answer.order,
                    },
                  ],
                },
              },
            }),
          };
        }),
      };
    },

    removeDimFromDimGroup(state, { payload }) {
      const { tagId, index } = payload;
      return {
        ...state,
        personaData: state.personaData.map((i) => ({
          ...i,
          dimGroups: update(i.dimGroups, {
            [index]: {
              dims: {
                $set: i.dimGroups[index].dims.filter((dim: TPersonaDim) => dim.tagId !== tagId),
              },
            },
          }),
        })),
      };
    },

    changeDimGroup(state, { payload }) {
      const { dim: dragDim, dragGroup, dropGroup } = payload;

      return {
        ...state,
        personaData: state.personaData.map((i: TPersonaDatum) => {
          const { dimGroups } = i;
          const dragGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dragGroup);
          const dropGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dropGroup);
          return {
            ...i,
            dimGroups: update(dimGroups, {
              [dragGroupIndex]: {
                dims: {
                  $apply: (dims: TPersonaDims) =>
                    dims.filter((dim) => dim.tagId !== (dragDim as TPersonaDim).tagId),
                },
              },
              [dropGroupIndex]: {
                dims: {
                  $push: [dragDim],
                },
              },
            }),
          };
        }),
      };
    },
  },
};

export default persona;
