import Mock from 'mockjs'

// 获取所有设备类型
// Mock.mock(/weather\/getCourtWeather/, 'get',
//   {
//     code: '00000',
//     msg: '',
//     data: {
//       'aqi': {
//         'cityName': '北京市',
//         'co': '8',
//         'coC': '0.8',
//         'no2': '26',
//         'no2C': '51.0',
//         'o3': '15',
//         'o3C': '47.0',
//         'pm10': '87',
//         'pm10C': '123.0',
//         'pm25': '116',
//         'pm25C': '88.0',
//         'pubtime': '1521424800000',
//         'rank': '405/577',
//         'so2': '2',
//         'so2C': '7.0',
//         'value': '117'
//       },
//       'city': {
//         'cityId': 2,
//         'counname': '中国',
//         'name': '北京市',
//         'pname': '北京市',
//         'timezone': '8'
//       },
//       'condition': {
//         'condition': '阴',
//         'humidity': '40',
//         'icon': '2',
//         'temp': '12',
//         'updatetime': '2018-03-19 10:20:00',
//         'windDir': '西北风',
//         'windLevel': '1'
//       },
//       'forecast': [
//         {
//           'conditionDay': '多云',
//           'conditionIdDay': '1',
//           'conditionIdNight': '31',
//           'conditionNight': '多云',
//           'predictDate': '2018-03-19',
//           'tempDay': '14',
//           'tempNight': '1',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '东风',
//           'windDirNight': '东风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         },
//         {
//           'conditionDay': '多云',
//           'conditionIdDay': '1',
//           'conditionIdNight': '31',
//           'conditionNight': '多云',
//           'predictDate': '2018-03-20',
//           'tempDay': '10',
//           'tempNight': '-2',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '南风',
//           'windDirNight': '南风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         },
//         {
//           'conditionDay': '多云',
//           'conditionIdDay': '1',
//           'conditionIdNight': '31',
//           'conditionNight': '多云',
//           'predictDate': '2018-03-21',
//           'tempDay': '13',
//           'tempNight': '1',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '西南风',
//           'windDirNight': '南风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         },
//         {
//           'conditionDay': '多云',
//           'conditionIdDay': '1',
//           'conditionIdNight': '31',
//           'conditionNight': '多云',
//           'predictDate': '2018-03-22',
//           'tempDay': '16',
//           'tempNight': '4',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '西南风',
//           'windDirNight': '西南风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         },
//         {
//           'conditionDay': '多云',
//           'conditionIdDay': '1',
//           'conditionIdNight': '30',
//           'conditionNight': '晴',
//           'predictDate': '2018-03-23',
//           'tempDay': '20',
//           'tempNight': '5',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '西南风',
//           'windDirNight': '北风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         },
//         {
//           'conditionDay': '晴',
//           'conditionIdDay': '0',
//           'conditionIdNight': '30',
//           'conditionNight': '晴',
//           'predictDate': '2018-03-24',
//           'tempDay': '21',
//           'tempNight': '6',
//           'updatetime': '2018-03-19 10:08:00',
//           'windDirDay': '西南风',
//           'windDirNight': '西南风',
//           'windLevelDay': '3',
//           'windLevelNight': '3'
//         }
//       ],
//       'limit': [
//         {
//           'date': '2018-03-18',
//           'prompt': 'W'
//         },
//         {
//           'date': '2018-03-19',
//           'prompt': '50'
//         },
//         {
//           'date': '2018-03-20',
//           'prompt': '16'
//         },
//         {
//           'date': '2018-03-21',
//           'prompt': '27'
//         },
//         {
//           'date': '2018-03-22',
//           'prompt': '38'
//         },
//         {
//           'date': '2018-03-23',
//           'prompt': '49'
//         }
//       ]
//     }
//   }
// )

Mock.setup({
  timeout: 4000
})
