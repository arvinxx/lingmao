import React from 'react';
import { shallow } from 'enzyme';
import App, { ILayoutEntryProps } from './index';
import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props: ILayoutEntryProps = {
    location: {
      hash: '',
      key: 'ohadrr',
      pathname: '/',
      query: {},
      search: '',
      state: undefined,
    },
    history: {},
  };
  //@ts-ignore TODO: WrappedComponent 如何 typing
  const wrapper = shallow(<App {...props} />);
  return { props, wrapper, dispatch };
};
const { wrapper, dispatch, props } = setup();

it('render', () => {
  expect(wrapper.find('BasicLayout').length).toEqual(1);
  expect(wrapper.find('UserLayout').length).toEqual(0);
});
