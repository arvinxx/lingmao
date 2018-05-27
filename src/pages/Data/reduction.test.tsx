import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { IReductionProps } from './reduction';
import FA from '../../../mock/FA';

const diagrams = ['碎石图', '方差解释表', '相关系数表'];
const setup = () => {
  const dispatch = spy();
  const props: IReductionProps = {
    FAResult: FA,
    diagrams,
    isReduced: true,
    rotation: false,
  };
  //@ts-ignore TODO 如何解决 WrappedComponent 报错问题
  const wrapper = shallow(<App.WrappedComponent {...props} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

describe('render', () => {
  it('should render no data', () => {
    wrapper.setProps({ isReduced: false });
    expect(wrapper.find('#no-data').length).toEqual(1);
    wrapper.setProps({ isReduced: true });
  });
  it('should render 4 chart', () => {
    expect(wrapper.find('CompMatrixTable').length).toEqual(1);
    expect(wrapper.find('Plots').length).toEqual(1);
    expect(wrapper.find('CorrTable').length).toEqual(1);
    expect(wrapper.find('VarianceExplain').length).toEqual(1);
  });
  it('should render 1 chart', () => {
    wrapper.setProps({ diagrams: [] });
    expect(wrapper.find('CompMatrixTable').length).toEqual(1);
    expect(wrapper.find('Plots').length).toEqual(0);
    expect(wrapper.find('CorrTable').length).toEqual(0);
    expect(wrapper.find('VarianceExplain').length).toEqual(0);
    wrapper.setProps({ diagrams });
  });
});
