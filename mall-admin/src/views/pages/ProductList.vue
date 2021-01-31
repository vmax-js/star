<template>
  <div class="product-list">
    <div class="product-search">
      <search @submit="searchSubmit" :data="categoryList" />
    </div>
    <a-button type="primary" class="search-add-btn">
        <router-link :to="{name:'ProductAdd'}">添加商品</router-link>
    </a-button>
    <div class="product-table">
      <product-table
        :data="tableData"
        :pagination="page"
        @change="changePage"
        @edit='editProduct'
        @remove='removeProduct'
      ></product-table>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';
import ProductTable from '@/components/ProductTable.vue';
import api from '@/api/product';
import getCategoryApi from '@/api/search';

export default {
  data() {
    return {
      tableData: [],
      searchForm: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: true,
      },
      categoryList: [],
      categoryObj: {},
    };
  },
  async created() {
    //   getCategoryApi 先执行
    await getCategoryApi.getCategory().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  components: { Search, ProductTable },
  methods: {
    searchSubmit(form) {
      //   console.log("---", form);
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .getTableDataList({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          // console.log('---', res);
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      // 改变当前的page，然后调用获取数据的方法
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确实删除',
        content: () => <div style='color:red;'>{`要删除标题为：${record.title}的商品吗？`}</div>,

        onOk: () => {
          // console.log('OK');
          api.remove({
            id: record.id,
          }).then(() => {
            // console.log(res);
            // 确认删除更新页面
            this.getTableData();
          });
        },
        onCancel() {
          console.log('cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.product-list{
    position: relative;
    .search-add-btn{
        position: absolute;
        top: 15px;
        right: 40px;

    }
}
</style>
