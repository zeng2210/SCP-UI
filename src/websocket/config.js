import Axios from '@/assets/js/axios-plugin'

// 上下文
const contextPath = '/scp-websocketcomponent'
// 动态获取ws地址
const getWsAdress = () => {
  return Axios.get(contextPath + '/websocketinfo/getServiceIpAndPort').then(res => res)
}
/**
 * 获取WebSocket的地址
 */
export const getWebSocketUrlPrefix = async () => {
  // 旧版本地开发
  // return '192.168.0.242:39018'
  // 彭志祥本机地址
  // return '172.16.30.9:9018'
  // 新版开发环境地址（dev4）
  let wsURL = await getWsAdress().then(wsAdress => {
    console.log('wsAdress=====', wsAdress)
    return wsAdress
  })
  // console.log('wsURL====', wsURL)
  return wsURL
  // return '192.168.0.109:9018'
}
