<template>
  <div class="item-box car-box">
    <a class="close" href="javascript:;" @click="closeCar">╳</a>
    <div class="hd">车辆信息</div>
    <div class="detail-info-box">
      <div class="left-box center">
        <div class="view">
          <img :src="car.img" alt="" class="pic car" :onerror="defaultImg" v-if="car.img">
          <img :src="defaultImg" alt="" class="pic" v-else>
        </div>
      </div>
      <!--左侧只有图片，图片居中显示，添加类center，如下-->
      <!--<div class="left-box center">
        <div class="view">
          <img src="/static/images/p06.png" alt="" class="pic">
        </div>
      </div>-->
      <!-- 月保车 -->
      <ul class="right-box" v-if="car.carType === 1 || car.carType === 2">
        <li><span class="name">{{car.carNo || '无'}}</span></li>
        <li><span class="name">车辆类型：</span>{{formatCarType(car.carType)}}</li>
        <li><span class="name">车&nbsp;主：</span>{{car.ownerName || '无'}}</li>
        <li><span class="name">电&nbsp;话：</span>{{car.phone || '无'}}</li>
        <li><span class="name">地&nbsp;址：</span>{{car.address || '无'}}</li>
        <li><span class="name">到期时间：</span>{{formatExpireDate(car.expireTime) || '无'}}</li>
      </ul>
      <!-- 临停车 -->
      <ul class="right-box" v-else>
        <li><span class="name">{{car.carNo || '无'}}</span></li>
        <li><span class="name">车辆类型：</span>{{formatCarType(car.carType)}}</li>
        <li><span class="name">电&nbsp;话：</span>{{car.phone || '无'}}</li>
        <li><span class="name">入园时间：</span>{{formatInTime(car.inTime) || '无'}}</li>
        <li><span class="name">入园位置：</span>{{car.inPlace || '无'}}</li>
        <li><span class="name">来访次数：</span>{{car.visitCount || '无'}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import mutationTypes from '@/pages/main/store/mutation-types'
import { formatDate } from '@/assets/js/utils/index'
export default {
  name: 'car-info',
  props: {
    info: {
      type: Object
    }
  },
  data () {
    return {
      defaultImg: require('../../../../static/images/car-info.png'), // 默认图片
      car: this.info
    }
  },
  watch: {
    info: function (val, oldVal) {
      // console.log('carinfo watch car new: %s, old: %s', JSON.stringify(val), JSON.stringify(oldVal))
      this.car = val
    }
  },
  methods: {
    closeCar () {
      // this.$store.commit(mutationTypes.SHOW_CAR_INFO, { shown: false })
      this.$store.commit('sendMessage', {
        windowName: 'car_info',
        shown: false
      })
    },
    /**
     * @description 格式化到期时间
     */
    formatExpireDate (time) {
      return formatDate(time, 'YYYY.MM.DD')
    },
    /**
     * @description 格式化入园时间
     */
    formatInTime (time) {
      return formatDate(time, 'YYYY.MM.DD hh:mm')
    },
    /**
     * @description 格式化显示车辆类型
     */
    formatCarType (carType) {
      if (carType === 1 || carType === 2) {
        return '月保车'
      } else if (carType === 0 || carType === 3 || carType === 4) {
        return '临停车'
      } else {
        return '无'
      }
    }
  }
}
</script>

<style scoped>

</style>
