<template>
  <div class="item-box" :class="{'item-warning': robotStatus === false}">
    <div class="clear-confirm-box" v-show="robotStatus&&confirmDisabled">
      <iframe frameborder="0 " class="iframe-box "></iframe>
      <div data-v-c4dd6c2c="" class="bg "></div>
      <div class="con ">
        <p class="title ">确定要召回机器人吗？</p>
        <div class="btn-box ">
          <button type="button " class="btn cancel" @click="onCancelConfirm">取 消</button>
          <button type="button " class="btn confirm" @click="onRobotRecall">召 回</button>
        </div>
      </div>
    </div>
    <a class="close" href="javascript:;" @click="closeDeviceBox">╳</a>
    <div class="hd">设备信息</div>
    <div class="detail-info-box robot-box">
      <div class="left-box">
        <div class="view">
          <div v-if="robotStatus" style="width:100%;height:100%"><single-screen :videoplayData="videoplayData"></single-screen></div>
          <single-screen :videoplayData="videoplayData" :ocxbgColor="2" v-else></single-screen>
          <!--文字弹层提示-->
          <p class="note indexs">为了保护收件人隐私<br>暂不支持查看当前画面</p>
        </div>
        <div class="btn-box">
          <div class="oper-box">
            <button v-for="(key, index) in lists" :key="key.index" class="oper" type="button" :class="{'active' : buttonIndex === index, 'disabled' : buttonDisabled }" @click="onButtonSelected(index)" :disabled="buttonDisabled">{{key.location}}</button>
          </div>
          <button type="button" class="btn cancel" v-show="robotStatus&&workStatus" @click="onConfirmDisabled" :class="{'disabled' : recallDisabled }" :disabled="recallDisabled">召 回</button>
          <button type="button" class="btn cancel" v-show="!robotStatus&&eventType === '99'" @click="callSecurity" :class="{'disabled' : SecurityDisabled }" :disabled="SecurityDisabled">派遣保安</button>
          <!-- <button type="button" class="btn blue" v-show="!robotStatus&&eventType === '3'" @click="disMissWarnings" :class="{'disabled' : solveDisabled }" :disabled="solveDisabled">故障解除</button> -->
        </div>
      </div>
      <!-- 正常状态——工作中 -->
      <ul class="right-box" v-show="robotStatus&&workStatus">
        <li>{{robotInfo.robot}}</li>
        <li>
          <span class="name">电&nbsp;量：</span>{{robotInfo.battery}}</li>
        <li>
          <span class="name">当前状态：</span>{{robotInfo.status}}</li>
        <li>
          <span class="name">待处理任务：</span>{{robotInfo.taskCount}}</li>
        <li class="task">
          <p>
            <span class="name">当前任务：</span>
          </p>
          <p class="name">{{robotInfo.currentBoxDest + '&nbsp;预计' + robotInfo.deliveryTime + '到达'}}</p>
        </li>
      </ul>
      <!-- 正常状态——召回中 -->
      <ul class="right-box" v-show="robotStatus&&!workStatus">
        <li>{{robotInfo.robot}}</li>
        <li>
          <span class="name">电&nbsp;量：</span>{{robotInfo.battery}}</li>
        <li>
          <span class="name">编&nbsp;码：</span>{{robotInfo.robot}}</li>
        <li>
          <span class="name">待处理任务：</span>{{robotInfo.taskCount}}</li>
        <li>
          <span class="name">厂&nbsp;商：</span>真机智能</li>
        <li >
          <span class="name">当前状态：</span>{{robotInfo.status}}</li>
      </ul>
      <!-- 异常状态— -->
      <ul class="right-box" v-show="!robotStatus">
        <li>{{robotErrInfo.deviceId}}</li>
        <li>
          <span class="name">位&nbsp;置：</span>{{robotErrInfo.location}}</li>
        <li>
          <span class="name">设备状态：</span>{{robotErrInfo.status}}</li>
        <li class="task2" v-show="eventType === '99'">
          <span class="name">故障原因：</span>
          <p class="name">{{robotErrInfo.alarmInfo}}</p>
        </li>
        <li v-show="eventType === '3' || eventType === '1'" :class="{'task': eventType === '3', 'task2': eventType === '1'}">
          <span class="name">处理状态：</span>{{eventStatusSelect}}</li>
        <li v-show="eventType === '3'">
          <span class="name">处理结果：</span>{{'已处理'}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { forceRecall, getRobotErrEvent, getSecurityDistanceList, patrolSecuritys, disMissWarning } from '@/pages/main/api/robot.js'
import controller from '../../controller'
import { getRobotCamera } from '@/pages/main/api/robot'
// import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import closeDeviceCard from '@/pages/main/device-info/mixin/close-device-card'
export default {
  mixins: [closeDeviceCard],
  props: {
    deviceMsg: {
      require: true
    }
  },
  name: 'robot',
  data () {
    return {
      lists: [
        { location: '前' },
        { location: '后' },
        { location: '左' },
        { location: '右' }
      ],
      // 初始化视频数据
      videoplayData: {
        deviceID: '1',
        parentID: '2',
        mediaIP: '192.168.0.109',
        mediaPort: 10000
      },
      // 默认被选中前后左右下标
      buttonIndex: 0,
      // 前后左右按钮禁用
      buttonDisabled: false,
      // 召回按钮禁用
      recallDisabled: false,
      // 召回二次弹窗
      confirmDisabled: false,
      // 派遣保安按钮禁用
      SecurityDisabled: false,
      // 故障解决按钮禁用
      solveDisabled: false,
      // 机器人自带摄像头
      robotCamera: [],
      // 正常机器人信息
      robotInfo: {},
      // 异常机器人信息
      robotErrEvent: {},
      robotErrInfo: {},
      // 机器人自身信息(E00正常 E01 E02偏离路线 E03超时报警 E04低电量报警 E05)   非E02、E03、E04都显示正常页面
      robotStatus: true,
      // 机器人正常状态中工作状态(派送、空闲、召回中)
      workStatus: true,
      // 机器人异常信息(99 / 3 / 1)
      eventType: '',
      // 机器人异常发送给后台事件类型
      robotRrrEventTypeId: '',

    }
  },
  computed: {
    eventStatusSelect: function () {
      var message = this.eventType === '99' ? '未处理' : this.eventType === '1' ? '处理中' : '已处理'
      return message
    }
  },
  watch: {
    // 弹窗初次加载
    deviceMsg: {
      handler: function (newVal, oldVal) {
        this.reset()
        console.log('watch-deviceMsg', newVal, oldVal)
        this.robotInit(newVal)
      },
      deep: true
    },
    // websocket 中途变更弹窗
    robotInfo: function (newVal, oldVal) {
      // E00正常状态 E01定位出错 E02偏离航线 E03停止超时报警 警报E04低电量警报
      this.robotStatus = true
      this.workStatus = this.robotInfo.status === '派送中'
    },
    // websocket 中途变更弹窗
    robotErrEvent: function (newVal, oldVal) {
      console.log('robotErrEvent', newVal, oldVal)
      this.robotStatus = false
      this.robotErrInfo = typeof (this.robotErrEvent.eventBody) === 'object' ? this.robotErrEvent.eventBody : JSON.parse(this.robotErrEvent.eventBody)
      console.log('deviceId', this.robotErrInfo)
      // E00正常状态 E01定位出错 E02偏离航线 E03停止超时报警 E04低电量警报 E05  机器人断线报警
      this.eventType = this.robotErrEvent.eventHeader.eventStatus
      console.log('eventType', this.eventType)
    },
  },
  methods: {
    robotInit: function (params) {
      if (params.info.error === 'E00') {
        this.robotInfo = params.info
        this.robotStatus = true
        console.log('机器人组件接收正常信息', this.robotInfo)
      } else {
        this.robotStatus = false
        switch (params.info.error) {
          case 'E01':
            this.robotRrrEventTypeId = '93005'
            break
          case 'E02':
            this.robotRrrEventTypeId = '93004'
            break
          case 'E03':
            this.robotRrrEventTypeId = '93002'
            break
          case 'E04':
            this.robotRrrEventTypeId = '93003'
            break
          case 'E05':
            this.robotRrrEventTypeId = '93006'
            break
        }
        this.RobotErr()
      }
      this.getRobotCameraLists()
    },
    getRobotCameraLists: function () {
      getRobotCamera({ robot: this.deviceMsg.id })
        .then(res => {
          // 接收到是机器人自带摄像头前后左右可用，否则禁用但是保留前后左右按钮参数
          this.buttonDisabled = !res.self
          // robotCamera为机器人自身携带摄像头列表，无变动，防止初次加载机器人组件默认请求得到摄像头为电梯、大堂摄像头
          if (res.self) {
            this.robotCamera = res.cameraList
            this.buttonIndex = 0
          }
          // 随机打开一个摄像头
          if (res.cameraList !== null && res.cameraList.length !== 0) {
            this.videoplayData = {
              deviceID: res.cameraList[0].deviceCode,
              parentID: res.cameraList[0].parentCode,
              mediaIP: res.cameraList[0].mediaIp,
              mediaPort: res.cameraList[0].mediaPort
            }
          }
          console.log('初次打开机器人弹窗调用摄像头', this.videoplayData)
        })
        .catch(err => {
          console.log('robot查询摄像头err', err)
        })
    },
    // 查询机器人异常信息
    RobotErr: function () {
      getRobotErrEvent({ deviceId: this.deviceMsg.id, eventType: this.robotRrrEventTypeId })
        .then(res => {
          if (res.eventBody !== null && res.eventHeader !== null) {
            this.robotErrEvent = res
            console.log('robot查询异常信息', this.robotErrEvent)
          } else {
            console.log('robo查询异常信息  无数据')
          }
        })
        .catch(err => {
          console.log('robot查询异常信息失败' + err)
        })
    },
    // 派遣保安
    callSecurity: function () {
      getSecurityDistanceList({ longitude: this.robotErrEvent.eventHeader.eventGPS.lon, latitude: this.robotErrEvent.eventHeader.eventGPS.lat })
        .then(res => {
          console.log('保安查询成功', res)
          if (res !== null) {
            var param = {}
            param.eventId = this.robotErrEvent.eventHeader.eventId
            param.eventAddr = this.robotErrInfo.location
            param.eventType = this.robotRrrEventTypeId
            param.eventTypeDetail = this.robotErrInfo.alarmInfo
            patrolSecuritys({ userId: res[0].userId, eventData: [param] })
              .then(res => {
                console.log('保安派遣指令发送成功')
                this.SecurityDisabled = true
              })
          } else {
            console.log('保安查询成功，无保安数据')
          }
        })
    },
    // robotClose: function () {
    //   // store.commit(mutationTypes.SHOW_DEVICE_INFO, { shown: false })
    //   store.commit('sendMessage', {
    //     windowName: 'device_info',
    //     shown: false
    //   })
    // },
    onButtonSelected: function (index) {
      this.buttonIndex = index
      for (var tmp of this.robotCamera) {
        if (this.lists[index].location === tmp.desc) {
          this.videoplayData = {
            deviceID: tmp.deviceCode,
            parentID: tmp.parentCode,
            mediaIP: tmp.mediaIp,
            mediaPort: tmp.mediaPort
          }
        }
      }
      console.log(this.videoplayData)
    },
    onConfirmDisabled: function () {
      this.confirmDisabled = true
    },
    // 机器人召回确认页面  取消按钮
    onCancelConfirm: function () {
      this.confirmDisabled = false
    },
    // 机器人召回确认页面  确认按钮
    onRobotRecall: function () {
      forceRecall({ courtId: this.robotInfo.courtId, robot: this.robotInfo.robot })
        .then(res => {
          console.log('机器人召回指令已发送等待websocket变更状态')
          console.log(res)
          this.recallDisabled = true
          this.confirmDisabled = false
        })
    },
    disMissWarnings: function (params) {
      disMissWarning({ ids: [this.robotErrEvent.eventHeader.eventId] })
        .then(res => {
          this.solveDisabled = true
        })
    },
    reset: function () {
      console.log('11111')
      this.buttonIndex = null
      this.buttonDisabled = false
      this.SecurityDisabled = false
      this.solveDisabled = false
      this.recallDisabled = false
    }
  },
  mounted: function () {
    this.reset()
    console.log('robot mouted', this.deviceMsg)
    this.robotInit(this.deviceMsg)
    var _this = this
    controller.register({
      key: 'map-robot-infoList',
      points: [93010],
      callback: function (info, data) {
        var robotInfoList = JSON.parse(info)
        for (var tmp of robotInfoList) {
          if (tmp.robot === _this.deviceMsg.id) {
            if (tmp.error === 'E00') {
              _this.robotInfo = tmp
            } else {
              console.log('93002-93006开始工作')
            }
            console.log('机器人弹窗组件websocket接收详细信息', tmp)
          }
        }
      }
    })
    controller.register({
      key: 'map-robot-camera',
      points: [93011],
      callback: (info, data) => {
        console.log('机器人弹窗组件websocket接收摄像头信息', JSON.parse(info), data)
        if (data && data.deviceId === _this.deviceMsg.id) {
          var infos = JSON.parse(info)
          if (infos.cameraList.length !== 0) {
            // 改变后自动打开一个
            _this.videoplayData = {
              deviceID: infos.cameraList[0].deviceCode,
              parentID: infos.cameraList[0].parentCode,
              mediaIP: infos.cameraList[0].mediaIp,
              mediaPort: infos.cameraList[0].mediaPort
            }
            console.log('机器人摄像头变更', _this.videoplayData)
            // 接收到是机器人自带摄像头前后左右可用，否则禁用但是保留前后左右按钮参数
            _this.buttonDisabled = !infos.self
            // robotCamera为机器人自身携带摄像头列表，无变动，防止初次加载机器人组件默认请求得到摄像头为电梯、大堂摄像头
            if (infos.self) {
              _this.robotCamera = infos.cameraList
              _this.buttonIndex = 0
            } else {
              _this.buttonIndex = null
            }
          } else {
            console.log('无可用摄像头')
            // 重置前后按钮，清除效果
            _this.buttonDisabled = true
            _this.buttonIndex = null
          }
        }
      }
    })
    // 机器人异常事件监听
    controller.register({
      key: 'map-robot-lowBattery',
      range: [93002, 93006],
      callback: (info, data) => {
        if (data && data.deviceId === _this.deviceMsg.id) {
          _this.robotErrEvent = JSON.parse(info)
          console.log('机器人弹窗websocket接收异常事件', _this.robotErrEvent, data)
        }
      }
    })
  }
}
</script>
<style scoped>
.robot-box.detail-info-box .right-box > li.task2{height: 6.1rem;}
</style>
