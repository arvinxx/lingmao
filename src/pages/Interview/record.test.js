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
  // const wrapper = shallow(<App {...props} />);
  return {
    props,
    wrapper,
  };
};
const { wrapper, props } = setup();
describe('页面正常渲染', () => {
  // case1

  it('TagInput Component should be render', () => {
    // expect(wrapper.find('.dimension-container').exists());
  });
});

describe('保存', () => {
  describe('每隔 3 秒进行一次自动保存', () => {});
  describe('在某个不起眼的地方进行显示', () => {});
  describe('保存时图标进入保存样式', () => {});
});
