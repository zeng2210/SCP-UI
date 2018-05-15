import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

import '@/assets/css/common.css'

import { justifyPageView } from '@/assets/js/utils'
// import { loadWebsocket } from '../../websocket'

// 初始化一下页面的比例，适配开发环境的显示器。
justifyPageView()

new Vue({
  // router: router
  render: h => h(App),
  mounted: function () {
    // 启动 websocket
    // loadWebsocket(
    //   this.onWebsocketMessageReceived, 'egscuipersonstatistics'
    // )
  },
  methods: {
    // onWebsocketMessageReceived (data) {
    //   try {
    //     let subData = JSON.parse(data).data
    //     console.log(subData)
    //     if (subData.type) {
    //       let type = subData.type
    //       console.log(type)
    //       if (type === '39999') {
    //         debugger
    //         // 人员统计
    //         console.log(subData.info)
    //         // json数组用eval会报编译错误， 因此要evil代替
    //         var info = this.evil(subData.info)
    //         if (info.length > 1) {
    //           this.visitorNum = info[0]
    //           this.otherNum = info[1]
    //         } else if (info.length === 1) {
    //           this.visitorNum = info[0]
    //           this.otherNum = info[0]
    //         }
    //       }
    //     } else {
    //       console.log(subData.info)
    //       let infos = JSON.parse(subData.info)
    //       if (infos.type === '39999') {
    //         this.visitorNum = infos.visitorNum
    //         this.otherNum = infos.otherNum
    //       }
    //     }
    //   } catch (e) {
    //     console.warn(e)
    //   }
    // }
  }
}).$mount('#app')
