import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import App, { IPopupMenuProps } from './PopupMenu';

const setup = () => {
  const dispatch = spy();
  const props: IPopupMenuProps = {
    menuRef: '',
    onChange: spy(),
    value: { activeMarks: [], change: spy() },
  };
  const wrapper = mount(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();

afterEach(() => {
  dispatch.resetHistory();
});
it('render', () => {
  expect(wrapper.find('.button-text').length).toEqual(1);
});

describe('response', () => {
  it('onClickMark should run when click menu', () => {
    const stubs = stub(wrapper.instance() as App, 'onClickMark');
    wrapper.find('.button-container').simulate('mousedown');
    expect(stubs.callCount).toEqual(1);
  });
});
