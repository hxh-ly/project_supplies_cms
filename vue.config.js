const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const env = process.env.NODE_ENV === "development"
console.log(process.env.NODE_ENV,env);
module.exports = {

  lintOnSave: false,
  // 1 vue-cli的方法
  // 3 链式
  /*
  chainWebpack:(config)=>{
    config.resolve.alias.set('@',path.resolve(__dirname,'src'))
    .set('components','@/components')
  }
   */
  publicPath: env?'./': '/material',
  configureWebpack: {
    resolve: {
      alias: {
        a: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, '@/components')
      }
    },
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://152.136.185.210:5000',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        },
        '^/dgut': {
          target: 'http://119.91.237.88:8082',
          pathRewrite: {
            '^/dgut': ''
          },
          changeOrigin: true
        }
        /* '^/hxh': {
          target: 'http://localhost:9002',
          pathRewrite: {
            '^/hxh': ''
          },
          changeOrigin: true
        }, */
      }
    },
    plugins: [
      /*   AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }) */
    ]
  }
}
