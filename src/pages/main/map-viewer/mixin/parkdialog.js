import icoCameraNormal from '@/pages/main/map-viewer/assets/images/ico_camera_normal.png'
import icoBrakeNormal from '@/pages/main/map-viewer/assets/images/ico_brake_normal.png'
import icoElevatorNormal from '@/pages/main/map-viewer/assets/images/ico_elevator_normal.png'
import icoLockNormal from '@/pages/main/map-viewer/assets/images/ico_lock_normal.png'

import icoCameraAbnormal from '@/pages/main/map-viewer/assets/images/ico_camera_abnormal.png'
import icoBrakeAbnormal from '@/pages/main/map-viewer/assets/images/ico_brake_abnormal.png'
import icoElevatorAbnormal from '@/pages/main/map-viewer/assets/images/ico_elevator_abnormal.png'
import icoLockAbnormal from '@/pages/main/map-viewer/assets/images/ico_lock_abnormal.png'
import { markerScale } from '@/pages/main/map-viewer/assets/js/util'
import controller from '@/pages/main/controller'
import { queryMarkerDetail, getWarnData, getMarkerInfoData } from '@/pages/main/api/map-view'
var tempParam = null
const expressRobots = {
  data () {
    return {
      securityList: [],
      lineType: '',
      lineInfo: {},
      count: 0
    }
  },
  mounted: function () {
    tempParam = this
    controller.register({
      key: 'park-allList-info',
      points: [90010, 100001, 100002, 100003],
      callback: (info, data) => {
        tempParam.onWSPush(data)
      }
    })
    // let markerInfo = {}
    // markerInfo.id = 'bb6c056c545df967af8bd5b9458c5'
    // markerInfo.imgUrl = icoLockNormal
    // markerInfo.markerType = 'lock'
    // markerInfo.markerStatus = 701
    // // 增加点位时如果设置了此值，更新时也要设置
    // markerInfo.zoomLevel = 2
    // tempParam.mapObj.updateMarker(markerInfo, markerScale)
  },
  methods: {
    // 更改'报警事件'当前数量
    // changeWarningMessageCount: function () {
    //   tempParam.$store.commit('setSceneMessage', {type: 'parkscene', count: tempParam.count})
    // },
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
        tempParam.count = res.length
        // tempParam.changeWarningMessageCount()
        for (let j = 0; j < markerList.length; j++) {
          let markerInfo = markerList[j].eventHeader
          markerInfo.eventId = 'p' + markerInfo.eventId
          let markerTextAndtype = tempParam.getEventContent(markerInfo.eventType, markerList[j])
          if (!markerTextAndtype) {
            return
          }
          try {
            if (markerInfo.eventType === '40020') {
              tempParam.seeAndCallWarn(markerInfo, markerList[j])
              return
            }
            if (markerTextAndtype.eventContent === '') {
              continue
            }
            tempParam.addWsWarnMarker(markerInfo, markerList[j])
          } catch (err) {
            console.warn(err)
          }
        }
      }).catch(err => {
        console.warn(err)
      })
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
          marker.id = 'p' + markerInfo.eventId
          let warnPositionXY = tempParam.mapObj.transfromWGSToBitMap([markerInfo.eventGPS.lon, markerInfo.eventGPS.lat])
          if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(warnPositionXY)) {
            return
          }
          marker.position = warnPositionXY
          marker.text = tempParam.judgeCallType(message.eventBody)
          marker.type = 'warn'
          marker.markerType = markerInfo.eventType
          marker.info = message
          marker.id && tempParam.mapObj.addWarningPopup(marker)
        }
      }
    },
    /**
     * @description 添加可视呼叫点位
     */
    // seeAndCallWarnMarker: function (markerInfo, elevatorMarkerInfoAnother, message, position) {
    //   let marker = {}
    //   marker.id = 'p' + markerInfo.eventId
    //   marker.position = [elevatorMarkerInfoAnother.positionX, elevatorMarkerInfoAnother.positionY]
    //   if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(marker.position)) {
    //     return
    //   }
    //   marker.text = tempParam.judgeCallType(message.eventHeader)
    //   marker.type = 'warn'
    //   marker.markerType = markerInfo.eventType
    //   marker.info = message
    //   marker.id && tempParam.mapObj.addWarningPopup(marker)
    // },
    judgeCallType: function (eventBody) {
      let text = ''
      let num = eventBody.callNum
      num = num.substring(0, 2)
      // console.log(num)
      switch (num) {
        case '06':
          text = '车闸呼叫'
          break
        case '07':
          text = '电梯呼叫'
          break
        default:
          text = '门禁呼叫'
          break
      }
      return text
    },
    /**
     * @description 通过预警类型判断eventContent
     */
    getEventContent: function (eventType, message) {
      let eventContent = ''
      let status = ''
      switch (eventType) {
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
    // addWsWarnMarker: function (marker, message) {
    //   if (marker.eventGPS.lon && marker.eventGPS.lat) {
    //     let markerTextAndtype = tempParam.getEventContent(marker.eventType, message)
    //     // 将点位的GPS坐标转换后设为点位坐标
    //     let warnPositionXY = tempParam.mapObj.transfromWGSToBitMap([marker.eventGPS.lon, marker.eventGPS.lat])
    //     try {
    //       if (tempParam.mapObj.isInTileMapViewArea && !tempParam.mapObj.isInTileMapViewArea(warnPositionXY)) {
    //         return
    //       }
    //       // 添加的点位
    //       let markerInfo = {}
    //       markerInfo.id = marker.eventId
    //       markerInfo.position = warnPositionXY
    //       markerInfo.text = markerTextAndtype.eventContent
    //       if (markerInfo.text === '') {
    //         return
    //       }
    //       markerInfo.type = markerTextAndtype.status
    //       markerInfo.markerType = marker.eventType
    //       markerInfo.info = message
    //       markerInfo.id && tempParam.mapObj.addWarningPopup(markerInfo)
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    // },
    /**
     * @description 设备故障设备点位查询
     */
    getequipmentMarker: async (message, type, img, status) => {
      if (!message.eventBody.deviceId) {
        return
      }
      let elevatorMarkerInfoAnother = await queryMarkerDetail({ deviceId: message.eventBody.deviceId }).then(res => {
        return res
      })
      if (elevatorMarkerInfoAnother) {
        tempParam.equipmentFailure(elevatorMarkerInfoAnother, type, img, status)
      }
    },

    /**
     * @description 设备故障
     */
    equipmentFailure (elevatorMarkerInfoAnother, type, img, status) {
      // 添加的点位
      let markerInfo = {}
      markerInfo.id = elevatorMarkerInfoAnother.id
      markerInfo.imgUrl = img
      markerInfo.markerType = type
      markerInfo.markerStatus = status
      // 增加点位时如果设置了此值，更新时也要设置
      markerInfo.zoomLevel = elevatorMarkerInfoAnother.zoomLevel
      tempParam.mapObj.updateMarker(markerInfo, markerScale)
    },
    /**
     * @description 监听事件推送
     */
    onWSPush: function (data) {
      if (typeof data.type !== 'string' || !data.info) {
        console.log('data.type note string or not info')
        return
      }
      console.log(data)
      let eventType = data.type
      // let markerInfo = data.eventHeader

      let result = JSON.parse(data.info)
      let eventStatus = result.eventBody.eventStatus
      let deviceType = result.eventBody.deviceType

      // if (eventType === '70051') {
      //   // 人员徘徊： 25022 车辆违停：25306 重点人员：25051 保安异常：70050 机器人异常:
      //   // 机器人超时报警93002 机器人低电量报警93003 机器人偏离路线报警93004 巡更报事：70051
      //   markerInfo.id = 'p' + markerInfo.eventId
      //   if (markerInfo.eventStatus === '4') {
      //     markerInfo.eventId && tempParam.mapObj.removeWarningPopup(markerInfo)
      //   } else if (markerInfo.eventStatus === '99') {
      //     tempParam.addWsWarnMarker(markerInfo, result)
      //   }
      //   tempParam.changeWarningMessageCount()
      // }

      // if (eventType === '40020') {
      //   // 可视对讲呼叫 {deviceId: '1002200100016C06A011'}
      //   tempParam.seeAndCallWarn(markerInfo, result)
      // }
      // if (eventType === '40021') {
      //   // 可视对讲挂断
      //   if (markerInfo.eventId) {
      //     markerInfo.id = 'p' + markerInfo.eventId
      //     tempParam.mapObj.removeWarningPopup(markerInfo)
      //   }
      // }
      if (eventType === '94001') {
        tempParam.addGuidepostMarker(result)
      }

      if (eventType === '100001' || eventType === '100002' || eventType === '100003' || eventType === '90010') {
        if (deviceType === '00013') {
          if (eventStatus === '4') {
            tempParam.getequipmentMarker(result, 'lock', icoLockNormal, 701)
          } else {
            tempParam.getequipmentMarker(result, 'lock', icoLockAbnormal, 702)
          }
        } else if (deviceType === '2001' || deviceType === '2002' || deviceType === '2003' || deviceType === '2004' || deviceType === '2022') {
          if (eventStatus === '4') {
            tempParam.getequipmentMarker(result, 'camera', icoCameraNormal, 101)
          } else {
            tempParam.getequipmentMarker(result, 'camera', icoCameraAbnormal, 102)
          }
        } else if (deviceType === '2005') {
          if (eventStatus === '4') {
            tempParam.getequipmentMarker(result, 'brake', icoBrakeNormal, 501)
          } else {
            tempParam.getequipmentMarker(result, 'brake', icoBrakeAbnormal, 502)
          }
        } else if (deviceType === '2016') {
          if (eventStatus === '4') {
            tempParam.getequipmentMarker(result, 'elevator', icoElevatorNormal, 801)
          } else {
            tempParam.getequipmentMarker(result, 'elevator', icoElevatorAbnormal, 802)
          }
        }
      }
    }
  }
}
export default expressRobots
