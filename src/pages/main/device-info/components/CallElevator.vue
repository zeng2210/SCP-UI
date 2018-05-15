<template>
  <!-- 呼叫电梯 - 选择楼层 start -->
  <div class="item-box">
    <a class="close" href="javascript:void(0);" v-show="returnClick" @click="closeDeviceBox">╳</a>
    <a class="icon-return" href="javascript:void(0);" @click="closeDeviceOne" v-show="!returnClick"></a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box">
      <div class="left-box center">
        <div class="view">
          <single-screen :videoplayData="videoplayData" v-if="videoplayData.deviceID&&!selectPlayIndex" :ocxProperty="ocxProperty"></single-screen>
          <four-split-screen :fourSplitData="fourSplitData" v-if="selectPlayIndex"></four-split-screen>
          <!-- <img src="/static/images/p06.png" alt="" class="pic"> -->
        </div>
        <p class="note" v-show="elevatorRunning === 'elevator'">电梯正运行至选定楼层</p>
        <!-- <button type="button" class="btn blue" @click="callingClick" v-show="elevatorRunning === 'call'">呼 梯</button> -->
      </div>
      <device-desc-box v-show='accordingToThe' :deviceName="callElevator.deviceName || '-'" :orgName="callElevator.orgName || '-'" :deviceCode="callElevator.deviceCode || '-'" :deviceTypeDesc="callElevator.deviceTypeName || '-'" :providerName="callElevator.providerName || '-'" :deviceIP="callElevator.deviceIp || '-'" :devicePort="callElevator.devicePort || '-'">
      </device-desc-box>
      <!--<ul class="right-box" v-show='accordingToThe'>-->
      <!--<li>-->
      <!--<span class="name">设备名称：</span>{{callElevator.deviceName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{callElevator.orgName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{callElevator.deviceCode || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{callElevator.deviceTypeName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>{{callElevator.providerName || '-'}}</li>-->
      <!--<li>-->
      <!--<span class="name">IP和端口：</span>{{callElevator.deviceIp || '- '}} : {{callElevator.devicePort || ' -'}}</li>-->
      <!--</ul>-->
      <!-- 选择楼层 -->
      <ul class="right-box" v-show='!accordingToThe'>
        <li>请选择楼层</li>
        <li class="floor-box">
          <div :native="false" :style="getHeightStyle(60)" viewClass="abnormal-event" :noresize="false" class="ImgScrollBox">
            <a href="javascript:;" v-for="(sum,index) in sumIndex" :key="index" @click="selectTheFloor(sum)" :class="{'active': opposite===sum}">{{layerFmt(sum)}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import { getCallElevatorData, getSelectHierarchyData } from '@/pages/main/api/park-warning'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'call-elevator',
  components: { DeviceDescBox },
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {
      require: true
    }
  },
  data () {
    return {
      ocxProperty: {
        width: 16,
        height: 9
      },
      accordingToThe: true, // 右侧列表间的切换
      elevatorRunning: 'call', // 梯控和电梯正运行至指定楼层之间的切换
      returnClick: true, // 返回键间的切换
      sumIndex: [],
      callElevator: '',
      levels: '',
      opposite: '',
      callScrollbar: '',
      deviceSaveID: '',
      styles: 'view',
      selectPlayIndex: '', // 显示视频播放 1/4
      // 单屏播放
      videoplayData: {
        deviceID: '',
        parentID: '',
        mediaIP: '',
        mediaPort: 10000
      },
      // 四屏播放
      fourSplitData: [
        {
          deviceID: '', // 子设备id（string）
          parentID: '', // 父设备id（string）
          mediaIP: '', // 流媒体ip（string）
          mediaPort: 10000 // 流媒体端口（number）
        }
      ]
    }
  },
  mounted () {
    this.deviceSaveID = this.deviceMsg.deviceId
    this.callScrollbar = new PerfectScrollbar(document.querySelector('.ImgScrollBox'))
    // this.theirIncreased()
    this.getCallElevatorData()
  },
  watch: {
    deviceMsg: {
      handler (val, oldVal) {
        this.deviceSaveID = val.deviceId
        this.closeDeviceOne()
        this.getCallElevatorData()
      },
      deep: true
    },
    // mainContainHeight: function (newVal, oldVal) { // 窗口大小改变触发
    //   this.fullScreen = this.isFullScreen()
    // }
  },
  computed: {
    // 动态获取中间部分高度
    // ...mapState(['asideLoading']),
    // ...mapCommonState(['mainContainHeight'])
  },
  methods: {
    callingClick (event) {
      this.styles = 'view style-view'
      this.elevatorRunning = 'null'
      this.accordingToThe = false
      this.returnClick = false
    },
    // 楼层滚动条
    getHeightStyle (h = 0) {
      return { height: (this.mainContainHeight - h) + 'px' }
    },
    // 楼层渲染
    layerFmt (val) {
      return val > 0 ? (val >= 10 ? val : '0' + val) : 'B' + Math.abs(val)
    },
    // 点击返回
    fnClose () {
      this.returnClick = true
      this.styles = 'view'
      this.elevatorRunning = 'call'
      this.accordingToThe = true
    },
    // 电梯移动至指定楼层axios
    getSelectHierarchyData (val) {
      getSelectHierarchyData({
        deviceId: this.deviceSaveID,
        floor: val
      }).then(res => {
        if (res === 'success') {
          this.elevatorRunning = 'elevator'
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择楼层
    selectTheFloor (curFloor) {
      this.opposite = curFloor
      this.styles = 'view'
      let that = this
      setTimeout(function () {
        that.accordingToThe = true
        that.returnClick = true
        that.opposite = ''
        // 选择楼层
        that.getSelectHierarchyData(curFloor)
        setTimeout(function () {
          that.elevatorRunning = 'call'
        }, 2000)
      }, 500)
    },
    // 呼梯接口
    getCallElevatorData () {
      this.sumIndex = []
      let params = {
        deviceId: this.deviceSaveID
      }
      getCallElevatorData(params).then(res => {
        this.callElevator = res
        this.$nextTick(() => {
          // this.$refs.abnormalScroll.update()
        })
        // this.callScrollbar.update()
        // OCX四个参数
        if (res.cameras.length === 1) {
          if (res.cameras[0].deviceId) {
            this.selectPlayIndex = false
            this.videoplayData = {
              deviceID: res.cameras[0].deviceId,
              parentID: res.cameras[0].parentId,
              mediaIP: res.cameras[0].cameraIp,
              mediaPort: Number(res.cameras[0].cameraPort)
            }
          } else {
            this.videoplayData = {
              deviceID: '1',
              parentID: '',
              mediaIP: '',
              mediaPort: 10000
            }
          }
        } else {
          this.selectPlayIndex = true
          this.fourSplitData = res.cameras.map((item) => {
            return {
              deviceID: item.deviceId,
              parentID: item.parentId,
              mediaIP: item.cameraIp,
              mediaPort: Number(item.cameraPort)
            }
          })
        }
        // 楼层渲染
        for (let v = res.startFloor; v <= res.endFloor; v++) {
          (v !== 0) && this.sumIndex.push(v)
        }
        this.sumIndex.reverse()
      }).catch(err => {
        console.log(err)
      })
    },
    closeDeviceOne () {
      this.styles = 'view'
      this.returnClick = true
      this.elevatorRunning = 'call'
      this.accordingToThe = true
    }
  }
}
</script>

<style scoped>
.style-view {
  margin-top: 30px;
}
.ImgScrollBox {
  /* width: 100%; */
  height: 100%;
  margin-right: 6px\0;
  position: relative;
}
.floor-box {
  overflow-x: hidden;
  padding-right: 0;
  height: 100%;
}
</style>
<style>
.right-box .floor-box .ImgScrollBox .ps__rail-y {
  width: 0 !important;
}
</style>
