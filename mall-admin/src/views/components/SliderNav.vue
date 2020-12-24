<template>
<!-- 顶部头 -->
  <div class="main-header">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          {{ this.currentRoute[0] ?
            this.currentRoute[0].meta.title : ''}}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link
            :to="{name:$router.currentRoute.matched[1]?
              $router.currentRoute.matched[1].name : ''}">
            {{ this.currentRoute[1] ?
              this.currentRoute[1].meta.title :'' }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎,{{ this.$store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li @click="logOut">退出登录</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      // this.collapsed = !this.collapsed;
      this.$store.dispatch('changeCollapsed');
    },
    logOut() {
      this.$store.dispatch('loginOut');
      // 跳转到登录接界面
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
