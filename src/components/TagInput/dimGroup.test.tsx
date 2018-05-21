import React from 'react';
import { mount, shallow } from 'enzyme';
import App, { IDimGroupProps } from './dimGroup';

const dispatch = jest.fn();
const setup = () => {
  // 模拟 props
  const props: IDimGroupProps = { id: '123', value: '24124', dispatch };
  const wrapper = shallow(<App {...props} />);
  return { props, wrapper };
};
const { wrapper, props } = setup();
describe('DimGroup 正常渲染', () => {
  // case1
  it('DimGroup Component should be render', () => {
    expect(wrapper.at(0).key()).toEqual('123kcc');
  });
});

describe('', () => {
  it('should disptach function', () => {
    const app = mount(<App {...props} />);
    app.find('Input').simulate('change',);
    expect(dispatch.mock.calls.length).toEqual(1);
  });
});
