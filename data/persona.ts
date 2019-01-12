import Mock from 'mockjs';
import { clusterResult } from './clusterResults';

export const photo = Mock.mock({
  text: '画像照片',
  value: '@dataImage("300x300")',
});
export const name = Mock.mock({ data: '@cname' }).data;
export const career = Mock.mock({
  'data|1': ['医生', '设计师', '制图员与摄影测绘师', '建筑师', '工业工程师', '画家'],
}).data;
export const percent = Mock.mock({
  data: '@natural(1,40)',
}).data;

export const basicInfo = Mock.mock({
  data: [
    {
      type: 'age',
      text: '年龄',
      value: '@natural(18,55)',
    },

    {
      type: 'gender',
      text: '性别',
      'value|1': ['男', '女'],
    },
    {
      type: '@guid',
      text: '@ctitle',
      value: '@ctitle',
    },
    {
      type: '@guid',
      text: '@ctitle',
      value: '@ctitle',
    },
    {
      type: '@guid',
      text: '@ctitle',
      value: '@ctitle',
    },
  ],
}).data;

const mockDimGroups = [
  {
    text: '基本信息',
    key: 'basicInfo',
    dims: [
      {
        LabelKey: '@guid',
        lext: '@natural(18,55)',
        labelText: '年龄',
      },
      {
        labelKey: '@guid',
        labelText: '性别',
        'text|1': ['男', '女'],
      },
      {
        labelKey: '@guid',
        labelText: '@ctitle',
        text: '@ctitle',
      },
      {
        labelKey: '@guid',
        labelText: '@ctitle',
        text: '@ctitle',
      },
      {
        labelKey: '@guid',
        labelText: '@ctitle',
        text: '@ctitle',
      },
    ],
  },
  {
    text: '动机',
    key: 'motivations',
    dims: [],
  },
  {
    text: '目标',
    key: 'goals',
    dims: clusterResult().array,
  },
  {
    text: '痛点',
    key: 'frustrations',
    dims: clusterResult().array,
  },
  {
    text: '行为变量',
    key: 'behavior',
    dims: [],
  },
  {
    text: '态度',
    key: 'attitude',
    dims: clusterResult().array,
  },
  {
    text: '设备偏好',
    key: 'device',
    dims: clusterResult().array,
  },
  {
    text: '相关决策者',
    key: 'influencers',
    dims: [],
  },
  {
    text: '技能',
    key: 'skill',
    dims: [],
  },
  {
    text: '活动',
    key: 'activities',
    dims: [],
  },
];

export const personaList = Mock.mock({
  data: [
    {
      typeName: Mock.mock({
        'data|1': ['乐观人群', '技术人群', '悲观人群', '职业经理人'],
      }).data,
      dimGroups: mockDimGroups,
      checkedDims: [],
      basicInfo: {
        percent: Mock.mock({
          data: '@natural(1,40)',
        }).data,
        keywords: '',
        name: Mock.mock({ data: '@cname' }).data,
        bios: '',
        career: Mock.mock({
          'data|1': ['医生', '设计师', '制图员', '摄影师', '建筑师', '工业工程师', '画家'],
        }).data,
        photo: {
          text: 'photo1',
          value: 'photo1',
        },
      },
    },
    {
      typeName: Mock.mock({
        'data|1': ['乐观人群', '技术人群', '悲观人群', '职业经理人'],
      }).data,
      dimGroups: mockDimGroups,
      checkedDims: [],
      basicInfo: {
        percent: Mock.mock({
          data: '@natural(1,40)',
        }).data,
        keywords: '',
        name: Mock.mock({ data: '@cname' }).data,
        bios: '',
        career: career,
        photo: {
          text: 'photo2',
          value: 'photo2',
        },
      },
    },
    {
      typeName: Mock.mock({
        'data|1': ['乐观人群', '技术人群', '悲观人群', '职业经理人'],
      }).data,
      dimGroups: mockDimGroups,
      checkedDims: [],
      basicInfo: {
        percent: Mock.mock({
          data: '@natural(1,40)',
        }).data,
        keywords: '',
        name: Mock.mock({ data: '@cname' }).data,
        bios: '',
        career: career,
        photo: {
          text: 'photo2',
          value: 'photo2',
        },
      },
    },
  ],
}).data;

export const NewPersona = Mock.mock({
  data:
    {
      typeName: '画像类别名',
      dimGroups: mockDimGroups,
      checkedDims: [],
      basicInfo: {
        percent: Mock.mock({
          data: '@natural(1,40)',
        }).data,
        keywords: '',
        name: Mock.mock({ data: '@cname' }).data,
        bios: '',
        career: '职业名',
        photo: {
          text: '画像',
          value: 'photo1',
        },
      },
    }
}).data;
