import axios from '@/assets/js/axios-plugin'

// 代码提交部署时使用/scp-mapapp作上下文
// const contextPath = '/scp-mapapp'
const contextPath = '/scp-videogatewayapp'
/**
 * 获取视频预览数据
 */
export const getDeviceByCameraData = data => {
  return axios({
    method: 'get',
    url: contextPath + '/organization/device/getDeviceByCameraCode',
    params: data
  })
}
/**
 * 获取回放数据
 */
export const getvideoRecordData = data => {
  return axios({
    method: 'get',
    url: contextPath + '/video/record/list',
    params: data
  })
}
/**
 * 获取九分屏数据
 */
export const getVideoData = data => {
  return axios({
    method: 'get',
    url: contextPath + '/custom/group/getVideosByGroupFlag',
    params: data
  })
}
/**
 * 获取人脸抓拍图片
 */
export const getCaptureData = data => {
  return axios({
    method: 'get',
    url: contextPath + '/video/event/faceCapture/camera/list',
    params: data
  })
}
