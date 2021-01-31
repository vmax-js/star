import axios from '@/axios';

export default {
  getTableDataList(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
};
