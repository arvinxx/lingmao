import React from 'react';
import { shallow } from 'enzyme';
import Index from './index';

it('renders with Result', () => {
  const wrapper = shallow(<Index />);
  expect(wrapper.find('Result').length).toBe(1);
  expect(wrapper.find('Result').prop('type')).toBe('success');
});
