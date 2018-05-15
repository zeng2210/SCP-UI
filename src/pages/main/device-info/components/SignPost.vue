<template>
  <div>
    <!-- 电子指路牌 start -->
    <div class="item-box" v-show="signShow">
      <a class="close" href="javascript:;" @click="closeDeviceBox">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <single-screen :videoplayData="videoplayData" :ocxbgColor="3"></single-screen>
          </div>
          <button type="button" class="btn confirm" @click="getScreen()">设定屏幕</button>
        </div>
        <device-desc-box :deviceName="'智能指路牌'"
                         :orgName="'主出入口'"
                         :deviceCode="deviceMsg.info.addrid || '-'"
                         :deviceTypeDesc="'指路牌'"
                         :providerName="'电击客'"
                         :deviceIP="'无'">
        </device-desc-box>
        <!--<ul class="right-box">-->
          <!--<li>-->
            <!--<span class="name">设备名称：</span>智能指路牌</li>-->
          <!--<li>-->
            <!--<span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>主出入口</li>-->
          <!--<li>-->
            <!--<span class="name">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>{{ (deviceMsg && deviceMsg.info && deviceMsg.info.addrid) ? deviceMsg.info.addrid : null}}</li>-->
          <!--<li>-->
            <!--<span class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>指路牌</li>-->
          <!--<li>-->
            <!--<span class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;商：</span>电击客</li>-->
          <!--<li>-->
            <!--<span class="name">IP和端口：</span>无</li>-->
        <!--</ul>-->
      </div>
    </div>
    <!--设定电子指路牌屏幕-->
    <div class="item-box" v-show="!signShow">
      <div class="set-signposts-box">
        <a class="icon-return" href="javascript:;" @click="signBack()"></a>
        <p class="title">请选择电子指路牌屏幕内容</p>
        <ul class="tabs-nav">
          <li v-for="(item, index) in signPostGroup" :key="index" @click="toggleGroup(index)" :class="['sign-tabnav', active === index ? 'activeStyle' : '']">
            {{'第' + item.group.replace('ss-','') + '组'}}
          </li>
        </ul>
        <div class="signposts-list-box">
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(items, index) in showImageList" :key="index" class="signposts-wrap">
              <img :src="items.src" alt="" class="pict">
            </swiper-slide>
          </swiper>
        </div>
        <div class="btn-box">
          <button type="button" class="btn confirm" @click="updateScreen(active)">使 用</button>
        </div>
      </div>
    </div>
    <!-- 电子指路牌 end-->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import controller from '@/pages/main/controller'
import { getSignPostGroup, LOG_TAG, getCameraId, getDeviceScreenImage, updateDeviceScreen } from '@/pages/main/api/sign-post'
import { getDeviceByCameraData } from '@/pages/main/api/video-preview.js'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
import DeviceDescBox from './DeviceDescBox'
export default {
  name: 'signpost',
  components: {
    DeviceDescBox,
    swiper,
    swiperSlide
  },
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {
      require: true
    }
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 18
      },
      signPostGroup: [],
      active: 0,
      signShow: true,
      cameraId: '',
      showImageList: [],
      isLoad: true,
      signPostId: '',
      videoplayData: {
        // deviceID: '30410453911300080001', 0427有效
        // parentID: '',
        // mediaIP: '',
        // mediaPort: 0
      }
    }
  },
  mounted () {
    this.initSignPost()
    this.controlRegister()
  },
  watch: {
    // 深度监听deviceMsg
    deviceMsg: {
      handler: function (newVal, oldVal) {
        this.initSignPost()
      },
      deep: true
    }
  },
  methods: {
    // 初始化指路牌界面、根据指路牌id和地址，请求摄像头id，再请求摄像头数据
    initSignPost: function () {
      if (this.deviceMsg !== '' && this.deviceMsg !== undefined) {
        console.log('指路牌设备透传信息', this.deviceMsg)
        this.signShow = true
        this.cameraId = ''
        this.active = 0
        this.signPostId = ''
        this.isLoad = true
        this.signPostGroup = []
        this.showImageList = []
        this.videoplayData = {}
        this.loadVideoData()
        this.getSignpostGroup()
        // this.controlRegister()
      }
    },
    // 注册websocket监听
    controlRegister: function () {
      var that = this
      // 94002监听
      controller.register({
        key: 'map-signpost-getgroup',
        points: [94002],
        callback: (info, data) => {
          console.log(LOG_TAG + '94002触发回调: 获取分组')
          if (data.terminalID !== that.GLOBAL.terminalID) {
            return
          }
          info = info.replace('\\"', '"')
          info = JSON.parse(info)
          that.signPostGroup = info
        }
      })
      // 94003监听
      controller.register({
        key: 'map-signpost-getimg',
        points: [94003],
        callback: (info, data) => {
          console.log(LOG_TAG + '94003触发回调：加载图片')
          if (data.terminalID !== that.GLOBAL.terminalID) {
            return
          }
          info = JSON.parse(data.info)
          for (var k = 0; k < that.showImageList.length; k++) {
            if (that.showImageList[k].imgId === info.imgId) {
              console.log(LOG_TAG + '94002图片序列编号' + k)
              var src = 'data:image/jpeg;base64,' + info.data
              that.$set(that.showImageList, k, { imgId: info.imgId, src: src })
            }
          }
        }
      })
      // 94004监听
      controller.register({
        key: 'map-signpost-posyimg',
        points: [94004],
        callback: (info, data) => {
          console.log(LOG_TAG + '94004触发回调：更新屏保', info)
          that.active = 0
          if (data.terminalID !== that.GLOBAL.terminalID) {
            console.warn(LOG_TAG + 'terminalID is error')
          }
        }
      })
    },
    // 获取分组信息
    getSignpostGroup: function () {
      getSignPostGroup({ addrId: this.deviceMsg.info.addrid, terminalID: this.GLOBAL.terminalID }).then(res => {
        console.log(LOG_TAG + '分组传入终端ID' + this.GLOBAL.terminalID)
      }).catch(err => {
        console.warn(LOG_TAG + '/screenProtect/queryDeviceScreenGroup failed')
        console.warn(err)
      })
    },
    // 获取摄像头Id
    loadVideoData: function () {
      var _this = this
      _this.signPostId = _this.deviceMsg.info.cellid + _this.deviceMsg.info.addrid
      getCameraId({ signPostId: _this.signPostId }).then(res => {
        _this.cameraId = res[0].cameraId
        if (_this.cameraId) {
          _this.loadOcx()
        }
      }).catch(err => {
        console.warn(LOG_TAG + '/cameraSignPostId/queryForList failed')
        console.warn(err)
      })
    },
    // 加载Ocx
    loadOcx: function () {
      var _this1 = this
      getDeviceByCameraData({ cameraCode: _this1.cameraId }).then(res => {
        this.videoplayData = {
          deviceID: res.deviceID,
          parentID: res.parentID,
          mediaIP: res.mediaIP,
          mediaPort: res.mediaPort
        }
        console.log(_this1.videoplayData)
      }).catch(err => {
        console.warn(LOG_TAG + 'getDeviceByCameraData failed')
        console.log(err)
      })
    },
    // 加载屏保
    loadDeviceImage: function (index) {
      if (this.signPostGroup.length) {
        for (var i = 0; i < this.signPostGroup[index].ImgId.length; i++) {
          this.showImageList[i] = {}
          this.showImageList[i].imgId = this.signPostGroup[index].ImgId[i]
        }
        for (var j = 0; j < this.showImageList.length; j++) {
          getDeviceScreenImage({ imgId: this.showImageList[j].imgId, terminalID: this.GLOBAL.terminalID }).then(res => {
            console.log(LOG_TAG + '加载图片终端ID' + this.GLOBAL.terminalID)
            console.log(LOG_TAG, res)
          }).catch(err => {
            console.warn(LOG_TAG + '/screenProtect/queryDeviceScreenImage failed')
            console.warn(err)
          })
        }
      }
    },
    // 关闭指路牌弹窗
    signClose: function () {
      // store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
      store.commit('sendMessage', {
        windowName: 'device_info',
        shown: false
      })
    },
    // 返回上一层
    signBack: function () {
      this.signShow = !this.signShow
    },
    // 设定屏幕
    getScreen: function () {
      this.signBack()
      if (!this.isLoad) {
        this.showImageList = []
      }
      this.isLoad = false
      this.loadDeviceImage(this.active)
    },
    // 指路牌分组切换
    toggleGroup: function (index) {
      if (this.active === index) {
        return
      }
      this.active = index
      this.showImageList = []
      this.loadDeviceImage(index)
    },
    // 更新屏保
    updateScreen: function (index) {
      this.signBack()
      // 更新屏幕图片
      updateDeviceScreen({ addrId: this.deviceMsg.info.addrid, groupId: this.signPostGroup[this.active].group, terminalID: this.GLOBAL.terminalID }).then(res => {
        console.log(LOG_TAG + '设置屏幕传入终端ID' + this.GLOBAL.terminalID)
        console.log(LOG_TAG, res)
      }).catch(err => {
        console.warn(LOG_TAG + '/screenProtect/updateDeviceScreenSet failed')
        console.warn(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
