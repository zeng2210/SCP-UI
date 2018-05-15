'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/scp-': {
        // target: 'http://192.168.0.242:39021',
        target: 'http://192.168.0.108:8040',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/scp-videointercomapp': {
        // target: 'http://192.168.0.242:39021',
        target: 'http://192.168.0.108:9021',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/call': {
        // target: 'http://192.168.0.242:39021',
        target: 'http://192.168.0.108:9021',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/VideointercomAppPcIp': {
        // target: 'http://192.168.0.242:39021',
        target: 'http://192.168.0.108:9021',
        changeOrigin: true,
        pathRewrite: {}
      },
      // '/scp-patrolapp': {
      //   target: 'http://192.168.0.108:8040/',
      //   changeOrigin: true,
      //   pathRewrite: {}
      // },
      '/scp-videogatewayapp': {
        target: 'http://192.168.0.108:8040/',// 李志坚(视频应用http://172.16.10.81:9061/)
        changeOrigin: true,
        pathRewrite: {}
      },
      '/scp-guidepostcomponent': {
        target: 'http://192.168.0.108:8040/',
        changeOrigin: true,
        pathRewrite: {}
      },
      '/scp-mapapp/mapService': {
        target: 'http://192.168.0.109:9035/', // 陈伟波(地图应用) wagger: http://192.168.0.236:9036/
        // target: 'http://192.168.0.108:9035/', // 陈伟波(地图应用) wagger: http://192.168.0.236:9036/
        changeOrigin: true,
        pathRewrite: {
          '^/scp-mapapp': ''
        }
      },
      '/scp-mapapp/mapapp': {
        target: 'http://192.168.0.109:9035/', // 陈伟波(地图应用) wagger: http://192.168.0.236:9036/
        // target: 'http://192.168.0.108:9035/', // 陈伟波(地图应用) wagger: http://192.168.0.236:9036/
        changeOrigin: true,
        pathRewrite: {
          '^/scp-mapapp': ''
        }
      },
      '/scp-parkinglotapp': {
        target: 'http://localhost:8082/',
        // target: 'http://192.168.0.108:8040/',
        // target: 'http://172.16.10.17:8082/'
        changeOrigin: true,
        pathRewrite: {
          // '^/scp-parkinglotapp': ''
        }
      },
      '/scp-accesscontrolapp': {
        target: 'http://localhost:8082/',
        // target: 'http://172.16.10.31:8082/',  // yeli 本机ip
        // target: 'http://192.168.0.242:30940/',
        changeOrigin: true
      },
      // 天气预报
      '/scp-thirdpartyswitchapp': {
        target: 'http://192.168.0.108:81/',
        changeOrigin: true
      },
      // ws
      '/scp-websocketcomponent': {
        target: 'http://192.168.0.109:9018/',
        changeOrigin: true,
        pathRewrite: {
          '^/scp-websocketcomponent': ''
        }
      },
      '/scp-patrolapp': {
        // target: 'http://192.168.0.242:30940/', // 保安点位
        target: 'http://192.168.0.108:8040/', // 保安点位
        // target: 'http://172.16.10.73:9066',
        changeOrigin: true
      },
      '/scp-businesscommonapp': {
        target: 'http://192.168.0.108:9085/', // 园区安防
        // target: 'http://172.16.10.116:8083',
        changeOrigin: true,
        pathRewrite: {
          '^/scp-businesscommonapp': ''
        }
      },
      '/scp-broadcastapp': {
        // target: 'http://192.168.0.242:30940/',
        target: 'http://192.168.0.108:80',
        // target: 'http://172.16.10.41:8082',
        changeOrigin: true
      },
      '/businessCommon': {
        target: 'http://192.168.0.108:9085', // 公共事件组件
        changeOrigin: true,
        pathRewrite: {}
      },
      // '/scp-patrolapp': {
      //   target: 'http://192.168.0.108:81', // 保安
      //   changeOrigin: true,
      //   pathRewrite: {}
      // },
      '/scp-robotcomponent/robot': {
        // target: 'http://172.16.10.43:9070', // 机器人
        target: 'http://192.168.0.109:9070',
        changeOrigin: true,
        pathRewrite: {
          '^/scp-robotcomponent': ''
        }
      },
      // 呼梯
      '/scp-laddercontrolapp': {
        target: 'http://192.168.0.108:81', // 呼梯
        // target: 'http://172.16.10.37:8082', // 呼梯
        changeOrigin: true,
        pathRewrite: {}
        // '^/scp-laddercontrolapp': ''
      },
      '/scp-securityapp/defensezone': {
        target: 'http://192.168.0.109:9102', // 电子围栏
        changeOrigin: true,
        pathRewrite: {
          '^/scp-securityapp': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    // host: '172.16.10.183', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 因为部署时有可能不在docroot下，因此build后的输出静态资源引用路径改为相对路径，而非默认的根目录。
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
