<template>
  <div class="control-bar">
    <div class="floor-con" v-show="isShowFloor">
      <div v-for="item in floorArr" :key="item.index" :class="['control-button', 'floor-button', curActiveFloor=== item.index ? 'active' : '']" @click="onChooseParkFloorHandler(item.index)">
        <p>
          <span>{{item.type}}</span>
        </p>
      </div>
    </div>

    <!-- <div class="park-floor-con" v-show="isParkShowFloor">
      <a href="javascript:;" class="arrow icon-arrow-up" id="floor-prev"></a>
      <div class="floor-box-wrap" id="floor-wrap">
        <div class="floor-box">
          <div class="floor" :class="{'active': index === currentIndex }" v-for="(item, index) in parkAreaList" :key="index" @click="onClickBuildHandler(index, item.areaName)">
            {{ item.areaName }}
          </div>
        </div>
      </div>
      <a href="javascript:;" class="arrow icon-arrow-down disabled" id="floor-next"></a>
    </div> -->

    <div :class="['control-button', 'showhide-btn', showhideTip ? '' : 'hidden']" @click="onShowHideWarningHandler" v-show="Boolean(dangerWarnCount)">
      <p>
        <span>{{showhideTip ? '显示' : '隐藏'}}</span>
      </p>
      <p>
        <span>预警</span>
      </p>
    </div>
    <div class="scene-control">
      <button :class="['img-button', 'icon-park', sceneType===1 ? 'sceneActive' : '']" type="button" @click="onChooseSceneHandler(1)"><p class="warning-tips" v-show="Boolean(dangerWarnCount)"></p><p class="btn-text">园区</p></button>
      <button :class="['img-button', 'icon-parking', sceneType===0 ? 'sceneActive' : '']" type="button" @click="onChooseSceneHandler(0)"><p class="warning-tips" v-show="false"></p><p class="btn-text">停车场</p></button>
    </div>
    <div class="zoom-control">
      <button class="img-button zoom-size icon-enlarge" type="button" @click="onZoomMapHandler(1)"></button>
      <button class="img-button zoom-size mar-top icon-minify" type="button" @click="onZoomMapHandler(2)"></button>
    </div>
  </div>
</template>

<script>
import store from '@/pages/main/store'
// import { getParkSceneListData } from '@/pages/main/api/map-view'
export default {
  name: 'map-control-bar',
  props: {
    parkAreaList: {
      type: Object
    },
    sceneType: Number
  },
  data () {
    return {
      floorArr: [{type: 'F30', index: 3}, {type: 'F1', index: 2}, {type: 'B1', index: 1}],
      curActiveFloor: 3, // 当前显示的楼层：1(B1)、2(F1)、3(F30)
      chooseSceneFlag: 3,
      isShowFloor: false,
      currentIndex: -1 // 当前选中停车场楼栋
    }
  },
  mounted () {
  },
  methods: {
    // 楼层选择
    floorReset: function () {
      let prev = document.getElementById('floor-prev')
      let next = document.getElementById('floor-next')
      let floorWrap = document.getElementById('floor-wrap')
      let box = floorWrap.children[0]
      let offsetH = 0
      let moveH = 0
      let wrapHeight = floorWrap.clientHeight
      // let boxHeight = box.clientHeight
      // let boxHeight = 280
      let eHeight = 0
      let boxHeight = box.clientHeight
      if (box.children.length > 0) {
        eHeight = box.children[0].clientHeight
      }
      console.log(box)
      console.log(wrapHeight + ',boxH:' + boxHeight)
      // if (box.children.length > 0) {
      //   eHeight = box.children[0].clientHeight
      // }
      // if (boxHeight === undefined) {
      //   boxHeight = 0
      // }
      // if (wrapHeight === undefined) {
      //   wrapHeight = 0
      // }
      offsetH = boxHeight - wrapHeight
      if (offsetH < 0) {
        prev.classList.add('disabled')
      } else {
        next.classList.add('disabled')
        prev.onclick = function () {
          if (moveH < offsetH) {
            moveH += eHeight
            next.classList.remove('disabled')
          } else {
            prev.classList.add('disabled')
          }
          console.log(moveH)
          box.style.top = -moveH + 'px'
        }
        next.onclick = function () {
          if (moveH > 0) {
            moveH -= eHeight
            prev.classList.remove('disabled')
          } else {
            next.classList.add('disabled')
          }
          box.style.top = -moveH + 'px'
        }
      }
    },
    /**
     * 处理'显示或隐藏警报框'事件
     */
    onShowHideWarningHandler: function () {
      store.commit('toggleAlarms', this.showhideTip)
    },
    /**
     * 处理'切换园区和停车场场景'事件
     * params{int} flag：1园区，0停车场
     */
    onChooseSceneHandler: function (flag) {
      this.$emit('onSceneChange', flag)
    },
    /**
     * 处理'放大、缩小地图'事件
     * params flag: 1放大地图，2缩小地图
     */
    onZoomMapHandler: function (flag) {
      this.$emit('mapZoomChange', flag)
    },
    /**
     * 处理'选择楼层'事件
     * params{String} flag：1(B1)、2(F1)、3(F30)
     */
    onChooseParkFloorHandler: function (flag) {
      if (this.curActiveFloor === flag) return
      this.curActiveFloor = flag
      this.$emit('floorChange', flag)
    },
    /**
     * 由父组件调用此方法，改变子组件的'当前显示楼层'、'是否显示楼层'值
     */
    changeFloorStatus: function (params) {
      if (params.floortype) {
        this.curActiveFloor = params.floortype
      }
      if (params.showFloor !== undefined) this.isShowFloor = params.showFloor
    },
    // changeParkFloorStatus: function (params) {
    //   if (params.showFloor !== undefined) this.isParkShowFloor = params.showFloor
    // },
    onClickBuildHandler: function (index, areaName) {
      this.currentIndex = index
      this.floorReset()
      this.$emit('onClickBuildHandler', areaName)
    }
  },
  computed: {
    // w1、w2区域显隐状态：true都隐藏了，false都显示或部分显示
    showhideTip: function () {
      return store.getters.allAlarmsAreHidden
    },
    // 一级警报和二级警报  数目
    dangerWarnCount: function () {
      return store.getters.sceneMessageStatus['primary_danger'] + store.getters.sceneMessageStatus['second_warn']
    }
  }
}
</script>

<style scoped>
</style>
