<template>
  <div class="home">
    <menu-list :key="key"></menu-list>
    <div :class="{'main-app':true,'menu-unfold':$store.state.collapsed}">
      <slider-nav></slider-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// h5 新标签 menu
import MenuList from '@/views/components/MenuList.vue';
import SliderNav from '@/views/components/SliderNav.vue';

export default {
  data() {
    return {
      // collapsed: false
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  components: {
    MenuList,
    SliderNav,
  },
  methods: {},
  created() {},
};
</script>

<style lang="less">
// 不加scoped就能作用到MenuList和SliderNav

@import url("~@/assets/home.less");
</style>
