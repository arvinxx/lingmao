import { DvaModel } from '@/typings/dva';
import { getTagsArrById } from '@/utils';
import update from 'immutability-helper';
import { basicInfo, dimGroups } from '@/common';
import { generateTagId } from '@/utils';
import { TQuesData, IQuesRecord } from './data';

export interface IPersonaDim {
  text: string;
  value: number;
  labelKey: string;
  labelText: string;
}

export interface IPersonaDimGroup {
  text: string;
  key: string;
  dims?: IPersonaDim[];
}
export type TPersonaDimGroups = IPersonaDimGroup[];

export interface IBasicInfo {
  percent: number;
  keywords: string;
  name: string;
  bios: string;
  displayIndex: string;
  career: string;
  photo: {
    value: any[];
    text: string;
  };
}

// 单个画像数据结构
export interface IPersona {
  dimGroups: TPersonaDimGroups; //维度信息,如基本信息 动机 目标等
  checkedDims: string[]; // 进行展示的维度
  basicInfo: IBasicInfo; // 基本信息
  typeName: string; // 画像类别名称
}
// 多个画像形成的画像列表
export type TPersonaList = IPersona[];
export interface IPersonaState {
  dimVisible: boolean;
  exportVisible: boolean;
  expandedDims: Array<string>;
  personaList: TPersonaList; // 画像列表
  displayDimGroups: TPersonaDimGroups;
  showText: boolean;
  displayIndex: string;
}

const persona: DvaModel<IPersonaState> = {
  state: {
    dimVisible: true,
    exportVisible: false,
    expandedDims: [],
    personaList: [],
    displayDimGroups: [],
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
        personaList: update(state.personaList, {
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

    handleDisplayDimGroups(state: IPersonaState, action) {
      const { personaList, displayIndex } = state;
      const { dimGroups, checkedDims } = personaList[Number(displayIndex)];
      const filterDimGroups = dimGroups.filter((dimGroup: KeyDimension) =>
        dimGroup.dims.some((dim) => checkedDims.some((item) => item === dim.labelKey))
      );
      return {
        ...state,
        personaDisplayDimGroups: filterDimGroups.map((dimGroup) => ({
          ...dimGroup,
          dims: dimGroup.dims.filter((dim) => checkedDims.some((id) => id === dim.labelKey)),
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
        personaList: update(state.personaList, {
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
        personaList: update(state.personaList, {
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
        personaList: update(state.personaList, {
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
        personaList: update(state.personaList, {
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
        personaList: personaQuesData.map((personaQuesRecord: IQuesRecord) => {
          return {
            dimGroups,
            checkedDims: [],
            typeName: personaQuesRecord.typeName,
            basicInfo: {
              ...basicInfo(),
              percent: personaQuesRecord.percent || 0,
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
          personaQuesData: TQuesData;
          personaDimId: string;
          groupId: string;
        };
      }
    ) {
      const { personaQuesData, personaDimId, groupId } = payload;
      // 前提： personaList 存在数据
      return {
        ...state,
        personaList: personaQuesData.map((personaQuesRecord: IQuesRecord, index) => {
          // 三个值用于赋给 persona 的 dim
          const { records } = personaQuesRecord;
          const { labelText, answer, question } = records.find((item) => {
            // 如果不存在 labelKey 时用 question 替换，传进来的 labelKey 也是一样的操作逻辑
            return generateTagId(item.labelKey, item.question) === personaDimId;
          });

          const personaDatum: TPersonaDatum = state.personaList[index];
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
                      labelKey: personaDimId,
                      labelText: labelText === '' ? question : labelText,
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
      const { labelKey, index } = payload;
      return {
        ...state,
        personaList: state.personaList.map((i) => ({
          ...i,
          dimGroups: update(i.dimGroups, {
            [index]: {
              dims: {
                $set: i.dimGroups[index].dims.filter(
                  (dim: IPersonaDim) => dim.labelKey !== labelKey
                ),
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
        personaList: state.personaList.map((i: TPersonaDatum) => {
          const { dimGroups } = i;
          const dragGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dragGroup);
          const dropGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dropGroup);
          return {
            ...i,
            dimGroups: update(dimGroups, {
              [dragGroupIndex]: {
                dims: {
                  $apply: (dims: TPersonaDims) =>
                    dims.filter((dim) => dim.labelKey !== (dragDim as IPersonaDim).labelKey),
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
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/persona') {
          dispatch({ type: 'initUserModel' });
        }
      });
    },
  },
};

export default persona;
