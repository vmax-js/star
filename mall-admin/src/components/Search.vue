<template>
  <div class="search">
      <!-- @submit.native.prevent 阻止默认事件 -->
    <a-form layout="inline" :form="searchForm"
        @submit="handleSubmit" @submit.native.prevent>
      <a-form-item label="关键字">
        <a-input v-model="searchForm.searchWord"
            placeholder="请输入关键字"></a-input>
      </a-form-item>
      <a-form-item label="商品类目">
        <a-select
          show-search
          allowClear
          placeholder="请选择类目"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option v-for="c in data"
            :value="c.id" :key="c.id">{{ c.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },

    };
  },
  props: {
    data: Array,
  },
  methods: {
    handleSubmit() {
      // 子组件传递给父组件 触发父组件的方法submit,数据为this.searchForm
      this.$emit('submit', this.searchForm);
    },
    // 切换类目时触发的函数
    handleChange(val) {
      // val为id
      this.searchForm.category = val;
    },
  },
  created() {
  },
};
</script>

<style lang="less">
.search {
  padding: 10px 40px;
}
</style>
