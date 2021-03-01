<template>
  <div class="basic-detail">
    <!-- 填写商品基本信息组件 -->
    <a-form-model
      ref="ruleForm"
      :label-col="{span:5}"
      :wrapper-col="{span:13 }"
      :model="form"
      :rules="rules"
    >
      <a-form-model-item label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select v-model="form.category" placeholder="请选择商品类别" @change="changeCategory">
          <a-select-option
            v-for="c in
           categoryList"
            :key="c.id"
            :value="c.id"
          >{{ c.name }}</a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择子类目">
          <a-select-option v-for="c in
          categoryItems" :key="c" :value="c">{{ c }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="please select"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">包邮，最晚次日达</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label=" " class="next-btn">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/search';

export default {
  data() {
    return {
    //   form: {
    //     title: '',
    //     desc: '',
    //     category: '',
    //     c_items: [],
    //     tags: [],
    //   },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.getCategory().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      //   this.categoryItems = category.c_items;
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      console.log('next', this.form);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 将表单数据传给父组件 接着下一步处理
          this.$emit('next', this.form);
          //   alert('submit!');
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.basic-detail {
  .next-btn {
    text-align: center;
  }
}
</style>
<style lang="less">
.basic-detail {
  .next-btn {
    .ant-form-item-label > label::after {
      content: " ";
    }
  }
}
</style>
