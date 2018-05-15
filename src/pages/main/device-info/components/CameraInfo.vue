<template>
  <div class="item-box">
    <a class="close" href="javascript:void(0);" @click="closeDeviceBox">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box">
      <div class="left-box center">
        <div class="view">
          <single-screen :videoplayData="videoplayData" v-if="videoplayData.deviceID"></single-screen>
        </div>
      </div>
      <device-desc-box :deviceName="cameraInfoData.deviceName || '-'" :orgName="cameraInfoData.installAddress || '-'" :deviceCode="cameraInfoData.deviceID || '-'" :deviceTypeDesc="cameraInfoData.deviceTypeName || '-'" :providerName="cameraInfoData.providerName || '-'" :deviceIP="cameraInfoData.deviceIP || '-'" :devicePort="cameraInfoData.devicePort || '-'">
      </device-desc-box>
      <!--<ul class="right-box">-->
      <!--<li>-->
      <!--<span class="name">设备名称：</span>{{cameraInfoData.deviceName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{cameraInfoData.installAddress || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{cameraInfoData.deviceID || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{cameraInfoData.deviceTypeName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>{{cameraInfoData.providerName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">IP和端口：</span>{{cameraInfoData.deviceIP || '-'}} : {{cameraInfoData.devicePort || '-'}}</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script>
import { getCameraInfoData } from '@/pages/main/api/park-warning'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'camera-info',
  components: { DeviceDescBox },
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {}
  },
  data () {
    return {
      videoplayData: {
        deviceID: '',
        parentID: '',
        mediaIP: '',
        mediaPort: 10000
      },
      cameraInfoData: {},
      deviceSaveID: '',
      deviceId: ''
    }
  },
  mounted () {
    this.deviceSaveID = this.deviceMsg.deviceId
    this.getCameraInfoData()
  },
  watch: {
    deviceMsg: {
      handler (val, oldVal) {
        this.deviceSaveID = val.deviceId
        this.getCameraInfoData()
      },
      deep: true
    }
  },
  methods: {
    // 摄像头axios
    getCameraInfoData () {
      let params = {
        'cameraCode': this.deviceSaveID
      }
      getCameraInfoData(params).then(res => {
        this.cameraInfoData = res
        if (res.deviceID) {
          this.videoplayData = {
            deviceID: res.deviceID,
            parentID: res.parentID,
            mediaIP: res.mediaIP,
            mediaPort: res.mediaPort
          }
        } else {
          this.videoplayData = {
            deviceID: '1',
            parentID: '',
            mediaIP: '',
            mediaPort: 10000
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
/* .detail-info-box .left-box .view {
  height: 100%;
  width: 100%;
} */
</style>
