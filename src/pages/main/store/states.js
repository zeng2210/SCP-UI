/**
 * 所有Vuex的状态集中化管理
 */
export default {
  // 人员信息
  member_info: {
    shown: false,
    // 人员类型、id等
    data: {}
  },
  // 设备信息
  device_info: {
    shown: false,
    // 设备id大类子类等
    data: {}
  },
  // 车辆信息
  car_info: {
    shown: false,
    data: {}
  },
  // W1一级预警。包含落水预警和园区越界
  primary_alarm: {
    shown: false,
    data: {}
  },
  // W2二级预警。包含社区求助和重点人员
  secondary_alarm: {
    shown: false,
    // 社区求助接听中，此时不允许窗口关闭（隐藏）
    is_community_calling: false,
    data: {}
  },
  // 统计‘一级警报’ 和 ‘二级警报’ 数目
  message_alarm: {
    primary_danger: 0,
    second_warn: 0
  },
  // 是否视频ocx插件已下载
  is_videoocx_downloaded: true,
  // 是否呼叫ocx插件已下载
  is_callocx_downloaded: true
}
