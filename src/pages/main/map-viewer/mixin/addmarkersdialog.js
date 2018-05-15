import icoRobotNormal from '@/pages/main/map-viewer/assets/images/ico_robot_normal.png'
import icoRobotAbnormal from '@/pages/main/map-viewer/assets/images/ico_robot_abnormal.png'
import icoSignpostNormal from '@/pages/main/map-viewer/assets/images/ico_signpost_normal.png'
import icoSignpostAbnormal from '@/pages/main/map-viewer/assets/images/ico_signpost_abnormal.png'
import icoSecurityNormal from '@/pages/main/map-viewer/assets/images/ico_security_normal.png'
// import icoSecurityAbnormal from '@/pages/main/map-viewer/assets/images/ico_security_abnormal.png'
import icoHouseholdNormal from '@/pages/main/map-viewer/assets/images/ico_household_normal.png'
import icoVisitorNormal from '@/pages/main/map-viewer/assets/images/ico_visitor_normal.png'
import icoStrangerNormal from '@/pages/main/map-viewer/assets/images/ico_stranger_normal.png'
import icoFenceNormal from '@/pages/main/map-viewer/assets/images/ico_fence_normal.png'
import icoFenceAbnormal from '@/pages/main/map-viewer/assets/images/ico_fence_abnormal.png'

import icoCameraNormal from '@/pages/main/map-viewer/assets/images/ico_camera_normal.png'
import icoBroadCastNormal from '@/pages/main/map-viewer/assets/images/ico_broadcast_normal.png'
import icoGatesNormal from '@/pages/main/map-viewer/assets/images/ico_gates_normal.png'
import icoBrakeNormal from '@/pages/main/map-viewer/assets/images/ico_brake_normal.png'
import icoControlNormal from '@/pages/main/map-viewer/assets/images/ico_control_normal.png'
import icoElevatorNormal from '@/pages/main/map-viewer/assets/images/ico_elevator_normal.png'

import icoCameraAbnormal from '@/pages/main/map-viewer/assets/images/ico_camera_abnormal.png'
import icoBroadCastAbnormal from '@/pages/main/map-viewer/assets/images/ico_broadcast_abnormal.png'
import icoGatesAbnormal from '@/pages/main/map-viewer/assets/images/ico_gates_abnormal.png'
import icoBrakeAbnormal from '@/pages/main/map-viewer/assets/images/ico_brake_abnormal.png'
import icoControlAbnormal from '@/pages/main/map-viewer/assets/images/ico_control_abnormal.png'
import icoElevatorAbnormal from '@/pages/main/map-viewer/assets/images/ico_elevator_abnormal.png'
import { markerScale, getdeviceFormCode } from '@/pages/main/map-viewer/assets/js/util'
import {
  getSecurityListData,
  getHouseholdVisitorStrangerData,
  getRobotData,
  getGuidepostData,
  getWarnData,
  getMarkerInfoData,
  getMapSettingData
  // getRobotLine,getMarkerInfoData
  // getGuarderLine
} from '@/pages/main/api/map-view'
import controller from '@/pages/main/controller'
var tempParam = null
const expressRobots = {
  data () {
    return {
      securityList: [],
      lineType: '',
      lineInfo: {},
      getSecurityManyTime: null,
      requestpeople: null,
      count1: 0, // 一级警报数目
      count2: 0 // 二级警报数目
    }
  },
  mounted: function () {
    tempParam = this
    controller.register({
      key: 'map-allList-info',
      range: [0, 1000000],
      callback: (info, data) => {
        // console.log(info)
        // console.log(data)
        tempParam.onWSPush(data)
      }
    })
  },
  destroyed () {
    this.clearSecurityInterval()
    this.clearPeople()
  },
  methods: {
    /**
     * @description 保安点位轮询
     */
    getSecurityManyTimes () {
      this.getSecurityList({ isOnLine: 1 })
      this.getSecurityManyTime = setInterval(() => { this.getSecurityList({ isOnLine: 1 }) }, 10 * 1000)
    },
    /**
     * @description
     */
    clearSecurityInterval () {
      clearInterval(tempParam.getSecurityManyTime)
    },
    /**
     * @description 获取保安点位
     */
    getSecurityList: function (param) {
      getSecurityListData(param)
        .then(res => {
          // console.log(res)
          tempParam.securityList = res
          tempParam.addSecurityMarker(res)
        })
        .catch(err => {
          console.warn(err)
        })
    },
    /**
     * @description 添加保安点位
     */
    addSecurityMarker: function (markerList) {
      tempParam.mapObj.removeLayerByLayerKey('guarderLayer')
      for (let j = 0; j < markerList.length; j++) {
        if (markerList[j].longitude && markerList[j].latitude) {
          // 将点位的GPS坐标转换后设为点位坐标
          let securityPositionGPS = [markerList[j].longitude, markerList[j].latitude]
          let securityPositionXY = tempParam.mapObj.transfromWGSToBitMap(securityPositionGPS)
          let marker = {}
          marker.id = markerList[j].userId
          marker.markerType = 'guarder'
          marker.markerName = markerList[j].name
          marker.position = securityPositionXY
          marker.imgUrl = icoSecurityNormal
          marker.info = markerList[j]
          // 添加的点位
          markerList[j].userId && tempParam.mapObj.addMarker(marker, markerScale)
        }
      }
      !this.datalist['guarder'].isActived && this.mapObj.hideMarkers('guarder')
    },
    /**
     * @description 获取住户访客陌生人点位
     */
    getHouseholdVisitorStrangerList: function (param) {
      var durationTime
      if (param) {
        durationTime = param
      } else {
        durationTime = { duration: 15 * 1000 }
      }
      getHouseholdVisitorStrangerData(durationTime).then(res => {
        // console.log('获取住户访客陌生人点位', res)
        tempParam.mapObj.removeLayerByLayerKey('householdsLayer')
        tempParam.mapObj.removeLayerByLayerKey('visitorLayer')
        tempParam.mapObj.removeLayerByLayerKey('strangerLayer')
        if (res.length === 0) {
          return
        }
        this.addHouseholdVisitorStrangerMarkers(res)
      })
        .catch(err => {
          console.warn(err)
        })
    },
    /**
     * @description 从接口中请求查询人员列表轮询时间和更新时间
     */
    getMapSetting: function () {
      getMapSettingData({ configType: '2' }).then(res => {
        // console.log(res)
        if (res instanceof Array && res[0].configName === 'search_interval' && res[1].configName === 'search_range') {
          tempParam.getHouseholdVisitorStrangerList({ duration: res[1].configValue * 1000 })
          tempParam.setIntervalPeople(res[0].configValue, res[1].configValue)
        } else if (res instanceof Array && res[1].configName === 'search_interval' && res[0].configName === 'search_range') {
          tempParam.getHouseholdVisitorStrangerList({ duration: res[0].configValue * 1000 })
          tempParam.setIntervalPeople(res[1].configValue, res[0].configValue)
        } else {
          tempParam.getHouseholdVisitorStrangerList()
          tempParam.setIntervalPeople()
        }
      })
        .catch(err => {
          tempParam.getHouseholdVisitorStrangerList()
          tempParam.setIntervalPeople()
          console.log(err)
        })
    },
    setIntervalPeople (searchInterval, searchRange) {
      if (this.requestpeople) { tempParam.clearPeople() }
      let interval = searchInterval || 10
      let range = searchRange || 15
      this.requestpeople = setInterval(() => {
        this.getHouseholdVisitorStrangerList({ duration: range * 1000 })
      }, interval * 1000)
    },
    clearPeople () {
      clearInterval(this.requestpeople)
    },
    /**
     * @description 添加住户访客陌生人点位
     * @param {object} 住户访客陌生人对象
     */
    addHouseholdVisitorStrangerMarkers: function (allList) {
      // console.log(allList)
      for (let i = 0; i < allList.length; i++) {
        try {
          tempParam.addHouseholdVisitorStrangerMarker(allList[i])
        } catch (err) {
          console.log(err)
        }
      }
      !this.datalist['households'].isActived &&
        this.mapObj.hideMarkers('households')
      !this.datalist['visitor'].isActived && this.mapObj.hideMarkers('visitor')
      !this.datalist['stranger'].isActived &&
        this.mapObj.hideMarkers('stranger')
    },
    addHouseholdVisitorStrangerMarker: function (markerItem) {
      var icon, type, scale, name
      let markerInfo = markerItem.eventHeader
      switch (markerInfo.userType) {
        case '1':
          icon = icoHouseholdNormal
          type = 'households'
          name = '住户'
          scale = {
            scale: 0.167
          }
          break
        case '2':
          icon = icoVisitorNormal
          type = 'visitor'
          scale = markerScale
          name = '访客'
          break
        case '4':
          icon = icoStrangerNormal
          type = 'stranger'
          scale = markerScale
          name = '未登记'
          break
      }
      if (markerInfo.eventGPS && markerInfo.eventGPS.lon && markerInfo.eventGPS.lat) {
        // 将住户访客陌生人的GPS坐标转换后设为坐标
        let householdVisitorStrangerPositionGPS = [markerInfo.eventGPS.lon, markerInfo.eventGPS.lat]
        let householdVisitorStrangerPositionXY = tempParam.mapObj.transfromWGSToBitMap(householdVisitorStrangerPositionGPS)
        let marker = {}
        marker.id = (markerInfo.userType === '4') ? markerInfo.eventId : markerInfo.userId
        marker.markerType = type
        marker.position = householdVisitorStrangerPositionXY
        marker.imgUrl = icon
        marker.info = markerItem
        marker.markerName = name
        // 添加住户访客陌生人的点位
        marker.id && tempParam.mapObj.addMarker(marker, scale)
      }
    },
    /**
     * @description 获取快递机器人点位信息并添加机器人点位
     */
    getAddRobotList: function (param) {
      getRobotData(param).then(res => {
        // console.log(res)
        tempParam.addRobotMarker(res)
      })
        .catch(err => {
          console.warn(err)
        })
    },
    addRobotMarker: function (markerList) {
      tempParam.mapObj.removeLayerByLayerKey('robotLayer')
      if (tempParam.mapObj.mapConfig.scaleType === 1 || tempParam.mapObj.mapConfig.scaleType === '1') {
        for (let j = 0; j < markerList.length; j++) {
          if (markerList[j].lon && markerList[j].lat) {
            // 将点位的GPS坐标转换后设为点位坐标
            let robotPositionGPS = [markerList[j].lon, markerList[j].lat]
            let robotPositionXY = tempParam.mapObj.transfromWGSToBitMap(robotPositionGPS)
            let marker = {}
            marker.id = markerList[j].robot
            marker.position = robotPositionXY
            marker.markerType = 'robot'
            marker.markerName = markerList[j].robot
            marker.imgUrl = (markerList[j].error === 'E00') ? icoRobotNormal : icoRobotAbnormal
            marker.markerStatus = (markerList[j].error === 'E00') ? 101 : 102
            marker.info = markerList[j]
            // 添加的点位
            markerList[j].robot && tempParam.mapObj.addMarker(marker, markerScale)
          }
          !tempParam.datalist['robot'].isActived && tempParam.mapObj.hideMarkers('robot')
        }
      }
    },
    /**
     * @description 获取电子指路牌点位信息并添加指路牌点位
     */
    getAddGuidepostList: function (param) {
      getGuidepostData(param).then(res => {
        // console.log('指路牌' + res)
        let markerList = JSON.parse(res.info)
        tempParam.addGuidepostMarker(markerList)
      })
        .catch(err => {
          console.warn(err)
        })
    },
    /**
     * @description 添加电子指路牌
     */
    addGuidepostMarker: function (markerList) {
      tempParam.mapObj.removeLayerByLayerKey('signpostLayer')
      if (tempParam.mapObj.mapConfig.scaleType === 1 || tempParam.mapObj.mapConfig.scaleType === '1') {
        tempParam.guidepostList = markerList
        for (let j = 0; j < markerList.length; j++) {
          if (markerList[j].lon && markerList[j].lat) {
            // 将点位的GPS坐标转换后设为点位坐标
            let guidepostPositionGPS = [Number(markerList[j].lon), Number(markerList[j].lat)]
            let guidepostPositionXY = tempParam.mapObj.transfromWGSToBitMap(guidepostPositionGPS)
            // 添加的点位
            let marker = {}
            marker.id = markerList[j].cellid + markerList[j].addrid
            marker.position = guidepostPositionXY
            marker.markerType = 'signpost'
            marker.imgUrl = (markerList[j].status === '1') ? icoSignpostNormal : icoSignpostAbnormal
            marker.markerStatus = (markerList[j].status === '1') ? 101 : 102
            marker.info = markerList[j]
            marker.markerName = '电子指路牌'
            markerList[j].cellid && tempParam.mapObj.addMarker(marker, markerScale)
          }
          !tempParam.datalist['signpost'].isActived && tempParam.mapObj.hideMarkers('signpost')
        }
      }
    },
    /**
     * @description 机器人路线
     * @param {} 机器人Id
     */
    /*
    轨迹的都不做了，对应的代码先注释，功能函数保留，加注释
    getRobotRouteLine: function (position) {
      if (this.lineInfo && this.lineInfo.id) this.clearLineLayer()
      getRobotLine().then(res => {
        this.lineType = 'robot'
        console.log(res)
        this.lineInfo.id = res.id
        this.lineInfo.borderPoints = res.borderPoints
        this.lineInfo.borderPoints.push(position)
        console.log(this.lineInfo)
        tempParam.mapObj.addLine(this.lineInfo, { color: 'yellow', width: 4, lineDash: [5, 10] })
        tempParam.mapObj.addMarker({ id: 'line', position: res.borderPoints[0], imgUrl: lineStart, markerType: 'line' })
      })
        .catch(err => {
          console.warn(err)
        })
    },
    */
    /**
     * @description 保安路线
     * @param {Obj} 保安对象
     */
    /*
    轨迹的都不做了，对应的代码先注释，功能函数保留，加注释
    getGuarderRouteLine: function (markerInfo) {
      if (this.lineInfo && this.lineInfo.id) this.clearLineLayer()
      getGuarderLine({ userId: markerInfo.id }).then(res => {
        console.log(res)
        this.lineType = 'guarder'
        this.lineInfo.id = res.userId
        this.lineInfo.borderPoints = []
        for (let i = 0; i < res.gpsList.length; i++) {
          this.lineInfo.borderPoints.push(tempParam.mapObj.transfromWGSToBitMap([res.gpsList[i].longitude, res.gpsList[i].latitude]))
        }
        this.lineInfo.borderPoints.push(markerInfo.position)
        console.log(this.lineInfo.borderPoints)
        tempParam.mapObj.addLine(this.lineInfo, { color: 'red', width: 4, lineDash: [5, 10] })
        tempParam.mapObj.addMarker({ id: 'line', position: this.lineInfo.borderPoints[0], imgUrl: lineStart, markerType: 'line' })
      })
        .catch(err => {
          console.warn(err)
        })
    },
    */
    /*
    轨迹的都不做了，对应的代码先注释，功能函数保留，加注释
    clearLineLayer: function () {
      let layer = this.mapObj.getLayerByKey('lineLayer')
      if (layer) {
        let source = layer.getSource()
        source.clear()
      }
    },
    */
    /**
     * 更改'报警事件'当前数量
     * flag: 1是一级警报，2是二级警报
     */
    changeWarningMessageCount: function (flag) {
      if (flag === 1) {
        tempParam.$store.commit('setSceneMessage', { type: 'primary_danger', count: tempParam.count1 })
      } else {
        tempParam.$store.commit('setSceneMessage', { type: 'second_warn', count: tempParam.count2 })
      }
    },
    /**
     * @description 获取报警点位
     */
    getAddWarnList: function (param) {
      getWarnData(param).then(res => {
        // console.log('预警点', res)
        let markerList = res
        if (res.length === 0) {
          return
        }
        for (let j = 0; j < markerList.length; j++) {
          let markerInfo = markerList[j].eventHeader
          let markerTextAndtype = tempParam.getEventContent(markerInfo.eventType, markerList[j])
          if (!markerTextAndtype) {
            return
          }
          try {
            if (markerInfo.eventType === '40020') {
              tempParam.seeAndCallWarn(markerInfo, markerList[j])
              return
            }
            tempParam.addWsWarnMarker(markerInfo, markerList[j])
          } catch (err) {
            console.warn(err)
          }
        }
        tempParam.changeWarningMessageCount(1) // 更新‘一级警报’数目事件
        tempParam.changeWarningMessageCount(2) // 更新‘二级警报’数目事件
      })
        .catch(err => {
          console.warn(err)
        })
    },
    /**
     * @description 通过预警类型判断eventContent
     */
    getEventContent: function (eventType, message) {
      let eventContent = ''
      let status = ''
      switch (eventType) {
        case '25020':
          eventContent = '落水预警'
          status = 'danger'
          break
        case '25019':
          eventContent = '越界预警'
          status = 'danger'
          break
        case '25022':
          eventContent = '人员徘徊'
          status = 'warn'
          break
        case '25306':
          eventContent = '车辆违停'
          status = 'warn'
          break
        case '25051':
          eventContent = '重点人员'
          status = 'warn'
          break
        case '70050':
          eventContent = '保安异常'
          status = 'warn'
          break
        case '93002':
          eventContent = '机器人超时'
          status = 'warn'
          break
        case '93003':
          eventContent = '机器人低电量'
          status = 'warn'
          break
        case '93004':
          eventContent = '机器人偏离路线'
          status = 'warn'
          break
        case '70051':
          eventContent = '巡更报事'
          status = 'warn'
          break
        case '91001':
          eventContent = '电子围栏园区越界'
          status = 'danger'
          break
        case '40020':
          eventContent = tempParam.judgeCallType(message.eventBody)
          status = 'warn'
          break
        default:
          console.log('非预警')
          break
      }
      return { eventContent, status }
    },
    /**
     * @description 添加报警点
     */
    addWsWarnMarker: function (marker, message) {
      let markerTextAndtype = tempParam.getEventContent(marker.eventType, message)
      markerTextAndtype.status === 'danger' ? tempParam.count1++ : tempParam.count2++ // 统计警报数目
      if (marker.eventGPS && marker.eventGPS.lon && marker.eventGPS.lat) {
        // 将点位的GPS坐标转换后设为点位坐标
        let warnPositionXY = tempParam.mapObj.transfromWGSToBitMap([marker.eventGPS.lon, marker.eventGPS.lat])
        try {
          if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(warnPositionXY)) {
            return
          }
          // 添加的点位
          let markerInfo = {}
          markerInfo.id = marker.eventId
          markerInfo.position = warnPositionXY
          markerInfo.text = markerTextAndtype.eventContent
          markerInfo.type = markerTextAndtype.status
          markerInfo.markerType = marker.eventType
          markerInfo.info = message
          marker.eventId && tempParam.mapObj.addWarningPopup(markerInfo)
        } catch (err) {
          console.log(err)
        }
      }
    },
    /**
     * @description 设备故障设备点位查询
     */
    getequipmentMarker: async (message, type, img, status) => {
      if (!message.eventHeader.deviceId) {
        return
      }
      let elevatorMarkerInfoAnother = await getMarkerInfoData({ deviceId: message.eventHeader.deviceId }).then(res => {
        return res
      })
      if (elevatorMarkerInfoAnother && elevatorMarkerInfoAnother.length > 0) {
        if (elevatorMarkerInfoAnother instanceof Array) {
          for (let i = 0; i < elevatorMarkerInfoAnother.length; i++) {
            if (elevatorMarkerInfoAnother[i].sceneId === tempParam.broadSceneId) {
              tempParam.equipmentFailure(elevatorMarkerInfoAnother[i], type, img, status)
            }
          }
        }
      }
    },
    /**
     * @description 设备更改点位
     */
    equipmentFailure (elevatorMarkerInfoAnother, type, img, status) {
      // 添加的点位
      elevatorMarkerInfoAnother.imgUrl = img
      elevatorMarkerInfoAnother.markerType = type
      elevatorMarkerInfoAnother.markerStatus = status
      elevatorMarkerInfoAnother.position = [elevatorMarkerInfoAnother.positionX, elevatorMarkerInfoAnother.positionY]
      delete elevatorMarkerInfoAnother.positionX
      delete elevatorMarkerInfoAnother.positionY
      tempParam.mapObj.updateMarker(elevatorMarkerInfoAnother, markerScale)
    },
    /**
     * @description 可视呼叫
     */
    seeAndCallWarn: async (markerInfo, message) => {
      if (!message.eventHeader.deviceId) {
        return
      }
      let elevatorMarkerInfoAnother = await getMarkerInfoData({ deviceId: message.eventHeader.deviceId }).then(res => {
        return res
      })
      if (elevatorMarkerInfoAnother && elevatorMarkerInfoAnother.length > 0) {
        if (elevatorMarkerInfoAnother instanceof Array) {
          for (let i = 0; i < elevatorMarkerInfoAnother.length; i++) {
            if (elevatorMarkerInfoAnother[i].sceneId === tempParam.broadSceneId) {
              tempParam.seeAndCallWarnMarker(markerInfo, elevatorMarkerInfoAnother[i], message)
            }
          }
        }
      } else {
        if (markerInfo.eventGPS.lon && markerInfo.eventGPS.lat) {
          let marker = {}
          marker.id = markerInfo.eventId
          let warnPositionXY = tempParam.mapObj.transfromWGSToBitMap([markerInfo.eventGPS.lon, markerInfo.eventGPS.lat])
          if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(warnPositionXY)) {
            return
          }
          marker.position = warnPositionXY
          marker.text = tempParam.judgeCallType(message.eventBody)
          marker.type = 'warn'
          marker.markerType = markerInfo.eventType
          marker.info = message
          markerInfo.eventId && tempParam.mapObj.addWarningPopup(marker)
        }
      }
    },
    /**
     * @description 添加可视呼叫点位
     */
    seeAndCallWarnMarker: function (markerInfo, elevatorMarkerInfoAnother, message, position) {
      let marker = {}
      marker.id = markerInfo.eventId
      marker.position = [elevatorMarkerInfoAnother.positionX, elevatorMarkerInfoAnother.positionY]
      if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(marker.position)) {
        return
      }
      marker.text = tempParam.judgeCallType(message.eventBody)
      marker.type = 'warn'
      marker.markerType = markerInfo.eventType
      marker.info = message
      markerInfo.eventId && tempParam.mapObj.addWarningPopup(marker)
    },
    judgeCallType: function (eventBody) {
      let text = ''
      let callNum = eventBody.callNum
      callNum = callNum.substring(0, 2)
      // eslint-disable-next-line
      if (callNum == '04') {
        text = '室内机呼叫'
        return text
      }
      let num = eventBody.orgType
      switch (num) {
        case '8':
          text = '车闸呼叫'
          break
        case '11':
          text = '电梯呼叫'
          break
        default:
          text = '门禁呼叫'
          break
      }
      return text
    },
    /**
     * @description 一键清理预警方法
     */
    batchRelease: function () {
      this.mapObj.clearWarningPopup()
      tempParam.count1 = 0
      tempParam.count2 = 0
      tempParam.changeWarningMessageCount(1) // 更新‘一级警报’数目事件
      tempParam.changeWarningMessageCount(2) // 更新‘二级警报’数目事件
      this.getAddWarnList()
    },
    /**
     * @description 监听事件推送
     */
    onWSPush: function (data) {
      if (typeof data.type !== 'string' || !data.info) {
        console.log('data.type note string or not info')
        return
      }
      let message = JSON.parse(data.info)
      // console.log(data)
      // console.log(message)
      // console.log(data.type)
      let markerInfo = message.eventHeader
      // debugger
      switch (data.type) {
        case '999999':
          tempParam.batchRelease()
          break
        case '25020':
        case '25019':
        case '91001':
          // 人工湖落水 园区越界 电子围栏园区越界
          markerInfo.id = markerInfo.eventId
          if (markerInfo.eventStatus === '4') {
            if (tempParam.count1 > 0) tempParam.count1--
            markerInfo.eventId && tempParam.mapObj.removeWarningPopup(markerInfo.id)
          } else if (markerInfo.eventStatus === '99') {
            tempParam.addWsWarnMarker(markerInfo, message)
          }
          tempParam.changeWarningMessageCount(1)
          break
        case '25022':
        case '25306':
        case '25051':
        case '70051':
          // 人员徘徊： 25022 车辆违停：25306 重点人员：25051 保安异常：70050 机器人异常:
          // 机器人超时报警93002 机器人低电量报警93003 机器人偏离路线报警93004 巡更报事：70051
          markerInfo.id = markerInfo.eventId
          if (markerInfo.eventStatus === '4') {
            if (tempParam.count2 > 0) tempParam.count2--
            markerInfo.eventId && tempParam.mapObj.removeWarningPopup(markerInfo.id)
          } else if (markerInfo.eventStatus === '99') {
            tempParam.addWsWarnMarker(markerInfo, message)
          }
          tempParam.changeWarningMessageCount(2)
          break
        case '93010':
          tempParam.addRobotMarker(message)
          break
        case '40020':
          // 可视对讲呼叫 {deviceId: '1002200100016C06A011'}
          tempParam.seeAndCallWarn(markerInfo, message)
          break
        case '40021':
          // 可视对讲挂断
          if (markerInfo.eventId) {
            markerInfo.id = markerInfo.eventId
            tempParam.mapObj.removeWarningPopup(markerInfo.id)
          }
          break
        // case '70050': // 保安异常
        //   tempParam.getequipmentMarker(message, 'guarder', icoSecurityAbnormal, 102)
        //   break
        // case '70000':
        //   // 巡更上报GPS
        //   if (markerInfo.eventGPS.longitude && markerInfo.eventGPS.latitude) {
        //     // 将点位的GPS坐标转换后设为点位坐标
        //     let securityPositionGPS = [markerInfo.eventGPS.longitude, markerInfo.eventGPS.latitude]
        //     let securityPositionXY = tempParam.mapObj.transfromWGSToBitMap(securityPositionGPS)
        //     // 添加的点位
        //     markerInfo.deviceId && tempParam.mapObj.addMarker({
        //       id: markerInfo.deviceId,
        //       markerType: 'guarder',
        //       position: securityPositionXY,
        //       imgUrl: icoSecurityNormal,
        //       info: message
        //     }, markerScale)
        //     for (let i = 0; i < tempParam.securityList.length; i++) {
        //       if (tempParam.securityList[i].id === markerInfo.deviceId) {
        //         tempParam.securityList.splice(i, 1, message)
        //       }
        //     }
        //     !this.datalist['guarder'].isActived && this.mapObj.hideMarkers('guarder')
        //   }
        //   break
        case '94001':
          tempParam.addGuidepostMarker(message)
          break
        case '20113':
        case '20114':
          // 摄像机人脸检测20113 摄像机人脸识别20114 门禁人脸抓拍记录30023
          tempParam.addHouseholdVisitorStrangerMarker(message)
          !tempParam.datalist['households'].isActived && tempParam.mapObj.hideMarkers('households')
          !tempParam.datalist['visitor'].isActived && tempParam.mapObj.hideMarkers('visitor')
          !tempParam.datalist['stranger'].isActived && tempParam.mapObj.hideMarkers('stranger')
          // console.log('人员')
          break
        case '91105':
          tempParam.getequipmentMarker(message, 'fence', icoFenceAbnormal, 902)
          break
        case '91106':
          tempParam.getequipmentMarker(message, 'fence', icoFenceNormal, 901)
          break
        case '90010':
          // console.log('设备故障')
          let device = getdeviceFormCode(message.eventBody.deviceType)
          let isDeviceNormal = (message.eventBody.device_status === true || message.eventBody.device_status === 'true')
          switch (device) {
            case 'camera':
              // 摄像头
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'camera', icoCameraNormal, 101)
              } else {
                tempParam.getequipmentMarker(message, 'camera', icoCameraAbnormal, 102)
              }
              break
            case 'broadcast':
              // 广播
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'broadcast', icoBroadCastNormal, 201)
              } else {
                tempParam.getequipmentMarker(message, 'broadcast', icoBroadCastAbnormal, 202)
              }
              break
            case 'gates':
              // 人行道闸
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'gates', icoGatesNormal, 401)
              } else {
                tempParam.getequipmentMarker(message, 'gates', icoGatesAbnormal, 402)
              }
              break
            case 'brake':
              // 车闸
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'brake', icoBrakeNormal, 501)
              } else {
                tempParam.getequipmentMarker(message, 'brake', icoBrakeAbnormal, 502)
              }
              break
            case 'control':
              // 门禁
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'control', icoControlNormal, 601)
              } else {
                tempParam.getequipmentMarker(message, 'control', icoControlAbnormal, 602)
              }
              break
            case 'elevator':
              // 电梯
              if (isDeviceNormal) {
                tempParam.getequipmentMarker(message, 'elevator', icoElevatorNormal, 801)
              } else {
                tempParam.getequipmentMarker(message, 'elevator', icoElevatorAbnormal, 802)
              }
              break
          }
          break
        default:
          // console.log(markerInfo)
          break
      }
    }
  }
}
export default expressRobots
