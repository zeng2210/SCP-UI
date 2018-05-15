import axios from '@/assets/js/axios-plugin'

// 代码提交部署时使用/scp-mapapp作上下文
// const contextPath = '/scp-mapapp'
// 调试用上下文字段为空
const contextPath = 'scp-thirdpartyswitchapp'

// 获取天气
// export function getWeather () {
//   return axios.get('/weatherForecast/getWeather')
// }
// 获取天气
export const getWeather = data => {
  return axios({
    method: 'get',
    url: contextPath + '/weather/getCourtWeather',
    params: data
  })
}
