import Vue from 'vue';
import Vuex from 'vuex';
import {
  setUserCookie,
  getUserCookie,
  removeUserCookie,
} from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换导航收缩,false不闭合
    collapsed: false,
    // 用户信息
    user: getUserCookie(),
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, user) {
      state.user = user;
    },
    loginOut(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
    changeMenuRoutes(state, routers) {
      state.menuRoutes = routers;
    },
  },
  actions: {
    changeCollapsed(context) {
      context.commit('changeCollapsed');
    },
    setUserInfo(context, user) {
      context.commit('setUserInfo', user);
      setUserCookie(user);
    },
    loginOut(context) {
      context.commit('loginOut');
      removeUserCookie();
    },
    changeMenuRoutes(context, routers) {
      context.commit('changeMenuRoutes', routers);
    },
  },
  modules: {},
});
