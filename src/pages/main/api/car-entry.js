import axios from '@/assets/js/axios-plugin'

// 查询2小时内出入车辆
export const listInOutCars = (queryParam) => {
  let params = JSON.stringify(queryParam)
  return axios.get('/scp-parkinglotapp/carInOut/listInOutCars?params=' + encodeURI(params))
}

// 根据id查询车辆信息
export const getCarById = (queryParam) => {
  let params = JSON.stringify(queryParam)
  return axios.get('/scp-parkinglotapp/carInOut/getCarById?params=' + encodeURI(params))
}

// 获取视频
export const getVideoInfo = (data) => {
  return axios.get('/scp-parkinglotapp/carInOut/getVideoInfo')
}
