import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

// const setup = () => {
//   // 模拟 props
//   const props = {
//     // Jest 提供的mock 函数
//     dimensions: [
//       {
//         _id: '1',
//         key: 'd',
//         values: ['1', '2', '3'],
//         inputVisible: false,
//         valueEditable: false,
//       },
//       {
//         _id: '2',
//         key: 'dg',
//         values: ['3', '5', '7'],
//         inputVisible: false,
//         valueEditable: false,
//       },
//     ],
//     selectedLabels: ['1', '5', '7'],
//     dispatch: jest.fn(),
//   };
//   const wrapper = shallow(<App {...props} />);
//   return {
//     props,
//     wrapper,
//   };
// };
// const { wrapper, props } = setup();
describe('TagInput 正常渲染样式', () => {
  // case1
  // it('TagInput Component should be render', () => {
  //   expect(wrapper.find('.dimension-container').exists());
  // });
});

describe('添加内容', () => {
  describe('单击左侧关键字区添加关键字', () => {
    it('should change newKey state when onChange is called', () => {
      // const mockNewKeyChange = {
      //   target: {
      //     value: 'Test',
      //   },
      // };
      // wrapper.find('.add-key').simulate('change', mockNewKeyChange);
      // expect(wrapper.state().newKey).toEqual('Test');
    });
  });
  describe('点击右侧加号按钮添加新值', () => {});
});
describe('记录标签值', () => {});
describe('修改内容', () => {
  describe('编辑关键字', () => {
    describe('修改完毕后按回车保存修改', () => {
      it('should disptach addKey and clean newKey when press Entered', () => {});
      describe('双击左侧关键字进入编辑模式', () => {});
      describe('撤销修改按 ESC 退出', () => {});
      describe('鼠标单击空白时取消激活，并保存修改内容', () => {
        it('should disptach addDimensionKey and clean newKey when input blur', () => {
          // wrapper.find('.add-key').simulate('blur');
          // expect(wrapper.state().newKey).toEqual('');
        });
      });
    });
    describe('编辑值', () => {
      describe('双击标签值进行编辑', () => {});
      describe('鼠标悬浮在标签上显示删除 ICON', () => {});
      describe('点击删除 ICON 可以删除标签', () => {});
    });
  });
});
