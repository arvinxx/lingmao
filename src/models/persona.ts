import { getTagsArrById } from '../utils';
import update from 'immutability-helper';
import { DvaModel } from '../../typings/dva';
import { personaData } from '../common/persona';

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
};
export type TPersonaDimGroups = TPersonaDimGroup[];
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

    personaData: personaData,
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

    handleDragPersonaData(state, { payload }) {
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
  },
};

export default persona;
