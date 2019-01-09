import { DvaModel } from '@/typings/dva';
import { message } from 'antd';
import router from 'umi/router';
import {
  fetchProjectData,
  fetchProjectRecentData,
  fetchProjectStarData,
  createNewProject,
  deleteOneProject,
} from '@/services';

interface IProjectItem {
  id: number;
  name: string;
  description: string;
  create_time: string;
  star: boolean;
}

export interface IProjectList {
  starProjectList: IProjectItem[];
  recentProjectList: IProjectItem[];
  allProjectList: IProjectItem[];
}

export interface IProjectState {
  projectList: IProjectList;
  currentProject: object;
}

const project: DvaModel<IProjectState> = {
  state: {
    projectList: {
      allProjectList: [],
      recentProjectList: [],
      starProjectList: [],
    },
    currentProject: null,
  },
  reducers: {
    saveProjectList(state, { payload: data }) {
      return { ...state, projectList: data };
    },
    saveCurrentProject(state: IProjectState, { payload: data }) {
      const { allProjectList, recentProjectList, starProjectList } = state.projectList;
      const index = data.index;
      const option = data.option;
      let currentProject;
      switch (option) {
        case 'all':
          currentProject = allProjectList[index];
          break;
        case 'star':
          currentProject = starProjectList[index];
          break;
        case 'recent':
          currentProject = recentProjectList[index];
          break;
      }
      console.log(state);
      return { ...state, currentProject };
    },
  },
  effects: {
    *gotoProject({ payload }, { put, select, call }) {
      yield put({
        type: 'saveCurrentProject',
        payload: payload,
      });
      yield router.push('/persona');
    },
    *deleteProject({ payload }, { put, select, call }) {
      console.log('delete Project:', payload.index);
      const index = payload.index;
      const { allProjectList } = yield select((state) => state.project.projectList);
      const id = allProjectList[index].id;
      const result = yield call(deleteOneProject, id);
      console.log('result', result);
      if (result.data.isSuccess) {
        message.success('成功删除项目', 2.5);
        yield put({
          type: 'fetchData',
        });
      } else message.warning('删除项目失败', 2.5);
    },
    *createNew({ payload }, { put, select, call }) {
      console.log('createNewProject:', payload);
      const result = yield call(createNewProject, payload);
      console.log('result', result);
      if (result.data.isSuccess) {
        message.success('成功创建项目', 2.5);
        yield put({
          type: 'fetchData',
        });
      } else message.warning('创建项目失败', 2.5);
    },
    *fetchData({ payload }, { put, select, call }) {
      const { isLogin, phoneNumber } = yield select((state) => state.login);
      // check it right:
      console.log('get login status:', isLogin, phoneNumber);
      // if (isLogin) {
      const allData = yield call(fetchProjectData);
      const starData = yield call(fetchProjectStarData);
      const recentData = yield call(fetchProjectRecentData);
      // 测试数据后端获取：
      console.log('all project data', allData.data);
      console.log('all star data', starData.data);
      console.log('all recent data', recentData.data);
      const data = {
        starProjectList: starData.data,
        recentProjectList: recentData.data,
        allProjectList: allData.data,
      };
      yield put({
        type: 'saveProjectList',
        payload: data,
      });
      // } else {
      // router.push('/user');
      // }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/project/view') {
          console.log('fetch project api');
          dispatch({
            type: 'fetchData',
          });
        }
      });
    },
  },
};

export default project;
