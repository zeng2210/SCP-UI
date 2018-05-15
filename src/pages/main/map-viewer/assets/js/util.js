import icoCameraNormal from '@/pages/main/map-viewer/assets/images/ico_camera_normal.png'
import icoBroadCastNormal from '@/pages/main/map-viewer/assets/images/ico_broadcast_normal.png'
import icoGatesNormal from '@/pages/main/map-viewer/assets/images/ico_gates_normal.png'
import icoBrakeNormal from '@/pages/main/map-viewer/assets/images/ico_brake_normal.png'
import icoControlNormal from '@/pages/main/map-viewer/assets/images/ico_control_normal.png'
import icoLockNormal from '@/pages/main/map-viewer/assets/images/ico_lock_normal.png'
import icoElevatorNormal from '@/pages/main/map-viewer/assets/images/ico_elevator_normal.png'
import icoFenceNormal from '@/pages/main/map-viewer/assets/images/ico_fence_normal.png'

import icoCameraAbNormal from '@/pages/main/map-viewer/assets/images/ico_camera_abnormal.png'
import icoBroadCastAbnormal from '@/pages/main/map-viewer/assets/images/ico_broadcast_abnormal.png'
import icoGatesAbnormal from '@/pages/main/map-viewer/assets/images/ico_gates_abnormal.png'
import icoBrakeAbnormal from '@/pages/main/map-viewer/assets/images/ico_brake_abnormal.png'
import icoControlAbnormal from '@/pages/main/map-viewer/assets/images/ico_control_abnormal.png'
import icoLockAbnormal from '@/pages/main/map-viewer/assets/images/ico_lock_abnormal.png'
import icoElevatorAbnormal from '@/pages/main/map-viewer/assets/images/ico_elevator_abnormal.png'
import icoFenceAbnormal from '@/pages/main/map-viewer/assets/images/ico_fence_abnormal.png'

import icoDefaultNormal from '@/pages/main/map-viewer/assets/images/ico_default_normal.png'
const statusMap = {
  // 视频设备
  '101': {
    imgUrl: icoCameraNormal,
    markerType: 'camera'
  },
  '102': {
    imgUrl: icoCameraAbNormal,
    markerType: 'camera'
  },
  // 广播设备
  '201': {
    imgUrl: icoBroadCastNormal,
    markerType: 'broadcast'
  },
  '202': {
    imgUrl: icoBroadCastAbnormal,
    markerType: 'broadcast'
  },
  // 人行道闸
  '401': {
    imgUrl: icoGatesNormal,
    markerType: 'gates'
  },
  '402': {
    imgUrl: icoGatesAbnormal,
    markerType: 'gates'
  },
  // 车闸
  '501': {
    imgUrl: icoBrakeNormal,
    markerType: 'brake'
  },
  '502': {
    imgUrl: icoBrakeAbnormal,
    markerType: 'brake'
  },
  // 门禁
  '601': {
    imgUrl: icoControlNormal,
    markerType: 'control'
  },
  '602': {
    imgUrl: icoControlAbnormal,
    markerType: 'control'
  },
  // 地锁
  '701': {
    imgUrl: icoLockNormal,
    markerType: 'lock'
  },
  '702': {
    imgUrl: icoLockAbnormal,
    markerType: 'lock'
  },
  // 地锁
  '801': {
    imgUrl: icoElevatorNormal,
    markerType: 'elevator'
  },
  '802': {
    imgUrl: icoElevatorAbnormal,
    markerType: 'elevator'
  },
  // 电子围栏
  '901': {
    imgUrl: icoFenceNormal,
    markerType: 'fence'
  },
  '902': {
    imgUrl: icoFenceAbnormal,
    markerType: 'fence'
  }
}
const markerScale = {
  scale: 0.25
}
const initZoomLevel = 2.4
let markerMap = {}
let areaMap = {}

export const fixedMarkerInfoFormat = markerInfo => {
  if (statusMap[markerInfo.markerStatus + '']) {
    let makerSatausParam = statusMap[markerInfo.markerStatus + '']
    markerInfo.imgUrl = makerSatausParam.imgUrl
    markerInfo.markerType = makerSatausParam.markerType
  } else {
    markerInfo.imgUrl = icoDefaultNormal
    markerInfo.markerType = 'common'
  }
  markerInfo.position = [markerInfo.positionX, markerInfo.positionY]
  delete markerInfo.positionX
  delete markerInfo.positionY
  return markerInfo
}

const fixedMarkerListFormat = markerList => {
  let formatedList = []
  for (let i = 0; i < markerList.length; i++) {
    formatedList.push(fixedMarkerInfoFormat(markerList[i]))
  }
  return formatedList
}

const setMarkerMap = function (key, data) {
  let lastTime = new Date().getTime()
  markerMap[key] = { data, lastTime }
}

const getMarkerMap = function (key) {
  if (!markerMap[key]) {
    return null
  }
  return markerMap[key]
}

const getAreaMapByType = type => {
  if (!areaMap[type]) {
    return []
  }
  return areaMap[type]
}

const areaOptionFormat = option => {
  let pointOrigin = option.borderPoints.map((point, key) => {
    return [point.pointX, point.pointY]
  })
  option.borderPoints = [pointOrigin]
  return option
}

const initAreaMap = areasList => {
  areaMap = {}
  for (let i = 0; i < areasList.length; i++) {
    let curAreaInfo = areaOptionFormat(areasList[i])
    let areaCategory = areasList[i].areaType + ''
    !areaMap[areaCategory] && (areaMap[areaCategory] = [])
    areaMap[areaCategory].push(curAreaInfo)
  }
}

const getdeviceFormCode = function (code) {
  let device = ''
  switch (code) {
    case '2001':
    case '3001':
    case '3002':
    case '3003':
    case '2002':
    case '3004':
    case '3005':
    case '3006':
    case '2003':
    case '3007':
    case '3008':
    case '3009':
    case '2004':
    case '3041':
    case '3042':
    case '3043':
    case '2022':
    case '3061':
      // 摄像头
      device = 'camera'
      break
    case '2019':
    case '3022':
      // 广播
      device = 'broadcast'
      break
    case '2010':
      // 人行道闸
      device = 'gates'
      break
    case '2005':
      // 车闸
      device = 'brake'
      break
    case '2009':
    case '2011':
      // 门禁
      device = 'control'
      break
    case '2020':
    case '3038':
      // 电梯
      device = 'elevator'
      break
  }
  return device
}

export {
  initAreaMap, // 将area的接口返回数据格式化,并根据areaType分类缓存至areaMap
  getAreaMapByType, // 根据areaType从areaMap中获取对应的areaList
  getMarkerMap, // 根据关键字从markerMap中获取markerList
  setMarkerMap, // 根据关键字向markerMap中存入markerList
  fixedMarkerListFormat, // 将marker的接口返回数据格式化,返回可以在地图上加载的markerList
  markerScale, // 通用缩放比例设定,用于点位加载时,将图片缩放至可显示大小
  initZoomLevel,
  getdeviceFormCode
}
