import request from '../../../utils/request';



export async function register(params) {
  const { mail, password, mobile, prefix } = params;
  const data = { email: mail, password, mobile, prefix };
  return await request('/api/register', {
    method: 'POST',
    'Content-Type': 'application/json; charset=utf-8',
    body: data,
  });
}
