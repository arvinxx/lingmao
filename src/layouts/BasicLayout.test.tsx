import React from 'react';
import { shallow } from 'enzyme';
import App, { IBasicLayoutProps } from './BasicLayout';
import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props: IBasicLayoutProps = {
    collapsed: false,
    showMenu: true,
    location: {
      hash: '',
      key: 'ohadrr',
      pathname: '/',
      query: {},
      search: '',
      state: undefined,
    },
  };
  //@ts-ignore TODO: WrappedComponent 如何 typing
  const wrapper = shallow(<App.WrappedComponent {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();

it('render', () => {
  expect(wrapper.find('SiderMenu').length).toEqual(1);
  expect(wrapper.find('.layout').length).toEqual(1);
});

describe('response', () => {
  it('should collapse menu', () => {
    const SiderMenu = wrapper.find('SiderMenu');
    SiderMenu.simulate('collapse');
    expect(dispatch.callCount).toEqual(1);
  });
});
