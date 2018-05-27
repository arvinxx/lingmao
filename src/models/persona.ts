import { getTagsArrById, reorder } from '../utils';
import update from 'immutability-helper';
import { DvaModel } from '../../typings/dva';
import { dimGroups } from '../common/persona';

export type TPersonaDim = {
  tagId: string;
  tagGroupId: string;
  tagGroupText: string;
  value: number;
  type: string;
  tagText: string;
};
export type TPersonaDims = TPersonaDim[];
export type TPersonaData = TPersonaDims[];
export type TPersonaDimGroup = {
  text: string;
  key: string;
  dims?: TPersonaDims;
};

export type TPersonaDimGroups = TPersonaDimGroup[];

export type TPersona = {
  dimVisible: boolean;
  exportVisible: boolean;
  expandedDims: Array<string>;
  checkedDims: Array<string>;
  personaDimGroups: TPersonaDimGroups;
  personaDisplayDimGroups: TPersonaDimGroups;
  keywords: string;
  name: string;
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
    keywords: '',
    name: '',
    personaDimGroups: dimGroups,
    personaDisplayDimGroups: [],
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

    handleDisplayDimGroups(state: TPersona, action) {
      const { personaDimGroups, checkedDims } = state;
      const filterDimGroups = personaDimGroups.filter((dimGroup: TPersonaDimGroup) =>
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
    handleKeywords(state, { payload: keywords }) {
      return { ...state, keywords };
    },
  },
};

export default persona;
