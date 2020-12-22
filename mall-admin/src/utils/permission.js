/**
 * 角色对应的路由名称
 */
const roleRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }],
};

/**
 * 根据角色得到对应的路由配置
 * @param {String} role 角色名称
 * @param {Array} routes 所有的路由配置数组
 */
export default function getMenuRouter(role, routes) {
  const allowRoutesName = roleRoute[role].map((item) => item.name);
  const resultRoutes = routes.filter((route) => {
    const obj = route;
    if (allowRoutesName.indexOf(route.name) !== -1) {
      // 对子路由进行处理
      const childrenRoter = obj.children;
      obj.children = childrenRoter.filter((childRoute) => {
        if (allowRoutesName.indexOf(childRoute.name) !== -1) {
          return true;
        }
        return false;
      });
      return true;
    }
    return false;
  });
  return resultRoutes;
}
