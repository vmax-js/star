<template>
  <div class="detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <!-- 将表单作为独立的组件 -->
      <!--  @next="next" 是子组件向父组件  :form="form" 是父组件向子组件传递-->
      <basic-detail v-if="current === 0" @next="next" :form="form" />
      <sale-detail v-else-if="current === 1" @prev="prev" @next="next" :form="form" />
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/components/BasicDetail.vue';
import SaleDetail from '@/components/SaleDetail.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        prive_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
    };
  },
  created() {
    const { id } = this.$route.params;
    // console.log(id);
    if (id) {
      // 读取商品详情
      api.detail(id).then((res) => {
        // console.log(res);
        this.form = res;
      });
    }
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
  methods: {
    next(form) {
      //   从子组件拿到的商品信息
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        //   提交信息
        if (this.$route.params.id) {
          api.edit(this.form).then(() => {
            //   console.log('======', res);
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          api.add(this.form).then(() => {
            //   console.log('======', res);
            this.$message.success('新增成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }

      //   console.log(form);
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang='less' scoped>
.detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
