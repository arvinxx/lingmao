import React from 'react';
import { shallow } from 'enzyme';
import App, { ITagInputProps } from './index';
import { spy } from 'sinon';
import dimensions from '@/mock/dimensions';

const setup = () => {
  const dispatch = spy();
  const props: ITagInputProps = { dimensions, selectedValues: ['1', '5'] };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};
const { wrapper, props, dispatch } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('render', () => {
  expect(wrapper.find('.container').length).toEqual(1);
  expect(wrapper.find('DimGroup').length).toEqual(2);
  expect(wrapper.find('DimValue').length).toEqual(3);
});

describe('response', () => {
  let Input;
  beforeEach(() => {
    Input = wrapper.find('Input');
  });

  it('newKeyOnInput should run when change', () => {
    Input.simulate('change', { target: { value: '1' } });
    expect(wrapper.state('newKey')).toEqual('1');
  });
  it('newKeyOnFocus should run when focus', () => {
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('添加条目');
    Input.simulate('focus');
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('');
  });

  describe('newKeyOnBlur', () => {
    it("newKeyOnBlur should run when blur if there's content", () => {
      wrapper.setState({ newLabel: '1' });
      Input.simulate('blur');
      expect(wrapper.state('newKeyPlaceHolder')).toEqual('添加条目');
      expect(wrapper.state('newKey')).toEqual('');
      expect(dispatch.callCount).toEqual(2);
    });
    it("newKeyOnBlur should not run when blur if there's no content", () => {
      Input.simulate('blur');
      expect(wrapper.state('newKeyPlaceHolder')).toEqual('添加条目');
      expect(wrapper.state('newKey')).toEqual('');
      expect(dispatch.callCount).toEqual(0);
    });
  });
  describe('newKeyOnBlur', () => {
    it("newKeyOnBlur should run when blur if there's content", () => {
      wrapper.setState({ newLabel: '1' });
      Input.simulate('pressEnter');
      expect(wrapper.state('newKeyPlaceHolder')).toEqual('');
      expect(wrapper.state('newKey')).toEqual('');
      expect(dispatch.callCount).toEqual(2);
    });
    it("newKeyOnPressEnter should not run when pressEnter if there's no content", () => {
      Input.simulate('pressEnter');
      expect(wrapper.state('newKeyPlaceHolder')).toEqual('');
      expect(wrapper.state('newKey')).toEqual('');
      expect(dispatch.callCount).toEqual(0);
    });
  });
});
