export const interview = {
  left: [
    {
      text: 'inbox',
      dispatch: {
        type: 'interview/changeUploadVisible',
      },
    },
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
  center: [{ text: '记录', path: 'record' }, { text: '标签', path: 'tag' }],
  right: [
    {
      text: 'tags-o',
      dispatch: {
        type: 'interview/changeTagVisible',
      },
    },
  ],
};
export const data = {
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
  center: [
    { text: '数据表格', path: 'table' },
    { text: '检验图表', path: 'validation' },
    { text: '降维图表', path: 'reduction' },
    { text: '聚类结果', path: 'cluster' },
    { text: '分析汇总', path: 'analysis' },
  ],
  right: [
    {
      text: 'tablet',
      dispatch: {
        type: 'interview/changeTabletVisible',
      },
    },
    'desktop',
  ],
};
export const persona = {
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
  center: [{ text: '编辑', path: 'edit' }, { text: '导出', path: 'export' }],
  right: [
    {
      text: 'bars',
      dispatch: {
        type: 'persona/changeDimVisible',
      },
    },
  ],
};
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
