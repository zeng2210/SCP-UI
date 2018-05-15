<template>
  <div class="item-box">
    <a class="close" href="javascript:;" @click="closeDeviceBox">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box">
      <div class="left-box">
        <div class="view">
          <img :src="lockImg" alt="" class='pic'>
        </div>
      </div>
      <device-desc-box :deviceName="'地锁'+deviceMsg.deviceId"
                       :orgName="deviceMsg.partSeatCode+'号车位'"
                       :deviceCode="deviceMsg.deviceId"
                       :deviceTypeDesc="'地锁'"
                       :providerName="'-'"
                       :deviceIP="''">
      </device-desc-box>
      <!--<ul class="right-box">-->
        <!--<li>-->
          <!--<span class="name">设备名称：</span>地锁{{deviceMsg.deviceId}}</li>-->
        <!--<li>-->
          <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{deviceMsg.partSeatCode}}号车位</li>-->
        <!--<li>-->
          <!--<span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{deviceMsg.deviceId}}</li>-->
        <!--<li>-->
          <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>deviceMsg.deviceId</li>-->
        <!--<li>-->
          <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>-</li>-->
        <!--<li>-->
          <!--<span class="name">IP和端口：</span>-:-</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script>
import lockImg from '@/pages/main/map-viewer/assets/images/u1826.png'
import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'lock',
  components: {DeviceDescBox},
  mixins: [closeDeviceCard],
  data () {
    return {
      lockImg: lockImg
    }
  },
  props: {
    deviceMsg: {}
  },
  watch: {
    deviceMsg: {
      handler (val, oldVal) {
        // this.deviceMsg.deviceId = val.deviceId
        // this.deviceMsg.partSeatCode = val.partSeatCode
      },
      deep: true
    }
  },
  methods: {
    closeDialog () {
      // store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
      store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    }
  },
  mounted () {
    if (this.deviceMsg !== '' && this.deviceMsg !== undefined) {
      console.log('LockInfo deviceMsg = ' + JSON.stringify(this.deviceMsg))
    }
  }
}
</script>

<style scoped>

</style>
