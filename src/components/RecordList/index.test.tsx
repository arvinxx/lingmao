import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('RecordList 正常渲染样式', () => {
  it('RecordList Component should be render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.list').length).toEqual(1);
    expect(wrapper.find('List').length).toEqual(1);
  });
  it('should receive correct record props', () => {
    const records = [{ id: '1', text: 'record' }];
    const wrapper = shallow(<App records={records} />);
    expect(wrapper.instance().props.records).toEqual(records);
  });
});


// describe('新建条目', () => {
//   describe('按回车新建条目', () => {});
// });
