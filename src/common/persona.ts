import Mock from 'mockjs';
import photo1 from '../assets/photos/1.jpg';
import photo2 from '../assets/photos/2.jpg';

import { clusterResult } from '../../mock/clusterResults';
import { career, name } from '../../mock/persona';

export default [
  {
    type: 'motivations',
    text: '动机',
  },
  {
    type: 'goals',
    text: '目标',
  },
  {
    type: 'frustrations',
    text: '痛点',
  },
  {
    type: 'activities',
    text: '活动',
  },
  { type: 'skill', text: '技能' },
  { type: 'attitude', text: '态度' },
];

export const dimGroups = [
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
  'data|1-2': [
    {
      dimGroups,
      checkedDims: [],
      basicInfo: {
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
