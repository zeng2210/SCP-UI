<template>
  <!-- 车闸 start -->
  <div class="item-box">
    <a class="close" href="javascript:;" @click="closeDeviceBox">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box">
      <div class="left-box">
        <div class="view">
          <!-- <img src="/static/images/p06.png" alt="" class="pic"> -->
          <single-screen :videoplayData="videoplayData" :ocxbgColor="ocxbgColor"></single-screen>
        </div>
        <div class="note">{{operateResult}}</div><!--文字弹层提示-->
        <button type="button" class="btn confirm" @click="openBrake(deviceId, parentId)">远程开闸</button>
      </div>
      <device-desc-box :deviceName="deviceData.deviceName || '-'"
                       :orgName="deviceData.orgName || '-'"
                       :deviceCode="deviceData.deviceCode || '-'"
                       :deviceTypeDesc="deviceData.deviceTypeDesc || '-'"
                       :providerName="deviceData.providerName || '-'"
                       :deviceIP="deviceData.deviceIP || '-'"
                       :devicePort="deviceData.devicePort || '-'">
      </device-desc-box>
      <!--<ul class="right-box">-->
        <!--<li><span class="name">设备名称：</span>{{deviceData.deviceName || '-'}}</li>-->
        <!--<li><span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{deviceData.orgName || '-'}}</li>-->
        <!--<li><span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{deviceData.deviceCode || '-'}}</li>-->
        <!--<li><span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{deviceData.deviceTypeDesc || '-'}}</li>-->
        <!--<li><span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>{{deviceData.providerName || '-'}}</li>-->
        <!--<li><span class="name">IP和端口：</span>{{deviceData.deviceIP || '-'}} : {{deviceData.devicePort || '-'}}</li>-->
      <!--</ul>-->
    </div>
  </div>
  <!-- 车闸 end -->
</template>

<script>
import {remoteControlBrake, queryBrakeDeviceInfo} from '@/pages/main/api/gate-device'
import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'brake',
  components: {DeviceDescBox},
  mixins: [closeDeviceCard],
  data () {
    return {
      operateResult: '', // 远程操作结果
      deviceData: {},
      deviceId: '', // 道闸设备编号
      parentId: '', // 控制机设备编号
      gateWayId: '',
      videoplayData: { // 视频参数
        deviceID: '',
        parentID: '',
        mediaIP: '',
        mediaPort: 10000
      },
      ocxbgColor: 3 // 1-红色；2-黄色；3-蓝色
    }
  },
  props: {
    deviceMsg: {}
  },
  mounted () {
    if (this.deviceMsg !== '' && this.deviceMsg !== undefined) {
      console.log('mounted Brake deviceMsg = ' + JSON.stringify(this.deviceMsg))
      this.queryDeviceInfo(this.deviceMsg.deviceId)
    }
  },
  methods: {
    /**
     * 根据设备编号查询设备信息
     */
    queryDeviceInfo (deviceId) {
      let that = this
      if (deviceId !== '') {
        queryBrakeDeviceInfo(deviceId).then(res => {
          if (res) {
            that.deviceId = res.subDeviceBrakeCode
            that.parentId = res.deviceCode
            that.deviceData = res
            let videoParam = res.inOutCarVideoVo
            that.videoplayData = {}
            if (videoParam) {
              console.log('Brake videoParam=' + JSON.stringify(videoParam))
              that.videoplayData.deviceID = videoParam.deviceId
              that.videoplayData.parentID = videoParam.parentId
              that.videoplayData.mediaIP = videoParam.mediaIP
              that.videoplayData.mediaPort = videoParam.mediaPort
            }
          }
        }).catch(err => {
          console.error('----->查询车闸设备异常err=' + JSON.stringify(err))
        })
      }
    },
    /**
    * 远程开闸
    */
    openBrake (deviceId, parentId) {
      let that = this
      remoteControlBrake(deviceId, parentId).then(res => {
        that.operateResult = '远程开闸成功'
        setTimeout(() => {
          this.$nextTick(() => {
            this.operateResult = ''
          })
        }, 2000)
      }).catch(err => {
        console.log('远程开闸失败-------' + JSON.stringify(err))
        that.operateResult = '远程开闸失败'
        setTimeout(() => {
          that.$nextTick(() => {
            that.operateResult = ''
          })
        }, 2000)
      })
    },
    closeDialog () {
      // store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
      store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    },
    /**
     * @description 数据初始化
     */
    initData () {
      this.operateResult = '' // 远程操作结果
      this.deviceData = {}
      this.deviceId = '' // 道闸设备编号
      this.parentId = '' // 控制机设备编号
      this.gateWayId = ''
      this.videoplayData = {}
    }
  },
  watch: {
    deviceMsg: function (val, oldVal) {
      console.log('watch Brake deviceMsg = ' + JSON.stringify(this.deviceMsg))
      if (this.deviceMsg !== '' && this.deviceMsg !== undefined) {
        this.initData()
        this.queryDeviceInfo(this.deviceMsg.deviceId)
      }
    }
  }
}
</script>

<style scoped>

</style>
