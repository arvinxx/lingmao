import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    dimensions: [
      {
        _id: '1',
        key: 'd',
        values: ['1', '2', '3'],
        inputVisible: false,
        valueEditable: false,
      },
      {
        _id: '2',
        key: 'dg',
        values: ['3', '5', '7'],
        inputVisible: false,
        valueEditable: false,
      },
    ],
    selectedLabels: ['1', '5', '7'],
    dispatch: jest.fn(),
  };
  const wrapper = shallow(<App {...props} />);
  return {
    props,
    wrapper,
  };
};
const { wrapper, props } = setup();
describe('TreeList 正常渲染样式', () => {
  // case1

  it('TagInput Component should be render', () => {
    expect(wrapper.find('.dimension-container').exists());
  });
});

describe('新建条目', () => {
  describe('按回车新建条目', () => {});
  describe('按 Shift 回车 切换条目与注释', () => {});
});
describe('缩进', () => {
  describe('按 Tab 缩进一级', () => {});
  describe('缩进的子级与父级之间不能存在任何的空级', () => {});
  describe('按  Shift + Tab 上浮一级', () => {});
});
describe('拖动', () => {
  describe('鼠标按住小圆点进行拖动时', () => {
    describe('底色变更暗一些', () => {});
    describe('根据鼠标的垂直方向的移动位置来确定移动后的从属层级', () => {});
    describe('鼠标处显示一个悬浮的 icon 图标', () => {});
    describe('鼠标挪到哪一条目，就在该条目上方显示一条边框线', () => {
      describe('撤销修改按 ESC 退出', () => {});
    });
    describe('编辑值', () => {
      describe('鼠标悬浮 2 秒后在右上角出现删除和编辑按钮', () => {});
      describe('点击编辑按即可编辑', () => {});
      describe('点击删除按钮即可删除', () => {});
    });
  });
});
describe('折叠', () => {
  describe('点击折叠状态图标折叠或展开子级', () => {});
});
describe('鼠标悬浮', () => {
  describe('悬浮到任意条目，在最左侧出现该条目的折叠状态图标', () => {});
  describe('悬浮到小圆点上立刻出现圆点的聚焦', () => {});
  describe('悬浮到小圆点超过 3 秒 底色变暗', () => {});
});
