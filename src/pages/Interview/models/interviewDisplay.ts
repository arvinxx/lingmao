import { DvaModel } from '@/typings/dva';

export interface IInterviewDisplayState {
  exportDisplay: string;
  uploadVisible: boolean;
  labelMenuVisible: boolean;
}
const interviewDisplay: DvaModel<IInterviewDisplayState> = {
  state: {
    exportDisplay: '1',
    uploadVisible: false,
    labelMenuVisible: true,
  },
  reducers: {
    changeUploadVisible(state) {
      return {
        ...state,
        uploadVisible: !state.uploadVisible,
      };
    },
    changeLabelMenuVisible(state) {
      return {
        ...state,
        labelMenuVisible: !state.labelMenuVisible,
      };
    },
    handleExportDisplay(state, { payload: exportDisplay }) {
      return { ...state, exportDisplay };
    },
  },
};
export default interviewDisplay;
