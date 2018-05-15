# markerType映射说明

| markerType | 点位类型 | 正常状态 | 断线 | store |
| :--- | :--- | :---| :--- | :--- |
| guarder | 保安 | | | member_info |
| households | 住户 | | | member_info |
| visitor | 访客 | | | member_info |
| stranger | 陌生人 | | | member_info |
| control | 门禁 | 601 | 602 | device_info| 
| brake | 车闸 | 501 | 502 | device_info| 
| gates | 人行道闸 | 401 | 402 | device_info| 
| elevator | 电梯 | 801 | 802 | device_info| 
| camera | 摄像头 | 101 | 102 | device_info| 
| broadcast | 广播 | 201 | 202 | device_info| 
| robot | 机器人 | | | device_info| 
| signpost | 电子指路牌 | | | device_info| 
| fence | 电子围栏 | 901 | 902 | device_info| 
| lock | 地锁 | | | device_info| 

# 提供的数据信息结构

## 设备点位

可以根据markerStatus来判断点位是正常还是设备异常
markerStatus的值后两位01标识为正常，02标识为异常

固定设备点位点击时commit信息结构
包括： 门禁，车闸，人行道闸，电梯，摄像头，广播，电子围栏，地锁
```javascript
{
  id: 点位id
  markerType: 点位类型 // 参见上面的table
  markerName: 点位名称  
  deviceId: 设备id
  markerStatus: 点位状态
  position: 点位坐标
  zoomLevel: 显示等级
}
```
机器人
```javascript
{
  id: markerList[j].robot,
  positionGPS: robotPositionGPS,
  position: robotPositionXY,
  markerType: 'robot',
  markerName: markerList[j].robot,
  imgUrl: icoRobot
  markerStatus: 101/102 // 根据error标识机器人状态，E00 为101，正常， 102为异常状态
  info: {
    // 推送过来的机器人相关信息都在此对象中
    status: markerList[j].status,
    battery: markerList[j].battery,
    error: markerList[j].error,
  }
}
```
电子指路牌
```javascript
{
  id: markerList[j].cellid + markerList[j].addrid,
  position: guidepostPositionXY,
  markerType: 'signpost',
  imgUrl: icoGuidepost
  markerStatus: 101/102 // 根据status标识机器人状态，status: 1 为101，正常， 102为异常状态
  info: {
    status: markerList[j].status,
    cellid: markerList[j].cellid,
    addrid: markerList[j].addrid,  
    positionGPS: guidepostPositionGPS,
  }
}
```
## 人员点位
业主、访客、陌生人信息格式
```javascript
{
  id: (markerInfo.userType === '陌生人') ? markerInfo.eventId : markerInfo.userId
  markerType: 'household' / 'visitor' / 'stranger'
  position: householdVisitorStrangerPositionXY,
  imgUrl: icon,
  info: {
    commonHead: //参考公共管理组建发出的commonHead结构 
    eventBody: //参考公共管理组件发出的eventBody结构
  }
}
```
保安点位信息
```javascript
{
  marker.id = markerList[j].userId
  marker.markerType = 'guarder'
  marker.markerName = markerList[j].userName
  marker.position = securityPositionXY
  marker.imgUrl = icoSecurityNormal
  marker.info = markerList[j] // 此对象为借口提供的保安点位相关信息
}
```

## 事件点位
事件点位
```javascript
{
  id: markerInfo.eventId,
  position: warnPositionXY,
  text: markerInfo.eventContent, // 此为地图报警点位旁提示信息
  type: status, // warn/danger 显示为红色报警或黄色预警
  markerType: eventType // 这里是将事件类型码提出到markerType属性
  // 其中40020为可视对讲呼叫， 25051 为重点人员，这两类需要commit到secondary_alarm store中，其他类型commit 到 primary_alarm 中
  info: {
    eventHead: //参考公共管理组建发出的commonHead结构 
    eventBody: //参考公共管理组件发出的eventBody结构
  }
}
```
## 事件分类
```
零级：
	机器人正常上线： 93001
	人脸检测： 20113
	人脸识别： 20114
	可视对讲呼叫： 40020
	可视对讲挂断： 40021
	保安异常： 70050
	指路牌正常上线：94005
一级事件
	人工湖落水： 25020
	视频监控越界：	25019
	电子围栏越界;   91001
二级事件
	人员徘徊： 25022
	车辆违停： 25306
	重点人员：  25051
三级事件
	机器人异常:
		机器人超时报警	93002
		机器人低电量报警	93003
		机器人偏离路线报警	93004
四级事件 
	巡更报事：	70051
	其他设备故障：90010
	指路牌设备升级：94006
	指路牌设备离线：94007
```
