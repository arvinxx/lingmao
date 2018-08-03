import { DvaModel } from '@/typings/dva';

export interface ITableColumn {
  key: string;
  title: string;
  dataIndex: string;
}

export interface ITableState {
  displayOrder: boolean;
  displayFilter: boolean;
}

const table: DvaModel & { state: ITableState } = {
  state: {
    displayOrder: false,
    displayFilter: false,
  },
  reducers: {
    changeOrderDisplay(state, action) {
      return { ...state, displayOrder: !state.displayOrder };
    },
    changeFilterDisplay(state, action) {
      return { ...state, displayFilter: !state.displayFilter };
    },
  },
};
export default table;
