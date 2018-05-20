import { getTagsArrById, reorder } from '../utils';
import update from 'immutability-helper';
import { DvaModel } from '../../typings/dva';
import clusterResults from '../../mock/clusterResults';

export type TBlockItem = {
  text: string;
  value: number;
};
export type TBlock = {
  type: string;
  values: TBlockItem[];
};

export type TPersonaItem = {
  tagId: string;
  tagGroupId: string;
  tagGroupText: string;
  value: number;
  type: string;
  tagText: string;
};
export type TPersonaRecord = TPersonaItem[];
export type TPersonaData = TPersonaRecord[];

export type TBlockData = TBlock[];
export type TPersona = {
  dimVisible: boolean;
  exportVisible: boolean;
  expandedDims: Array<string>;
  checkedDims: Array<string>;
  personaData: TPersonaData;
  blockData: TBlockData;
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
    checkedDims: [],
    personaData: clusterResults[0],
    blockData: [],
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
    changeCheckedDims(state, { payload: checkedDims }) {
      return {
        ...state,
        checkedDims,
      };
    },
    getDisplayDims(state, { payload }) {
      const { tagGroups } = payload;
      return {
        ...state,
        disPlayDims: getTagsArrById(tagGroups, state.checkedDims),
      };
    },

    handlePersonaData(state, { payload: personaData }) {
      return { ...state, personaData };
    },
    handleDragPersonaData(state, { payload }) {
      const { dragIndex, dropIndex } = payload;
      const dragItem = state.personaData[dragIndex];
      return {
        ...state,
        personaData: update(state.personaData, {
          $splice: [[dragIndex, 1], [dropIndex, 0, dragItem]],
        }),
      };
    },
  },
};

export default persona;
