import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import Hkcomponents from './hk-packages'
import store from './store'

import '@/assets/css/common.css'
import '@/assets/css/main.css'
// import '@/pages/main/api/mocks/index.js'

import 'hdmap'
import 'hdmap/dist/hdmap.css'
import global_ from '@/assets/js/global'
import { justifyPageView } from '@/assets/js/utils'
import controller from './controller'

Vue.use(Hkcomponents)
Vue.prototype.GLOBAL = global_

const Bus = new Vue()

// console.log('main.html entry!')

// 初始化一下页面的比例，适配开发环境的显示器。
justifyPageView()

controller.init()

new Vue({
  // router
  store,
  data: {
    Bus
  },
  render: h => h(App)
}).$mount('#app')
