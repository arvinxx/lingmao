import { DvaModel } from '../../typings/dva';

export type TTableModel = {
  displayOrder: boolean;
  isSelect: boolean;
};
export interface ITableModel extends DvaModel {
  state: TTableModel;
}
const table: ITableModel = {
  namespace: 'table',
  state: {
    displayOrder: false,
    isSelect: false,
  },
  reducers: {
    changeOrderDisplay(state, action) {
      return { ...state, displayOrder: !state.displayOrder };
    },
  },
};
export default table;
