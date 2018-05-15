export const interview = [
  {
    text: '记录',
    path: 'record',
    left: [
      {
        text: 'left',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'right',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'sync',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'inbox',
        dispatch: {
          type: 'interview/changeUploadVisible',
        },
      },
    ],
    right: [
      {
        text: 'tags-o',
        dispatch: {
          type: 'interview/changeTagVisible',
        },
      },
    ],
  },
  {
    text: '标签',
    path: 'tag',
    left: [
      {
        text: 'left',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'right',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'sync',
        dispatch: {
          type: '',
        },
      },
    ],
    right: [
      {
        text: 'exception',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'bulb',
        dispatch: {
          type: '',
        },
      },
    ],
  },
];
export const data = [
  {
    text: '数据表格',
    path: 'table',
    left: [
      {
        text: 'left',
        onClick: (e) => {
          console.log(e);
        },
      },
    ],
    right: [
      {
        text: 'tablet',
        dispatch: {
          type: 'interview/changeTabletVisible',
        },
      },
    ],
  },
  {
    text: '检验图表',
    path: 'validation',
    left: [
      {
        text: 'left',
        onClick: (e) => {
          console.log(e);
        },
      },
    ],
    right: [
      {
        text: 'tablet',
        dispatch: {
          type: 'interview/changeTabletVisible',
        },
      },
    ],
  },
  {
    text: '降维图表',
    path: 'reduction',
    left: [
      {
        text: 'left',
        onClick: (e) => {
          console.log(e);
        },
      },
    ],
    right: [
      {
        text: 'tablet',
        dispatch: {
          type: 'interview/changeTabletVisible',
        },
      },
    ],
  },
  {
    text: '聚类结果',
    path: 'cluster',
    left: [
      {
        text: 'left',
        onClick: (e) => {
          console.log(e);
        },
      },
    ],
    right: [
      {
        text: 'tablet',
        dispatch: {
          type: 'interview/changeTabletVisible',
        },
      },
    ],
  },
  {
    text: '分析汇总',
    path: 'analysis',
    left: [
      {
        text: 'left',
        onClick: (e) => {
          console.log(e);
        },
      },
    ],
    right: [
      {
        text: 'tablet',
        dispatch: {
          type: 'interview/changeTabletVisible',
        },
      },
    ],
  },
];
export const persona = [
  {
    text: '编辑',
    path: 'edit',
    left: [
      {
        text: 'left',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'right',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'sync',
        dispatch: {
          type: '',
        },
      },
    ],
    right: [
      {
        text: 'bars',
        dispatch: {
          type: 'persona/changeDimVisible',
        },
      },
    ],
  },
  {
    text: '导出',
    path: 'export',
    left: [
      {
        text: 'left',
        dispatch: {
          type: '',
        },
      },
      {
        text: 'right',
        dispatch: {
          type: '',
        },
      },
    ],
    right: [
      {
        text: 'to-top',
        dispatch: {
          type: 'per',
        },
      },
    ],
  },
];
export const dashboard = {
  left: [
    {
      text: 'left',
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      text: 'upload',
      dispatch: {
        type: 'interview/changeUploadVisible',
      },
    },
    {
      text: 'sync',
      onClick: (e) => {
        // props.dispatch({
        //
        // });
      },
    },
  ],
  center: ['数据表格', '检验图表', '降维图表', '聚类结果', '分析汇总'],
  right: ['calendar', 'desktop'],
};
