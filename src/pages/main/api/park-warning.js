import axios from '@/assets/js/axios-plugin'
/**
 * @description 获取设备上报的未解除预警事件列表
 * contextPath 提交时放开，本地不需要上下文
 */
const contextPath = '/scp-businesscommonapp'
// const contextPath = ''

export const getWarnData = data => {
  return axios({
    method: 'get',
    url: contextPath + '/businessCommon/getEventList',
    params: data
  })
}
// 派遣保安推荐列表
export const getSecurityDistanceList = (params) => {
  return axios.get('/scp-patrolapp/patrolSendUser/listSecurityDistance', { params: params })
}

// 派遣保安
export const patrolSecuritys = (params) => {
  return axios.post('/scp-patrolapp/patrolSendUser/screenSendUser', params)
}
// 根据事件查询已派遣保安
export const hasPatrolSecuritys = (params) => {
  return axios.get('/scp-patrolapp/patrolMessage/listMessageUser', { params: params })
}
// 查新事件完成信息
export const hasDoneInfo = (params) => {
  return axios.get('/scp-patrolapp/patrolMessage/listMessage', { params: params })
}
// 解除预警
export const disMissWarning = (params) => {
  return axios.post('/scp-patrolapp/patrolMessage/batchRemoveWarning', params)
}
// 电子围栏解除预警
export const eleDismissWarn = (params) => {
  return axios.get('/scp-securityapp/defensezone/relieveDefenseZone', { params: params })
}
// 电子围栏获取抓拍图
export const getCatchPic = (eventId) => {
  return axios.get('/scp-securityapp/defensezone/CapturePic', { params: { eventLogId: eventId } })
}

/*
*查询人员出入视频信息
*/
export const getFaceCaptureData = data => {
  return axios.get('/faceCapture/list')
}
// 人员保安信息axios
export const getSecrityPeopleMsg = (params) => {
  // debugger   http://192.168.0.108:81/scp-patrolapp/patrolSendUser/getSecurity?userId=910af302efcf4e3cb4d70bad730cb360
  return axios.get('/scp-patrolapp/patrolSendUser/getSecurity', { params: params },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
}
// 人员保安信息mock
// export const getSecrityPeopleMsg = (params) => {
//   console.log(params)
//   return axios.get('/securityInfo/getSecrityPeopleMsg', { params: params })
// }
// 查询人员卡片信息mock
export const getPersonnelCardMsg = (params) => {
  console.log(params)
  return axios.get('/scp-videogatewayapp/video/event/faceCapture/info/get', { params: params })
}

// 呼梯axios
export const getCallElevatorData = data => {
  return axios({
    method: 'get',
    url: '/scp-laddercontrolapp/ladderControlBigScreen/getDeviceInfo',
    params: data
  })
}
// export const getCallElevatorData = (params) => {
//   console.log(params)
//   return axios.get('/controlBigScreen/getDevice', { params: params })
// }

// 选择楼层axios
export const getSelectHierarchyData = (params) => {
  return axios.post('/scp-laddercontrolapp/ladderControlBigScreen/callLadder', params)
}

// 电子围栏
export const getelectronFenceData = data => {
  return axios({
    method: 'get',
    url: '/scp-securityapp/defensezone/getDeviceInfo',
    params: data
  })
}

// 设备信息-摄像头
export const getCameraInfoData = data => {
  return axios({
    method: 'get',
    url: '/scp-videogatewayapp/organization/device/getDeviceInfoByCameraCode',
    params: data
  })
}
