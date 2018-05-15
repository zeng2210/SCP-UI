<template>
  <div class="map-wrap">
    <div class="map-box">
      <div id="parkMap"></div>
      <p class="court-title">{{courtTitle}}</p>
      <p class="empty-tips" v-if="isEmpty===true">小区停车场图不存在,请先至管理端配置场景信息!</p>
      <div class="park-floor-con" v-show="isShowParkScene">
        <!-- <a href="javascript:;" class="arrow icon-arrow-up" id="floor-prev"></a> -->
        <a href="javascript:;" class="arrow" id="floor-prev"></a>
        <div class="floor-box-wrap" id="floor-wrap">
          <div class="floor-box">
            <div class="floor" :class="{'active': index === currentIndex }" v-for="(item, index) in buildList" :key="index" :disabled="isEmpty===true" @click="onClickBuildHandler(index, item.areaName)">
              {{ item.areaName }}
            </div>
          </div>
        </div>
        <!-- <a href="javascript:;" class="arrow icon-arrow-down disabled" id="floor-next"></a> -->
        <a href="javascript:;" class="arrow disabled" id="floor-next"></a>
      </div>
      <!-- <map-control-bar ref="controlBar" @onSceneChange="onSceneChangeHandler" @mapZoomChange="onMapZoomChangeHandler" @onClickBuildHandler="onClickBuildHandler" :parkAreaList="buildList"></map-control-bar> -->
      <map-control-bar ref="controlBar" :scene-type="0" @onSceneChange="onSceneChangeHandler" @mapZoomChange="onMapZoomChangeHandler"></map-control-bar>
    </div>
    <div class="btn-group">
      <button v-for="(item, index) in datalist" :key="index" :class="['btn', 'icon-'+ item.icon, item.isActived?'active':'']" type="button" @click="onClickButtonHandler(item.icon,$event)">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
<script>
import { getParkSceneListData, getParkMarkerListData, LOG_TAG } from '@/pages/main/api/map-view'
import { fixedMarkerListFormat, setMarkerMap, initZoomLevel } from '@/pages/main/map-viewer/assets/js/util'
import { castAnimate } from '@/assets/js/utils'
import parkDialog from '@/pages/main/map-viewer/mixin/parkdialog'
import mapScene2 from '@/pages/main/map-viewer/assets/images/u1917_selected.png'
import parkScene1 from '@/pages/main/map-viewer/assets/images/u1915.png'
import addZoom from '@/pages/main/map-viewer/assets/images/u1898.png'
import subZoom from '@/pages/main/map-viewer/assets/images/u1913.png'
import iconSrc from '@/pages/main/map-viewer/assets/images/u1928.png'
// import mutationTypes from '@/pages/main/store/mutation-types'
import store from '@/pages/main/store'
import MapControlBar from './MapControlBar'
export default {
  name: 'park-viewer',
  components: {
    MapControlBar
  },
  data () {
    return {
      courtTitle: '监控中心-恒大御景苑',
      sceneId: '',
      currentZoom: 2,
      mapObj: {},
      markerMap: [],
      // 控制显示图标
      datalist: {
        all: { name: '全部', icon: 'all', isActived: true },
        guarder: { name: '保安', icon: 'guard', isActived: true },
        brake: { name: '车闸', icon: 'brake', isActived: true },
        elevator: { name: '电梯', icon: 'elevator', isActived: true },
        camera: { name: '摄像头', icon: 'camera', isActived: true },
        lock: { name: '地锁', icon: 'lock', isActived: true }
      },
      mapScene: mapScene2,
      parkScene: parkScene1,
      iconSrc: iconSrc,
      addZoom: addZoom,
      subZoom: subZoom,
      showhideTip: false,
      chooseSceneFlag: 1,
      maxZoom: 0,
      minZoom: 0,
      isShowParkScene: false,
      buildList: {}, // 楼栋列表
      currentIndex: -1,
      isEmpty: false
    }
  },
  methods: {
    /**
     * 处理'切换园区和停车场场景'事件
     * params{int} flag：1园区，0停车场
     */
    onSceneChangeHandler: function (flag) {
      if (flag === 1) {
        this.isShowParkScene = false
      }
      this.$emit('onMapChange', flag)
    },
    /**
     * 地图缩放事件监听
     * @augments e
     */
    onZoomChangeHandler: function (e) {
      if (this.isEmpty) return
      let zoomInt = parseInt(e.zoom)
      if (zoomInt !== this.currentZoom) {
        this.currentZoom = zoomInt
        if (this.currentZoom >= 3 && this.buildList.length > 0) {
          this.isShowParkScene = true
        } else {
          this.isShowParkScene = false
        }
      }
      console.log('当前  zoom = ' + zoomInt)
    },
    /**
     * 处理'放大、缩小地图'事件
     * params flag: 1放大地图，2缩小地图
     */
    onMapZoomChangeHandler: function (flag) {
      if (this.isEmpty) return
      let curZoom = parseInt(this.mapObj._map.getView().getZoom())
      if (flag === 1 && curZoom >= this.maxZoom) {
        return
      }
      if (flag === 2 && curZoom <= 0) {
        return
      }
      flag === 1 ? curZoom++ : curZoom--
      this.mapObj._map.getView().setZoom(curZoom)
      if (this.currentZoom >= 3 && this.buildList.length > 0) {
        this.isShowParkScene = true
      } else {
        this.isShowParkScene = false
      }
    },
    /**
     * 处理'选择停车场楼层'事件
     * params{String}
     */
    onParkFloorChangeHandler: function (index) {
      if (this.currentIndex === index) {
        return
      }
      this.currentIndex = index
    },
    /**
     * 处理'切换园区和停车场场景'事件
     * params{int} flag：1园区，2停车场
     */
    onChooseSceneHandler: function (flag) {
      if (this.chooseSceneFlag === flag) return
      this.chooseSceneFlag = flag
      // if (this.chooseSceneFlag === 1) {
      //   this.mapScene = mapScene2
      //   this.parkScene = parkScene1
      // } else {
      //   this.mapScene = mapScene1
      //   this.parkScene = parkScene2
      // }
      this.$emit('sceneChange', this.chooseSceneFlag)
    },
    // 初始化地图
    mapInit: function (mapDetail) {
      // eslint-disable-next-line
      this.mapObj = new hdmap.initMap({
        gisEngine: 'tile',
        sizeW: mapDetail.width,
        sizeH: mapDetail.height,
        domId: 'parkMap',
        mapUrl: mapDetail.url,
        maxZoom: mapDetail.maxZoom,
        minZoom: mapDetail.minZoom,
        zoom: initZoomLevel,
        controlZoom: false,
        centerGPS: [mapDetail.centerLon, mapDetail.centerLat],
        scale: mapDetail.scale,
        scaleType: mapDetail.scaleType,
        arcAngle: mapDetail.arcAngle // 弧度值
      })
      this.sceneId = mapDetail.id
      this.currentZoom = 2
      this.getFixedMarkers(mapDetail.id)
      // 初始化地图后添加保安点位
      // this.getSecurityList(mapDetail.id)
      this.getAreaList(mapDetail.id)
      this.maxZoom = mapDetail.maxZoom
      this.minZoom = mapDetail.minZoom
      // this.getAddWarnList({ sceneId: mapDetail.id })
      // 地图上注册点击事件
      // this.mapObj.regEventListener('moveend', this.onMoveendHandler)
      this.mapObj.regEventListener('singleclick', this.onClickMapHandler)
      this.mapObj.regEventListener('zoomChange', this.onZoomChangeHandler)
    },
    getAreaList: function (sceneId) {
    // getAreaListData(sceneId).then(res => {
    // initAreaMap(res)
    // this.buildAreaList = getAreaMapByType(2)
    // // this.buildAreaList = {
    // //   id: res[0].id,
    // //   name: res[0].areaName,
    // //   areaType: res[0].areaType,
    // //   visible: true,
    // //   borderPoints: res[0].borderPoints
    // // }
    // let sty = {
    //   fillColor: 'red',
    //   strokeColor: 'blue',
    //   strokeWidth: 2
    // }
    // this.mapObj.addAreas(this.buildAreaList, sty)
    // })
    },
    showMarkers: function (markerList, layerkey) {
      // 批量添加点位信息
      this.mapObj.addMarkers(markerList, { scale: 0.25 }, layerkey)
    },
    getFixedMarkers: function (secneId) {
      let params = {}
      params.sceneId = secneId
      getParkMarkerListData(params).then(res => {
        if (res) {
          let markerList = fixedMarkerListFormat(res)
          let listKey = this.sceneId + '_' + this.currentZoom
          setMarkerMap(listKey, markerList)
          this.showMarkers(markerList)
        }
      }).catch(err => {
        console.warn(LOG_TAG + 'get markerList failed')
        console.warn(err)
      })
    },
    /**
     * 点击楼栋移动停车场地图坐标
     * @augments {String} areaName 楼栋名称
     */
    onClickBuildHandler: function (index, areaName) {
      // console.log(obj.currentTarget)
      this.currentIndex = index
      for (let i = 0; i < this.buildList.length; i++) {
        if (this.buildList[i].areaName === areaName) {
          // eslint-disable-next-line
          this.mapObj._map.getView().setCenter(new hdmap.utils.getAreaCenter(this.buildList[i].borderPoints[0]))
        }
      }
      this.floorReset()
    },
    /**
     * 点击主地图下方按钮控制栏的按钮
     * @augments {String} buttonName 按钮类型名称
     */
    onClickButtonHandler: function (buttonName, evt) {
      let isAll = true
      if (buttonName === 'all') {
        isAll = !this.datalist[buttonName].isActived
        for (let key in this.datalist) {
          let obj = this.datalist[key]
          obj.isActived = isAll
          isAll ? this.mapObj.showMarkers(key) : this.mapObj.hideMarkers(key)
        }
      } else {
        for (let key in this.datalist) {
          let obj = this.datalist[key]
          if (buttonName === obj.icon) {
            obj.isActived = !obj.isActived
            obj.isActived ? this.mapObj.showMarkers(key) : this.mapObj.hideMarkers(key)
          }
          if (!obj.isActived && key !== 'all') isAll = false
        }
        this.datalist['all'].isActived = isAll
      }
      // 隐藏保安、机器人设备时，把其相关的路线也移除掉
      if ((buttonName === 'guard' && this.lineType === 'guarder') || (buttonName === 'robot' && this.lineType === 'robot') || (buttonName === 'all' && !isAll)) {
        if (this.lineInfo && this.lineInfo.id) this.clearLineLayer()
      }
    },
    /**
     * 地图点击事件监听
     * @augments e
     */
    // onClickMapHandler: function (e) {
    //   console.log(e.coordinate[0] + ', ' + e.coordinate[1])
    //   // console.log(e.feature)
    //   if (e.feature && e.feature.markerType) {
    //     console.log('resolved')
    //     let dd = e.feature
    //     let sendDate = { shown: true, data: { ...dd } }
    //     let animatePoint = { x: 800, y: 600 }
    //     if (e.mapEvent) {
    //       animatePoint = {
    //         x: e.mapEvent.originalEvent.pageX,
    //         y: e.mapEvent.originalEvent.pageY
    //       }
    //     } else {
    //       console.warn(LOG_TAG + ' your hdmap version is old, please updata')
    //     }
    //     this.mapObj.removeLayerByLayerKey('lineLayer')
    //     if (e.feature && e.feature.markerType === 'guarder') {
    //       this.getSecurityRouteLine(e.feature.position)
    //     // 点击地锁图标时
    //     } else if (['control', 'brake', 'gates', 'elevator', 'camera', 'broadcast', 'robot', 'signpost', 'fence', 'lock'].indexOf(e.feature.markerType) !== -1) {
    //       if ((!e.feature.longitude || !e.feature.latitude) && e.feature.markerStatus % 2 === 0) { // 地锁等只有position，没有经纬度坐标，需要转换坐标，否则设备异常时无法查询推荐保安
    //         let lonlat = this.mapObj.transBitmapToWGS(e.coordinate)
    //         console.log('转换后的坐标 lonlat=' + JSON.stringify(lonlat))
    //         e.feature.longitude = lonlat[0]
    //         e.feature.latitude = lonlat[1]
    //       }
    //       castAnimate(animatePoint, 'D').then(() => {
    //         // store.commit(mutationTypes.SHOW_DEVICE_INFO, sendDate)
    //         console.log('mapviewer onClickMapHandler ')
    //         store.commit('sendMessage', {
    //           windowName: 'device_info',
    //           ...sendDate
    //         })
    //       })
    //     } else if (e.feature.markerType === '25019' || e.feature.markerType === '25020' || e.feature.markerType === '91001') {
    //       castAnimate(animatePoint, 'W1').then(() => {
    //         // store.commit(mutationTypes.SHOW_PRIMARY_ALARM, sendDate) // 发出‘一级警告’事件
    //         store.commit('sendMessage', {
    //           windowName: 'primary_alarm',
    //           ...sendDate
    //         })
    //       })
    //     } else {
    //       castAnimate(animatePoint, 'W2').then(() => {
    //         // store.commit(mutationTypes.SHOW_SECONDARY_ALARM, sendDate) // 发出‘二级警告’事件
    //         store.commit('sendMessage', {
    //           windowName: 'secondary_alarm',
    //           ...sendDate
    //         })
    //       })
    //     }
    //   }
    // },
    onClickMapHandler: function (e) {
      // console.log(e.coordinate[0] + ', ' + e.coordinate[1])
      // console.log('singleclick layerKey = ' + e.layerKey)
      // 点击地图各种设备、警报的事件出口
      if (e.feature && e.feature.markerType) {
        // console.log('resolved')
        console.log(LOG_TAG + ' 所点击的设备数据： ')
        console.log(e.feature)
        let dd = e.feature
        let sendDate = { shown: true, data: { ...dd } }
        let animatePoint = { x: 800, y: 600 }
        if (e.mapEvent) {
          animatePoint = {
            x: e.mapEvent.originalEvent.pageX,
            y: e.mapEvent.originalEvent.pageY
          }
        } else {
          console.warn(LOG_TAG + ' your hdmap version is old, please updata')
        }
        if (['guarder', 'households', 'visitor', 'stranger'].indexOf(e.feature.markerType) !== -1) {
          castAnimate(animatePoint, 'D').then(() => {
            // store.commit(mutationTypes.SHOW_MEMBER_INFO, sendDate)
            store.commit('sendMessage', {
              windowName: 'member_info',
              ...sendDate
            })
          })
        } else if (['control', 'brake', 'gates', 'elevator', 'camera', 'broadcast', 'robot', 'signpost', 'fence', 'lock'].indexOf(e.feature.markerType) !== -1) {
          castAnimate(animatePoint, 'D').then(() => {
            // store.commit(mutationTypes.SHOW_DEVICE_INFO, sendDate)
            store.commit('sendMessage', {
              windowName: 'device_info',
              ...sendDate
            })
          })
        } else if (e.feature.markerType === '25019' || e.feature.markerType === '25020' || e.feature.markerType === '91001') {
          castAnimate(animatePoint, 'W1').then(() => {
            // store.commit(mutationTypes.SHOW_PRIMARY_ALARM, sendDate) // 发出‘一级警告’事件
            store.commit('sendMessage', {
              windowName: 'primary_alarm',
              ...sendDate
            })
          })
        } else {
          castAnimate(animatePoint, 'W2').then(() => {
            // store.commit(mutationTypes.SHOW_SECONDARY_ALARM, sendDate) // 发出‘二级警告’事件
            store.commit('sendMessage', {
              windowName: 'secondary_alarm',
              ...sendDate
            })
          })
        }
      }
    },
    /**
     * 处理'显示或隐藏警报框'事件
     */
    onShowHideWarningHandler: function () {
      this.showhideTip = !this.showhideTip
      this.earlyWarnText = this.showhideTip ? '隐藏' : '显示'
    },
    /**
     * 处理'放大、缩小地图'事件
     */
    onZoomMapHandler: function (flag) {
      let curZoom = parseInt(this.mapObj._map.getView().getZoom())
      if (flag === 1 && curZoom >= this.maxZoom) return
      if (flag === 2 && curZoom <= 0) return
      flag === 1 ? curZoom++ : curZoom--
      this.mapObj._map.getView().setZoom(curZoom)
    },
    // 楼层选择
    floorReset: function () {
      let prev = document.getElementById('floor-prev')
      let next = document.getElementById('floor-next')
      let floorWrap = document.getElementById('floor-wrap')
      let box = floorWrap.children[0]
      let offsetH = 0
      let moveH = 0
      let wrapHeight = floorWrap.clientHeight
      let boxHeight = box.clientHeight
      let eHeight = 0
      if (box.children.length > 0) {
        eHeight = box.children[0].clientHeight
      }
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
    }
  },
  mixins: [parkDialog],
  mounted () {
    // 从后台获取场景数据
    getParkSceneListData().then(res => {
      if (res) {
        this.buildList = res.list
        try {
          this.mapInit(res)
        } catch (e) {
          console.warn(LOG_TAG + 'map init failed')
          console.warn()
        }
      } else {
        this.isEmpty = true
      }
    }).catch(err => {
      console.warn(LOG_TAG + 'get sceneList failed')
      console.warn(err)
    })
    setTimeout(() => {
      // 初始化上下箭头
      this.floorReset()
    }, 1000)
  }
}

</script>

<style scoped>
</style>
