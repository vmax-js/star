<template>
  <a-table :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    @change="changePage">
    <div slot="operation" slot-scope="text,record">
        <a-button @click="editProduct(record)">

            编辑

        </a-button>
        <a-button @click="deleteProduct(record)">

            删除

        </a-button>
    </div>
  </a-table>
</template>
<script>
// import api from '../api/product';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    align: 'center',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',

  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    width: 180,
    align: 'center',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    align: 'center',
    width: 120,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      // data,
      columns,
    };
  },
  props: {
    data: Array,
    pagination: Object,
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      // console.log(page);
      // 传给父组件 ProductList
      this.$emit('change', page);
    },
    editProduct(record) {
      console.log('---------', record);
      this.$emit('edit', record);
    },
    deleteProduct(record) {
      // console.log(record);
      this.$emit('remove', record);
    },
  },
};
</script>
