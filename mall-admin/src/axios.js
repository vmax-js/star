import axios from 'axios';

const instance = axios.create({
  // 基础路径
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
  console.log('请求配置', config);
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
