<template>
  <div class="item-box">
    <a class="close" href="javascript:void(0);" @click="closeDeviceBox">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box">
      <div class="left-box center">
        <div class="view">
          <!-- <img src="/static/images/p06.png" alt="" class="pic"> -->
          <single-screen :videoplayData="videoplayData" v-if="videoplayData.deviceID"></single-screen>
        </div>
      </div>
      <device-desc-box :deviceName="electronData.deviceName || '-'" :orgName="electronData.orgName || '-'" :deviceCode="electronData.deviceCode || '-'" :deviceTypeDesc="electronData.deviceType || '-'" :providerName="electronData.providerName || '-'" :deviceIP="electronData.deviceIp || '-'" :devicePort="electronData.devicePort || '-'">
      </device-desc-box>
      <!--<ul class="right-box">-->
      <!--<li>-->
      <!--<span class="name">设备名称：</span>{{electronData.deviceName || '-'}}-->
      <!--</li>-->
      <!--<li>-->
      <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{electronData.orgName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{electronData.deviceCode || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{electronData.deviceType || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>{{electronData.providerName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">IP和端口：</span>{{electronData.deviceIp || '-'}} : {{electronData.devicePort || '-'}}</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script>
import { getelectronFenceData } from '@/pages/main/api/park-warning'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'electronic-fence',
  components: { DeviceDescBox },
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {}
  },
  data () {
    return {
      videoplayData: {
        deviceID: '', // 勿动
        parentID: '', // 1002200114a78b9b5305，10012001001110004444
        mediaIP: '', // 192.168.0.94，192.168.0.207
        mediaPort: 10000
      },
      electronData: {},
      deviceSaveID: '',
      deviceId: ''
    }
  },
  mounted () {
    this.deviceSaveID = this.deviceMsg.deviceId
    this.getelectronFenceData()
  },
  watch: {
    deviceMsg: {
      handler (val, oldVal) {
        this.deviceSaveID = val.deviceId
        this.getelectronFenceData()
      },
      deep: true
    }
  },
  methods: {
    // 电子围栏axios
    getelectronFenceData () {
      let params = {
        'deviceCode': this.deviceSaveID
      }
      getelectronFenceData(params).then(res => {
        this.electronData = res
        // OCX四个参数
        if (res.cameras[0]) {
          this.videoplayData = {
            deviceID: res.cameras[0].deviceID,
            parentID: res.cameras[0].parentID,
            mediaIP: res.cameras[0].mediaIP,
            mediaPort: res.cameras[0].mediaPort
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
