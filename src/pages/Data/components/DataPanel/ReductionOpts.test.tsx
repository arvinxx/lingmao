import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { IReductionOptsProps } from './ReductionOpts';

const setup = () => {
  const dispatch = spy();
  const props: IReductionOptsProps = {
    pathname: '/data/reduction',
    tabStage: '1',
    diagrams: [],
    quesData: [],
    selectedDims: [],
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
    expect(wrapper.find('.method').length).toEqual(1);
    expect(wrapper.find('.rotation').length).toEqual(1);
    expect(wrapper.find('.diagram').length).toEqual(1);
    expect(wrapper.find('.buttons').length).toEqual(1);
    expect(wrapper.find('InputNumber').length).toEqual(1);
  });
  it('should render Rate Input', () => {
    wrapper.setState({ method: '1' });
    expect(wrapper.find('#input-rate').length).toEqual(1);
  });
  it('should render Count Input', () => {
    wrapper.setState({ method: '2' });
    expect(wrapper.find('#input-count').length).toEqual(1);
    wrapper.setState({ method: '1' });
  });
});

describe('response', () => {
  describe('finish', () => {
    it('dispatch should run click', () => {
      wrapper
        .find('Button')
        .last()
        .simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
  it('changeRate', () => {
    wrapper.find('InputNumber').simulate('change', 103);
    expect(wrapper.state('value')).toEqual(103);
  });
  it('ChangeMethod', () => {
    wrapper.find('#method').simulate('change', '2');
    expect(wrapper.state('method')).toEqual('2');
    wrapper.setState({ method: '1' });
  });
  it('changeCount ', () => {
    wrapper.setState({ method: '2' });
    wrapper.find('#input-count').simulate('change', 6);
    expect(wrapper.state('count')).toEqual(6);
    wrapper.setState({ method: '1' });
  });
  it('changeDiagram ', () => {
    wrapper.find('CheckboxGroup').simulate('change', ['211']);
    expect(dispatch.callCount).toEqual(1);
  });
  it('changeRotation  ', () => {
    wrapper.find('#rotation').simulate('change', '3');
    expect(wrapper.state('rotationMethod')).toEqual('3');
  });
});
