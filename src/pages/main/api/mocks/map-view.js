import Mock from 'mockjs'
console.log('this is mock page of map')
// import Mock from 'mockjs'
// const randomPoint = function (level) {
//   const _defaultObj = {
//     courtUuid: 'string',
//     sceneId: '添加测试4',
//     markerName: '添加测试',
//     longitude: 0,
//     latitude: 8,
//     markerOrder: 0,
//     dragable: true,
//     iconUrl: 'string',
//     comment: 'string',
//     createTime: 2868634,
//     updateTime: 2868634,
//     createUser: 'string',
//     updateUser: 'string',
//     deleteFlag: 1
//   }
//   let finalData = []
//   for (let i = 0; i < 16; i++) {
//     if (i !== 4 && i !== 5 && i !== 12 && i !== 13) {
//       let tempData = Object.assign({}, _defaultObj)
//       tempData.id = new Date().getTime() + i + ''
//       tempData.deviceId = new Date().getTime() + i + ''
//       tempData.positionX = Math.floor(Math.random() * (12000 - 1500 + 1) + 1500)
//       tempData.positionY =
//         0 - Math.floor(Math.random() * (7000 - 2500 + 1) + 2500)
//       tempData.markerType = Math.floor(i / 2) + 1
//       tempData.zoomLevel = level
//       tempData.markerStatus =
//         tempData.markerType + '0' + (Math.floor(i % 2) + 1)
//       finalData.push(tempData)
//     }
//   }
//   return finalData
// }
// 获取点位列表
// Mock.mock(/\/mapService\/getMarkerList.*/i, function (params) {
//   let indexZ = params.url.indexOf('zoomLevel=')
//   let levelZ = parseInt(params.url[indexZ + 10])
//   console.log('mock getMarkers')
//   const randomMarkers = randomPoint(levelZ)
//   return {
//     // data: {
//     code: '00000',
//     data: randomMarkers,
//     message: 'success'
//   }
//   // }
// })
// 获取区域
// Mock.mock(/\/mapService\/getAreaList.*/i, function () {
//   return {
//     data: [
//       {
//         id: '1024',
//         sceneId: '12',
//         areaName: '正中间',
//         areaType: 2,
//         borderPoints: [
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 6500,
//             pointY: -4500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 7000,
//             pointY: -4500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 6750,
//             pointY: -5000,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 6500,
//             pointY: -4500,
//             markerType: 1,
//             markerOrder: '1'
//           }
//         ]
//       },
//       {
//         id: '2048',
//         sceneId: '12',
//         areaName: '西南区',
//         areaType: 2,
//         borderPoints: [
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 3000,
//             pointY: -5750,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 3500,
//             pointY: -5500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 4000,
//             pointY: -6000,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 4000,
//             pointY: -6500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 3000,
//             pointY: -6500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 3000,
//             pointY: -6000,
//             markerType: 1,
//             markerOrder: '1'
//           }
//         ]
//       },
//       {
//         id: '4096',
//         sceneId: '12',
//         areaName: '东北区',
//         areaType: 2,
//         borderPoints: [
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 9000,
//             pointY: -3000,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 9000,
//             pointY: -3500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 9500,
//             pointY: -3500,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 9500,
//             pointY: -3000,
//             markerType: 1,
//             markerOrder: '1'
//           },
//           {
//             id: '01',
//             sceneId: '12',
//             areaId: '123',
//             gpsLongitude: '123.113432',
//             gpsLatitude: '45.124322',
//             pointX: 9000,
//             pointY: -3000,
//             markerType: 1,
//             markerOrder: '1'
//           }
//         ]
//       }
//     ],
//     code: '00000',
//     message: 'sucess'
//   }
// })

// /\/map-app\/getSceneList.*/i
// Mock.mock(/\/mapService\/getSceneList.*/i, function () {
//   console.log('mock getMarkers')
//   return {
//     // data: {
//     code: '00000',
//     data: [
//       {
//         id: '4bbb1d5badc04299a0efdc7335a5b1d1',
//         courtUuid: 'c69aeede4f6341929721e2892beec3cb',
//         sceneName: 'test_小区全图',
//         url: 'http://zc200008pc1.hdsc.com/hdyj/',
//         gpsLon: null,
//         gpsLat: null,
//         centerLon: 113.623667,
//         centerLat: 23.30568,
//         scale: 0.420936,
//         scaleType: 1,
//         height: 1080.0,
//         width: 1920.0,
//         realHeight: null,
//         realWidth: null,
//         orgCode: '3bd7016f4e3241c1a0ab04753b875924',
//         sceneType: 1,
//         createUser: 'testUser',
//         updateUser: 'test',
//         deleteFlag: 1,
//         parentArea: null,
//         countWarning: 1,
//         createTime: 1517453918210,
//         updateTime: 1523282694688,
//         orgName: '1单元',
//         arcAngle: 0.01862376,
//         buildingZoom: 4
//       }
//     ],
//     message: 'success'
//   }
//   // }
// })
// mock保安点位/getSecurity
// Mock.mock(/\/scp-patrolapp\/patrolSendUser\/listSecurity.*/i, function () {
Mock.mock(/\/getSecurity.*/i, function () {
  return {
    code: '00000',
    data: [
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.712805,
        latitude: 23.000164
      },
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c5',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.715805,
        latitude: 23.001164
      },
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c4',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.714805,
        latitude: 23.001164
      },
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c3',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.713805,
        latitude: 23.001164
      },
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c2',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.716805,
        latitude: 23.001164
      },
      {
        userId: 'a442ab294e194232ab8849c98a5f1c3c1',
        taskNum: 1,
        finishedNum: 0,
        userName: '102',
        deviceId: null,
        deviceName: null,
        positionName: '保安员',
        facePic: 'http://192.168.0.246:8888/group1/M00/3A/7D/wKgA9lrBquqAa-WEAABruVDbldc265.jpg',
        phone: '18676464636',
        hiredate: '1521648000000',
        longitude: 113.715805,
        latitude: 23.002164
      }
    ]
  }
})
// 业主访客陌生人
// Mock.mock(/\/businessCommon\/getPersonnelList.*/i, function () {
//   return {
//     code: '00000',
//     data: [
//       {
//         commonHead: {
//           deviceId: '4567890',
//           deviceGps: {
//             lon: 113.7,
//             lat: 23.4
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: 'household',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '重点人员',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: 'keyPersonnel',
//           eventType: '25051',
//           subEventType: '1'
//         }
//       },
//       {
//         commonHead: {
//           deviceId: '45678900',
//           deviceGps: {
//             lon: 113.7,
//             lat: 23.37
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: 'household',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '重点人员',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: 'keyPersonnel',
//           eventType: '25051',
//           subEventType: '1'
//         }
//       },
//       {
//         commonHead: {
//           deviceId: '4567891',
//           deviceGps: {
//             lon: 113.69,
//             lat: 23.43
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: 'visitor',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '重点人员',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: 'keyPersonnel',
//           eventType: '25051',
//           subEventType: '1'
//         }
//       },
//       {
//         commonHead: {
//           deviceId: '4567892',
//           deviceGps: {
//             lon: 113.69,
//             lat: 23.45
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: 'stranger',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '重点人员',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: 'keyPersonnel',
//           eventType: '25051',
//           subEventType: '1'
//         }
//       }
//     ]
//   }
// })
// 快递机器人
// Mock.mock(/\/robot\/getInitRobotInfo.*/i, function () {
//   return {
//     code: '00000',
//     data: [
//       {
//         lon: 113.715805,
//         lat: 23.001464,
//         robot: 'ZR1001',
//         status: 'R01',
//         battery: 98,
//         error: 'E00'
//       },
//       {
//         lon: 113.715805,
//         lat: 23.001664,
//         robot: 'ZR1000',
//         status: 'R01',
//         battery: 96,
//         error: 'E00'
//       },
//       {
//         lon: 113.714805,
//         lat: 23.001264,
//         robot: 'ZR1002',
//         status: 'R01',
//         battery: 9,
//         error: 'E00'
//       }
//     ]
//   }
// })
// 指路牌信息
// Mock.mock(/\/signPostStatus\/queryForList*/i, function () {
//   console.log('指路牌')
//   return {
//     code: '00000',
//     data: [
//       {
//         status: '1',
//         cellid: 'abc',
//         addrid: '123',
//         lon: 113.714105,
//         lat: 23.00
//       },
//       {
//         status: '2',
//         cellid: 'abcdefg',
//         addrid: '123456',
//         lon: 113.715005,
//         lat: 23.0014
//       }
//     ]
//   }
// })
// 报警点位
// Mock.mock(/\/businessCommon\/getEventList.*/i, function () {
//   console.log('指路牌')
//   return {
//     code: '00000',
//     data: [
//       {
//         commonHead: {
//           deviceId: '123123123',
//           deviceGps: {
//             lon: 113.71,
//             lat: 23.36
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: '1',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '落水预警',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: '123123123',
//           eventType: '25020',
//           subEventType: '1'
//         }
//       }, {
//         commonHead: {
//           deviceId: 'keyPersonnel',
//           deviceGps: {
//             lon: 113.68,
//             lat: 23.33
//           },
//           eventId: '',
//           commandId: 'ALARM_001',
//           userID: '0d2461688aa44200a1179e539e8ef47e',
//           userType: '1',
//           occurTime: '2018-02-23 16:24:12'
//         },
//         eventBody: {
//           eventContent: '重点人员',
//           occurTime: '2018-02-23 16:24:12',
//           address: '发生地点',
//           scenePic: 'http: //192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           facePic: 'http://192.168.0.242:39047/VIID/showimages?id=group1/M00/2F/D1/wKgA9lqcsDSAPDSdAABb8b6FP-Y8337289',
//           deviceId: 'keyPersonnel',
//           eventType: '25051',
//           subEventType: '1'
//         }
//       }
//     ]
//   }
// })
// 快递机器人路线
Mock.mock(/\/scp-robotRoute.*/i, function () {
  console.log('robotRoute')
  return {
    code: '00000',
    data: {
      id: 'ZR1001',
      borderPoints: [
        [836.698157020738, -6032.770927853566],
        [42.5, 94.9375],
        [41.5, 33.9375],
        [151, 39.4375],
        [151.5, 99.4375],
        [68.5, 112.9375],
        [42.5, 93.9375]
      ]
    }
  }
})

// 获取保安路线数据
Mock.mock(/\/scp-patrolapp\/patrolGpsEvent\/queryGPSInHour.*/i, function () {
  return {
    code: '00000',
    data: {
      userId: 'GD1001',
      gpsList: [{
        longitude: 113.69,
        latitude: 23.33
      }, {
        longitude: 113.69,
        latitude: 23.3345
      }, {
        longitude: 113.67,
        latitude: 23.3345
      }, {
        longitude: 113.64,
        latitude: 23.3345
      }]
    }
  }
})

// 获取楼栋区域里的设备信息
Mock.mock(/\/mapService\/getAreaMarkerInfo.*/i, function (data) {
  console.log('*************getAreaMarkerInfo**************')
  console.log(data)
  let params = data.url.split('?')[1].split('&')
  let floorType = params[2].split('=')[1]
  let areaMarkerDic = {
    B1: {
      areaId: 'ZR1001',
      floor_type: 'B1',
      building_zoom: 6,
      markerList: [
        {
          id: '101',
          deviceId: '101',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa',
          areaId: 'ZR1003',
          floor_type: 'B1',
          markerName: 'ccccc',
          markerStatus: '501',
          markerType: 5,
          positionX: 11474,
          positionY: -7177,
          name: 'test brake marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        },
        {
          id: '102',
          deviceId: '102',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa1',
          areaId: 'ZR1003',
          floor_type: 'B1',
          markerName: 'ccccc1',
          markerStatus: '501',
          markerType: 5,
          positionX: 11518.40625,
          positionY: -7161.4375,
          name: 'test brake marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        }
      ]
    },
    F1: {
      areaId: 'ZR1002',
      floor_type: 'F1',
      building_zoom: 6,
      markerList: [
        {
          id: '201',
          deviceId: '201',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa2',
          areaId: 'ZR1003',
          floor_type: 'F1',
          markerName: 'ccccc2',
          markerStatus: '101',
          markerType: 1,
          positionX: 11375.40625,
          positionY: -7052.4375,
          name: 'test camera marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        },
        {
          id: '202',
          deviceId: '202',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa2',
          areaId: 'ZR1003',
          floor_type: 'F1',
          markerName: 'ccccc2',
          markerStatus: '101',
          markerType: 1,
          positionX: 11483.40625,
          positionY: -7026.4375,
          name: 'test camera marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        }
      ]
    },
    F30: {
      areaId: 'ZR1003',
      floor_type: 'F30',
      building_zoom: 6,
      markerList: [
        {
          id: '301',
          deviceId: '301',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa3',
          areaId: 'ZR1003',
          floor_type: 'F30',
          markerName: 'ccccc3',
          markerStatus: '601',
          markerType: 6,
          positionX: 11772.40625,
          positionY: -7084.4375,
          name: 'test control marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        },
        {
          id: '302',
          deviceId: '302',
          lng: 113.65,
          lat: 23.33,
          userId: 'aaaaa3',
          areaId: 'ZR1003',
          floor_type: 'F30',
          markerName: 'ccccc3',
          markerStatus: '601',
          markerType: 6,
          positionX: 11862.40625,
          positionY: -7154.4375,
          name: 'test control marker',
          imgUrl: '',
          size: [120, 128],
          zoomLevel: 6
        }
      ]
    }
  }
  return {
    code: '00000',
    data: areaMarkerDic[floorType]
  }
})
