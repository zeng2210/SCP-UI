<template>
  <div class="item-box">
    <a class="close" href="javascript:;" @click="closeBroadcast">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box broadcast-box">
      <div class="left-box">
        <i :class="['status', isStatusShow?'icon-playing':'icon-time-out']" @click="onStatuschange"></i>
        <swiper :options="swiperOption" ref="mySwiper" class="broadcast-view" @mouseup="onTaskChange" @touch-end="onTaskChange">
          <swiper-slide v-for="(item, index) in taskList" :key="index" class="swiper-slide">
            <img :src="item.picUrl" class="cover">
            <p class="tag-name">{{item.broadcastName}}</p>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" id="swiper-pagination-id" style="display: none"></div>
        </swiper>
        <!-- <i class="icon-return returnPlaying" @click="returnPlaying"></i> -->
        <div class="txt-box" @click="returnPlaying">
          <div class="info">
            <div class="time">
              <div class="yinpin">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {{ allTime }}
            </div>
            <p class="title">{{ broadcastName }}</p>
          </div>
        </div>
        <div class="volume-box">
          <!-- icon-silent -->
          <a href="javascript:;" :class="['ico', isVolShow?'icon-volume':'icon-silent']" @click="onVolchange"></a>
          <div class="volume-bar" @mousedown="onControlvolchange">
            <div class="bar" :style="{width: volLong + '%'}"></div>
            <div class="dot" :style="{left: volLong + '%'}"></div>
          </div>
          <label>
            <input type="checkbox" v-show="false" v-model="checked" @change="onAllArea">
            <span class="icon-check"></span>同步到全部广播
          </label>
        </div>
        <div class="box-loading" v-show="loading"></div>
        <div class="song-abnormal" v-show="abnormal">
          <span>{{ abnormal }}</span>
        </div>
      </div>
      <device-desc-box :deviceName="broadcastInfo[0]" :orgName="broadcastInfo[1]" :deviceCode="broadcastInfo[2]" :deviceTypeDesc="broadcastInfo[3]" :providerName="broadcastInfo[4]" :deviceIP="broadcastInfo[5]" :devicePort="broadcastInfo[6]">
      </device-desc-box>
      <!--<ul class="right-box">-->
      <!--<li>-->
      <!--<span class="name">设备名称：</span>{{ broadcastInfo[0] }}</li>-->
      <!--<li>-->
      <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>{{ broadcastInfo[1] }}</li>-->
      <!--<li>-->
      <!--<span class="name">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>{{ broadcastInfo[2] }}</li>-->
      <!--<li>-->
      <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>{{ broadcastInfo[3] }}</li>-->
      <!--<li>-->
      <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>{{ broadcastInfo[4] }}</li>-->
      <!--<li>-->
      <!--<span class="name">IP和端口：</span>{{ broadcastInfo[5] }}</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  postBroadcastVolumeData,
  postGetBroadcast,
  playBroadcast,
  getBroadcastdialog,
  getTaskListData,
  pauseRealtimeTask
} from '@/pages/main/api/broad-cast'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import DeviceDescBox from './DeviceDescBox'
// import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
var tempParam = null
export default {
  // mixins: [closeDeviceCard],
  components: {
    DeviceDescBox,
    swiper,
    swiperSlide
  },
  props: {
    deviceMsg: {
      require: true
    }
  },
  data () {
    return {
      broadcastInfo: [
        '', '', '开启', '', '', '', ''
      ],
      broadcastName: '未播放任务',
      volLong: 10,
      volValue: 2,
      checked: false,
      allTime: '00:00',
      sessionId: 1,
      isVolShow: true, // 静音与否
      mute: 10, // 储存音量
      volLongOld: 10, // 储存音量长度
      allPlayArea: 2, // 广播全部区域
      operationplay: 1,
      isStatusShow: true,
      statusShow: true, // 储存播放状态
      deviceId: '',
      loading: false,
      requestBroadcast: null,
      taskList: [],
      taskId: '',
      swiperOption: {
        paginationClickable: true,
        centeredSlides: true,
        slidesPerView: 3,
        initialSlide: 2,
        watchActiveIndex: true,
        notNextTick: true, // notNextTick设置为true，组件不会通过NextTick来实例化swiper，可以在第一时间获取到swiper对象
        autoplay: false, // 禁止自动滑动
        loop: false, // 不可重复
        watchOverflow: true, // 当没有足够的slide切换时，swiper会失效且隐藏导航等
        grabCursor: true,
        pagination: { // 设置分页器
          el: '.swiper-pagination',
          clickable: true // 设置为true，则点击分页器可自动滑到指定页面
        },
        keyboard: true,
        mousewheelControl: true,
        spaceBetween: 10 // slide之间的距离
      },
      abnormal: '', // 异常
      showIndex: 0,
      nowIndex: 0 // 当前索引
    }
  },
  mounted () {
    console.log(this.deviceMsg)
    tempParam = this
    tempParam.clearBroadcast()
    if (!this.deviceMsg || this.deviceMsg.markerType !== 'broadcast') {
      return
    }
    tempParam.deviceId = this.deviceMsg.deviceId
    tempParam.getBroadcast()
    tempParam.setBroadcast()
    tempParam.getBroadcastEquipmentInfo()
  },
  destroyed () {
    this.clearBroadcast()
  },
  methods: {
    /* eslint-disable */
    /**
     * @description 获取广播设备信息
     */
    getBroadcastEquipmentInfo () {
      getBroadcastdialog({ deviceId: this.deviceId }).then(res => {
        console.log(res)
        this.broadcastInfo[0] = res.deviceName
        this.broadcastInfo[1] = res.installAddress
        this.broadcastInfo[3] = res.deviceTypeName
        this.broadcastInfo[4] = res.providerName
        this.broadcastInfo[5] = res.deviceIP || '-'
        this.broadcastInfo[6] = res.devicePort || '-'
      })
    },
    /**
     * @description 计时器每隔10秒请求一次正在播放的歌曲
     */
    setBroadcast () {
      if (this.requestBroadcast) { tempParam.clearBroadcast() }
      this.requestBroadcast = setInterval(() => { this.getBroadcastInfo() }, 1000 * 10)
    },
    /**
     * @description 清除计时器
     */
    clearBroadcast () {
      clearInterval(this.requestBroadcast)
    },
    /**
     * @description 计时器请求内容
     */
    getBroadcastInfo (callback) {
      this.loading = true
      postGetBroadcast({ deviceId: tempParam.deviceId }).then(
        res => {
          let broadcast = res
          broadcast.uuid = res.broadcastId
          tempParam.taskId = res.broadcastId
          tempParam.sessionId = res.sessionId
          if (res.status == 1) {
            tempParam.broadcastInfo[2] = '开启'
            tempParam.statusShow = false
            if (tempParam.taskId === tempParam.taskList[tempParam.nowIndex].uuid) {
              tempParam.isStatusShow = false
            } else {
              tempParam.isStatusShow = true
            }
          } else {
            tempParam.broadcastInfo[2] = '关闭'
            tempParam.isStatusShow = true
            tempParam.statusShow = true
          }
          if (!res.audioclipName) {
            tempParam.taskId = ''
            tempParam.broadcastName = '未播放任务'
          }
          getTaskListData({ deviceId: tempParam.deviceId }).then(res => {
            tempParam.taskList = res
            if (broadcast.broadcastType == '1') {
              tempParam.taskList.unshift(broadcast)
              tempParam.showIndex = 0
              tempParam.nowIndex = 0
              tempParam.swiper.slideTo(0, 0, false)
              tempParam.loading = false
              if (broadcast.status == 1) {
                tempParam.isStatusShow = false
                tempParam.isStatusShow = false
              }
              tempParam.broadcastName = tempParam.taskList[0].broadcastName
              return
            }
            if (res.length === 0) {
              tempParam.broadcastName = '未播放任务'
            }
            for (let i = 0; i < res.length; i++) {
              if (res[i].uuid === tempParam.taskId) {
                tempParam.showIndex = i
                tempParam.broadcastName = res[i].broadcastName
              }
            }
            tempParam.loading = false
            callback && callback()
          })
            .catch(err => {
              tempParam.loading = false
              console.warn(err)
            })
          tempParam.volValue = broadcast.vol
          tempParam.volLong = Math.round(broadcast.vol / 19 * 100)
          var minute = parseInt(broadcast.timeLength / 60) + ''
          minute = minute.replace(minute, (minute.length === 1) ? ('0' + minute) : minute)
          var second = broadcast.timeLength % 60 + ''
          second = second.replace(second, (second.length === 1) ? ('0' + second) : second)
          tempParam.allTime = minute + ':' + second
          if (tempParam.volValue == 0) {
            tempParam.isVolShow = false
          } else {
            tempParam.isVolShow = true
            tempParam.mute = tempParam.volValue
            tempParam.volLongOld = tempParam.volLong
          }
        }
      ).catch(err => {
        tempParam.loading = false
        console.warn(err)
      })
    },
    /**
     * @description 查询音量以及正在播放歌曲
     */
    getBroadcast () {
      this.loading = true
      postGetBroadcast({ deviceId: tempParam.deviceId }).then(
        res => {
          tempParam.taskId = res.broadcastId
          let broadcast = res
          broadcast.uuid = res.broadcastId
          tempParam.volValue = broadcast.vol
          tempParam.volLong = Math.round(broadcast.vol / 19 * 100)
          tempParam.volLongOld = tempParam.volLong
          var minute = parseInt(broadcast.timeLength / 60) + ''
          minute = minute.replace(minute, (minute.length === 1) ? ('0' + minute) : minute)
          var second = broadcast.timeLength % 60 + ''
          second = second.replace(second, (second.length === 1) ? ('0' + second) : second)
          tempParam.allTime = minute + ':' + second
          if (tempParam.volValue == 0) {
            tempParam.isVolShow = false
            tempParam.mute = 10
            tempParam.volLongOld = Math.round(10 / 19 * 100)
          } else {
            tempParam.isVolShow = true
            tempParam.mute = tempParam.volValue
          }
          tempParam.sessionId = broadcast.sessionId
          if (res.status == 1) {
            tempParam.isStatusShow = false
            tempParam.statusShow = false
            tempParam.broadcastInfo[2] = '开启'
          } else {
            tempParam.isStatusShow = true
            tempParam.statusShow = true
            tempParam.broadcastInfo[2] = '关闭'
          }
          if (!res.audioclipName) {
            tempParam.broadcastName = '未播放任务'
          }
          getTaskListData({ deviceId: tempParam.deviceId }).then(res => {
            console.log(res)
            tempParam.taskList = res
            if (broadcast.broadcastType == '1') {
              tempParam.taskList.unshift(broadcast)
              tempParam.showIndex = 0
              tempParam.nowIndex = 0
              tempParam.swiper.slideTo(0, 0, false)
              tempParam.broadcastName = tempParam.taskList[0].broadcastName
              tempParam.loading = false
              return
            }
            if (res.length === 0) {
              tempParam.broadcastName = '未播放任务'
            }
            for (let i = 0; i < res.length; i++) {
              if (res[i].uuid === tempParam.taskId) {
                tempParam.showIndex = i
                tempParam.nowIndex = i
                // tempParam.swiper.slideTo(i, 600, false)
                tempParam.broadcastName = res[i].broadcastName
              }
            }
            tempParam.loading = false
            setTimeout(() => {
              tempParam.returnPlaying()
            }, 200)
          })
            .catch(err => {
              tempParam.loading = false
              console.warn(err)
            })
        }
      ).catch(err => {
        tempParam.loading = false
        console.warn(err)
      })
    },
    /**
     * @description 播放
     */
    onStatuschange () {
      if (tempParam.taskList[tempParam.nowIndex].uuid === tempParam.taskId) {
        this.loading = true
        this.operationplay = this.isStatusShow ? 2 : 1
        var playBroadcastMsg = {
          sessionId: this.sessionId,
          operation: this.operationplay,
          deviceId: this.deviceId,
          allPlayArea: this.allPlayArea
        }
        playBroadcast(playBroadcastMsg).then(
          res => {
            this.sessionId = res.sessionId
            if (res.status == '1') {
              this.isStatusShow = false
              this.statusShow = false
              this.broadcastInfo[2] = '开启'
            } else if (res.status == '2') {
              this.isStatusShow = true
              this.statusShow = true
              this.broadcastInfo[2] = '关闭'
            }
            this.loading = false
          }
        ).catch(err => {
          this.loading = false
          console.warn(err)
        })
      } else {
        if (this.taskList.length === 0) {
          return
        }
        this.loading = true
        // ID不同表示点击的其他任务播放
        let taskInfo = {}
        let thisTask = this.taskList[this.nowIndex]
        let str = thisTask.broadcastAreaLink[0].playAreaId
        let playAreaIdArry = str.split(',')
        taskInfo.audioClipIds = [thisTask.audioClipId]
        taskInfo.broadcastIds = [thisTask.uuid]
        taskInfo.broadcastType = thisTask.broadcastType
        taskInfo.deviceInfo = [{
          controllerId: thisTask.broadcastAreaLink[0].controllerId,
          controllerName: thisTask.broadcastAreaLink[0].controllerName,
          playAreaId: playAreaIdArry,
          sessionId: thisTask.broadcastAreaLink[0].sessionId        }]
        taskInfo.operation = 3
        taskInfo.recovery = thisTask.recovery
        taskInfo.repetitions = thisTask.repetitions
        taskInfo.taskLevel = thisTask.taskLevel
        taskInfo.xmlFile = thisTask.xmlFile
        pauseRealtimeTask(taskInfo).then(res => {
          if (res) {
            tempParam.abnormal = res
            tempParam.loading = false
            setTimeout(() => {
              tempParam.abnormal = ''
            }, 1500)
            return
          } else {
            this.showIndex = this.nowIndex
            setTimeout(() => {
              tempParam.getBroadcastInfo(tempParam.tastChangecallback)
            }, 1000)
          }
        })
          .catch((err) => {
            tempParam.loading = false
            console.warn(err)
          })
      }
    },
    tastChangecallback () {
      if (tempParam.showIndex !== tempParam.nowIndex) {
        tempParam.abnormal = '有更高或相同等级的任务正在播放'
        setTimeout(() => {
          tempParam.abnormal = ''
        }, 1500)
      }
    },
    /**
     * @description 静音与否
     */
    onVolchange () {
      this.loading = true
      this.isVolShow = !this.isVolShow
      var changeVolume = {}
      if (!this.isVolShow) {
        this.volValue = 0
        this.volLong = 0
        changeVolume = {
          deviceId: this.deviceId,
          vol: 0,
          allPlayArea: this.allPlayArea
        }
      } else {
        this.volValue = this.mute
        this.volLong = this.volLongOld
        changeVolume = {
          deviceId: this.deviceId,
          vol: this.mute,
          allPlayArea: this.allPlayArea
        }
      }
      postBroadcastVolumeData(changeVolume).then(
        res => {
          this.loading = false
          console.log(res)
        }).catch(err => {
          this.isVolShow = !this.isVolShow
          if (!this.isVolShow) {
            this.volValue = 0
            this.volLong = 0
          } else {
            this.volValue = this.mute
            this.volLong = this.volLongOld
          }
          this.loading = false
          console.warn(err)
        })
    },
    /**
     * @description 调节音量
     */
    onControlvolchange (e) {
      e = e || window.event
      let allVol = document.querySelectorAll('.volume-bar')[0].offsetWidth
      let mouseX = e.layerX
      let that = this
      if (e.target.classList[0] === 'dot') {
        var oldLong = e.clientX
        mouseX = this.volLong / 100 * allVol
        document.onmousemove = function (event) {
          var X = event.clientX
          var long = mouseX - (oldLong - X)
          if (long <= 0) {
            document.onmousemove = null
            document.onmouseup = null
            that.volLong = 0
            tempParam.volLongOld = tempParam.volLong
            that.volValue = 0
            that.onControlvol()
            return false
          } else if (long >= allVol) {
            document.onmousemove = null
            document.onmouseup = null
            that.volLong = 100
            tempParam.volLongOld = tempParam.volLong
            that.volValue = 19
            that.onControlvol()
            return false
          } else {
            that.volValue = Math.round(19 * (long / allVol))
            that.volLong = long / allVol * 100
            tempParam.volLongOld = tempParam.volLong
          }
        }
        document.onmouseup = function () {
          document.onmouseup = null
          document.onmousemove = null
          that.onControlvol()
        }
      } else {
        document.onmousemove = null
        document.onmouseup = null
        this.volValue = Math.round(19 * (mouseX / allVol))
        this.volLong = mouseX / allVol * 100
        tempParam.volLongOld = tempParam.volLong
        this.onControlvol()
      }
      return false
    },
    onControlvol () {
      this.loading = true
      if (this.volValue > 0) {
        this.isVolShow = true
      } else if (this.volValue == 0) {
        this.isVolShow = false
      }
      // 更新后台广播音量值
      var changeVolume = {
        deviceId: this.deviceId,
        vol: this.volValue,
        allPlayArea: this.allPlayArea
      }
      postBroadcastVolumeData(changeVolume).then(
        res => {
          this.mute = this.volValue
          this.loading = false
          console.log(res)
        }
      ).catch(err => {
        this.volLong = this.volLongOld
        this.loading = false
        console.warn(err)
      })
    },
    /**
     * @description 广播全部区域
     */
    onAllArea () {
      console.log('广播全部区域')
      this.allPlayArea = this.checked ? 1 : 2
      return false
    },
    /**
     * @description 关闭广播弹窗
     */
    closeBroadcast () {
      this.deviceId = ''
      this.taskList = []
      this.isStatusShow = true
      this.statusShow = true
      this.broadcastInfo[2] = '关闭'
      tempParam.broadcastName = '未播放任务'
      this.volValue = 10
      this.checked = false
      this.allTime = '00:00'
      this.clearBroadcast()
      // store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
      store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    },
    /**
     * @description 返回正在播放的任务位置
     */
    returnPlaying () {
      this.swiper.slideTo(this.showIndex, 600, false);
    },
    /**
     * @description 滑动任务列表图片触发
     */
    onTaskChange () {
      let that = this
      this.swiper.on('transitionEnd', function () {
        console.log("内容===索引值：" + this.activeIndex)
        that.nowIndex = this.activeIndex
        if (that.showIndex == this.activeIndex) {
          that.isStatusShow = that.statusShow
        } else {
          that.isStatusShow = true
        }
      })
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    deviceMsg: {
      handler (val, oldVal) {
        tempParam.clearBroadcast()
        if (!val || val.markerType !== 'broadcast') {
          return
        }
        console.log(val)
        tempParam.deviceId = val.deviceId
        tempParam.getBroadcast()
        tempParam.setBroadcast()
        tempParam.getBroadcastEquipmentInfo()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.left-box .returnPlaying {
  top: 10rem;
  left: 16rem;
}
.swiper-slide {
  transform: scale(0.9) !important;
}
.left-box .swiper-slide-active {
  transform: scale(1) !important;
}
.item-box .broadcast-box .broadcast-view {
  padding: 0.6rem 0;
}
.left-box .status {
  position: absolute;
  top: 4.5rem;
  left: 30%;
  z-index: 4;
  transform: translateX(-50%);
  font-size: 2.3rem;
  line-height: 1;
  color: #fff;
}
.left-box .box-loading {
  position: absolute;
  z-index: 999;
  width: 16rem;
  height: 13rem;
  left: 1rem;
  top: 2.2rem;
  background-color: rgba(0, 0, 0, 0.4);
}
.song-abnormal {
  color: red;
  position: absolute;
  top: 2.5rem;
  left: 1rem;
  z-index: 9;
  width: 16rem;
  text-align: center;
  font-size: 0.8rem;
}
.song-abnormal span {
  display: inline-block;
  width: 100%;
  word-wrap: break-word;
}
.broadcast-box .txt-box {
  cursor: pointer;
}
.left-box .status {
  cursor: pointer;
}
</style>
