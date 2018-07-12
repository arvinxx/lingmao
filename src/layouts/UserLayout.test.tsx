import React from 'react';
import { shallow } from 'enzyme';
import App from './UserLayout';
import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props = {
    location: {
      hash: '',
      key: 'ohadrr',
      pathname: '/',
      search: '',
      state: undefined,
    },
  };
  //@ts-ignore TODO: WrappedComponent 如何 typing
  const wrapper = shallow(<App.WrappedComponent {...props} children={<div id="test">dsa</div>} />);
  return { props, wrapper, dispatch };
};
const { wrapper, dispatch, props } = setup();

it('render', () => {
  expect(wrapper.find('.container').length).toEqual(1);
});
