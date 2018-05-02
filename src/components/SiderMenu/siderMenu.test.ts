import { getMeunMatcheys } from './SiderMenu';

const meun = ['/dashboard', '/interview', '/data', '/userinfo/:id', '/userinfo/:id/info'];

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
    expect(getMeunMatcheys(meun, '/userinfo/2144/info')).toEqual(['/userinfo/:id/info']);
  });
});
