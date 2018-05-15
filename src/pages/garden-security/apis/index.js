import Axios from '@/assets/js/axios-plugin'
const contextPath = '/scp-businesscommonapp/businessCommon'

export const getTestUserList = () => {
  return Axios.get('/test/mockData').then(res => res.data)
}

// 查询园区安防mock数据
// export const getCommunitySecurityData = data => {
//   return Axios({
//     method: 'get',
//     url: '/garden-security/getCommunitySecurityData',
//     params: data
//   })
// }

// 查询园区安防axios
export const getCommunitySecurityData = data => {
  return Axios({
    method: 'get',
    url: contextPath + '/getParkSecurity',
    params: data
  })
}

// 查询事件处理、设备故障
export const getEventAndDeviceData = data => {
  return Axios({
    method: 'get',
    url: '/garden-security/getEventAndDeviceData',
    params: data
  })
}

// 事件处理状态
export const getEventStatusData = data => {
  return Axios({
    method: 'get',
    url: '/garden-security/getEventStatusData'
  })
}

// 事件报警
export const getEventAlarmData = data => {
  return Axios({
    method: 'get',
    url: '/garden-security/getEventAlarmData',
    params: data
  })
}

// 设备故障
export const getEquipmentFailureData = data => {
  return Axios({
    method: 'get',
    url: '/garden-security/getEquipmentFailureData',
    params: data
  })
}
