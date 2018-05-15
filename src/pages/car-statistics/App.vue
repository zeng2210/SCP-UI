<template>
  <div class="left-wrap left3-wrap">
    <!-- 车辆统计 star -->
    <div class="item-box car-statistics">
      <div class="hd">车辆统计</div>
      <div class="bd">
        <div class="parking-box mb0">
          <p class="sub-title sub-title1">实时车位情况</p>
          <p class="sub-title sub-title2">实时在园车辆</p>
        </div>
        <div class="parking-box">
          <div class="parking">
            <canvas class="parking-rate" id="parking-rate" width="366" height="366"></canvas>
            <div class="parking-info">
              <p class="num">{{surplusNums}}
                <span class="slash">&frasl;</span>{{totalNums}}</p>
              <p class="note">剩余车位
                <span class="slash">&frasl;</span>全部车位</p>
            </div>
          </div>
          <div class="other">
            <div class="parking-item icon-parking-month">
              <p class="num">{{monthParkseat}}</p>
              <p class="note">月保车辆</p>
            </div>
            <div class="parking-item icon-parking-temporary">
              <p class="num">{{tempParkseat}}</p>
              <p class="note">临时车辆</p>
            </div>
          </div>
        </div>
        <div class="title">
          <p>24小时出入车次</p>
          <p>
            <span class="in">
              <i>进</i>{{inNums}}</span>
            <span class="out">
              <i>出</i>{{outNums}}</span>
          </p>
        </div>
        <div class="chartCount" id='chart'></div>
      </div>
    </div>
    <!-- 车辆统计 end -->
  </div>
</template>

<script>

import echarts from 'echarts'
import { queryAllParkseatsCounts } from './apis/index'
import { loadWebsocket } from '@/websocket/index'
export default {
  name: 'app',
  data () {
    return {
      surplusNums: 0, // 剩余车位
      totalNums: 0, // 全部车位
      monthParkseat: 0, // 月保车辆
      tempParkseat: 0, // 临时车辆
      inNums: 0, // 今日出入车次统计
      outNums: 0, // 今日出入车次统计
      inArray: [], // 进场车辆数数组
      outArray: [], // 出场车场数数组
      curHour: 0, // 当前小时数
      xHours: [] // 报表x周动态时间
    }
  },
  mounted () {
    // this.draw('parking-rate', 10, '#2d2260')
    this.queryAllParkseatsCounts()
    loadWebsocket(
      this.onWebsocketMessageReceived, 'egscuicarstatistics'
    )
    // 获取下一个2小时整点
    this.getNextTwoHours()
    // 动态获取x轴数组
    this.getXaxisHours()
    // 生成报表
    setTimeout(() => {
      this.initEchart()
    }, 1000)
  },
  methods: {
    getNextTwoHours () {
      // var date = new Date() // 现在时刻
      var dateIntegralPoint = new Date() // 用户登录时刻的下一个整点
      if (dateIntegralPoint.getHours() % 2 === 0) {
        dateIntegralPoint.setHours(new Date().getHours() + 2) // 小时数增加2
      } else {
        dateIntegralPoint.setHours(new Date().getHours() + 1) // 小时数增加1
      }
      dateIntegralPoint.setMinutes(0)
      dateIntegralPoint.setSeconds(0)
      dateIntegralPoint.setMilliseconds(0)
      let waite = dateIntegralPoint - new Date()
      setTimeout(() => {
        this.nextIntegralPointAfterLogin()
        setTimeout(() => {
          this.getXaxisHours()
          this.initEchart()
        }, 500)
      }, waite) // 用户登录后的下一个整点执行。
    },
    // 2小时刷新定时器
    nextIntegralPointAfterLogin () {
      setInterval(() => {
        this.getXaxisHours()
        this.initEchart()
      }, 60 * 60 * 1000 * 2) // 2小时执行一次
    },
    getXaxisHours () {
      // let dd = new Date()
      this.xHours = []
      let hour = new Date().getHours()
      if (hour % 2 === 0) {
        this.curHour = hour
      } else {
        this.curHour = hour - 1
      }
      let temp2 = this.curHour
      this.xHours.push(this.curHour)
      for (let i = 0; i < 13 && temp2 < 24; i++) {
        temp2 += 2
        if (temp2 === 24) {
          this.xHours.push(0)
        } else {
          this.xHours.push(temp2)
        }
      }
      let temp1 = 0
      for (let i = 0; i < 13 && temp1 < this.curHour; i++) {
        temp1 += 2
        this.xHours.push(temp1)
      }
      console.log(this.xHours)
      this.queryAllParkseatsCounts()
    },
    onWebsocketMessageReceived (data) {
      try {
        let subData = JSON.parse(data).data
        console.log(subData)
        let type = subData.type
        console.log(type)
        if (type === '00015') {
          // 人员统计
          console.log(subData.info)
          // let info = JSON.stringify(subData.info)
          let info = this.eval(subData.info)
          if (info !== undefined) {
            console.log(info)
            this.initData(info)
            this.fillData()
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
    // 代替eval的方法
    eval (fn) {
      var Fn = Function
      return new Fn('return ' + fn)()
    },
    /* 渲染百分比 */
    draw (id, percent, color) {
      if (percent < 0 || percent > 100) {
        return
      }

      let canvas = document.getElementById(id)
      let cxt = canvas.getContext('2d')
      let cWidth = canvas.width
      let cHeight = canvas.height
      let coverColor = color
      let PI = Math.PI
      let per = percent
      let radius = cWidth / 2

      // if (window.devicePixelRatio) {
      //   canvas.style.width = cWidth + 'px'
      //   canvas.style.height = cHeight + 'px'
      //   canvas.height = cHeight * window.devicePixelRatio
      //   canvas.width = cWidth * window.devicePixelRatio
      //   cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
      // }

      let step = PI * 2 / 100 // 一个1%对应的弧度大小
      cxt.clearRect(0, 0, cWidth, cHeight)
      let endRadian = (per - 25) * step
      let endRadian1 = 100 * step
      let startRadian = -25 * step

      drawCanvas(radius, radius, radius - 10, 0, endRadian1, '#301f65', 18)
      // 画蓝色圆弧
      drawCanvas(radius, radius, radius - 10, startRadian, endRadian, coverColor, 18)

      // 数字
      cxt.fillStyle = '#fff'
      cxt.font = '80px Microsoft YaHei'
      let textWidth1 = cxt.measureText(per + '%').width
      cxt.fillText(per + '%', radius - textWidth1 / 2, radius)

      cxt.font = '42px Microsoft YaHei'
      let textWidth2 = cxt.measureText('车位使用率').width
      cxt.fillText('车位使用率', radius - textWidth2 / 2, radius + 70)

      function drawCanvas (x, y, r, sRadian, eRadian, color, lineWidth) {
        cxt.beginPath()
        cxt.lineCap = 'round'
        cxt.strokeStyle = color
        cxt.lineWidth = lineWidth
        cxt.arc(x, y, r, sRadian, eRadian, false)
        cxt.stroke()
      }
    },
    // 车位统计查询所有数据（不包括固定车位）
    queryAllParkseatsCounts () {
      let _this = this
      queryAllParkseatsCounts().then(
        function (res) {
          let array = res.array
          console.log('车位统计查询:' + res)
          for (var k = 0; k < array.length; k++) {
            console.log('小时:' + array[k].statHour + ',进:' + array[k].inParkNum + ',出:' + array[k].outParkNum)
          }
          _this.initData(res)
          _this.fillData()
          // }
        }
      )
    },
    // 给所有数据赋值
    initData (data) {
      this.totalNums = data.totalCarport
      this.surplusNums = data.idleTotalCarport
      this.monthParkseat = data.monthCar
      this.tempParkseat = data.tempCar
      this.inNums = data.inParkNum
      this.outNums = data.outParkNum
      let array = data.array
      if (array !== undefined) {
        for (var i = 0; i < data.array.length; i++) {
          // this.xHours[i] = data.array[i].statHour
          this.inArray[i] = data.array[i].inParkNum
          this.outArray[i] = data.array[i].outParkNum
        }
      }
    },
    // 利用数据填充页面
    fillData () {
      if (this.totalNums > 0) {
        this.draw('parking-rate', parseInt((this.totalNums - this.surplusNums) / this.totalNums * 100), '#009bfc')
      }
      // 如果车流量有数据则描绘曲线图
      if (this.xHours.length > 0) {
        this.initEchart()
      }
    },
    // 画车次统计曲线图
    initEchart: function () {
      var per = screen.width / 1920
      var option = {
        tooltip: {
          trigger: 'axis'
          // formatter: '{c}'
        },
        // color: ['#5E90FF'],
        grid: {
          left: '20' * per * 2.8,
          top: '10%',
          right: '15',
          bottom: '10%'
        },
        xAxis: {
          // show: false,
          type: 'category',
          boundaryGap: false,
          data: this.xHours,
          axisLabel: {
            fontSize: '20' * per,
            color: '#858096',
            fontFamily: 'Microsoft YaHei',
            margin: 10
          },
          axisPointer: {
            snap: true,
            lineStyle: {
              color: '#004E52',
              opacity: 0,
              width: 0
            },
            handle: {
              show: false
            }
          }
          // splitLine: {
          //   show: false
          // },
          // 是否显示坐标轴轴线
          // axisLine: {
          //   show: true
          // },
          // 是否显示刻度标签
          // axisLabel: {
          //   show: true
          // },
          // show: true
        },
        yAxis: {
          type: 'value',
          // axisTick: {alignWithLabel: true},
          axisTick: false,
          axisLabel: {
            fontSize: '20' * per,
            color: '#858096',
            fontFamily: 'Microsoft YaHei',
            align: 'left',
            margin: '20' * per * 2.8
          },
          minInterval: 1, // 保证显示整数
          splitLine: { show: false }, //  网格线
          data: ['0', '100', '200', '300']
        },
        series: [
          {
            name: '进',
            smooth: true,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#975ef0',
                areaStyle: {
                  // 区域图，纵向渐变填充
                  color: '#27144C'
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#27144C'
                }, {
                  offset: 1,
                  color: '#1D1955'
                }])
              }
            },
            data: this.inArray
          },
          {
            name: '出',
            smooth: true,
            type: 'line',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#00b0ff',
                areaStyle: {
                  // 区域图，纵向渐变填充
                  color: '#083965'
                }
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#083965'
                }, {
                  offset: 1,
                  color: '#1D1955'
                }])
              }
            },
            data: this.outArray
          }
        ]
      }
      echarts.init(document.getElementById('chart')).setOption(option)
    }
  }
}
</script>

<style scoped>
/*-- 车辆统计 star --*/
.car-statistics .bd {
  padding: 5rem 5.5rem 0 3.5rem;
}

.car-statistics .sub-title {
  font-size: 2.0rem;
  line-height: 1;
  /* color: rgba(255, 255, 255, .8); */
}

.car-statistics .sub-title2 {
  width: 28rem;
}

.car-statistics .title {
  display: flex;
  justify-content: space-between;
  font-size: 2.0rem;
  line-height: 1;
  /* color: rgba(255, 255, 255, .8); */
}

.car-statistics .title p:first-child {
  color: #ceccd5;
}

.car-statistics .title span {
  position: relative;
  color: #fff;
  padding-left: 2.4rem;
  font-size: 1.9rem;
}

.car-statistics .title span + span {
  margin-left: 2.75rem;
}

.car-statistics .title span:before {
  content: "";
  display: block;
  position: absolute;
  top: 0.9rem;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
}

.car-statistics .chartCount {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5rem;
  font-weight: 300;
  height: 14rem;
  margin-top: 1rem;
}

.car-statistics .title .in:before {
  border: 0.15rem solid #975ef0;
}

.car-statistics .title .out:before {
  border: 0.15rem solid #00b0ff;
}

.car-statistics .title i {
  margin-right: 0.4rem;
}

.car-statistics .parking-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.car-statistics .parking-box.mb0 {
  margin-bottom: 1.4rem;
}

.car-statistics .parking-box .parking {
  display: flex;
  align-items: center;
}

.car-statistics .parking-info {
  margin-left: 3.3rem;
}

.car-statistics .parking-info .num {
  font-size: 3rem;
}

.car-statistics .parking-info .slash {
  display: inline-block;
  margin: 0 0.6rem;
}

.car-statistics .parking-info .note {
  font-size: 2rem;
}

.car-statistics .parking-item .num {
  font-size: 3rem;
}

.car-statistics .parking-item .note {
  color: #fff;
  font-size: 2rem;
}

.car-statistics .parking-box .parking-item + .parking-item {
  margin-top: 1.5rem;
}

.car-statistics .parking-box .icon-parking-month,
.car-statistics .parking-box .icon-parking-temporary {
  position: relative;
  padding-left: 9.5rem;
  color: #0098ff;
  font-weight: lighter;
}

.car-statistics .parking-box .icon-parking-month:before,
.car-statistics .parking-box .icon-parking-temporary:before {
  content: "\e67a";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 7.5rem;
  line-height: 1;
  font-weight: 300;
}

.car-statistics .parking-box .icon-parking-temporary:before {
  content: "\e679";
}

.car-statistics .parking-box .other {
  width: 28rem;
}

.parking-rate {
  width: 18.3rem;
  height: 18.3rem;
  margin-left: 3rem;
}
/*-- 车辆统计 end --*/
</style>
