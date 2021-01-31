<template>
  <div class="menu-list">
    <a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="router in $store.state.menuRoutes">
        <a-sub-menu :key="router.name" v-if="!router.meta.hidden">
          <span slot="title">
            <a-icon :type="router.meta.icon" />
            <span>{{ router.meta.title }}</span>
          </span>
          <!-- 判断是否显示 -->
          <template v-for="child in router.children">
            <a-menu-item v-if="!child.meta.hidden" :key="child.name">
              <router-link :to="{name:child.name}">
                <a-icon :type="child.meta.icon" />
                {{ child.meta.title }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  watch: {
    $route(val) {
      console.log(val);
    },
  },
  created() {
    // console.log(this.$router);
  },
};
</script>

<style>
</style>
