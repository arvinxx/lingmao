import React from 'react';
import { mount } from 'enzyme';
import App, { IQuestionSelectorProps } from './QuestionSelector';
import { spy } from 'sinon';
import { quesData } from '@/data/quesData';

const setup = () => {
  const dispatch = spy();
  const props: IQuestionSelectorProps = {
    analysisStage: 0,
    quesData,
  };
  const wrapper = mount(<App {...props} dispatch={dispatch} />);
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
      wrapper
        .find('#reset')
        .at(0)
        .simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
  describe('单击确认按钮完成确认', () => {
    it('dispatch should run once when selectedQuestionKeys is not empty & analysisStage is not 1', () => {
      wrapper.setState({
        selectedQuestionKeys: ['1', '2'],
      });
      wrapper
        .find('#confirm')
        .at(0) // TODO 问题:为什么会 find 两个 confirm 的 button
        .simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
    it('dispatch should not run when selectedQuestionKeys is empty & analysisStage is not 1', () => {
      wrapper.setState({
        selectedQuestionKeys: [],
      });
      wrapper
        .find('#confirm')
        .at(0)
        .simulate('click');
      expect(dispatch.callCount).toEqual(0);
    });
    it('dispatch should run four times when selectedQuestionKeys is not empty & analysisStage is 1', () => {
      wrapper.setState({
        selectedQuestionKeys: ['1', '2'],
      });
      wrapper.setProps({
        analysisStage: 1,
      });
      wrapper
        .find('#confirm')
        .at(0)
        .simulate('click');
      expect(dispatch.callCount).toEqual(4);
    });
  });
});
describe('Function', () => {});
