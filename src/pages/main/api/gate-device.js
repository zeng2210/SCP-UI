import Axios from '@/assets/js/axios-plugin'
// let contextPath = '/scp-videointercomapp'
// let contextPath = ''
// export const getTestUserList = () => {
//   return Axios.get('/test/mockData')
// }

/**
 * 门禁&道闸远程开门
 */
export const accessControlOpenDoor = (deviceId, parentId, gatewayId) => {
  let params = 'deviceCode=' + deviceId + '&parentId=' + parentId + '&gatewayId=' + gatewayId
  return Axios.get('/scp-accesscontrolapp/openRemote/remoteOpenOption?' + params)
}

/**
 * 车闸远程开闸
 */
export const remoteControlBrake = (deviceId, parentId) => {
  let params = 'deviceCode=' + deviceId + '&parentId=' + parentId
  return Axios.get('/scp-parkinglotapp/openBrake/remoteOpenBrake?' + params)
}

/**
 * 查询门禁设备信息
 */
export const queryDeviceInfoByCode = (deviceId) => {
  let params = 'deviceCode=' + deviceId
  return Axios.get('/scp-accesscontrolapp/openRemote/queryDeviceInfoByCode?' + params)
}

/**
 * 查询车场设备信息
 */
export const queryBrakeDeviceInfo = (deviceId) => {
  let params = 'deviceCode=' + deviceId
  return Axios.get('/scp-parkinglotapp/openBrake/queryDeviceInfoByCode?' + params)
}

// 派遣保安推荐列表
export const getSecurityDistanceList = (params) => {
  return Axios.get('/scp-patrolapp/patrolSendUser/listSecurityDistance', { params: params })
}

// 派遣保安
export const patrolSecuritys = (params) => {
  console.log(params)
  return Axios.post('/scp-patrolapp/patrolSendUser/screenSendUser', params)
}

// 获取事件id
export const getEventInfo = (deviceId, eventType) => {
  return Axios.get('/scp-businesscommonapp/businessCommon/getUpDateReport?deviceId=' + deviceId + '&eventType=' + eventType)
}
