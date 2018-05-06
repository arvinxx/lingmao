import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './index';
import styles from './index.less';

const props = {
  persona: {
    dimVisible: true,
  },
};
const wrapper = shallow(<App.WrappedComponent {...props} />);
const wrapperM = mount(<App.WrappedComponent {...props} />);
describe('DimList Component', () => {
  it('should receive props correctly', () => {
    expect(wrapper.props().persona).toEqual({ dimVisible: true });
  });
  it('should show DimList when dimVisable is true', () => {
    expect(wrapper.hasClass(styles.right)).toBe(true);
  });
});
