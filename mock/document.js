const records = [
  {
    id: '2eb162461a26ce0b7',
    text: '2003年的金融大丑闻',
    modified: 1521594542607,
    finish: false,
    collapsed: false,
    children: [
      {
        children: [
          {
            modified: 1517628989053,
            id: '33416159bc9e7d002',
            text:
              '这是查理芒格在2000年夏天度假时写的一篇关于会计的道德预言剧，主要讲宽特公司因为故意不把员工股票期权的计入成本，最后败露酿成全国性灾难的故事。总共分为三幕。',
          },
          {
            modified: 1517644923032,
            id: '27a1615aafc098091',
            text:
              '第一幕：宽特先生因不采用股票期权作为激励机制，创造了行之有效的企业文化，且拥有行业中的关键技术，造就了繁荣又有前景的宽特公司。——道德高尚的黄金时代',
          },
          {
            collapsed: false,
            modified: 1517644923032,
            finish: false,
            id: '2071615aa1975f0a3',
            text:
              '第二幕：1982年宽特先生去世，新管理层实施“现代金融工程术”，连续20年虚报利润，直至2003年丑闻败露，引起全国范围内严重的经济衰退。——道德沦丧的时代',
          },
          {
            modified: 1517645979289,
            id: '28f1615abfde99051',
            text: '第三幕：上帝对宽特丑闻事件进行审判。',
          },
        ],
        collapsed: true,
        modified: 1521594544819,
        id: '15116159bbf6db0c3',
        text: '0 内容介绍',
        finish: false,
      },
      {
        children: [
          {
            collapsed: false,
            modified: 1517647785128,
            id: '1df1615adb6ca80eb',
            text: '1 公司简介',
          },
          {
            modified: 1517647861516,
            id: '2681615adc970c0e2',
            text: '2 经营策略',
          },
          {
            children: [
              {
                modified: 1517648357825,
                id: '3511615ae429c101c',
                text: '1 1982年，宽特科技占据行业龙头地位，营业收入10亿元，利润1亿元。',
              },
              {
                modified: 1517648432923,
                id: '2e1615ae54f1b068',
                text:
                  '2 按照现有经营策略，未来20年，年均利润可以达到收入的10%，年收入增长可以达到20%。',
              },
              {
                modified: 1517648509666,
                id: 'd61615ae67ae2016',
                text:
                  '3 2003年开始，利润将继续保持年收入的10%，而年收入的增长速度将下降到4%。不过不能准确预测收入增长缓慢期会从哪一年开始。',
              },
            ],
            modified: 1517646316697,
            id: '4a1615ac50499175',
            text: '3 公司状况',
          },
        ],
        modified: 1521594544820,
        id: '12e1615abd168d162',
        text: '1 黄金时代',
        collapsed: true,
        finish: false,
      },
    ],
  },
];

const document = {
  title: 'hello',
  records,
};
export default document;

