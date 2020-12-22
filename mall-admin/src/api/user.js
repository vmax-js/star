// 处理用户操作的接口管理

import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  // 注册
  register(params) {
    return axios.post('/passport/logon', params);
  },
  // 获取验证码
  getCode(params) {
    return axios.post('/passport/getCode', params);
  },
  // 找回密码
  findBack(params) {
    return axios.post('/passport/findBack', params);
  },
};
