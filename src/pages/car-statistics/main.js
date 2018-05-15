import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import Axios from '@/assets/js/axios-plugin'
import '@/assets/css/common.css'

import { justifyPageView } from '@/assets/js/utils'
import { loadWebsocket } from '../../websocket'

// console.log('车辆统计 entry!')

// 初始化一下页面的比例，适配开发环境的显示器。
justifyPageView()

new Vue({
  // router: router
  render: h => h(App),
  mounted: function () {
    // 启动 websocket
    loadWebsocket(
      this.onWebsocketMessageReceived, 'egscuicarstatistics'
    )
  },
  methods: {
    onWebsocketMessageReceived (data) {
      try {
        let subData = JSON.parse(data).data
        console.log(subData)
      } catch (e) {
        console.warn(e)
      }
    }
  }
}).$mount('#app')

export const getParkinglot = () => {
  return Axios.get('/scp-parkinglotapp/parkingLotMonitor/getParkinglot'
  ).then(res => res.data)
}
