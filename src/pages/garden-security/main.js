import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/common.css'
import axios from '@/assets/js/axios-plugin'
import { justifyPageView } from '@/assets/js/utils'
// import { loadWebsocket } from '../../websocket'

import './apis/mocks/mock'

Vue.prototype.$http = axios

// console.log('安防 entry!')

// 初始化一下页面的比例，适配开发环境的显示器。
justifyPageView()

new Vue({
  // router: router
  render: h => h(App),
  mounted: function () {
    // 启动 websocket
    // loadWebsocket(
    //   this.onWebsocketMessageReceived, 'egscuigardensecurity'
    // )
  },
  methods: {
    // onWebsocketMessageReceived (data) {
    //   try {
    //     let subData = JSON.parse(data).data
    //     console.log(subData)
    //   } catch (e) {
    //     console.warn(e)
    //   }
    // }
  }
}).$mount('#app')
