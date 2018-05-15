/**
 * 中央控制器，负责处理全局事物，以及对接ws消息，下发给组件。
 */

import { loadWebsocket } from '../../websocket/index'

// 回调集
const callbackMap = {}

/**
 * @title 注册一个对应业务的回调
 * @desc 针对WS下发的数据，统一由业务方组件自己提供注册回调函数的模式
 * @param key {string} 注册的业务唯一key
 * @param range {array} 连续型type的闭区间值，两个number值。 如[10010, 10086]
 * @param points {array} 离散型type的点集合。如[201, 215, 105, 728]。可以和range同时存在
 * @param callback {function} 回调函数
 * @example
     register({
        key: 'carEntry',
        range: [10010, 10086],
        points: [20001, 20050, 20053],
        callback: function (info) {
          console.log('"car entry" info with websocket: ', info)
        }
     })
 */
function register ({key, range, points, callback}) {
  if (callbackMap[key] !== undefined) {
    console.log(`!!! WS回调集已经注册了名为'${key}'的回调，请修改为其他key， 如果是组件卸载后重新挂载的请忽略。`)
    return false
  }

  let value = { callback }

  // 检查points的格式
  if (points !== undefined) {
    // 额外支持了一个单数据的格式
    if (points instanceof Number) {
      points = [points]
    }
    if (!(points instanceof Array)) {
      console.error('controller.register的points如果指定了，就必须是一个由number组成的Array', points)
    } else {
      value['points'] = points
    }
  }

  // 检查range. range是一个区间值（默认前小后大）
  if (range !== undefined) {
    if (!(range instanceof Array)) {
      console.error('controller.register的range值如果指定了，就必须是一个前小后大的number array。', range)
    } else {
      let start = +range[0]
      let end = +range[1]
      if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
        console.error('controller.register的range值必须是前小后大的两个数字', range)
      } else {
        value['range'] = range
      }
    }
  }

  // 只有格式检查通过了才进行绑定
  let paramsValid = ('points' in value) || ('range' in value)
  if (paramsValid && (typeof callback === 'function')) {
    callbackMap[key] = value
  }
}

/**
 * 初始化
 */
function init () {
  // 加载WS， 每一个类型对应的数据都丢给对应组件去处理
  loadWebsocket(jsonString => {
    let data = null
    try {
      data = JSON.parse(jsonString).data
    } catch (e) {
      return console.error('WebSocket下发的内容格式解析出错', e, jsonString)
    }
    let type = +data.type
    let info = data.info
    for (let key in callbackMap) {
      let item = callbackMap[key]
      let range = item.range
      let points = item.points
      let callback = item.callback

      // 在callback执行后立即continue的原因是防止points和range的值有重合时执行两次回调
      // 先判断points
      if (points !== undefined) {
        // IE不支持find方法，只能改为filter.
        let val = points.filter(point => +point === type)[0]
        if (val !== undefined) {
          callback(info, data)
          continue
        }
      }

      // 再判断range。 range是一个区间值（默认前小后大）
      if (range !== undefined) {
        let start = +range[0]
        let end = +range[1]
        if (start <= type && type <= end) {
          callback(info, data)
          continue
        }
      }
    }
  }, 'egscuimain')
}

export default {
  init,
  register
}
