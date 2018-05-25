import React from 'react';
import { shallow } from 'enzyme';
import App, { ITagInputProps } from './index';
import { spy } from 'sinon';
import dimensions from '../../../mock/dimensions';

const setup = () => {
  const dispatch = spy();
  const props: ITagInputProps = { dimensions, selectedValues: ['1', '5'] };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};
const { wrapper, props, dispatch } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('render', () => {
  expect(wrapper.find('.container').length).toEqual(1);
  expect(wrapper.find('DimGroup').length).toEqual(2);
  expect(wrapper.find('DimValue').length).toEqual(3);
});

describe('response', () => {
  let Input;
  beforeEach(() => {
    Input = wrapper.find('Input');
  });

  it('newKeyOnInput should run when change', () => {
    Input.simulate('change', { target: { value: '1' } });
    expect(wrapper.state('newKey')).toEqual('1');
  });
  it('newKeyOnFocus should run when focus', () => {
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('添加条目');
    Input.simulate('focus');
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('');
  });

  it('newKeyOnBlur should run when blur', () => {
    Input.simulate('blur');
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('添加条目');
    expect(wrapper.state('newKey')).toEqual('');
    expect(dispatch.callCount).toEqual(1);
  });
  it('newKeyOnPressEnter should run when pressEnter', () => {
    Input.simulate('pressEnter');
    expect(wrapper.state('newKeyPlaceHolder')).toEqual('');
    expect(wrapper.state('newKey')).toEqual('');
    expect(dispatch.callCount).toEqual(1);
  });
});
