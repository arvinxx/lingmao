import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { IInputTooltipProps } from './InputTooltip';

const setup = () => {
  const dispatch = spy();
  const props: IInputTooltipProps = {
    props: {
      editor: undefined,
      children: '',
      attributes: '',
    },
    tags: [{ id: '23', text: '231', refText: '3412', refId: '423dfg', groupId: 'hjrtf' }],
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('should render', () => {
  const wrapper = mount(<App {...props} dispatch={dispatch} />);
  expect(wrapper.find('Popover').length).toEqual(1);
  expect(wrapper.find('Input').length).toEqual(1);
});
