import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/layout/Login.vue';
import store from '@/store/index';
import getMenuRouter from '@/utils/permission';

Vue.use(VueRouter);

const ayncRoutesMap = [{
  path: '/product',
  name: 'Product',
  component: () => import('@/views/layout/Home.vue'),
  meta: {
    title: '商品',
    // menu中是否显示
    hidden: false,
    // 图标
    icon: 'shop',
  },
  children: [{
    path: 'list',
    name: 'ProductList',
    component: () => import('@/views/pages/ProductList.vue'),
    meta: {
      title: '商品列表',
      hidden: false,
      icon: 'unordered-list',
    },
  }, {
    path: 'add',
    name: 'ProductAdd',
    component: () => import('@/views/pages/ProductAdd.vue'),
    meta: {
      title: '添加商品',
      hidden: false,
      icon: 'file-add',
    },
  }, {
    path: 'category',
    name: 'Category',
    component: () => import('@/views/pages/Category'),
    meta: {
      title: '类目管理',
      hidden: false,
      icon: 'appstore',
    },
  }],

}];
const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/layout/Home.vue'),
  meta: {
    title: '首页',
    hidden: false,
    icon: 'home',
  },
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/pages/Index.vue'),
    meta: {
      title: '统计',
      hidden: false,
      icon: 'schedule',
    },
  }],
},
{
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: '登录',
    hidden: true,
  },
},
{
  path: '/register',
  name: 'Register',
  component: () => import('@/views/layout/Register'),
  meta: {
    title: '注册',
    hidden: true,
  },
},
{
  path: '/findBack',
  name: 'FindBack',
  component: () => import('@/views/layout/FindBack'),
  meta: {
    title: '找回密码',
    hidden: true,
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
        // 手动添加 会多添加一个
        // roleRouter.forEach((item) => {
        //   router.options.routes.push(item);
        // });
        // console.log(router);
        // 存储到vuex 这是一个异步的 如果直接输入url会显示空白页面
        store.dispatch('changeMenuRoutes', routes.concat(roleRouter)).then(() => {
          router.addRoutes(roleRouter);
          next();
        });
        isAddRouter = true;
      }
      return next();
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
    return next('/login');
  }

  return next();
});
export default router;
