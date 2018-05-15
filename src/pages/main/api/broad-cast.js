import Axios from '@/assets/js/axios-plugin'

/**
 * 调控当前广播音量, 向后台提交相关参数后更改广播音量值
 * @param {string} deviceId   设备编号
 * @param {string} devipplayAreaId  设备IP
 * @param {array} playAreaId  播放小区
 * @param {number} vol    当前音量
 */
export const postBroadcastVolumeData = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/volume/upOrDown',
    data
  })
}

/**
 * 查询音量以及正在播放歌曲
 * @param {string} deviceId 设备编号
 */
export const postGetBroadcast = data => {
  console.log(data)
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/search2',
    data
  })
}

/**
 * 播放暂停
 * @param {num} sessionId
 * @param {num} operation
 * @param {string} deviceId
 * @param {num} allPlayArea
 */
export const playBroadcast = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/startOrStop',
    data
  })
}

/**
 * 上一首下一首
 * @param {num} operation
 * @param {string} deviceId
 * @param {num} allPlayArea
 */
export const changePlayState = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/lastOrNext2',
    data
  })
}

/**
 * @description 获取广播设备信息
 */
export const getBroadcastdialog = data => {
  return Axios({
    method: 'get',
    url: '/scp-mapapp/mapapp/getDeviceInfo',
    params: data
  })
}

/**
 * @description 获取任务列表
 */
export const getTaskListData = data => {
  return Axios({
    method: 'get',
    url: '/scp-broadcastapp/map/searchBroadcst',
    params: data
  })
}

/**
 * @description 播放即时任务
 */
export const pauseRealtimeTask = data => {
  return Axios({
    method: 'post',
    url: '/scp-broadcastapp/map/start',
    data
  })
}

// MapInit.vue的日志标签
export const LOG_TAG = '[BroadCast] '
