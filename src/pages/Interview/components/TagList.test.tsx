import React from 'react';
import { shallow } from 'enzyme';
import App, { ITagListProps } from './TagList';

import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props: ITagListProps = {
    tags: [
      {
        text: '123',
        id: '1',
        groupId: 'dsad',
        refId: 'efw',
        refText: 't123',
      },
    ],
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});

it('render', () => {
  expect(wrapper.find('.container').length).toEqual(1);
});

it('deleteTag should run when onConfirm', () => {
  wrapper.find('Popconfirm').simulate('confirm');
  expect(dispatch.callCount).toEqual(1);
});
