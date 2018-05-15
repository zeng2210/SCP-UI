import Axios from '@/assets/js/axios-plugin'

// 统计来访人数
export const getPersonCount = () => {
  return Axios.get('/scp-accesscontrolapp/person/getVisitorCount').then(res => res)
}

// 统计今日出入人次
export const getInOutTotalCount = () => {
  // return Axios({
  //   method: 'get',
  //   url: '/test/getInOutTotalCount',
  //   params: data
  // })
  return Axios.get('/scp-accesscontrolapp/person/getInOutTotalCount').then(res => res)
}
