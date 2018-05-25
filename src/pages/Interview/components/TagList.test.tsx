import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { ITagListProps } from './TagList';

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

describe('response', () => {
  it('deleteTag should run when onConfirm', () => {
    wrapper.find('Popconfirm').simulate('confirm');
    expect(dispatch.callCount).toEqual(1);
  });

  describe('点击标签目录筛选对应的记录', () => {
    it('filterRecord should run when click tag', () => {
      wrapper.find('.labels').simulate('click');
      expect(dispatch.callCount).toEqual(1);
    });
  });
});
