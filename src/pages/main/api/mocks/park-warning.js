import Mock from 'mockjs'

// 获取预警列表数据
Mock.mock(/parnWarning\/getLists/, 'get', {
  'code': '00000',
  'msg': '',
  'data|5': [{
    'eventHead': {
      'type': 'ALARM_001',
      'deviceID': '304114a78bb657940001',
      'eventID': '123123123',
      'eventGPS': {
        'lon': 127.854942114,
        'lat': 227.598461451
      },
      'eventType': '25020',
      'occurTime': '2018-02-23 16:24:12',
      'eventStatus|1': ['1', '2']
    },
    'eventBody': {
      'eventDescription|1': ['落水预警', '越界预警'],
      'eventContent': '事件内容',
      'address': '恒大山水城小区',
      'scenePic': '/static/images/p06.png',
      'facePic': null,
      'deviceId': '304114a78bb657940001',
      'eventType': '25020',
      'subEventType': '1',
      'devicePort': null,
      'mediaPort': null,
      'deviceIp': null,
      'parentID': null
    }
  }]
})

// 派遣保安推荐列表
Mock.mock(/scp-patrolapp\/patrolSendUser\/listSecurityDistance/, 'get', {
  'code': '00000',
  'msg': '查询成功',
  'data': [
    {
      'userId': 'a442ab294e194232ab8849c98a5f1c3c',
      'userName': '101',
      'positionName': '保安员',
      'facePic': 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
      'phone': '18676464636',
      'distance': '300米'
    },
    {
      'userId': 'a442ab294e194232ab8849c98a5f1c3c',
      'userName': '102',
      'positionName': '保安员',
      'facePic': 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
      'phone': '1867643333',
      'distance': '400米'
    },
    {
      'userId': 'a442ab294e194232ab8849c98a5f1c3c',
      'userName': '103',
      'positionName': '保安员',
      'facePic': 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
      'phone': '1867643333',
      'distance': '500米'
    },
    {
      'userId': 'a442ab294e194232ab8849c98a5f1c3c',
      'userName': '104',
      'positionName': '保安员',
      'facePic': 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
      'phone': '1867643333',
      'distance': '1000米'
    }
  ]
})
// 派遣保安（预警）
Mock.mock(/scp-patrolapp\/patrolSecurity/, 'get', {
  'code': '00000',
  'msg': '',
  'data': {
    'msg': '派遣成功'
  }
})

// 人员保安信息
Mock.mock(/securityInfo\/getSecrityPeopleMsg/, 'get', {
  'code': '00000',
  'data': {
    'userId': 'a442ab294e194232ab8849c98a5f1c3c',
    'taskNum': 1,
    'finishedNum': 0,
    'userName': '102',
    'deviceId': '1001201764cc2e702103',
    'deviceName': 'zxd巡更手机',
    'positionName': '保安员',
    'facePic': 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
    'phone': '18676464636',
    'hiredate': 1521648000000
  },
  'message': '查询成功'
})

// 呼梯
Mock.mock(/controlBigScreen\/getDevice/, 'get', {
  'code': '00000',
  'data': {
    'deviceCode': "10112020C400AD03470A",
    'deviceIp': "172.16.20.53",
    'deviceName': "Otis电梯厂商控制器",
    'devicePort': "20001",
    'deviceTypeCode': "2020",
    'endFloor': 21,
    'orgName': "10号梯组",
    'providerCode': "1011",
    'providerName': "奥的斯电梯",
    'startFloor': -5,
    'cameras': [{
      'cameraIp': "192.168.0.109",
      'cameraPort': "10000",
      'deviceId': "30071689641321790001",
      'parentId': "10012003168964132179"
    }, {
      'cameraIp': "192.168.0.109",
      'cameraPort': "10000",
      'deviceId': "30071689641321790001",
      'parentId': "10012003168964132179"
    }, {
      'cameraIp': "192.168.0.109",
      'cameraPort': "10000",
      'deviceId': "30071689641321790001",
      'parentId': "10012003168964132179"
    }]
  },
  'message': '查询成功'
})

// 人员卡片信息
Mock.mock(/personnelcard\/getPersonnelCardMsg/, 'get', {
  'code': '00000',
  'data': {
    'userId': 'ad45s44489sf89s7f8ds4f64sdf4',
    'userName': '张萌',
    'phone': '18676464636',
    'address': '山水城一栋二单元',
    'registrationTime': '2018.4.19',
    'licensePlateNumber': '粤8848',
    'PersonnelType': '业主',
    'facePic': 'http://img15.3lian.com/2015/h1/66/d/36.jpg'
  },
  'message': '查询成功'
})

Mock.setup({
  timeout: 400
})

/*
*查询九路视频信息
*/
Mock.mock(/device\/getCameraByOrgId/, 'get',
  {
    code: '00000',
    msg: '',
    data: [{
      'deviceID': '10012001001110004444',
      'deviceName': '38GPU',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.38',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010000001310000001',
      'subDeviceName': 'æµ·åº·-å‘¨ç•Œè¶Šç•Œæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012001665544332211',
      'deviceName': 'xtbipc20180307',
      'deviceDesc': '11',
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': null,
      'devicePort': null,
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30016655443322120001',
      'subDeviceName': 'xtbsub001',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012003683530583012',
      'deviceName': 'äº²æ°´å¹³å°çƒæœº',
      'deviceDesc': '',
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.12',
      'devicePort': '80',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30076835305830120001',
      'subDeviceName': 'äº²æ°´å¹³å°çƒæœº',
      'subDeviceDesc': 'äº²æ°´å¹³å°çƒæœº',
      'recordPlanUuid': '319d953850004884bc4fce3c3695f288',
      'templateId': '9e3b7d463ad04f2090f48ee0d22aaaaa',
      'recordPlanStatus': 1
    }, {
      'deviceID': '10012003168964132179',
      'deviceName': 'å›½å®´åŽ…çƒæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '172.16.10.221',
      'devicePort': '5060',
      'installAddress': 'å›½å®´åŽ…',
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30071689641321790001',
      'subDeviceName': 'å›½å®´åŽ…çƒæœºé€šé“',
      'subDeviceDesc': null,
      'recordPlanUuid': '81ebcb81039840f4b811fb40115a5a48',
      'templateId': '22dc9bedc623466cb808b7154faf82d3',
      'recordPlanStatus': 1
    }, {
      'deviceID': '1002200114a78bb65794',
      'deviceName': 'å¤§åŽIPCæžªæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.41',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1002',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '300114a78bb657940001',
      'subDeviceName': 'ipcæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012001001110000001',
      'deviceName': 'ç¼–ç è®¾å¤‡1',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.200.28',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010011101310010002',
      'subDeviceName': 'å¤§åŽ-äººè„¸æŠ“æ‹æœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }]
  }
)

/*
*查询六路视频
*/
Mock.mock(/device\/getMemberScreen/, 'get',
  {
    code: '00000',
    msg: '',
    data: [{
      'deviceID': '10012003683530583012',
      'deviceName': 'äº²æ°´å¹³å°çƒæœº',
      'deviceDesc': '',
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.12',
      'devicePort': '80',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30076835305830120001',
      'subDeviceName': 'äº²æ°´å¹³å°çƒæœº',
      'subDeviceDesc': 'äº²æ°´å¹³å°çƒæœº',
      'recordPlanUuid': '319d953850004884bc4fce3c3695f288',
      'templateId': '9e3b7d463ad04f2090f48ee0d22aaaaa',
      'recordPlanStatus': 1
    }, {
      'deviceID': '10012001001110004444',
      'deviceName': '38GPU',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.38',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010000001310000001',
      'subDeviceName': 'æµ·åº·-å‘¨ç•Œè¶Šç•Œæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012001001110000001',
      'deviceName': 'ç¼–ç è®¾å¤‡1',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.200.28',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010011101310010002',
      'subDeviceName': 'å¤§åŽ-äººè„¸æŠ“æ‹æœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '1002200114a78bb65794',
      'deviceName': 'å¤§åŽIPCæžªæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.41',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1002',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '300114a78bb657940001',
      'subDeviceName': 'ipcæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012003168964132179',
      'deviceName': 'å›½å®´åŽ…çƒæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '172.16.10.221',
      'devicePort': '5060',
      'installAddress': 'å›½å®´åŽ…',
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30071689641321790001',
      'subDeviceName': 'å›½å®´åŽ…çƒæœºé€šé“',
      'subDeviceDesc': null,
      'recordPlanUuid': '81ebcb81039840f4b811fb40115a5a48',
      'templateId': '22dc9bedc623466cb808b7154faf82d3',
      'recordPlanStatus': 1
    }, {
      'deviceID': '10012001001110004444',
      'deviceName': '38GPU',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.38',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010000001310000001',
      'subDeviceName': 'æµ·åº·-å‘¨ç•Œè¶Šç•Œæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012001001110000001',
      'deviceName': 'ç¼–ç è®¾å¤‡1',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.200.28',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30010011101310010002',
      'subDeviceName': 'å¤§åŽ-äººè„¸æŠ“æ‹æœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012003683530583012',
      'deviceName': 'äº²æ°´å¹³å°çƒæœº',
      'deviceDesc': '',
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.12',
      'devicePort': '80',
      'installAddress': null,
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30076835305830120001',
      'subDeviceName': 'äº²æ°´å¹³å°çƒæœº',
      'subDeviceDesc': 'äº²æ°´å¹³å°çƒæœº',
      'recordPlanUuid': '319d953850004884bc4fce3c3695f288',
      'templateId': '9e3b7d463ad04f2090f48ee0d22aaaaa',
      'recordPlanStatus': 1
    }, {
      'deviceID': '1002200114a78bb65794',
      'deviceName': 'å¤§åŽIPCæžªæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2001',
      'deviceTypeName': 'camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '192.168.199.41',
      'devicePort': '5060',
      'installAddress': null,
      'providerCode': '1002',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '300114a78bb657940001',
      'subDeviceName': 'ipcæžªæœº',
      'subDeviceDesc': null,
      'recordPlanUuid': null,
      'templateId': null,
      'recordPlanStatus': null
    }, {
      'deviceID': '10012003168964132179',
      'deviceName': 'å›½å®´åŽ…çƒæœº',
      'deviceDesc': null,
      'deviceTypeCode': '2003',
      'deviceTypeName': 'ballhead_camera',
      'orgID': 'c69aeede4f6341929721e2892beec3cb',
      'orgName': 'æ’å¤§å±±æ°´åŸŽ',
      'deviceIP': '172.16.10.221',
      'devicePort': '5060',
      'installAddress': 'å›½å®´åŽ…',
      'providerCode': '1001',
      'streamIp': '192.168.0.207',
      'streamPort': 10000,
      'subDeviceID': '30071689641321790001',
      'subDeviceName': 'å›½å®´åŽ…çƒæœºé€šé“',
      'subDeviceDesc': null,
      'recordPlanUuid': '81ebcb81039840f4b811fb40115a5a48',
      'templateId': '22dc9bedc623466cb808b7154faf82d3',
      'recordPlanStatus': 1
    }]
  }
)
/*
*人脸抓拍数据faceCapture/list
*/
Mock.mock(/faceCapture\/list/, 'get', {
  code: '00000',
  msg: '',
  data: {
    member: [
      { img: '/static/images/p04.png', name: '1' },
      // { img: '/static/images/p04.png', name: '张三' },
      // { img: '/static/images/p06.png', name: '张三' },
      // { img: '/static/images/p04.png', name: '张三' },
      // { img: '/static/images/p06.png', name: '张三' },
      // { img: '/static/images/p06.png', name: '张三' },
      // { img: '/static/images/p04.png', name: '张三' },
      // { img: '/static/images/p06.png', name: '张三' },
      { img: '/static/images/p06.png', name: '2' },
      { img: '/static/images/p06.png', name: '3' },
      { img: '/static/images/p06.png', name: '4' },
      { img: '/static/images/p04.png', name: '5' },
      { img: '/static/images/p04.png', name: '6' },
      { img: '/static/images/p06.png', name: '7' }
    ]
  }
})

Mock.setup({
  timeout: 400
})
