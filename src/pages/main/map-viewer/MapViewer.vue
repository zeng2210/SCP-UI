<template>
  <div class="map-wrap">
    <div class="map-box">
      <!-- <img src="/static/images/map.png" alt="" class="map"> -->
      <div id="mainMap"></div>
      <p class="court-title">{{courtTitle}}</p>
      <p class="empty-tips" v-if="isEmpty===true">小区全图不存在,请先至管理端配置场景信息!</p>
      <map-control-bar ref="controlBar" :scene-type="1" @onSceneChange="onSceneChangeHandler" @mapZoomChange="onMapZoomChangeHandler" @floorChange="onFloorChangeHandler"></map-control-bar>
    </div>
    <div class="btn-group">
      <button v-for="(item, index) in datalist" :key="index" :class="['btn', 'icon-'+ item.icon, item.isActived?'active':'']" type="button" :disabled="isEmpty===true" @click="onClickButtonHandler(item.icon,$event)">
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { getSceneListData, getMarkerListData, getAreaListData, LOG_TAG } from '@/pages/main/api/map-view'
import { fixedMarkerListFormat, setMarkerMap, getMarkerMap, initAreaMap, getAreaMapByType, markerScale, initZoomLevel } from '@/pages/main/map-viewer/assets/js/util'
import MapControlBar from './MapControlBar'
import addMarkersDialog from '@/pages/main/map-viewer/mixin/addmarkersdialog'
import store from '@/pages/main/store'
// import mutationTypes from '@/pages/main/store/mutation-types'
import { castAnimate } from '@/assets/js/utils'
let vueData = null
export default {
  name: 'map-viewer',
  components: {
    MapControlBar
  },
  data () {
    return {
      courtTitle: '监控中心-恒大御景苑',
      broadSceneId: '',
      broadArea: '',
      broadBuildingZoom: null,
      buildAreaList: [],
      currentZoom: 2,
      mapObj: {},
      markerMap: [],
      isEmpty: false,
      // 控制显示图标
      datalist: {
        all: { name: '全部', icon: 'all', isActived: false },
        guarder: { name: '保安', icon: 'guard', isActived: true },
        households: { name: '住户', icon: 'households', isActived: true },
        visitor: { name: '访客', icon: 'visitor', isActived: true },
        stranger: { name: '未登记', icon: 'stranger', isActived: true },
        control: { name: '门禁', icon: 'control', isActived: false },
        brake: { name: '车闸', icon: 'brake', isActived: false },
        gates: { name: '人行道闸', icon: 'gates', isActived: false },
        elevator: { name: '电梯', icon: 'elevator', isActived: false },
        camera: { name: '摄像头', icon: 'camera', isActived: false },
        broadcast: { name: '广播', icon: 'broadcast', isActived: false },
        robot: { name: '机器人', icon: 'robot', isActived: true },
        signpost: { name: '电子指路牌', icon: 'signpost', isActived: false },
        fence: { name: '电子围栏', icon: 'fence', isActived: false }
      },
      defaultFloorType: 3,
      curFloorType: 3,
      buildLayerKey: '',
      maxZoom: 0,
      minZoom: 0
    }
  },
  methods: {
    /**
     * 初始化地图,并并作为点位,区域请求的入口
     * @augments {object} mapDetail场景对象
     */
    mapInit: function (mapDetail) {
      // eslint-disable-next-line
      this.mapObj = new hdmap.initMap({
        gisEngine: 'tile',
        sizeW: mapDetail.width,
        sizeH: mapDetail.height,
        domId: 'mainMap',
        mapUrl: mapDetail.url,
        maxZoom: mapDetail.maxZoom, // 6
        minZoom: mapDetail.minZoom + 2, // 2
        tileMaxZoom: mapDetail.maxZoom, // 6
        tileMinZoom: mapDetail.minZoom, // 2
        zoom: initZoomLevel,
        controlZoom: false,
        centerGPS: [mapDetail.centerLon, mapDetail.centerLat],
        scale: mapDetail.scale,
        scaleType: mapDetail.scaleType,
        arcAngle: mapDetail.arcAngle // 弧度值
      })
      this.broadBuildingZoom = mapDetail.buildingZoom
      this.broadSceneId = mapDetail.id
      this.buildLayerKey = 'buildArea_' + this.broadBuildingZoom // 楼栋设备所在的层LayerKey
      this.maxZoom = mapDetail.maxZoom
      this.minZoom = mapDetail.minZoom + 2
      this.currentZoom = parseInt(initZoomLevel)
      // 请求固定点位和区域,并做相应的缓存
      this.getFixedMarkers(mapDetail.id, this.currentZoom, true)
      setTimeout(function () {
        vueData.markerRefresh()
      }, 10 * 60 * 1000)
      this.getAreaList(mapDetail.id)
      // 初始化地图后添加保安点位
      this.getSecurityManyTimes()
      // 初始化地图后添加住户访客陌生人点位
      this.getMapSetting()
      this.getAddRobotList({ sceneId: mapDetail.id })
      this.getAddGuidepostList({ sceneId: mapDetail.id })
      this.getAddWarnList({ sceneId: mapDetail.id })
      // 地图上注册点击事件
      this.mapObj.regEventListener('moveend', this.onMoveendHandler)
      this.mapObj.regEventListener('singleclick', this.onClickMapHandler)
      this.mapObj.regEventListener('zoomChange', this.onZoomChangeHandler)
    },
    /**
     * 将点位列表加载在指定图层上
     * @augments {array} markerList 点位数组
     * @augments {string} layerkey 图层名称
     */
    showMarkers: function (markerList, layerkey) {
      // 批量添加点位信息
      this.mapObj.addMarkers(markerList, markerScale, layerkey)
    },
    /**
     * 将点位列表加载在指定图层上
     * @augments {array} markerList 点位数组
     * @augments {string} layerkey 图层名称
     */
    clearZoomLayers: function () {
      for (let key in this.datalist) {
        if (key !== 'all') {
          let curLayer = this.datalist[key].icon + 'Layer_' + this.currentZoom
          this.removeLayerMarkers(curLayer)
        }
      }
    },
    /**
     * 请求区域列表,并格式化后缓存(最后的版本需要去掉addAreas的步骤)
     * @augments {string} sceneId 场景id
     */
    getAreaList: function (sceneId) {
      let params = {}
      params.sceneId = sceneId
      getAreaListData(params).then(res => {
        initAreaMap(res)
        this.buildAreaList = getAreaMapByType(2)
        let sty = {
          fillColor: 'rgba(100,149,237,0.2)',
          strokeColor: '#1E90FF',
          strokeWidth: 2
        }
        this.mapObj.addAreas(this.buildAreaList, sty)
      })
    },
    /**
     * 请求点位列表,并将点位列表缓存,加载
     * @augments {string} sceneId 场景id
     * @augments {number} zoomLevel 地图放大等级
     */
    getFixedMarkers: function (sceneId, zoomLevel, islimited) {
      let params = {}
      if (islimited) {
        params.limitZoomLevel = zoomLevel
      } else {
        params.zoomLevel = zoomLevel
      }
      params.sceneId = sceneId
      params.inBuilding = 0
      getMarkerListData(params).then(res => {
        if (res) {
          let markerList = fixedMarkerListFormat(res)
          if (islimited) {
            for (let i = 0; i < zoomLevel + 1; i++) {
              let listKey = this.broadSceneId + '_' + i
              setMarkerMap(listKey, [])
            }
          } else {
            let listKey = this.broadSceneId + '_' + this.currentZoom
            setMarkerMap(listKey, [])
          }
          this.clearZoomLayers()
          this.showMarkers(markerList)
          for (let key in this.datalist) {
            if (key !== 'all') {
              !this.datalist[key].isActived && this.mapObj.hideMarkers(key)
            } else {
              if (this.datalist.all.isActived) {
                break
              }
            }
          }
        }
      }).catch(err => {
        console.warn(LOG_TAG + 'get markerList failed')
        console.warn(err)
      })
    },
    /**
     * 判断是否是进入/移出楼栋区域,并作相应操作
     * @augments
     */
    chargeInBuild: function () {
      // eslint-disable-next-line
      let viewCenter = hdmap.utils.getVisibleAreaCenter(this.mapObj)
      // console.log(viewCenter)
      let localArea = null
      let isInBuild = false
      if (this.currentZoom >= this.broadBuildingZoom) {
        let buildAreaList = this.buildAreaList
        let areaLength = buildAreaList.length
        for (let i = 0; i < areaLength; i++) {
          // eslint-disable-next-line
          let inOrOut = hdmap.utils.judgePointInsidePolygon(viewCenter, buildAreaList[i].borderPoints[0])
          if (inOrOut === 'in' || inOrOut === 'on') {
            localArea = buildAreaList[i]
            isInBuild = true
            break
          }
        }
      }
      if (localArea === this.broadArea) {
        return false
      }
      this.broadArea = localArea
      this.curFloorType = this.defaultFloorType // 每次切换或者退出楼栋区域，都把楼层设置为默认层
      if (isInBuild) {
        console.log('the center is in one of areas')
        this.$refs.controlBar.changeFloorStatus({ floortype: this.curFloorType, showFloor: true }) // 调用子组件方法，显示楼层控制按钮
        this.getBuildingMarkerData()
      } else {
        this.removeLayerMarkers(this.buildLayerKey)
        this.$refs.controlBar.changeFloorStatus({ floortype: this.curFloorType, showFloor: false }) // 调用子组件方法，隐藏楼层控制按钮
        console.log('the center is in none of areas')
      }
    },
    /**
     * 拖动主地图放开鼠标时
     * @augments {String} buttonName 按钮类型名称
     */
    onMoveendHandler: function () {
      this.chargeInBuild()
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
          if (!obj.isActived && key !== 'all') {
            isAll = false
          }
        }
        this.datalist['all'].isActived = isAll
      }
      // 隐藏保安、机器人设备时，把其相关的路线也移除掉 (保安、机器人路线功能已暂时去掉，所以先注释此段代码 mod by zmj 20180418)
      // if ((buttonName === 'guard' && this.lineType === 'guarder') || (buttonName === 'robot' && this.lineType === 'robot') || (buttonName === 'all' && !isAll)) {
      //   if (this.lineInfo && this.lineInfo.id) this.clearLineLayer()
      // }
      // 判断当前是否已显示楼栋区域，若是则需要根据控制栏显示区域设备
      if (this.broadArea) this.getBuildingMarkerData()
    },
    /**
     * 地图点击事件监听
     * @augments e
     */
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
          let px = e.mapEvent.pageX
          let py = e.mapEvent.pageY
          if (e.mapEvent.originalEvent) {
            px = e.mapEvent.originalEvent.pageX
            py = e.mapEvent.originalEvent.pageY
          }
          animatePoint = {
            x: px,
            y: py
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
     * 地图缩放事件监听
     * @augments e
     */
    onZoomChangeHandler: function (e) {
      let zoomInt = parseInt(e.zoom)
      if (zoomInt !== this.currentZoom) {
        this.currentZoom = zoomInt
        let listKey = this.broadSceneId + '_' + zoomInt
        let markerObj = getMarkerMap(listKey)
        if (!markerObj || (markerObj && ((new Date().getTime() - markerObj.lastTime) > 60000))) {
          this.getFixedMarkers(this.broadSceneId, zoomInt)
        }
        console.log('当前  zoom = ' + zoomInt)
      }
    },
    /**
     * 处理'切换园区和停车场场景'事件
     * params{int} flag：1园区，0停车场
     */
    onSceneChangeHandler: function (flag) {
      this.$emit('onMapChange', flag)
    },
    /**
     * 处理'放大、缩小地图'事件
     * params flag: 1放大地图，2缩小地图
     */
    onMapZoomChangeHandler: function (flag) {
      if (this.isEmpty) return
      let curZoom = parseInt(this.mapObj.getZoom())
      if (flag === 1 && curZoom >= this.maxZoom) {
        return
      }
      if (flag === 2 && curZoom <= this.minZoom) {
        return
      }
      flag === 1 ? curZoom++ : curZoom--
      this.mapObj.setZoom(curZoom)
    },
    /**
     * 处理'选择停车场楼层'事件
     * params{String} flag：F30、F1、B1
     */
    onFloorChangeHandler: function (flag) {
      if (this.curFloorType === flag) {
        return
      }
      this.curFloorType = flag
      this.getBuildingMarkerData()
    },
    /**
     * 获取楼栋区域对应层的设备数据
     * params 楼层类型: F30 F1 B1
     */
    getBuildingMarkerData: function () {
      this.removeLayerMarkers(this.buildLayerKey) // 移除不是当前层的设备
      let listKey = this.broadArea.id + '_' + this.curFloorType // 楼栋区域的layerkey = areaId +'_'+ floor_type  组成
      let marlist = getMarkerMap(listKey)
      if (!marlist || ((new Date().getTime() - marlist.lastTime) > 60000)) {
        let params = {}
        params.sceneId = this.broadSceneId
        params.areaId = this.broadArea.id
        params.floorType = this.curFloorType
        getMarkerListData(params).then(res => {
          if (res) {
            console.log('********获取到楼栋设备信息*******')
            marlist = fixedMarkerListFormat(res)
            // 把楼栋对应层的设备数据保存到缓存map里
            setMarkerMap(listKey, marlist)
            // 根据地图设备控制按钮，筛选当前可显示的设备种类
            let list = this.filterBuildMarkers(marlist)
            // 把楼栋对应楼层区域的设备，添加到指定layerKey的地图层上
            this.showMarkers(list, this.buildLayerKey)
          }
        }).catch(err => {
          console.warn(LOG_TAG + 'get markerList failed')
          console.warn(err)
        })
      } else {
        // 把楼栋对应楼层区域的设备，添加到指定layerKey的地图层上
        let list = this.filterBuildMarkers(marlist.data)
        this.showMarkers(list, this.buildLayerKey)
      }
    },
    /**
     * 过滤楼栋设备信息，去掉控制栏指定了不可显示的设备
     */
    filterBuildMarkers: function (list) {
      if (this.datalist['all'].isActived) {
        return list
      }
      let arr = list.filter((ele) => {
        return this.datalist[ele.markerType].isActived
      })
      return arr
    },
    /**
     * 清空指定设备层的设备
     * @params {String} _layerkey 层id
     */
    removeLayerMarkers: function (_layerkey) {
      let layer = this.mapObj.getLayerByKey(_layerkey)
      if (layer) {
        let source = layer.getSource()
        if (source) {
          source.clear()
        }
      }
    },
    markerRefresh: function () {
      setTimeout(function () {
        vueData.markerRefresh()
      }, 10 * 60 * 1000)
      vueData.getFixedMarkers(vueData.broadSceneId, vueData.currentZoom, true)
    }
  },
  mixins: [addMarkersDialog],
  mounted () {
    vueData = this
    let param = { sceneType: 1 }
    getSceneListData(param).then(res => {
      if (res && res.length === 1) {
        try {
          this.mapInit(res[0])
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
  },
  created () {
    //   getTypes().then(types => {
    //     console.log('all types:', types)
    //   })
    //   getDevices(2).then(device => {
    //     console.log('device info:', device)
    //   })
  }
}
</script>

<style scoped>

</style>
