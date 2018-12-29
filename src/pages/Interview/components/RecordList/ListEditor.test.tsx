import React from 'react';

import { shallow } from 'enzyme';
import App, { IListEditorProps } from './ListEditor';

import { spy } from 'sinon';
import { extractTags, initRecords, initRecordsAsValue } from '@/utils';

const setup = () => {
  const dispatch = spy();
  const props: IListEditorProps = {
    records: initRecords(''),
    tagGroups: [],
    value: initRecordsAsValue(''),
    onChange: ({ value }) => {
      dispatch({ type: 'record/changeRecords', payload: value.toJSON() });
    },
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch } = setup();
afterEach(() => {
  dispatch.resetHistory();
});
it('render', () => {
  expect(wrapper.find('Editor').length).toEqual(1);
});
describe('response', () => {
  it('onChange should run when change ', () => {
    const value = initRecordsAsValue('3123213');
    wrapper.find('Editor').simulate('change', { value });
    expect(dispatch.callCount).toEqual(1);
  });
});
describe('function', () => {
  const instance = wrapper.instance() as App;

  describe('renderNode', () => {
    const renderNode = instance.renderNode;

    it('should render ul', () => {
      const props = {
        node: { type: 'ul_list' },
        children: <div>a</div>,
        editor: { value: initRecordsAsValue('2') },
      };
      expect(renderNode(props)).toEqual(
        <ul>
          <div>a</div>
        </ul>
      );
    });
    it('should render li', () => {
      const props = {
        node: { type: 'list_item' },
        children: <div>a</div>,
        editor: { value: initRecordsAsValue('2') },
      };
      expect(renderNode(props)).toEqual(
        <li>
          <div>a</div>
        </li>
      );
    });
  });
  it('renderMark', () => {
    const renderMark = instance.renderMark;
    const tagGroups = [];
    const onChange = spy();
    const tags = extractTags(tagGroups);
    const props = { dispatch, tagGroups, children: undefined, text: '' };
    // expect(renderMark(props)).toEqual(
    //   <InputTooltip
    //     props={props}
    //     tags={labels}
    //     value={initRecordsAsValue('')}
    //     onChange={onChange}
    //     dispatch={dispatch}
    //   />
    // );
  });
});
