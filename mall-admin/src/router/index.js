import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/layout/Login.vue';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [{
  alias: '/',
  path: '/home',
  name: 'Home',
  component: () => import('@/views/layout/Home.vue'),
},
{
  path: '/login',
  name: 'Login',
  component: Login,
},
{
  path: '/register',
  name: 'Register',
  component: () => import('@/views/layout/Register'),
},
{
  path: '/findBack',
  name: 'FindBack',
  component: () => import('@/views/layout/FindBack'),
},
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
},
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
// 登录校验
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.role && store.state.user.appkey) {
      return next();
    }
    if (to.path === '/register') {
      return next();
    }
    if (to.path === '/findBack') {
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
