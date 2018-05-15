import Mock from 'mockjs'

// 配置mock过滤路径
// Mock.mock(/\/personMgm\/mockData/, 'get', function () {
//   return {
//     status: 'Mock returned the data'
//   }
// })

// 查询人员统计
Mock.mock(/\/scp-accesscontrolapp\/person\/getPersonCount/, 'get', function () {
  return {
    code: '00000',
    data: {visitorNum: 108, otherNum: 200}
  }
})

// 查询人员统计
Mock.mock(/\/scp-accesscontrolapp\/person\/getInOutTotalCount/, 'get', function () {
  return {
    code: '00000',
    data: {inCount: 1120,
      outCount: 900,
      inList: [120, 250, 500, 40, 300, 56, 600, 230, 150, 430, 120, 250],
      outList: [220, 350, 100, 402, 300, 226, 60, 330, 250, 43, 520, 50]}
  }
})

Mock.setup({
  timeout: 400
})
