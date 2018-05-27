import Mock from 'mockjs';

import { clusterResult } from '../../mock/clusterResults';

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

export const features = ['motivations', 'goals', 'frustrations'];

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
