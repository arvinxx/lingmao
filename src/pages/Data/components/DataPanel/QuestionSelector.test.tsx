import React from 'react';
import { shallow, mount } from 'enzyme';
import App, { IQuestionSelectorProps } from './QuestionSelector';
import { spy } from 'sinon';
import { quesData } from '@/data/quesData';

const setup = () => {
  const dispatch = spy();
  const props: IQuestionSelectorProps = {
    analysisStage: 0,
    quesData,
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});
describe('正常渲染', () => {
  it('render', () => {
    expect(wrapper.find('#Data-Index').length).toEqual(1);
  });
});
describe('Response', () => {
  describe('单击重置按钮重置选项', () => {
    it('resetSelection should run when click', () => {
      console.log(wrapper.find('Button').length);
      console.log('safdfwegfethtttttttt');
      wrapper.find('#reset').simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
  describe('单击确认按钮完成确认', () => {
    it('handleSelected should run when click', () => {
      console.log(wrapper.find('#confirm'));
      wrapper.find('#confirm').simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
});
describe('Function', () => {});
