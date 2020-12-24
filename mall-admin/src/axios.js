import axios from 'axios';
import store from '@/store/index';

const instance = axios.create({
  // 基础路径
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  console.log('请求配置', config);
  if (!config.url.includes('passport')) {
    const config1 = {
      ...config,
      params: {
        ...config.params,
        appkey: store.state.user.appkey,
      },
    };
    return config1;
  }
  return config;
},
(err) => Promise.reject(err));

instance.interceptors.response.use((response) => {
  //   console.log(response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (err) => Promise.reject(err));
export default instance;
