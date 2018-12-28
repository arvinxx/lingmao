import React from 'react';
import { shallow } from 'enzyme';
import App, { ITagSelectorProps } from './index';
import { spy } from 'sinon';
import { littleTags as labels } from '@/data/tag';

const setup = () => {
  const dispatch = spy();
  const props: ITagSelectorProps = { labels, selectedTags: ['1', '5'] };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};
const { wrapper, props, dispatch } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('正常渲染', () => {
  expect(wrapper.find('.container').length).toEqual(1);
  expect(wrapper.find('Label').length).toEqual(1);
  expect(wrapper.find('EditableTags').length).toEqual(2);
});

describe('响应操作', () => {
  let Input;
  beforeEach(() => {
    Input = wrapper.find('Input');
  });

  it('newLabelOnInput should run when change', () => {
    Input.simulate('change', { target: { value: '1' } });
    expect(wrapper.state('newLabel')).toEqual('1');
  });
  it('newLabelOnFocus should run when focus', () => {
    expect(wrapper.state('newLabelPlaceHolder')).toEqual('添加条目');
    Input.simulate('focus');
    expect(wrapper.state('newLabelPlaceHolder')).toEqual('');
  });

  describe('newLabelOnBlur', () => {
    it("newLabelOnBlur should run when blur if there's content", () => {
      wrapper.setState({ newLabel: '1' });
      Input.simulate('blur');
      expect(wrapper.state('newLabelPlaceHolder')).toEqual('添加条目');
      expect(wrapper.state('newLabel')).toEqual('');
      expect(dispatch.callCount).toEqual(1);
    });
    it("newLabelOnBlur should not run when blur if there's no content", () => {
      Input.simulate('blur');
      expect(wrapper.state('newLabelPlaceHolder')).toEqual('添加条目');
      expect(wrapper.state('newLabel')).toEqual('');
      expect(dispatch.callCount).toEqual(0);
    });
  });
  describe('newLabelOnBlur', () => {
    it("newLabelOnBlur should run when blur if there's content", () => {
      wrapper.setState({ newLabel: '1' });
      Input.simulate('pressEnter');
      expect(wrapper.state('newLabelPlaceHolder')).toEqual('');
      expect(wrapper.state('newLabel')).toEqual('');
      expect(dispatch.callCount).toEqual(1);
    });
    it("newLabelOnPressEnter should not run when pressEnter if there's no content", () => {
      Input.simulate('pressEnter');
      expect(wrapper.state('newLabelPlaceHolder')).toEqual('');
      expect(wrapper.state('newLabel')).toEqual('');
      expect(dispatch.callCount).toEqual(0);
    });
  });
});
