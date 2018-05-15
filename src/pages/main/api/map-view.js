import Axios from '@/assets/js/axios-plugin'

// 代码提交部署时使用/scp-mapapp作上下文
const contextPath = '/scp-mapapp'
const eventContextPath = '/scp-businesscommonapp'
// 调试用上下文字段为空
// const contextPath = ''
// const eventContextPath = ''
/**
 * @description 获取点位列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getMarkerListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerList',
    params: data
  })
}

/**
 * @description 获取停车场点位列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getParkMarkerListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-parkinglotapp/parkingLotNewMonitor/queryMarkersList',
    params: data
  })
}

/**
 * @description 根据设备ID获取停车场点位设备数据
 * @param {obj} data 包含deviceId属性的对象
 */
export const queryMarkerDetail = data => {
  return Axios({
    method: 'get',
    url: '/scp-parkinglotapp/parkingLotNewMonitor/queryMarkerDetail',
    params: data
  })
}

/**
 * @description 获取区域列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getAreaListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getAreaList',
    params: data
  })
}

/**
 * @description 获取停车场区域列表
 * @param {obj} data 包含sceneId属性的对象
 */
export const getParkAreaListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-parkinglotapp/parkingLotNewMonitor/queryParkSeatAreasList',
    params: data
  })
}

/**
 * @description 获取场景信息
 * @param {obj} data 包含sceneId属性的对象
 */
export const getSceneInfoData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneInfo',
    params: data
  })
}

/**
 * @description 获取场景列表
 * @param {obj} data 包含场景type属性的对象
 */
export const getSceneListData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getSceneList',
    params: data
  })
}

/**
 * @description 获取停车场场景列表
 * @param {obj} data 包含场景type属性的对象
 */
export const getParkSceneListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-parkinglotapp/parkingLotNewMonitor/queryParkingMapSceneData',
    params: data
  })
}

/**
 * @description 获取安保人员位置信息
 * @param {obj} data
 * {
 *  sceneId: '5da6dc1bb22a4913ba17fe37915d837c' 必填
 * }
 */
export const getSecurityListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-patrolapp/patrolSendUser/listSecurity',
    // url: '/getSecurity',
    params: data
  })
}
/**
 * @description 获取住户访客陌生人位置信息
 * @param {obj} data
 * {
 *  sceneId: '5da6dc1bb22a4913ba17fe37915d837c' 必填
 * }
 */
export const getHouseholdVisitorStrangerData = data => {
  console.log('住户')
  return Axios({
    method: 'get',
    url: eventContextPath + '/businessCommon/getPersonnelList',
    params: data
  })
}

/**
 * @description 获取快递机器人点位信息
 * @param {object}
 */
export const getRobotData = data => {
  console.log('快递机器人')
  return Axios({
    method: 'get',
    url: '/scp-robotcomponent/robot/getInitRobotInfo',
    params: data
  })
}

/**
 * @description 获取指路牌点位信息
 * @param {object}
 */
export const getGuidepostData = data => {
  console.log('指路牌')
  return Axios({
    method: 'get',
    url: '/scp-guidepostcomponent/signPostStatus/queryForList',
    params: data
  })
}
/**
 * @description 获取设备上报的未解除预警事件列表
 */
export const getWarnData = data => {
  console.log('报警点')
  return Axios({
    method: 'get',
    url: eventContextPath + '/businessCommon/getEventList',
    params: data
  })
}
/**
 * @description 机器人路线
 */
/*
轨迹的都不做了，对应的代码先注释，功能函数保留，加注释
export const getRobotLine = data => {
  return Axios({
    methos: 'get',
    url: '/scp-robotRoute',
    params: data
  })
}
*/
/**
 * @description 保安路线
 * param data = {id}
 */
/*
轨迹的都不做了，对应的代码先注释，功能函数保留，加注释
export const getGuarderLine = data => {
  return Axios({
    methos: 'get',
    url: '/scp-patrolapp/patrolGpsEvent/queryGPSInHour',
    params: data
  })
}
*/
/**
 * @description 获取楼栋区域里的设备信息
 * @param {obj} data 包含areaId、floor_type属性的对象
 */
export const getAreaMarkerInfoData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getAreaMarkerInfo',
    params: data
  })
}

/**
 * @description 获取点位信息
 */
export const getMarkerInfoData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerInfo',
    params: data
  })
}

/**
 * @description 轮询查询人员列表更新时间
 */
export const getMapSettingData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMapSetting',
    params: data
  })
}
// MapInit.vue的日志标签
export const LOG_TAG = '[MapViewer] '
