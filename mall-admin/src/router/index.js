import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/layout/Login.vue';
import store from '@/store/index';
import getMenuRouter from '@/utils/permission';

Vue.use(VueRouter);

const ayncRoutesMap = [{
  path: '/product',
  name: 'Product',
  component: () => import('@/views/pages/Product.vue'),
  meta: {
    title: '商品',
  },
  children: [{
    path: 'list',
    name: 'ProductList',
    component: () => import('@/views/pages/ProductList.vue'),
    meta: {
      title: '商品列表',
    },
  }, {
    path: 'add',
    name: 'ProductAdd',
    component: () => import('@/views/pages/ProductAdd.vue'),
    meta: {
      title: '添加商品',
    },
  }, {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/pages/Category'),
    meta: {
      title: '类目管理',
    },
  }],

}];
const routes = [{
  alias: '/',
  path: '/home',
  name: 'Home',
  component: () => import('@/views/layout/Home.vue'),
  meta: {
    title: '首页',
  },
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/pages/Index.vue'),
    meta: {
      title: '统计',
    },
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
  },
},
{
  path: '/register',
  name: 'Register',
  component: () => import('@/views/layout/Register'),
  meta: {
    title: '注册',
  },
},
{
  path: '/findBack',
  name: 'FindBack',
  component: () => import('@/views/layout/FindBack'),
  meta: {
    title: '找回密码',
  },
},
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
let isAddRouter = false;
// 登录校验
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.role && store.state.user.appkey) {
      // 根据角色得到导航栏相应的路由
      const roleRouter = getMenuRouter(store.state.user.role, ayncRoutesMap);
      console.log('根据角色获取到的路由配置', roleRouter);
      // 添加到公共的routers里面
      if (!isAddRouter) {
        // 手动添加
        // roleRouter.forEach((item) => {
        //   router.options.routes.push(item);
        // });
        router.addRoutes(roleRouter);
        console.log(router);
        store.dispatch('changeMenuRoutes', routes.concat(roleRouter));
        isAddRouter = true;
      }
      return next();
    }
    return next('/login');
  }
  if (to.path === '/register') {
    return next();
  }
  if (to.path === '/findBack') {
    return next();
  }
  if (to.path === '/login') {
    return next();
  }
  return next();
});
export default router;
