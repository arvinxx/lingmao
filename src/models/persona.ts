import { DvaModel } from '@/typings/dva';
import { getTagsArrByKey } from '@/utils';
import update from 'immutability-helper';
import router from 'umi/router';
import { basicInfo, dimGroups } from '@/common';
import { generateTagId } from '@/utils';
import { TQuesData, IQuesRecord } from './data';

import { personaList } from '@/data/persona';
import { fetchPersonaData } from '@/services';

export interface IPersonaDim {
  text: string;
  value: number;
  labelKey: string;
  labelText: string;
}

export interface IDimGroup {
  text: string;
  key: string;
  dims: IPersonaDim[];
}
export type TDimGroups = IDimGroup[];

export interface IBasicInfo {
  percent: number;
  keywords: string;
  name: string;
  bios: string;
  career: string;
  photo: {
    value: any[];
    text: string;
  };
}

// 单个画像数据结构
export interface IPersona {
  dimGroups: TDimGroups; //维度群组,如基本信息 动机 目标等
  checkedDims: string[]; // 进行展示的维度
  basicInfo: IBasicInfo; // 画像的基本信息
  typeName: string; // 画像类别名称
}
// 多个画像形成的画像列表
export type TPersonaList = IPersona[];
export interface IPersonaState {
  dimVisible: boolean;
  exportVisible: boolean;
  expandedDims: Array<string>;
  personaList: TPersonaList; // 画像列表
  displayDimGroups: TDimGroups;
  showText: boolean;
  displayIndex: string;
}

const persona: DvaModel<IPersonaState> = {
  state: {
    dimVisible: true,
    exportVisible: false,
    expandedDims: [],
    personaList: personaList,
    displayDimGroups: [],
    displayIndex: '0',
    showText: true,
  },
  effects: {
    *fetchPersona({ payload }, { put, select, call }) {
      const { isLogin, phoneNumber } = yield select((state) => state.login);
      const currentProject = yield select((state) => state.project.currentProject);
      let projectId;
      if (currentProject === null) return;
      else {
        projectId = currentProject.id;
      }
      // check it right:
      console.log('get login status:', isLogin, phoneNumber);
      if (isLogin) {
        const PersonaData = yield call(fetchPersonaData, projectId);
        const data = PersonaData.data;
        // 测试数据后端获取：
        console.log('all persona data', PersonaData.data);
        yield put({
          type: 'savePersonaList',
          payload: data,
        });
        // const data = {
        //   starProjectList: starData.data,
        //   recentProjectList: recentData.data,
        //   allProjectList: allData.data,
        // };
        // yield put({
        //   type: 'saveProjectList',
        //   payload: data
        // });
      } else {
        router.push('/user');
      }
    },
  },
  reducers: {
    savePersonaList(state, {payload: data}) {
      console.log('data',data);
      let personaList = [];
      data.forEach(item => {
        let photoInfo = JSON.parse(item.photo);
        let basicInfo = {
          percent: item.percent,
          keywords: item.quote,
          name: item.name,
          bios: item.bios,
          career: item.career,
          photo: photoInfo
        };
        let personaItem = {
          // dimGroups: '', //维度群组,如基本信息 动机 目标等
          // checkedDims: '', // 进行展示的维度
          basicInfo: basicInfo, // 画像的基本信息
          // typeName: '', // 画像类别名称
        };
        personaList.push(personaItem);
      });
      console.log('personaList',personaList);

      // const basicInfo = {
      //   percent: ,
      //   keywords: string,
      //   name: string,
      //   bios: string,
      //   career: string,
      //   photo: ,
      // };
      return { ...state, personaList};
    },
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
        disPlayDims: getTagsArrByKey(tagGroups, state.checkedDims),
      };
    },

    /**
     * 该函数控制在画像上显示的维度群组
     */
    handleDisplayDimGroups(state: IPersonaState) {
      const { personaList, displayIndex } = state;
      const { dimGroups, checkedDims } = personaList[Number(displayIndex)];
      const filterDimGroups = dimGroups.filter((dimGroup: IDimGroup) =>
        dimGroup.dims.some((dim) => checkedDims.some((item) => item === dim.labelKey))
      );
      return {
        ...state,
        displayDimGroups: filterDimGroups.map((dimGroup) => ({
          ...dimGroup,
          dims: dimGroup.dims.filter((dim) => checkedDims.some((id) => id === dim.labelKey)),
        })),
      };
    },
    /**
     * 拖拽排列显示的维度群组
     * dragIndex: 拖拽起始序号
     * dropIndex: 拖拽终点序号
     */
    handleDragDisplayDim(state, { payload }) {
      const { dragIndex, dropIndex } = payload;
      const dragItem = state.displayDimGroups[dragIndex];
      return {
        ...state,
        displayDimGroups: update(state.displayDimGroups, {
          $splice: [[dragIndex, 1], [dropIndex, 0, dragItem]],
        }),
      };
    },
    handleDimText(state, {payload}) {
      // 编辑文字 + 找到用户->知道是哪一个维度->该维度的哪一个被编辑->更改
      const {text, index, dimIndex, itemIndex} = payload;
      return {
        ...state,
        personaList: update(state.personaList, {
          [index]: {
            dimGroups: {
              [dimIndex]: {
                dims:{
                  [itemIndex]: {
                    text: {
                      $set: text,
                    },
                  },
                },
              },
            },
          },
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

    initUserModel(state, { payload: userModels }) {
      return {
        ...state,
        personaList: userModels.map((userModel: IQuesRecord) => {
          return {
            dimGroups,
            checkedDims: [],
            typeName: userModel.typeName,
            basicInfo: {
              ...basicInfo(),
              percent: userModel.percent || 0,
            },
          };
        }),
      };
    },

    addDimToPersonaGroups(state, { payload }) {
      const { personaQuesData, personaDimId, groupId } = payload as {
        personaQuesData: TQuesData;
        personaDimId: string;
        groupId: string;
      };
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

          const persona: IPersona = state.personaList[index];
          const { dimGroups, ...resData } = persona;
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
        personaList: state.personaList.map((i: IPersona) => {
          const { dimGroups } = i;
          const dragGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dragGroup);
          const dropGroupIndex = dimGroups.findIndex((dimGroup) => dimGroup.key === dropGroup);
          return {
            ...i,
            dimGroups: update(dimGroups, {
              [dragGroupIndex]: {
                dims: {
                  $apply: (dims: IPersonaDim[]) =>
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
        if (pathname === '/persona/edit') {
          dispatch({ type: 'fetchPersona' });
        }
      });
    },
  },
};

export default persona;
