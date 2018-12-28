import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import App, { IVarianceExplainProps } from './VarianceExplain';
import { pca } from '@/data/ml';
import { getAccumulation } from '@/utils';
const { eigenValues, percent } = pca;
const vEData = eigenValues.map((i, index) => ({
  key: index,
  eigenValue: i.toFixed(3),
  percent: (percent[index] * 100).toFixed(1) + '%',
  acc: (getAccumulation(percent)[index] * 100).toFixed(1) + '%',
  dims: index + 1,
}));
const setup = () => {
  const dispatch = spy();
  const props: IVarianceExplainProps = {
    rotation: false,
    data: vEData,
  };
  const wrapper = mount(<App {...props} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

describe('render', () => {
  it('should not render rotation', () => {
    expect(wrapper.find('th').length).toEqual(4);
  });
  it('should render rotation', () => {
    wrapper.setProps({ rotation: true });
    expect(wrapper.find('th').length).toEqual(9);
    wrapper.setProps({ rotation: false });
  });
});
