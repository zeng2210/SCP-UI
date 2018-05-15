import Mock from 'mockjs'

// 获取保安列表
Mock.mock(/scp-patrolapp\/patrolSendUser\/00listSecurity/, 'get', Mock.mock({
  code: '00000',
  msg: '',
  'data|40': [{
    'userId': Mock.Random.id(),
    'taskNum|0-7': 1,
    'finishedNum': 0,
    'userName': '大侠',
    'deviceId': null,
    'deviceName': null,
    'positionName|1': ['保安', '巡逻'],
    'facePic': '/static/images/p06.png',
    'phone': '18676464636',
    'hiredate': 1521648000000
  }]
}))
// 派遣保安
Mock.mock(/scp-patrolapp\/patrolSendUser\/screenSendUser\/aaa/, 'post', Mock.mock({
  code: '00000',
  msg: '',
  data: []
}))
// 获取异常事件
Mock.mock(/scp-patrolapp\/patrolSendUser\/eventList/, 'get', function () {
  let response = Mock.mock({
    code: '00000',
    msg: '',
    'data|40': [{
      'uuid|+1': 100
    }]
  })
  response.data[0].uuid = 'id01'
  response.data[1].uuid = 'id02'
  return response
})
// 获取正在处理的事件
Mock.mock(/scp-patrolapp\/patrolSendUser\/listWarningEvent/, 'get', Mock.mock({
  code: '00000',
  msg: '',
  data: ['id01', 'id02']
}))
