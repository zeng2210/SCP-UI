// 由于广播组件使用了计时器
// 需要在关闭组件的时候清除计时器
// 所以关闭的时候该用自己写的方法
import store from '@/pages/main/store'
export default {
  methods: {
    closeDeviceBox () {
      store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    }
  }
}
