import Axios from '@/assets/js/axios-plugin'

// 用于页面初始化（刷新）时查询，返回所有机器人信息
export const getInitRobotInfo = data => {
  return Axios({
    method: 'get',
    url: '/scp-robotcomponent/robot/getInitRobotInfo',
    params: data
  })
}
// 机器人召回
export const forceRecall = (data) => {
  return Axios({
    method: 'post',
    url: '/scp-robotcomponent/robot/forceRecall',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 机器人摄像头信息
export const getRobotCamera = (data) => {
  return Axios({
    method: 'get',
    url: '/scp-robotcomponent/robot/getRobotDefaultCamera',
    params: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 机器人异常事件 查询异常状态
export const getRobotErrEvent = (data) => {
  return Axios({
    method: 'get',
    url: 'scp-businesscommonapp/businessCommon/getUpDateReport',
    params: data
  })
}
// 派遣保安推荐列表
export const getSecurityDistanceList = (data) => {
  return Axios({
    method: 'get',
    url: '/scp-patrolapp/patrolSendUser/listSecurityDistance',
    params: data
  })
}
// 派遣保安
export const patrolSecuritys = (data) => {
  return Axios({
    method: 'post',
    url: '/scp-patrolapp/patrolSendUser/screenSendUser',
    data
  })
}
// 解除预警
export const disMissWarning = (data) => {
  return Axios({
    method: 'post',
    url: '/scp-patrolapp/patrolMessage/batchRemoveWarning',
    data
  })
}
