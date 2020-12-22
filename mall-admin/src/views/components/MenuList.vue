<template>
  <div class="menu-list">
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >

      <a-sub-menu v-for="router in $store.state.menuRoutes"
       :key="router.name">
        <span slot="title">
          <a-icon type="mail" />
          <span>{{ router.meta.title }}</span>
        </span>
        <a-menu-item v-for="child in router.children"
         :key="child.name">
         {{ child.meta.title }}
         </a-menu-item>
      </a-sub-menu>

    </a-menu>
  </div>
</template>

<script>
export default {
};
</script>

<style>
</style>
