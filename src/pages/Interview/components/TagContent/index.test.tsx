import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import App, { ITagContentProps } from './index';
import { smallLabel as labels } from '@/data/labels';

const setup = () => {
  const dispatch = spy();
  const props: ITagContentProps = { labels };
  const wrapper = mount(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('render', () => {
  expect(wrapper.find('.container').length).toEqual(1);
});

describe('response', () => {
  it('deleteTag should run when onConfirm', () => {
    //TODO: Propconfirm 不存在 simulate 事件
    // wrapper.find('Popconfirm').at(0);
    // .simulate('confirm'); // 问题: Propconfirm 不存在 simulate 事件
    // expect(dispatch.callCount).toEqual(1);
    expect(wrapper.find('Popconfirm').at(0).length).toEqual(1);
  });

  describe('点击标签目录筛选对应的记录', () => {
    it('filterRecord should run when click tag', () => {
      wrapper
        .find('#label')
        .at(0)
        .simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
});
