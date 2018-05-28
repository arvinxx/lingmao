import Mock from 'mockjs';

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

export const keywords = Mock.mock({
  data: '@csentence',
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
