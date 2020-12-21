// 设置用户Cookie
import Cookie from 'js-cookie';

/**
 *
 * @param {Object} user
 */
export function setUserCookie(user) {
  // {key:value,key1:value1} => [[key,value],[key1,value1]];
  const userArr = Object.entries(user);
  for (let i = 0; i < userArr.length; i += 1) {
    Cookie.set(userArr[i][0], userArr[i][1]);
  }
  return true;
}

/**
 * 获取用户cookie
 */
export function getUserCookie() {
  return {
    name: Cookie.get('username'),
    appkey: Cookie.get('appkey'),
    role: Cookie.get('role'),
    email: Cookie.get('email'),
  };
}

/**
 * 移除用户Cookie
 */
export function removeUserCookie() {
  Cookie.remove('username');
  Cookie.remove('appkey');
  Cookie.remove('role');
  Cookie.remove('email');
  return true;
}
