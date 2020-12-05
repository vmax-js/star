module.exports = {
  // 解决这个问题Inline JavaScript is not enabled. Is it set in your options?
  // 允许链式调用换行
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
