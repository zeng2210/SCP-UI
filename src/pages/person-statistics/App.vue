<template>
  <div class="left-wrap left2-wrap">
    <!-- 人员统计 star -->
    <div class="item-box person-statistics">
      <div class="hd">人员统计</div>

      <div class="bd">
        <p class="sub-title sub-title1">今日来访</p>
        <div class="visit-box">
          <div class="num-box visitor">
            <p class="num">{{visitorNum}}</p>
            <p class="note">访客</p>
          </div>
          <div class="num-box other">
            <p class="num">{{otherNum}}</p>
            <p class="note">其他人员</p>
          </div>
        </div>

        <div class="title">
          <p>24小时出入人次</p>
          <p>
            <span class="in"><i>进</i>{{inCount}}</span>
            <span class="out"><i>出</i>{{outCount}}</span>
          </p>
        </div>
        <!-- 24小时人流量图 -->
        <div class="chartCount" id='chart'></div>
      </div>
    </div>
    <!-- 人员统计 end -->

  </div>
</template>
<script>
import echarts from 'echarts'
import {getPersonCount, getInOutTotalCount} from './apis/index'
import { loadWebsocket } from '@/websocket/index'// , sendMessage
export default {
  name: 'app',
  data () {
    return {
      visitorNum: 0, // 今日访客数
      otherNum: 0, // 今日其他人员数
      inCount: 0, // 24小时入闸人次
      outCount: 0, // 24小时出闸人次
      inList: [], // 入闸数组
      outList: [], // 出闸数组
      curHour: 0, // 当前小时数
      xHours: [] // 报表x周动态时间
    }
  },
  mounted () {
    // 启动 websocket
    loadWebsocket(
      this.onWebsocketMessageReceived, 'egscuipersonstatistics'
    )
    // 查询今日访客和其他人员数
    this.getPersonCount()
    // 查询24小时进出人数
    this.getInOutTotalCount()
    // 获取下一个2小时整点
    this.getNextTwoHours()
    // 动态获取x轴数组
    this.getXaxisHours()
    // 获取0点时间
    this.get0ClockTime()
    // 生成报表
    setTimeout(() => {
      this.initEchart()
    }, 1000)
  },
  methods: {
    getPersonCount () {
      console.log('Get Mock Data')
      let that = this
      getPersonCount().then(
        function (res) {
          console.log(res)
          if (res !== '') {
            that.visitorNum = res.visitorNum
            that.otherNum = res.otherNum
          } else {
            this.$message({message: '查询人员信息异常', type: 'warning', showClose: true})
          }
        })
    },
    getInOutTotalCount () {
      let that = this
      getInOutTotalCount().then(
        function (res) {
          console.log(res)
          if (res !== '') {
            that.inList = res.inList
            that.outList = res.outList
            let newinList = res.inList.slice(1)
            let newoutLisst = res.outList.slice(1)
            // 每次统计前，清零一下
            that.inCount = 0
            that.outCount = 0
            for (let i = 0; i < newinList.length; i++) {
              that.inCount += newinList[i]
            }
            for (let k = 0; k < newoutLisst.length; k++) {
              that.outCount += newoutLisst[k]
            }
          }
        })
    },
    // 0点清空人员统计
    get0ClockTime () {
      let oClock = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000)
      let tt = oClock - new Date()
      setTimeout(() => {
        this.clearPersonCount()
        this.setTimeFor24h()
      }, tt)
    },
    clearPersonCount () {
      this.visitorNum = 0
      this.otherNum = 0
    },
    setTimeFor24h () {
      setInterval(() => {
        this.clearPersonCount()
      }, 60 * 60 * 1000 * 24) // 2小时执行一次
    },
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
        this.getInOutTotalCount()
        this.nextIntegralPointAfterLogin()
        // 防止getInOutTotalCount异步查询，结果没有返回直接加载旧的数据
        setTimeout(() => {
          this.getXaxisHours()
          this.initEchart()
        }, 500)
      }, waite) // 用户登录后的下一个整点执行。
    },
    // 2小时刷新定时器
    nextIntegralPointAfterLogin () {
      setInterval(() => {
        this.getInOutTotalCount()
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
    },
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
          type: 'category',
          boundaryGap: false,
          axisTick: false,
          axisLine: {
            show: false
          },
          axisLabel: {
            fontSize: '20' * per,
            color: '#858096',
            fontFamily: 'Microsoft YaHei',
            margin: '10'
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
          },
          // data: ['08', '10', '12', '14', '16', '18', '20']
          data: this.xHours
        },
        yAxis: {
          type: 'value',
          axisTick: false,
          axisLabel: {
            fontSize: '20' * per,
            color: '#858096',
            fontFamily: 'Microsoft YaHei',
            align: 'left',
            margin: '20' * per * 2.8
          },
          minInterval: 1, // 保证显示整数
          splitLine: {show: false}, // 网格线
          data: ['0', '200', '400', '600']
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
            // data: [100, 200, 300, 100, 400, 200, 100]
            data: this.inList
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
            // data: [300, 400, 100, 200, 100, 300, 200]
            data: this.outList
          }
        ]
      }
      echarts.init(document.getElementById('chart')).setOption(option)
    },
    onWebsocketMessageReceived (data) {
      try {
        let subData = JSON.parse(data).data
        console.log(subData)
        if (subData.type) {
          let type = subData.type
          console.log(type)
          if (type === '39999') {
            // 人员统计
            console.log(subData.info)
            // json数组用eval会报编译错误， 因此要evil代替
            var info = this.evil(subData.info)
            if (info.length > 1) {
              this.visitorNum = info[0]
              this.otherNum = info[1]
            } else if (info.length === 1) {
              this.visitorNum = info[0]
              this.otherNum = info[0]
            }
          }
        } else {
          console.log(subData.info)
          if (subData.info !== '' && subData.info !== undefined) {
            let infos = JSON.parse(subData.info)
            if (infos.type === '39999') {
              this.visitorNum = infos.visitorNum
              this.otherNum = infos.otherNum
            }
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
    // 代替eval的方法
    evil (fn) {
      var Fn = Function
      return new Fn('return ' + fn)()
    }
  }
}
</script>

<style scoped>
  /*-- 人员统计 star --*/
  .person-statistics .bd{
    padding: 5rem 5.5rem 0 3.5rem;
  }

  .person-statistics .sub-title {
    margin-bottom: 2rem;
    font-size: 1.9rem;
    line-height: 1;
    color: rgba(255, 255, 255, .8);
  }

  .person-statistics .title{
    display: flex;
    justify-content: space-between;
    font-size: 1.9rem;
    line-height: 1.9rem;
  }

  .person-statistics .title p:first-child{
    color: #ceccd5;
  }

  .person-statistics .title span{
    position: relative;
    color: #fff;
    padding-left: 2.4rem;
    font-size: 1.6rem;
  }

  .person-statistics .title span + span{
    margin-left: 2.75rem;
  }

  .person-statistics .title span:before{
    content:'';
    display: block;
    position: absolute;
    top: .5rem;
    left: 0;
    width: .75rem;
    height: .75rem;
    border-radius: 50%;
  }

  .person-statistics .title .in:before{
    border: .15rem solid #975ef0;
  }

  .person-statistics .title .out:before{
    border: .15rem solid #00b0ff;
  }

  .person-statistics .title i{
    margin-right: 1.2rem;
  }

  .person-statistics .visit-box{
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .person-statistics .chartCount{
    display: flex;
    justify-content: space-around;
    margin-bottom: 5rem;
    font-weight: 300;
    height: 14rem;
    margin-top: 1rem;
  }

  .person-statistics .visit-box .num-box,
  .person-statistics .visit-box .num-box:before{
    border-radius: 50%;
    border-style: solid;
  }

  .person-statistics .visit-box .num-box{
    position: relative;
    width: 17.75rem;
    height: 17.75rem;
    font-size: 2rem;
    border-width: .25rem;
    text-align: center;
    padding-top: 5.5rem;
  }

  .person-statistics .visit-box .num-box:before{
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15.75rem;
    height: 15.75rem;
    border-width: .1rem;
  }

  .person-statistics .visit-box .visitor{
    border-color: #00b0ff;
    box-shadow: 0 0 1.75rem #00b0ff;
  }

  .person-statistics .visit-box .visitor:before{
    border-color: #046aab;
  }

  .person-statistics .visit-box .other{
    border-color: #0eb894;
    box-shadow: 0 0 1.75rem #0eb894;
  }

  .person-statistics .visit-box .other:before{
    border-color: #0c6263;
  }

  .person-statistics .visit-box .num{
    font-size: 3.5rem;
    line-height: 1;
  }

  /*-- 人员统计--*/
</style>
