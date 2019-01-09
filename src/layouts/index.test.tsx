import React from 'react';
import { shallow } from 'enzyme';
import App, { ILayoutEntryProps } from '.';
import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props: ILayoutEntryProps = {
    location: {
      hash: '',
      key: 'ohadrr',
      pathname: '/',
      search: '',
      state: undefined,
    },
    history: {},
  };
  //@ts-ignore TODO: WrappedComponent 如何 typing
  const wrapper = shallow(<App {...props} children={<div>dsa</div>} />);
  return { props, wrapper, dispatch };
};
const { wrapper, dispatch, props } = setup();

it('render BasicLayout', () => {
  expect(wrapper.find('#BasicLayout').length).toEqual(1);
  expect(wrapper.find('#UserLayout').length).toEqual(0);
});

it('render UserLayout', () => {
  wrapper.setProps({
    location: {
      pathname: '/user/login',
    },
  });
  expect(wrapper.find('#BasicLayout').length).toEqual(0);
  expect(wrapper.find('#UserLayout').length).toEqual(1);
});
