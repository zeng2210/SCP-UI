// import Mock from 'mockjs'

// // 配置mock过滤路径
// // 模拟后台调控当前音量接口
// Mock.mock('/broadcast/volume/upOrDown', function () {
//   return {
//     code: '00000',
//     data: {
//       status: '音量提交成功'
//     }
//   }
// })

// // 模拟查询当前音量接口
// Mock.mock('/broadcast/volume/search/0', function () {
//   return {
//     code: '00000',
//     message: '音量查询',
//     data: {
//       volumeId: null,
//       vol: 15,
//       devip: null,
//       playAreaId: null,
//       deviceId: null
//     }
//   }
// })

// // 模拟查询音量以及正在播放歌曲
// Mock.mock(/\/scp-broadcastapp\/map\/search.*/i, function () {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名',
//       sessionId: 1,
//       vol: 5,
//       status: 1,
//       timeLength: 325,
//       taskId: '1', // 任务Id
//       picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611461805&di=e3226728db77db933a85022efd4b781f&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F17%2F25%2F39%2F99758PICPN6.jpg'
//     }
//   }
// })

// // 模拟上一首/下一首
// Mock.mock(/\/scp-broadcastapp\/map\/lastOrNext.*/i, function () {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名2',
//       sessionId: 1
//     }
//   }
// })

// // 模拟播放暂停
// Mock.mock(/\/scp-broadcastapp\/map\/startOrStop.*/i, function () {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名1',
//       sessionId: 1,
//       status: 2
//     }
//   }
// })

// // 模拟修改音量
// Mock.mock(/\/scp-broadcastapp\/map\/volume\/upOrDown.*/i, function () {
//   return {
//     code: '00000',
//     data: {
//       audioclipName: '歌曲名3',
//       sessionId: 1
//     }
//   }
// })

// // 模拟广播设备
// Mock.mock(/\/getDevicelist.*/i, function () {
//   return {
//     code: '00000',
//     data: {
//       name: '广播002',
//       position: '4栋2单元',
//       state: '开启',
//       type: '广播',
//       manufacturer: '海康',
//       ip: '172.16.10.221：80'
//     }
//   }
// })

// // 模拟广播任务列表
// Mock.mock(/\/getTaskList.*/i, function () {
//   return {
//     code: '00000',
//     data: [{
//       taskId: '0', // 任务Id
//       picUrl: 'http://f.hiphotos.baidu.com/baike/w%3D268/sign=9c0d7fa4d2a20cf44690f9d94e084b0c/f2deb48f8c5494ee3590f73a2ff5e0fe99257e67.jpg'
//     }, {
//       taskId: '1', // 任务Id
//       picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523611461805&di=e3226728db77db933a85022efd4b781f&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F17%2F25%2F39%2F99758PICPN6.jpg'
//     }, {
//       taskId: '2', // 任务Id
//       picUrl: 'http://n.sinaimg.cn/ent/transform/20170920/M3G7-fykymue7408829.jpg'
//     }, {
//       taskId: '3', // 任务Id
//       picUrl: 'http://henan.sinaimg.cn/2014/0919/U9419P827DT20140919152737.jpg'
//     }, {
//       taskId: '4', // 任务Id
//       picUrl: 'http://pic.baike.soso.com/p/20131221/20131221162609-1298391415.jpg'
//     }]
//   }
// })
