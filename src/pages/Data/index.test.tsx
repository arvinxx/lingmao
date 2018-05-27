import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

it('should render', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
