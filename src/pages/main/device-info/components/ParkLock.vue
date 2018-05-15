<template>
    <div>
    <!-- 地锁 start -->
    <div class="item-box">
      <a class="close" href="javascript:;" @click="closeDeviceBox">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img :src="parkLock.img" alt="" class="pic">
          </div>
        </div>
        <device-desc-box :deviceName="parkLock.markerName || '-'"
                         :orgName="parkLock.parkSeatCode || '-'"
                         :deviceCode="parkLock.deviceId || '-'"
                         :deviceTypeDesc="'地锁'"
                         :providerName="'未知'"
                         :deviceIP="'未知'">
        </device-desc-box>
        <!--<ul class="right-box">-->
          <!--<li><span class="name">地锁{{parkLock.markerName}}</span>aa</li>-->
          <!--<li><span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{parkLock.parkSeatCode}}</li>-->
          <!--<li><span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{parkLock.deviceId}}</li>-->
          <!--<li><span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>地锁</li>-->
          <!--<li><span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>未知</li>-->
          <!--<li><span class="name">IP和端口：</span>未知</li>-->
        <!--</ul>-->
      </div>
    </div>
    <!-- 地锁 end -->
</template>

<script>
// import mutationTypes from '@/pages/main/store/mutation-types'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'park-lock',
  components: {DeviceDescBox},
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {
      type: Object
    }
  },
  data () {
    return {
      parkLock: this.deviceMsg
    }
  },
  methods: {
    closeDialog () {
      // this.$store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
      this.$store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    }
  }
}
</script>

<style scoped>

</style>
