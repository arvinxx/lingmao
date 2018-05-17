import { DvaModel } from '../../typings/dva';

export type TTableModel = {
  displayOrder: boolean;
  displayFilter: boolean;
};
export interface ITableModel extends DvaModel {
  state: TTableModel;
}
const table: ITableModel = {
  namespace: 'table',
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
