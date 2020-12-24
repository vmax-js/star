import axios from '@/axios';

export default {
  getTableDataList(params) {
    return axios.get('/products/all', { params });
  },
};
