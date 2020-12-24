import axios from '@/axios';

export default {
  getCategory(params) {
    // get方法要传参要写在对象里面
    return axios.get('/category/all', {
      params,
    });
  },
};
