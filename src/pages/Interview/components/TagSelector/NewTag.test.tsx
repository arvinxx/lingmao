import React from 'react';
import { shallow } from 'enzyme';
import App, { IValueInputProps } from './NewTag';

import { spy } from 'sinon';

const setup = () => {
  const dispatch = spy();
  const props: IValueInputProps = {
    id: 'rercxc',
    inputVisible: false,
  };
  const wrapper = shallow(<App {...props} dispatch={dispatch} />);
  return { props, wrapper, dispatch };
};

const { wrapper, dispatch, props } = setup();
afterEach(() => {
  dispatch.resetHistory();
});
describe('Tag', () => {
  it('render', () => {
    expect(wrapper.find('Tag').length).toEqual(1);
  });
  describe('交互行为', () => {
    describe('点击加号按钮添加新标签', () => {
      it('showValueInput should run when change', () => {
        wrapper.find('Tag').simulate('click');
        expect(dispatch.callCount).toEqual(1);
      });
      ``;
    });
  });
});
describe('Input', () => {
  let Input;
  beforeEach(() => {
    wrapper.setProps({ inputVisible: true });
    Input = wrapper.find('Input');
  });
  it('render ', () => {
    expect(Input.length).toEqual(1);
  });

  describe('交互行为', () => {
    describe('聚焦时可正常编辑内容', () => {
      it('newValueOnInput should run when change', () => {
        Input.simulate('change', { target: { value: '23' } });
        expect(wrapper.state('newValue')).toEqual('23');
      });
    });
    describe('修改完毕后按回车保存修改', () => {
      it('newValueOnConfirm should run when pressEnter', () => {
        Input.simulate('pressEnter');
        expect(dispatch.callCount).toEqual(1);
      });
    });
    describe('撤销修改按 ESC 退出', () => {
      it('cancelVOnEsc should run when press esc', () => {
        Input.simulate('keydown', { key: 's' });
        Input.simulate('keydown', { key: 'Escape' });
        expect(dispatch.callCount).toEqual(1);
      });
    });

    describe('鼠标单击空白时取消激活，并保存修改内容', () => {
      it('newValueOnBlur should run when blur', () => {
        wrapper.setState({ newValue: '3223' });
        Input.simulate('blur');
        expect(dispatch.callCount).toEqual(2);
        expect(wrapper.state('newValue')).toEqual('');
      });
    });
  });
});
