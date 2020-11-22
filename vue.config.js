// 该配置会和公共配置合并
module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        // @就是src，cli3/4默认配置中已经配置了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}