import Axios from '@/assets/js/axios-plugin'
let contextPath = '/scp-videointercomapp'
// let contextPath = ''

export const callinConfirm = (
  callId,
  audioIp,
  audioPort,
  videoIp,
  videoPort
) => {
  let params = {
    audioIp: audioIp,
    audioPort: audioPort,
    callId: callId,
    videoIp: videoIp,
    videoPort: videoPort
  }
  console.log(params)
  return Axios.post(contextPath + '/call/callinConfirm', params)
}
export const ringing = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/callinRinging', params)
}

/**
 * PC可视对讲应用点提机接口
 */
export const offHook = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/offHook', params)
}

/**
 * PC可视对讲应用点挂机接口
 */
export const onHook = callId => {
  let params = {
    callId: callId
  }
  return Axios.post(contextPath + '/call/onHook', params)
}
export const onHookSync = callId => {
  let params = {
    callId: callId
  }
  var xhr = new XMLHttpRequest()
  xhr.open('POST', contextPath + '/call/onHook', false)
  // 添加http头，发送信息至服务器时内容编码类型
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.setRequestHeader('FrontType', 'scp-egsc-ui')
  xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      console.log(this, xhr.responseText)
    }
  }
  xhr.send(JSON.stringify(params))
}
/**
 * PC端可视对讲发起远程开门
 * @argument callId
 * @argument deviceCode 设备编码
 */
export const openDoor = (callId, deviceCode) => {
  let params = {
    callId: callId,
    deviceCode: deviceCode
  }
  return Axios.post(contextPath + '/call/openDoor', params)
}

/**
 * PC 未接呼叫回拨/外拨
 * @argument callId
 * @argument deviceCode 设备编码
 */
export const callout = (callId, toDeviceCode, from, to, audioIp, audioPort) => {
  let params = {
    callId: callId,
    toDeviceCode: toDeviceCode,
    from: from,
    to: to,
    audioIp: audioIp,
    audioPort: audioPort
  }
  return Axios.post(contextPath + '/call/callout', params)
}

/**
 * 可视对讲应用外拨、回拨时，需要发送音频的SDP信息给门口机
 */
export const calloutConfirm = (callId, sdp) => {
  let params = {
    callId: callId,
    sdp: sdp
  }
  return Axios.post(contextPath + '/call/calloutConfirm', params)
}
/**
 * 查询ip列表
 */
export const ipList = () => {
  let params = {}
  return Axios.get(contextPath + '/VideointercomAppPcIp/list', params)
}
