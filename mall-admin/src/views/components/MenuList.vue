<template>
  <div class="menu-list">
    <a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys="[$router.currentRoute.matched[1]
         ? $router.currentRoute.matched[1].name:'']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      :inline-collapsed="$store.state.collapsed"
    >
      <template v-for="router in $store.state.menuRoutes">
        <a-sub-menu :key="router.name" v-if="!router.meta.hidden">
          <span slot="title">
            <a-icon :type="router.meta.icon" />
            <span>{{ router.meta.title }}</span>
          </span>
          <a-menu-item v-for="child in router.children" :key="child.name">
            <router-link :to="{name:child.name}">
              <a-icon :type="child.meta.icon" />
              {{ child.meta.title }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$router);
  },
};
</script>

<style>
</style>
