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
describe('TagInput', () => {
  // case1

  it('TagInput Component should be render', () => {
    expect(wrapper.find('.dimension-container').exists());
  });

  describe('new key Component', () => {
    it('should change newKey state when onChange is called', () => {
      const mockNewKeyChange = {
        target: {
          value: 'Test',
        },
      };
      wrapper.find('.add-key').simulate('change', mockNewKeyChange);
      expect(wrapper.state().newKey).toEqual('Test');
    });
    it('should disptach addKey and clean newKey when pressEnter or blur is called', () => {

      wrapper.find('.add-key').simulate('blur');
      expect(wrapper.state().newKey).toEqual('');
    });
  });
});
