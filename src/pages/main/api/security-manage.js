import axios from '@/assets/js/axios-plugin'

// 查询值班保安列表
export const getSecurityLists = () => {
  return axios.get('/scp-patrolapp/patrolSendUser/listSecurity')
}

// 派遣保安
export const securityAssign = (params) => {
  return axios.post('/scp-patrolapp/patrolSendUser/screenSendUser', params)
}
// 获取获取未解决99或处理中1的事件
export const getUnManegedEvents = () => {
  return axios.get('/scp-businesscommonapp/businessCommon/getEventList?eventStatus=99,1')
}
// 获取正在处理的事件
export const getEventAssigned = (params) => {
  return axios.get('/scp-patrolapp/patrolSendUser/listWarningEvent', { params })
}
