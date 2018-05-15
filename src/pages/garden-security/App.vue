<template>
  <div class="left-wrap left1-wrap">
    <!-- 园区安防 star -->
    <div class="item-box community-security">
      <div class="hd">实时安防</div>

      <div class="bd">
        <div class="left-info">
          <canvas class="canvas" id="canvas" width="35" height="35">
            您的浏览器不支持canvas标签
          </canvas>
          <div class="score">
            <em>{{exponent}}</em>
            <p>安全指数</p>
          </div>
        </div>

        <div class="right-info">
          <div class="number-box">
            <div class="alarm">
              <em class="num">{{event}}</em>
              <p class="txt">事件报警</p>
            </div>
            <div class="fault">
              <em class="num">{{malfunction}}</em>
              <p class="txt">设备故障</p>
            </div>
          </div>

          <div :class="[ 'list-box', { 'right-in': 'rightIn'  === eventClassSelect  },{'right-out': 'rightOut' === eventClassSelect} ]" v-if="showModule === 'eventShow'">
            <h3>事件处理状态</h3>
            <ul class="list">
              <li v-for='(alias,index) in expression' :key='index'>
                <span :class="[ 'state',  { 'done': '已完成' === alias.eventStatus },{'doing': '处理中' === alias.eventStatus} ]">{{alias.eventStatus}}</span>
                <span class="time">{{alias.updateTime}}</span>
                <span class="con">{{alias.eventModel}}</span>
              </li>
            </ul>
          </div>

          <div :class="[ 'no-warning-list-box', { 'left-in': 'leftIn'  === notEventClassSelect  },{'left-out': 'leftOut' === notEventClassSelect} ]" v-if="showModule === 'noEventShow'">
            <h3>事件报警
              <small>Top3</small>
            </h3>
            <ul class="list">
              <li v-for='(item,index) in EventAlarmData' :key="index">
                <p class="name">{{item.eventModel}}</p>
                <div class="progress-bar">
                  <div class="percent-bar" :style="{width: item.rate}"></div>
                </div>
                <p class="percent">{{item.rate}}</p>
              </li>
            </ul>

            <h3>设备故障
              <small>Top3</small>
            </h3>
            <ul class="list">
              <li v-for='(item,index) in EquipmentFailureData' :key="index">
                <p class="name">{{item.eventModel}}</p>
                <div class="progress-bar">
                  <div class="percent-bar" :style="{width: item.rate}"></div>
                </div>
                <p class="percent">{{item.rate}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 园区安防 end -->

  </div>
</template>

<script>
import {
  getCommunitySecurityData
} from './apis/index'
import { loadWebsocket } from '@/websocket/index'
import md5 from 'js-md5'
export default {
  name: 'app',
  data () {
    return {
      exponent: '', // 安全指数
      malfunction: '', // 设备故障
      event: '', // 事件报警
      expression: '', // 事件处理状态
      EventAlarmData: '', // 事件报警TOP3
      EquipmentFailureData: '', // 设备故障TOP3
      showModule: '1', // 显示/隐藏 top3
      eventClassSelect: 'rightIn',
      notEventClassSelect: 'leftIn',
      alarmListJsonStr: ''
    }
  },
  mounted () {
    this.init()
    this.getSecurityData()
    loadWebsocket(
      this.onWebsocketMessageReceived, 'egscuigardensecurity'
    )
  },
  methods: {
    // websocket 数据获取
    onWebsocketMessageReceived (data) {
      try {
        let arrData = JSON.parse(data).data.info
        let _arrData = JSON.parse(arrData).eventBody
        // 获取安全指数
        this.exponent = Math.floor(_arrData.securityData)
        // 获取事件报警
        this.event = _arrData.alarmCount
        // 获取设备故障
        this.malfunction = _arrData.deviceOfflineCount
        // this.event > 0 或 this.malfunction > 0 ==> 显示事件处理状态  否则显示Top3
        if (this.event > 0 || this.malfunction > 0) {
          // 增加判定， 如果推送数据JSONstringfy 后与上次数据并未发生更改， 则不做动画处理
          // console.log(this.alarmListJsonStr === md5(JSON.stringify(_arrData.alarmList)))
          if (this.alarmListJsonStr === md5(JSON.stringify(_arrData.alarmList))) {
            return false
          }
          this.alarmListJsonStr = md5(JSON.stringify(_arrData.alarmList))
          this.eventClassSelect = 'rightOut'
          let that = this
          setTimeout(function () {
            that.showModule = 'eventShow'
            that.eventClassSelect = 'rightIn'
          }, 900)
          // 事件处理状态
          this.styleChange(_arrData.alarmList)
          this.expression = _arrData.alarmList
        } else {
          this.notEventClassSelect = 'leftOut'
          let that = this
          setTimeout(function () {
            that.showModule = 'noEventShow'
            that.notEventClassSelect = 'leftIn'
          }, 900)
          // 事件报警 - Top3
          this.EventAlarmData = _arrData.alarmTop3
          // 设备故障 - Top3
          this.EquipmentFailureData = _arrData.deviceOfflineTop3
        }
        // }
      } catch (e) {
        console.warn(e)
      }
    },
    // 获取axios
    getSecurityData () {
      getCommunitySecurityData().then(res => {
        // 获取安全指数
        this.exponent = Math.floor(res.securityData)
        // 获取事件报警和设备故障
        this.event = res.alarmCount
        this.malfunction = res.deviceOfflineCount
        if (this.event > 0 || this.malfunction > 0) {
          this.eventClassSelect = 'rightOut'
          let that = this
          setTimeout(function () {
            that.eventClassSelect = 'rightIn'
            that.showModule = 'eventShow'
            // 事件处理状态
            that.alarmListJsonStr = md5(JSON.stringify(res.alarmList))
            that.styleChange(res.alarmList)
            that.expression = res.alarmList
          }, 900)
        }
        if (this.malfunction === 0 && this.event === 0) {
          this.notEventClassSelect = 'leftOut'
          let that = this
          setTimeout(function () {
            that.showModule = 'noEventShow'
            that.notEventClassSelect = 'leftIn'
            // 事件报警 - Top3
            that.EventAlarmData = res.alarmTop3
            // 设备故障 - Top3
            that.EquipmentFailureData = res.deviceOfflineTop3
          }, 900)
        }
      }).catch(err => {
        console.warn(err)
      })
    },
    // 样式转化代码封装
    styleChange (transfer) {
      for (let i = 0; i < transfer.length; i++) {
        if (transfer[i].eventStatus === '99') {
          transfer[i].eventStatus = '未处理'
        }
        if (transfer[i].eventStatus === '1') {
          transfer[i].eventStatus = '处理中'
        }
        if (transfer[i].eventStatus === '3') {
          transfer[i].eventStatus = '已完成'
        }
        transfer[i].updateTime = this.timeFormat(transfer[i].updateTime)
      }
    },
    // 判断是否补0
    add0 (m) {
      return m < 10 ? '0' + m : m
    },
    // 时间转化
    timeFormat (timestamp) {
      // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp)
      var hours = time.getHours()
      var minutes = time.getMinutes()
      var seconds = time.getSeconds()
      return this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds)
    },
    // 安全指数动画背景
    init () {
      let canvas = document.getElementById('canvas')
      let cxt = canvas.getContext('2d')
      let width = canvas.width
      let height = canvas.height
      let rem = 20
      let radius = [17.5, 13, 9]

      let sw = screen.width
      if (sw > 1920) {
        rem *= sw / 1920
      }

      width = width * rem + 20
      height = height * rem + 20

      if (window.devicePixelRatio) {
        canvas.style.width = width + 'px'
        canvas.style.height = height + 'px'
        canvas.height = height * window.devicePixelRatio
        canvas.width = width * window.devicePixelRatio
        cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
      }

      // 轨道
      function drawTrack () {
        let colors = ['#12083a', '#140b40', '#150d46']
        for (let i = 0; i < 3; i++) {
          cxt.beginPath()
          cxt.arc(width / 2, height / 2, radius[i] * rem, 0, Math.PI * 360, false)
          cxt.closePath()
          // 设置笔触的颜色
          cxt.strokeStyle = '#1e3b73'
          cxt.fillStyle = colors[i]
          cxt.fill()
          cxt.lineWidth = i + 2
          cxt.stroke()
        }
      }
      drawTrack()

      // 星球--画出星球需要哪些属性
      function Star (x, y, radius, cycle, sColor, eColor, startAngle) {
        this.x = x // 星球的坐标点
        this.y = y
        this.radius = radius // 星球的半径
        this.cycle = cycle // 公转周期
        this.sColor = sColor // 星球的颜色(开始色,结束色)
        this.eColor = eColor
        this.color = null // 新建一个渐变颜色空对象
        if (startAngle) { // 初始角度
          this.startAngle = startAngle
        } else {
          this.startAngle = 0
        }

        this.time = 0 // 设置一个计时器

        this.draw = function () {
          cxt.save() // 保存之前的画布内容
          cxt.translate(width / 2, height / 2) // 重置0,0坐标点（圆心）

          if (this.startAngle < 0) {
            cxt.rotate(-(this.time * (360 / this.cycle) * Math.PI / 180) + this.startAngle)
          } else {
            cxt.rotate(this.time * (360 / this.cycle) * Math.PI / 180 + this.startAngle)
          }
          cxt.beginPath()// 画星球
          cxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
          cxt.closePath()

          this.color = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
          this.color.addColorStop(0, this.sColor) // 渐变开始点和颜色
          this.color.addColorStop(1, this.eColor) // 渐变结束点和颜色
          cxt.fillStyle = this.color // 将渐变对象复制给填充画笔
          cxt.fill()
          cxt.restore() // 恢复之前保存的画布内容
          this.time += 1 // 执行完毕之后时间增加
        }
      }
      // 点     名         公转周期       光色     暗色
      // 1  Saturn      10759.5 天   #F7F9E3  #5C4533
      // 创建一个太阳对象的构造函数
      function Globe01 () {
        Star.call(this, 0, -radius[2] * rem, 9, 100, '#0661b2', '#1e3b73', 1.5)
      }
      function Globe02 () {
        Star.call(this, 0, -radius[2] * rem, 9, 100, '#0661b2', '#1e3b73', 3.6)
      }
      function Globe03 () {
        Star.call(this, 0, -radius[2] * rem, 9, 100, '#0661b2', '#1e3b73', 6)
      }

      function Globe04 () {
        Star.call(this, 0, -radius[1] * rem, 11, 200, '#0661b2', '#1e3b73', -1.5)
      }
      function Globe05 () {
        Star.call(this, 0, -radius[1] * rem, 11, 200, '#0661b2', '#1e3b73', -3.6)
      }
      function Globe06 () {
        Star.call(this, 0, -radius[1] * rem, 11, 200, '#0661b2', '#1e3b73', -6)
      }

      function Globe07 () {
        Star.call(this, 0, -radius[0] * rem, 10, 300, '#0661b2', '#1e3b73', 1.2)
      }

      function Globe08 () {
        Star.call(this, 0, -radius[0] * rem, 10, 300, '#0661b2', '#1e3b73', 3.5)
      }

      function Globe09 () {
        Star.call(this, 0, -radius[0] * rem, 10, 300, '#0661b2', '#1e3b73', 5.5)
      }
      // 创建太阳对象实例
      let globe1 = new Globe01()
      let globe2 = new Globe02()
      let globe3 = new Globe03()
      let globe4 = new Globe04()
      let globe5 = new Globe05()
      let globe6 = new Globe06()
      let globe7 = new Globe07()
      let globe8 = new Globe08()
      let globe9 = new Globe09()

      function move () {
        cxt.clearRect(0, 0, width, height) // 清除画布
        drawTrack() // 画出轨道

        globe1.draw() // 调用-画出每个星球
        globe2.draw()
        globe3.draw()
        globe4.draw()
        globe5.draw()
        globe6.draw()
        globe7.draw()
        globe8.draw()
        globe9.draw()
      }
      // 使个星球进行运动
      setInterval(move, 100)
    }
  }
}
</script>

<style scoped>
/*-- 园区安防 star --*/
.community-security .bd {
  display: flex;
  padding: 7.6rem 5rem 0 2.6rem;
}

.community-security .left-info {
  position: relative;
  width: 36rem;
  height: 36rem;
  padding-top: 12.5rem;
  text-align: center;
  font-size: 2.5rem;
  line-height: 2;
}

.community-security .left-info .canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.community-security .left-info .score {
  position: relative;
  z-index: 3;
}

.community-security .left-info em {
  display: block;
  font-size: 7rem;
  height: 7rem;
  line-height: 1;
}

.community-security .right-info {
  flex: 1;
  padding-top: 1rem;
  margin-left: 8.5rem;
  overflow: hidden;
}

.community-security .number-box {
  position: relative;
  height: 11rem;
  margin-bottom: 3.5rem; /*----- 2.5rem -------*/
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #110e34;
}

.community-security .number-box:before {
  content: "";
  display: block;
  position: absolute;
  top: 2rem;
  left: 50%;
  width: 0.1rem;
  height: 7rem;
  background-color: #073677;
}

.community-security .number-box > div {
  width: 50%;
}

.community-security .number-box .num {
  display: block;
  font-size: 4rem;
  height: 4rem;
  line-height: 1;
}

.community-security .number-box .txt {
  font-size: 2rem;
  font-weight: 300;
}

.community-security h3 {
  margin-bottom: 1.75rem;
  font-size: 1.92rem;
  line-height: 1;
  padding-left: 1.5rem;
  font-weight: 500;
}

.community-security .list-box .list {
  font-size: 2rem;
  line-height: 4rem;
}

.community-security .list-box li {
  display: flex;
  background-color: #110e34;
}

.community-security .list-box li:nth-child(2n) {
  background-color: transparent;
}

.community-security .list-box .state {
  position: relative;
  width: 9.25rem;
  padding-left: 4.75rem;
}

.community-security .list-box .state:before {
  content: "";
  display: block;
  position: absolute;
  top: 1.6rem;
  left: 1.8rem;
  width: 0.5rem;
  height: 0.5rem;
  border: 0.2rem solid #a7246c;
  border-radius: 50%;
}

.community-security .list-box .not-done:before {
  border-color: #a7246c;
}

.community-security .list-box .doing:before {
  border-color: #2471f6;
}

.community-security .list-box .done:before {
  border-color: #52b38e;
}

.community-security .list-box .time {
  width: 10.25rem;
}

.community-security .no-warning-list-box small {
  margin-left: 1.25rem;
  font-size: 1.2rem;
  font-weight: 300;
  color: #9d9aa8;
}

.community-security .no-warning-list-box .list + h3 {
  margin-top: 2rem;
}

.community-security .no-warning-list-box li {
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding-left: 1.5rem;
}

.community-security .no-warning-list-box li:last-child {
  margin-bottom: 0;
}

.community-security .no-warning-list-box .name {
  flex: 0 0 5rem;
}

.community-security .no-warning-list-box .progress-bar {
  height: 0.6rem;
  flex: 1;
  border-radius: 0.3rem;
  background-color: #0e0446;
}
.community-security .no-warning-list-box .percent-bar {
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: #4aaff8;
  background: linear-gradient(to right, #1c3c83 0%, #4aaff8 100%);
}

.community-security .no-warning-list-box .percent {
  flex: 0 0 3.2rem;
  text-align: right;
}

.community-security .right-info h3,
.community-security .right-info li {
  position: relative;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.community-security .right-in h3,
.community-security .right-in li {
  animation-name: right-in;
  left: 100%;
}

.community-security .right-out h3,
.community-security .right-out li {
  animation-name: right-out;
}

.community-security .right-in li:first-child {
  animation-delay: 0.1s;
}

.community-security .right-in li:nth-child(2) {
  animation-delay: 0.2s;
}

.community-security .right-in li:nth-child(3) {
  animation-delay: 0.3s;
}

.community-security .right-in li:nth-child(4) {
  animation-delay: 0.4s;
}

.community-security .right-out h3 {
  animation-delay: 0.4s;
}

.community-security .right-out li:first-child {
  animation-delay: 0.3s;
}

.community-security .right-out li:nth-child(2) {
  animation-delay: 0.2s;
}

.community-security .right-out li:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes right-in {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}

@keyframes right-out {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}

.community-security .left-in h3,
.community-security .left-in li {
  animation-name: left-in;
  right: 100%;
}

.community-security .left-out h3,
.community-security .left-out li {
  animation-name: left-out;
}

.community-security .fade-left-in li {
  animation-name: fade-left-in;
}

.community-security .fade-left-out li {
  animation-name: fade-left-out;
}

.community-security .left-in li:first-child {
  animation-delay: 0.1s;
}

.community-security .left-in li:nth-child(2) {
  animation-delay: 0.2s;
}

.community-security .left-in li:nth-child(3) {
  animation-delay: 0.3s;
}

.community-security .left-out li:first-child {
  animation-delay: 0.2s;
}

.community-security .left-out li:nth-child(2) {
  animation-delay: 0.1s;
}

.community-security .left-out h3 {
  animation-delay: 0.3s;
}

.community-security .list-box li.fade-right-in {
  animation-name: fade-right-in;
}

.community-security .right-info .fade-right-out {
  animation-name: fade-right-out;
}

@keyframes left-in {
  from {
    right: 100%;
  }
  to {
    right: 0;
  }
}

@keyframes left-out {
  from {
    right: 0;
  }
  to {
    right: 100%;
  }
}

@keyframes fade-right-in {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}

@keyframes fade-right-out {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}
/*-- 园区安防 end --*/
</style>
