import Mock from 'mockjs';
import photo1 from '../assets/photos/1.jpg';
import photo2 from '../assets/photos/2.jpg';

import { clusterResult } from '../../mock/clusterResults';
import { career, name } from '../../mock/persona';

export const dimGroups = [
  {
    text: '基本信息',
    key: 'basicInfo',
    dims: [
      {
        tagId: '@guid',
        text: '@natural(18,55)',
        tagText: '年龄',
      },
      {
        tagId: '@guid',
        tagText: '性别',
        'text|1': ['男', '女'],
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
        text: '@ctitle',
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
        text: '@ctitle',
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
        text: '@ctitle',
      },
    ],
  },
  {
    text: '动机',
    key: 'motivations',
    dims: clusterResult().array,
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
    dims: [],
  },
  {
    text: '设备偏好',
    key: 'device',
    dims: [],
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

const dimGroups2 = [
  {
    text: '基本信息',
    key: 'basicInfo',
    dims: [
      {
        tagId: '@guid',
        text: '@natural(18,55)',
        tagText: '年龄',
      },
      {
        tagId: '@guid',
        tagText: '性别',
        'text|1': ['男', '女'],
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
        text: '@ctitle',
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
        text: '@ctitle',
      },
      {
        tagId: '@guid',
        tagText: '@ctitle',
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

export const personaData = Mock.mock({
  data: [
    {
      dimGroups,
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
          value: photo1,
        },
      },
    },
    {
      dimGroups: dimGroups2,
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
          value: photo2,
        },
      },
    },
  ],
}).data;
