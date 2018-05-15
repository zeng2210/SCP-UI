<template>
  <div class="item-box weather-box">
    <div class="bd">
      <div class="area-time">
        <p class="area">{{city.cityViewName}}</p>
        <p class="date">{{date}}</p>
        <p class="time">{{time}}</p>
      </div>

      <div class="weather-info">
        <!--current weather start-->
        <div class="today-weather">
          <div>
            <div class="info">
              <div class="icon-view-big">
                <img :src="condition.iconSrc" alt="" class="ico-weather">
              </div>
              <div class="temperature"><em>{{condition.temp}}</em>℃</div>
            </div>
            <div class="detail">
              <p>空气质量</p>
              <p class="level">{{airLevelText}} {{aqi.value}}</p>
              <p class="txt">{{condition.condition}}</p>
            </div>
            <div class="other">
              <p class="ico icon-wind">{{condition.windDir}}{{condition.windLevel}}级</p>
              <p class="ico icon-humidity">{{condition.humidity}}%</p>
              <!--<p class="ico icon-pressure">{{condition.pressure || '&#45;&#45;'}} hPa</p>-->
            </div>
          </div>
        </div>
        <!--current weather end-->

        <!--forecast start-->
        <ul class="week-weather">
          <li v-for="item in forecast" v-bind:key="item.predictDate">
            <div class="icon-view">
              <img :src="item.iconSrc" alt="" class="ico-weather">
            </div>
            <p class="date">{{item.predictDate.split('-')[1]}}/{{item.predictDate.split('-')[2]}}</p>
            <p class="temperature">{{item.tempNight}}~{{item.tempDay}}℃</p>
            <p class="weather">{{item.conditionDay}}</p>
          </li>
        </ul>
        <!--forecast end-->
      </div>
    </div>
  </div>
</template>

<script>
import { getWeather } from '@/pages/main/api/weather-forecast'
import '@/pages/main/api/mocks/weather-forecast'
import transDict from './utils/trans-dict'
import { formatDate } from '@/assets/js/utils'
export default {
  name: 'weather-forecast',
  data () {
    return {
      date: '', // 日期
      time: '', // 时间
      city: {
        cityId: 2,
        counname: '中国',
        name: '北京市',
        pname: '北京市',
        timezone: '8'
      }, // 市-区
      aqi: {
        value: '117'
      }, // 空气质量
      airLevelText: '', // 空气质量描述
      logo: '',
      condition: {
        condition: '阴',
        humidity: '40',
        icon: '2',
        temp: '12',
        updatetime: '2018-03-19 10:20:00',
        windDir: '西北风',
        windLevel: '1'
      }, // 当前天气状况
      forecast: [] // 未来6天天气
    }
  },
  created () {
    this.splitTime()
    this.updateTime()
    this.loadWeather()
  },
  mounted () {
    // console.log('时间', formatDate(new Date(), 'YYYY-MM-DD hh:mm'))
    this.updateWeather()
    // window.setInterval(() => {
    //   this.dateTime = formatDate(Date.now(), 'YYYY-MM-DD hh:mm:ss')
    // }, 1000)
  },
  methods: {
    // 获取天气
    loadWeather () {
      getWeather().then(weather => {
        // let _this = this
        console.log('weather:', weather)
        // 空气质量
        this.aqi = weather.aqi
        this.judgeAQI(this.aqi.value)
        // 地区
        this.city = weather.city
        // 当前空气
        this.condition = weather.condition
        this.condition.iconSrc = '/static/images/weather/' + transDict(this.condition.icon, 'weatherIcon') + '.png'
        // 未来几天天气
        weather.forecast.forEach(function (item) {
          // console.log('天气图标', item.conditionIdDay, transDict(item.conditionIdDay, 'weatherIcon'))
          // _this.$set(item, 'iconSrc', '/static/images/weather/' + transDict('item.conditionIdDay', 'weatherIcon') + '.png')
          item.iconSrc = '/static/images/weather/' + transDict(item.conditionIdDay, 'weatherIcon') + '.png'
        })
        this.forecast = weather.forecast
      })
    },
    // 获取天气
    loadWeatherProgressive () {
      getWeather().then(weather => {
        // let _this = this
        console.log('weather:', weather)
        // 空气质量
        this.aqi = weather.aqi
        this.judgeAQI(this.aqi.value)
        // 地区
        this.city = weather.city
        // 当前空气
        this.condition = weather.condition
        this.condition.iconSrc = '/static/images/weather/' + transDict(this.condition.icon, 'weatherIcon') + '.png'
        // 未来几天天气
        setTimeout(() => {
          this.forecast = weather.forecast
          this.forecast.forEach(function (item) {
            // console.log('天气图标', item.conditionIdDay, transDict(item.conditionIdDay, 'weatherIcon'))
            // _this.$set(item, 'iconSrc', '/static/images/weather/' + transDict('item.conditionIdDay', 'weatherIcon') + '.png')
            item.iconSrc = '/static/images/weather/' + transDict(item.conditionIdDay, 'weatherIcon') + '.png'
          })
        }, 3 * 1000)
      })
    },
    // 更新天气（轮询）
    updateWeather () {
      setInterval(() => {
        this.loadWeather()
      }, 10 * 60 * 1000) // 10分钟执行一次
    },
    // 每隔一分钟更新一次时间
    updateTime () {
      setInterval(() => {
        this.splitTime()
      }, 60000)
    },
    // 拆分日期与时间
    splitTime () {
      let time = formatDate(new Date(), 'YYYY-MM-DD hh:mm')
      this.date = time.substring(0, 10)
      this.time = time.substring(11, 16)
      // console.log('时间', time, this.date, this.time)
    },
    // 判断空气质量
    judgeAQI (val) {
      if (val < 50) {
        // this.airLevel = 'air-level-1'
        this.airLevelText = '优'
      } else if (val >= 50 && val < 100) {
        // this.airLevel = 'air-level-2'
        this.airLevelText = '良'
      } else if (val >= 100 && val < 150) {
        // this.airLevel = 'air-level-3'
        this.airLevelText = '轻度污染'
      } else if (val >= 150 && val < 200) {
        // this.airLevel = 'air-level-4'
        this.airLevelText = '中度污染'
      } else if (val >= 200 && val < 300) {
        // this.airLevel = 'air-level-5'
        this.airLevelText = '重度污染'
      } else {
        // this.airLevel = 'air-level-6'
        this.airLevelText = '严重污染'
      }
    }
  }
}
</script>

<style scoped>

</style>
