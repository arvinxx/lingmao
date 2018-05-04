export const interview = {
  left: [
    {
      text: 'left',
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      text: 'right',
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      text: 'sync',
      onClick: (e) => {
        console.log('开始同步');
        // props.dispatch({
        //
        // });
      },
    },
    'right',
    'sync',
  ],
  center: ['记录', '标签'],
  right: ['warning', 'unlock'],
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
      text: 'right',
      onClick: (e) => {
        console.log(e);
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
