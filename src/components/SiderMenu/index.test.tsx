import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import App, { getMeunMatcheys } from './index';
//
//
// const setup = () => {
//   const dispatch = spy();
//   const dispatch = spy();
//   const props = {
//     pathname: '/data/reduction',
//     tabStage: '1',
//     diagrams: [],
//     analysisStage: 5,
//   };
//   const wrapper = shallow(<App {...props} dispatch={dispatch} />);
//   return { props, wrapper, dispatch };
// };
//
// const { wrapper, dispatch, props } = setup();
// afterEach(() => {
//   dispatch.resetHistory();
// });

const meun = ['/dashboard', '/interview', '/data', '/userinfo/:id', '/userinfo/:key/info'];

describe('test meun match', () => {
  it('simple path', () => {
    expect(getMeunMatcheys(meun, '/dashboard')).toEqual(['/dashboard']);
  });
  it('error path', () => {
    expect(getMeunMatcheys(meun, '/interview')).toEqual(['/interview']);
  });

  it('Secondary path', () => {
    expect(getMeunMatcheys(meun, '/dashboard/name')).toEqual([]);
  });

  it('Parameter path', () => {
    expect(getMeunMatcheys(meun, '/userinfo/2144')).toEqual(['/userinfo/:id']);
  });

  it('three parameter path', () => {
    expect(getMeunMatcheys(meun, '/userinfo/2144/info')).toEqual(['/userinfo/:key/info']);
  });
});
