import Mock from 'mockjs'

// 配置mock过滤路径
Mock.mock(/\/test\/mockData/, 'get', function () {
  return {
    status: '5'
  }
})

// 获取安全指数
Mock.mock(/\/garden-security\/getCommunitySecurityData/, 'get', {
  code: '00000',
  msg: ' ',
  data: {
    securityIndex: {
      securityData: '66.6'
    },
    eventAndDevice: {
      eventData: '0',
      deviceData: '0'
    },
    eventStatus: [{
      state: '处理中',
      time: '2018.4.10',
      con: '园区周界越界'
    },
    {
      state: '未处理',
      time: '2018.4.9',
      con: '中央水塘'
    },
    {
      state: '已完成',
      time: '2018.4.6',
      con: '西南拐角'
    },
    {
      state: '已完成',
      time: '2018.4.6',
      con: '酒店负一层'
    }],
    eventAlarm: [{
      name: '周界越界',
      percent: '50%'
    },
    {
      name: '停车占道',
      percent: '30%'
    },
    {
      name: '重点人员',
      percent: '21%'
    }],
    equipmentFailure: [{
      name: '摄像头',
      percent: '70%'
    },
    {
      name: '人行道闸',
      percent: '40%'
    },
    {
      name: '电梯',
      percent: '35%'
    }]
  }
})

// 查询事件处理、设备故障
Mock.mock(/\/garden-security\/getEventAndDeviceData/, 'get', {
  code: '00000',
  msg: '',
  data: {
    eventData: 0,
    deviceData: 0
  }
})

// 查询事件处理、设备故障
Mock.mock(/\/garden-security\/getEventStatusData/, 'get',
  {
    code: '00000',
    msg: '',
    data: [{
      state: '处理中',
      time: '2018.4.10',
      con: '园区周界越界'
    },
    {
      state: '未处理',
      time: '2018.4.9',
      con: '中央水塘'
    },
    {
      state: '处理中',
      time: '2018.4.6',
      con: '酒店附近'
    },
    {
      state: '已完成',
      time: '2018.4.6',
      con: '西南拐角'
    }]
  }
)

// 事件处理
Mock.mock(/\/garden-security\/getEventAlarmData/, 'get', {
  code: '00000',
  msg: '',
  data: [{
    name: '周界越界',
    percent: '50%'
  },
  {
    name: '停车占道',
    percent: '30%'
  },
  {
    name: '重点人员',
    percent: '21%'
  }
  ]
}
)

// 设备故障
Mock.mock(/\/garden-security\/getEquipmentFailureData/, 'get', {
  code: '00000',
  msg: '',
  data: [{
    name: '摄像头',
    percent: '70%'
  },
  {
    name: '人行道闸',
    percent: '40%'
  },
  {
    name: '电梯',
    percent: '35%'
  }
  ]
}
)

Mock.setup({
  timeout: 400
})
