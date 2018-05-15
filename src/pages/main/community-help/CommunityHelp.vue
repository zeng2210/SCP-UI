<template>
  <div class="item-box item-warning falling-water-box">
    <div v-show=" !showSelectGuards ">
      <carousel height="16.3rem" :noAction="true" dotTop="-1.64rem" @change="pageChange" ref="carousel" :disabled="noSwitch">
        <carousel-item>
          <component v-if="this.secondaryWarnList.length>0 && warnData" v-show="curShow==='warn'" :ocxbgColor="ocxbgColor" :errorImg="errorImg" :defaultImg="defaultImg" :is="currentWarn" :warnData="warnData" ref="warnList" @choseDispathGuard="choseDispathGuard" @closeWarnEvent="closeWarnEvent" :checkedInfo="checkedInfo" @mulDismissWarn="mulDismissWarn">
          </component>
          <communityHelpItem v-show="curShow==='call'" ref="callList" @setActiveItem="setActiveItem" @setCallData="setCallData" @updateItemLength="updateItemLength" @setNoSwitch="setNoSwitch" :curShow="curShow" @mulDismissWarn="mulDismissWarn" @hidePage="hidePage" :showPage="showPage">
          </communityHelpItem>
        </carousel-item>
      </carousel>
    </div>
    <select-guards v-if="showSelectGuards" @cancleSelectGuards="cancleSelectGuards" :securityList="checkedInfo.recommedSecurity" :warnData="warnData"></select-guards>
  </div>
</template>
<script>
import controller from '../controller'
import store from '@/pages/main/store'
import { mapMutations } from 'vuex'
// import mutationTypes from '@/pages/main/store/mutation-types'
import parkWarn from './../hk-packages/park-warning/src/ParkWarnList.vue'
import patrolAccident from './../hk-packages/park-warning/src/PatrolAccident.vue'
import warnEventMix from './warnEventMix'
import selectGuards from './../hk-packages/park-warning/src/components/SelectGuards'
import communityHelpItem from './CommunityHelpItem'
export default {
  name: 'community-help',
  components: {
    parkWarn,
    patrolAccident,
    selectGuards,
    communityHelpItem
  },
  props: {
    info: Object
  },
  data () {
    return {
      errorImg: require('../../../../static/images/people-warning.png'),
      defaultImg: 'this.src="' + require('../../../../static/images/people-warning.png') + '"',
      ocxbgColor: 2,
      curShow: 'warn',
      callList: [], // 社区求助列表
      noSwitch: false,
      websocketMessage: {},
      showPage: true
    }
  },
  computed: {
    allLength () {
      return this.callList.length + this.secondaryWarnList.length
    }
  },
  created () {
    // 在websocket消息处理中心注册一个区间回调函数，触发一个status状态变更
    controller.register({
      key: 'community-help-info',
      range: [40000, 49999],
      callback: (info, data) => {
        this.websocketMessage = data
      }
    })
  },
  mounted () {
    // 判断插件是否异常
    let that = this
    setTimeout(() => {
      try {
        that.$refs.callList.$refs.PlayOcx_1.GetLocalIP()
      } catch (e) {
        console.log(e)
        this.$store.commit('is_callocx_downloaded', false)
      }
    }, 100)
  },
  methods: {
    ...mapMutations(['is_callocx_downloaded']),
    /**
    * @description 页面切换
    * @param {number} index 当前显示的分页index
    */
    pageChange (index) {
      if (index < this.callList.length) { // 切换到社区求助
        if (this.$refs.warnList) {
          this.$refs.warnList.cancleDismiss()
        }
        this.setCallDataByIndex(index)
        this.curShow = 'call'
      } else { // 切换到异常事件
        this.setWarnData(index - this.callList.length)
        this.curShow = 'warn'
      }
    },
    /**
    * @description 改变当前显示的社区求助为指定index对应记录
    * @param {number} index 当前显示的分页index
    */
    setCallDataByIndex (index) {
      let callId = this.callList[index].callId
      this.$refs.callList.slideChangeSwiper(callId)
    },
    /**
    * @description 设置社区求助数据
    */
    setCallData () {
      this.callList = this.$refs.callList.callRecords
    },
    /**
    * @description 设置当前显示的分页index
    * @param {number} index 当前显示的分页index
    */
    setActiveItem (index) {
      this.$refs.carousel.setActiveItem(index)
    },
    /**
    * @description 设置轮播不可用
    * @param {boolean} isInTheCall 是否在通话中
    */
    setNoSwitch (isInTheCall) {
      this.noSwitch = isInTheCall
    },
    /**
    * @description 解除全部预警
    */
    mulDismissWarn (eventId) {
      if (eventId) {
        this.dismissWarn(eventId)
      } else {
        // 挂断全部的呼叫记录（除正在通话中的记录）
        if (this.callList.length > 0) {
          this.$refs.callList.hangupAllVideo()
        }
        if (this.secondaryWarnList.length > 0) {
          this.dismissWarn()
        }
      }
    },
    /**
    * @description 更新分页器
    * @param {number} index 指定要进行操作的小白点下标
    * @param {number} houmany 1表示添加一个小白点，-1表示删除一个小白点
    */
    updateItemLength (index, houmany) {
      this.$refs.carousel.updateItemLength(index, houmany)
    },
    setLength () {
      this.$refs.carousel.setItemLength(this.secondaryWarnList.length + this.callList.length)
    },
    /**
    * @description 隐藏页面
    */
    hidePage () {
      this.showPage = false
      store.commit('sendMessage', {
        windowName: 'secondary_alarm',
        shown: false
      })
    }
  },
  watch: {
    websocketMessage (data) {
      if (data.type === '40000') {
        this.showPage = true
      }
      this.$refs.callList.processCommunityHelpData(data)
    },
    allLength (val, oldVal) {
      if (this.isPatrolReceive) {
        this.isPatrolReceive = false
        return
      }
      if (val === 0 || !this.showPage) {
        // store.commit(mutationTypes.SHOW_SECONDARY_ALARM, { shown: false })
        store.commit('sendMessage', {
          windowName: 'secondary_alarm',
          shown: false
        })
      } else {
        // store.commit(mutationTypes.SHOW_SECONDARY_ALARM, { shown: true })
        store.commit('sendMessage', {
          windowName: 'secondary_alarm',
          shown: true
        })
        if (val === 1 && oldVal === 0) {
          this.pageChange(0)
        }
      }
    },
    info () {
      let markerType = this.info.markerType
      if (!this.noSwitch) {
        if (markerType === '40020') {
          let callId = this.info.info.eventBody.callNum
          let index = 0
          for (var i = 0, len = this.callList.length; i < len; i++) {
            if (callId === this.callList.callId) {
              index = i
              break
            }
          }
          if (this.callList.length > 0) {
            this.curShow = 'call'
            this.$refs.carousel.setActiveItem(index)
          }
        } else {
          this.curShow = 'warn'
          this.secondaryWarnList.map((item, index) => {
            if (item.eventHeader.eventId === this.info.id) {
              this.$refs.carousel.setActiveItem(index + this.callList.length)
            }
          })
        }
      }
    },
    noSwitch () {
      store.commit('setCommunityCalling', this.noSwitch)
    }
  },
  mixins: [warnEventMix]
}
</script>
<style scoped>

</style>
