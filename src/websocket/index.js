import SockJS from 'sockjs-client'
import { getWebSocketUrlPrefix } from './config'

let websocket = null

export const loadWebsocket = function (callback, module) {
  console.log('ws页面模块', module)
  /**
   * egscuimain 右边主区域
   * egscuigardensecurity 园区安防
   * egscuicarstatistics 车辆统计
   * egscuipersonstatistics 人员统计
   */
  let pageModule = module || ''
  getWebSocketUrlPrefix().then(wsURL => {
    console.log('wsURL========', wsURL)
    let webSocketUrlPrefix = wsURL
    let socketUrl = '//' + webSocketUrlPrefix + '/sockjs/' + pageModule + '/readData' // 新版大屏地址
    websocket = new SockJS(socketUrl)
    websocket.onopen = () => {
      console.log('WebSocket连接开始')
      console.log(new Date())
    }
    websocket.onmessage = event => {
      // console.log('数据已接收...' + event.data)
      callback(event.data)
    }
    websocket.onclose = event => {
      console.log(event)
      console.log('WebSocket连接关闭...尝试重连')
      websocket = loadWebsocket(callback)
    }
    websocket.onerror = event => {
      console.log('WebSocket连接出错...')
    }
    console.log('status: ' + websocket.readyState)
    return websocket
  })
}

// 测试发送数据
export const sendMessage = function () {
  let testData = {
    type: 39999,
    deviceId: '123123123',
    info: {
      deviceType: '1',
      count: '5'
    },
    time: Date.now()
  }
  websocket.send(JSON.stringify(testData))
}
