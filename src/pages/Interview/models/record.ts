import { DvaModel } from '@/typings/dva';
import { generateKey, initRecords } from '@/utils';

export interface IRecordState {
  title: string;
  records: object;
  key: string;
}

const record: DvaModel<IRecordState> = {
  state: {
    title: '',
    records: initRecords(''),
    key: generateKey(),
  },
  reducers: {
    changeTitle(state, { payload: title }) {
      return { ...state, title };
    },

    getRecords(state, { payload }) {
      const { title, records, docId: key } = payload;
      return { ...state, records, title, key };
    },

    changeRecords(state, { payload: records }) {
      return { ...state, records };
    },
  },
};

export default record;
