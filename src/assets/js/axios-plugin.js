/**
 * ajax 模块，可以将 axios 替换成 $.ajax 等
 */
import axios from 'axios'

axios.defaults.timeout = 5000

// 全局的http request 处理
axios.interceptors.request.use(config => {
  // 前端Header中需要传入FrontType字段
  // 小区管理平台:`scp-admin-ui` | 小区大屏平台:`scp-egsc-ui` | 云管理平台:`egc-admin-ui`|
  // 云业主平台: `egc-owner-ui` | 云手机平台:`egc-mobile-ui`
  config.headers.FrontType = 'scp-egsc-ui'

  // 请求参数添加时间戳防止缓存
  if (config.method === 'get') {
    config.params = {
      _t: Date.now(),
      ...config.params
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 全局的http response 处理
axios.interceptors.response.use(
  response => {
    let json = response.data
    if (typeof json !== 'object') {
      Promise.reject(new Error({
        code: 1,
        msg: '回包非JSON格式',
        data: ''
      }))
    }
    if (json.code === '00000') {
      return json.data
    } else {
      return Promise.reject(json)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
