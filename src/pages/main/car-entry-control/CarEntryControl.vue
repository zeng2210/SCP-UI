<!-- 车辆管理 -->
<template>
  <div class="item-box car-entry-box">
    <div class="hd">车辆出入</div>
    <div class="bd">
      <div class="view-wrap">
        <div class="view-list">
          <car-screen></car-screen>
        </div>

        <div>
          <div class="view-box">
            <div class="subscript-box">
              <div class="view">
                <img :src="carInfo.img" alt="" class="pic car" :onerror="defaultImg" v-if="carInfo.img">
                <img :src="defaultImg" alt="" class="pic" v-else>
              </div>
              <em class="subscript subscript1"></em>
              <em class="subscript subscript2"></em>
              <em class="subscript subscript3"></em>
              <em class="subscript subscript4"></em>
              <div class="scanning-box">
                <div class="scanning"></div>
              </div>
            </div>
            <p class="txt">{{carInfo.carNo}}
              <span>{{formatCarType(carInfo.carType)}}</span>
            </p>
          </div>
          <div class="view-box new" v-if="animationEnter">
            <div class="subscript-box">
              <img :src="carInfo.img" alt="" class="pic car" :onerror="defaultImg" v-if="carInfo.img">
              <img :src="defaultImg" alt="" class="pic" v-else>
            </div>
            <p class="txt">
              <span>{{formatCarType(carInfo.carType)}}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="list-wrap" ref="wraplistBox">
        <slider ref="slider" :loading="loading" @reachLeft="listCars" :autoMove="true">
          <ul class="list-box" ref="listBox" :style="{width:lisboxLenth +'rem'}">
            <li v-for="(car, index) in carList" :key="index" @click="getCarInfo(car, $event)">
              <div>
                <img :src="car.img" alt="" class="pic car" :onerror="defaultImg" v-if="car.img">
                <img :src="defaultImg" alt="" class="pic" v-else>
              </div>
              <p class="txt">{{formatCarType(car.carType)}}</p>
            </li>
            <template v-if="carList.length < 6">
              <li v-for="(item,index) in emptyList" :key="'lis'+index"></li>
            </template>
          </ul>
        </slider>
      </div>
    </div>
  </div>
</template>

<script>
import controller from '../controller'
// import store from '../store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import CarScreen from './CarScreen'
import { listInOutCars, getCarById } from '@/pages/main/api/car-entry'
import { castAnimate } from '@/assets/js/utils'
export default {
  name: 'car-entry-control',
  components: { CarScreen },
  data () {
    return {
      defaultImg: require('../../../../static/images/car.png'), // 默认图片
      animationEnter: false, // 是否展示动画
      loading: true, // 是否查询
      hasNext: true, // 是否有下一页
      carList: [], // 车辆列表
      emptyList: [], // 空占位列表
      lisboxLenth: 26.5,
      carInfo: {}, // 右上方车辆信息
      lastCar: [], // 用于获取上一辆车
      queryParam: {
        currentPage: 1, // 当前页
        pageSize: 7, // 分页大小
        endTime: '' // 时间
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.listCars()
    })
  },
  created () {
    // 在websocket消息处理中心注册一个区间回调函数，触发一个status状态变更
    let that = this
    controller.register({
      key: 'carEntry',
      points: [13, 14],
      callback: function (info) {
        // 当前车辆
        let tempCar = JSON.parse(info)
        that.carInfo = {
          id: tempCar.id,
          carNo: tempCar.redenceNo,
          carType: tempCar.carportType,
          img: tempCar.imgUrl
        }
        that.lastCar.push(that.carInfo)
        if (that.lastCar.length > 1) {
          that.animationEnter = true
          setTimeout(() => {
            that.carList.unshift(that.lastCar[0])
            that.lastCar.splice(0, 1)
            that.animationEnter = false
            if (that.carList.length < 6) {
              that.emptyList.length = 6 - that.carList.length
            } else {
              that.lisboxLenth = that.carList.length * 4.5 - 0.5
              that.$nextTick(() => {
                that.$refs.slider.update()
                that.$refs.slider.setRight()
              })
            }
          }, 1000)
        }
      }
    })
  },
  methods: {
    /**
     * @description 查询2小时内出入车辆
     */
    listCars () {
      let that = this
      if (that.hasNext) {
        that.loading = true
        that.queryParam.endTime = new Date()
        listInOutCars(that.queryParam).then(res => {
          that.hasNext = res.hasNext
          if (res.result) {
            if (that.queryParam.currentPage === 1) { // 初次查询时显示右上方默认展示第一辆车的信息
              let curCar = res.result[0]
              that.carInfo = {
                id: curCar.id,
                carNo: curCar.carNo,
                carType: curCar.carType,
                img: curCar.img
              }
              res.result.splice(0, 1)
              that.lastCar.push(curCar)
            }
            // console.log('第' + that.queryParam.currentPage + '次，加载了' + res.result.length + '条车辆出入信息res.result=' + JSON.stringify(res.result))
            that.carList = that.carList.concat(res.result)
            // console.log('合并后的车辆出入信息that.carList=' + JSON.stringify(that.carList))
            that.queryParam.currentPage++
            if (that.carList.length < 6) {
              that.emptyList.length = 6 - that.carList.length
            } else {
              that.lisboxLenth = that.carList.length * 4.5 - 0.5
            }
            that.$nextTick(() => {
              // 分页
              that.$refs.slider.update()
              that.$refs.slider.setRight()
              that.loading = false
            })
          } else {
            that.emptyList.length = 6 - that.carList.length
          }
        }).catch(err => {
          this.emptyList.length = 6 - this.carList.length
          this.loading = false
          console.log(err)
        })
      }
    },
    /**
     * @description 获取当前选中车辆信息
     */
    getCarInfo (car, event) {
      let param = {
        id: car.id,
        carPortType: car.carType
      }
      Promise.all([
        getCarById(param),
        castAnimate({
          x: event.pageX,
          y: event.pageY
        }, 'D')
      ]).then(res => {
        let carDetail = res[0]
        carDetail.carNo = car.carNo
        carDetail.carType = car.carType
        carDetail.img = car.img
        // this.$store.commit(mutationTypes.SHOW_CAR_INFO, {
        //   // 将car info 组件需要的数据交给vuex中转，在container里面 监听数据变化
        //   data: carDetail,
        //   shown: true
        // })
        this.$store.commit('sendMessage', {
          windowName: 'car_info',
          // 将car info 组件需要的数据交给vuex中转，在container里面 监听数据变化
          data: carDetail,
          shown: true
        })
      })
    },
    /**
     * @description 格式化显示车辆类型
     */
    formatCarType (carType) {
      if (carType === 1 || carType === 2) {
        return '月保车'
      } else if (carType === 0 || carType === 3 || carType === 4) {
        return '临停车'
      }
    }
  }
}
</script>

<style scoped>

</style>
