import request from '../../../utils/request';

const init = {
  mail: 'arvinx@foxmail.com',
  password: '111111',
  confirm: '111111',
  mobile: '13968282297',
  captcha: '111',
  prefix: '86',
};

export async function register(params) {
  const { mail, password, mobile, prefix } = params;
  const data = { mail, password, mobile, prefix };
  return request('/api/register', {
    method: 'POST',
    body: data,
  });
}
