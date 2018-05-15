import Vue from 'vue'
import Vuex from 'vuex'

import state from './states'
// import mutationTypes from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
    // 所有的警告（W1和W2区域）都隐藏了
    allAlarmsAreHidden: (state) => {
      return !state.primary_alarm.shown && !state.secondary_alarm.shown
    },
    // 控制w1、w2区域显隐的按钮是否可操作
    alarmsStatus: (state) => {
      return state.is_alarms_btn_operative
    },
    // ‘园区’或‘停车场’地图警报信息 状态
    sceneMessageStatus: (state) => {
      return state.message_alarm
    }
  },
  mutations: {
    // // 触发人员信息事件（打开或者关闭）
    // [mutationTypes.SHOW_MEMBER_INFO] (state, payload) {
    //   if ('shown' in payload) {
    //     state.member_info.shown = !!payload.shown
    //   }
    //   if ('data' in payload) {
    //     state.member_info.data = payload.data
    //   }
    // },
    // // 触发设备信息事件
    // [mutationTypes.SHOW_DEVICE_INFO] (state, payload) {
    //   if ('shown' in payload) {
    //     state.device_info.shown = !!payload.shown
    //   }
    //   if ('data' in payload) {
    //     state.device_info.data = payload.data
    //   }
    // },
    // // 触发车辆信息事件
    // [mutationTypes.SHOW_CAR_INFO] (state, payload) {
    //   if ('shown' in payload) {
    //     state.car_info.shown = !!payload.shown
    //   }
    //   if ('data' in payload) {
    //     state.car_info.data = payload.data
    //   }
    // },
    // // 触发一级告警事件
    // [mutationTypes.SHOW_PRIMARY_ALARM] (state, payload) {
    //   if ('shown' in payload) {
    //     state.primary_alarm.shown = !!payload.shown
    //   }
    //   if ('data' in payload) {
    //     state.primary_alarm.data = payload.data
    //   }
    // },
    // // 触发二级告警事件
    // [mutationTypes.SHOW_SECONDARY_ALARM] (state, payload) {
    //   if ('shown' in payload) {
    //     state.secondary_alarm.shown = !!payload.shown
    //   }
    //   if ('data' in payload) {
    //     state.secondary_alarm.data = payload.data
    //   }
    // },
    // 统一mutations, 如 this.$store.commit('sendMessage', { windowName: 'primary_alarm', shown: true, data: data })
    sendMessage (state, payload) {
      let win = payload['windowName']
      let winState = state[win]
      if ('shown' in payload) {
        winState.shown = !!payload.shown
        // TODO: D区域比较特殊，上面覆盖了三个窗口，一个显示，另外两个就需要隐藏，D区域应该重构成一个容器作为接口。
        let dWins = ['device_info', 'member_info', 'car_info']
        if (payload.shown && dWins.indexOf(win) >= 0) {
          dWins.forEach(item => {
            if (item !== win) {
              state[item].shown = false
            }
          })
        }
      }
      if ('data' in payload) {
        winState.data = payload.data
      }
    },
    // 显示/隐藏所有告警
    toggleAlarms (state, isShow) {
      if (state.message_alarm['primary_danger'] > 0 || !isShow) {
        state.primary_alarm.shown = isShow
      }
      // 当社区呼叫正在接听的时候，不能隐藏W2区，也即不在呼叫的时候才可以切换W2的显示态
      if (!state.secondary_alarm.is_community_calling && (state.message_alarm['second_warn'] > 0 || !isShow)) {
        state.secondary_alarm.shown = isShow
      }
    },
    // 切换社区呼叫的接听状态
    setCommunityCalling (state, calling) {
      state.secondary_alarm.is_community_calling = !!calling
    },
    // 统计‘一级警报’ 和 ‘二级警报’ 数目 : type= primary_danger(一级警报),type= second_warn(二级警报)
    setSceneMessage (state, data) {
      state.message_alarm[data.type] = data.count
    },
    is_videoocx_downloaded (state, data) {
      state.is_videoocx_downloaded = data
    },
    is_callocx_downloaded (state, data) {
      state.is_callocx_downloaded = data
    }
  }
})
