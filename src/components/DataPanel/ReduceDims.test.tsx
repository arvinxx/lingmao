import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { IReduceDimsProps } from './ReduceDims';

const setup = () => {
  const dispatch = spy();
  const props: IReduceDimsProps = {
    analysisStage: 4,
    dims: [
      {
        text: '11',
        id: '11',
      },
    ],
    percent: 0.5,
    selectedDims: ['11'],
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

describe('render', () => {
  it('should render normal', () => {
    expect(wrapper.find('.down').length).toEqual(1);
    expect(wrapper.find('DimsSelect').length).toEqual(1);
  });
  describe('Progress', () => {
    it('should have yellow class name when 50<percentValue<=70', () => {
      wrapper.setProps({ percent: 0.7 });
      expect(wrapper.find('Progress').hasClass('yellow')).toBeTruthy();
      wrapper.setProps({ percent: 0.5 });
    });
    it("shouldn't have class when percentValue<=50 or percentValue>70", () => {
      wrapper.setProps({ percent: 0.3 });
      expect(wrapper.find('Progress').hasClass('yellow')).toBeFalsy();
      wrapper.setProps({ percent: 0.8 });
      expect(wrapper.find('Progress').hasClass('yellow')).toBeFalsy();
    });
  });
});

describe('response', () => {
  it('resetSelect should run when click 重置 button', () => {
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(dispatch.callCount).toEqual(1);
  });
  describe('confirmSelection', () => {
    it('dispatch should run 3 times when click if stage is 4', () => {
      wrapper
        .find('Button')
        .last()
        .simulate('click');
      expect(dispatch.callCount).toEqual(3);
    });
    it('dispatch should not run when  click if stage is not 4 ', () => {
      wrapper.setProps({ analysisStage: 5 });
      wrapper
        .find('Button')
        .last()
        .simulate('click');
      expect(dispatch.callCount).toEqual(0);
      wrapper.setProps({ analysisStage: 4 });
    });
  });
});

describe('function', () => {
  describe('getStatus', () => {
    const getStatus = (wrapper.instance() as App).getStatus;
    it('should return exception', () => {
      expect(getStatus(10)).toEqual('exception');
    });
    it('should return success', () => {
      expect(getStatus(90)).toEqual('success');
    });
    it('should return null', () => {
      expect(getStatus(76)).toEqual(null);
    });
  });
  describe('selectDims', () => {
    const selectDims = (wrapper.instance() as App).selectDims;
    it('should dispatch add', () => {
      selectDims(true, '1');
      expect(dispatch.callCount).toEqual(1);
      expect(dispatch.args[0][0]).toEqual({
        type: 'data/addReductionSelectedDims',
        payload: '1',
      });
    });
    it('should dispatch remove', () => {
      selectDims(false, '1');
      expect(dispatch.callCount).toEqual(1);
      expect(dispatch.args[0][0]).toEqual({
        type: 'data/removeReductionSelectedDims',
        payload: '1',
      });
    });
  });
});
