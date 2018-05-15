import { getSecurityDistanceList, hasPatrolSecuritys, getWarnData, hasDoneInfo, disMissWarning } from '@/pages/main/api/park-warning'
import controller from '@/pages/main/controller'
import { mapState } from 'vuex'
// import mutationTypes from '@/pages/main/store/mutation-types'

export default {
  data () {
    return {
      showSelectGuards: false, // 显示选择保安页面
      currentWarn: 'parkWarn',
      warnData: {},
      checkedInfo: {
        imgInit: false,
        isSelect: false,
        doneData: { finishPicArr: [], joinPerson: '', assistPerson: '' },
        checkedSecurity: [],
        recommedSecurity: [
          {
            name: ''
          },
          {
            name: ''
          }]
      },
      secondaryWarnList: [],
      isPatrolReceive: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getWarnDataList()
      controller.register({
        key: 'secondary-warning',
        points: [25022, 25306, 25051, 70051],
        callback: (info) => {
          this.handleReceiveData(info)
        }
      })
    })
  },
  methods: {
    // 初始化获取未解除预警数据列表
    getWarnDataList () {
      getWarnData().then(res => {
        res.map(item => {
          switch (item.eventHeader.eventType) {
            case '25022':
            case '25306':
            case '25051':
            case '70051':
              item.eventBody = JSON.parse(item.eventBody)
              this.secondaryWarnList.push(item)
              break
          }
        })
        // console.log(this.secondaryWarnList)
        if (this.secondaryWarnList.length > 0) {
          // this.warnData = this.secondaryWarnList[0]
          // if (this.warnData.eventHeader.eventType === '70051') { // 巡更报事组件
          //   this.currentWarn = 'patrolAccident'
          // } else {
          //   this.currentWarn = 'parkWarn'
          // }
          // if (this.warnData.eventHeader.eventStatus === '99') {
          //   this.getSecurityList() // 查询保安列表
          // } else {
          //   if (this.warnData.eventHeader.eventStatus === '1') { // 事件已派遣保安
          //     this.hasDispatchInfo() // 查询事件完成信息
          //   }
          //   if (this.warnData.eventHeader.eventStatus === '3') { // 事件已完成
          //     this.hasDoneInfo() // 查询事件完成信息
          //   }
          // }
          this.setWarnData(0)
          this.$nextTick(() => {
            this.setLength()
            this.$refs.warnList.init()
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取推荐保安距离列表
    getSecurityList () {
      this.checkedInfo.recommedSecurity = []
      getSecurityDistanceList(
        {
          longitude: this.warnData.eventHeader.eventGPS ? this.warnData.eventHeader.eventGPS.lon : '',
          latitude: this.warnData.eventHeader.eventGPS ? this.warnData.eventHeader.eventGPS.lat : ''
        }
      ).then(list => {
        this.checkedInfo.recommedSecurity = list
      }, rs => {
        // this.$refs.warnList.popError(rs.message)
      }).catch(err => {
        console.log(err)
      })
    },
    /**
    * @desc  处理收到的webscoket消息
    */
    handleReceiveData (info) {
      let message = JSON.parse(info)
      console.log('响应二级预警推送事件', message)
      if (message.eventHeader.eventStatus === '99') { // 未派遣事件
        this.isPatrolReceive = message.eventHeader.eventType === '70051'
        this.secondaryWarnList.push(message)
        if (this.secondaryWarnList.length === 1) {
          this.setWarnData(0)
          if (this.callList.length === 0) this.curShow = 'warn'
        }
        this.$nextTick(() => {
          this.$refs.carousel.updateItemLength(this.secondaryWarnList.length + this.callList.length - 1, 1)
        })
      } else {
        this.checkedInfo.checkedSecurity = []
        this.secondaryWarnList.map((item, index) => {
          if (item.eventHeader.eventId === message.eventHeader.eventId) {
            if (message.eventHeader.eventStatus === '1') { // 派遣保安成功消息
              this.secondaryWarnList[index].eventHeader.eventStatus = '1'
              this.showSelectGuards = false // 关闭选择派遣保安页面
              if (this.warnData.eventHeader.eventId === message.eventHeader.eventId) {
                // if (index < this.secondaryWarnList.length - 1) {
                //   this.$refs.carousel.next()
                // } else {
                this.$refs.warnList.dealWarnInfo = true
                this.$refs.warnList.isShowDone = false
                this.hasDispatchInfo() // 查询事件完成信息
                // }
              }
            } else if (message.eventHeader.eventStatus === '3') {
              this.secondaryWarnList[index].eventHeader.eventStatus = '3'
              this.$refs.carousel.setActiveItem(index + this.callList.length)
              this.$refs.warnList.dealWarnInfo = false
              this.$refs.warnList.isShowDone = true
              this.hasDoneInfo() // 查询事件完成信息
            } else if (message.eventHeader.eventStatus === '4') {
              this.updateWarnArray([message.eventHeader.eventId])
            }
          }
        })
      }
    },
    /**
    * @desc  获取事件已完成信息
    */
    hasDispatchInfo () {
      hasPatrolSecuritys({ eventId: this.warnData.eventHeader.eventId }).then(res => {
        // console.log(res)
        this.checkedInfo.checkedSecurity = []
        res.map(item => {
          this.checkedInfo.checkedSecurity.push(item)
        })
      }).catch(e => {
        console.log(e)
      })
    },
    /**
    * @desc  获取事件已完成信息
    */
    hasDoneInfo () {
      this.checkedInfo.doneData = { finishPicArr: [], joinPerson: '', assistPerson: '' }
      this.checkedInfo.imgInit = false
      hasDoneInfo({
        eventId: this.warnData.eventHeader.eventId,
        msgStatus: '3'
      }).then(res => {
        this.checkedInfo.imgInit = true
        this.checkedInfo.doneData = res.rows[0]
      }).catch(e => {
        this.checkedInfo.imgInit = true
        console.log(e)
      })
    },
    setWarnData (index) {
      this.warnData = this.secondaryWarnList[index] // 切换预警数据
      if (this.warnData.eventHeader.eventType === '70051') { // 巡更报事组件
        this.currentWarn = 'patrolAccident'
      } else {
        this.currentWarn = 'parkWarn'
      }
      this.checkedInfo.checkedSecurity = []
      this.$nextTick(() => {
        this.$refs.warnList.init()
        if (this.warnData.eventHeader.eventStatus === '99') { // 事件未派遣
          this.getSecurityList() // 查询保安列表
        } else {
          if (this.warnData.eventHeader.eventStatus === '1') { // 事件已派遣保安
            this.hasDispatchInfo() // 查询事件完成信息
          }
          if (this.warnData.eventHeader.eventStatus === '3') { // 事件已完成
            this.hasDoneInfo() // 查询事件完成信息
          }
        }
      })
    },
    // 关闭预警事件
    closeWarnEvent () {
      // this.$store.commit(mutationTypes.SHOW_SECONDARY_ALARM, { shown: false })
      this.$store.commit('sendMessage', {
        windowName: 'secondary_alarm',
        shown: false
      })
    },
    // 取消选择派遣保安
    cancleSelectGuards () {
      this.showSelectGuards = false // 关闭选择派遣保安页面
    },
    /**
     * @desc 显示选择派遣保安页面
     */
    choseDispathGuard () {
      this.getSecurityList()
      this.showSelectGuards = true
    },
    // 解除预警
    dismissWarn (eventId) {
      if (eventId) {
        let id = eventId
        disMissWarning({ ids: [id] }).then(res => {
          this.updateWarnArray([id])
        }).catch(err => {
          console.log(err)
        })
      } else {
        let ids = []
        // let indexArray = []
        this.secondaryWarnList.map((item, index) => {
          if (item.eventHeader.eventStatus === '3') {
            ids.push(item.eventHeader.eventId)
            // indexArray.push(index)
          }
        })
        if (ids.length > 0) {
          disMissWarning({ ids: ids }).then(res => {
            this.updateWarnArray(ids)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$refs.warnList.isConfirm = false
        }
      }
    },
    // 更新数组长度
    updateWarnArray (ids) {
      // console.log(ids)
      for (var i = 0; i < ids.length; i++) {
        this.secondaryWarnList.map((item, index) => {
          if (item.eventHeader.eventId === ids[i]) {
            this.secondaryWarnList.splice(index, 1)
            this.$refs.carousel.updateItemLength(index + this.callList.length, -1)
          }
        })
      }
      this.$refs.warnList.isConfirm = false
    }
  },
  computed: {
    ...mapState({
      isAlarmShown: state => state.secondary_alarm.shown
    })
  },
  watch: {
    isAlarmShown (shown) {
      this.$nextTick(() => {
        if (!shown && this.warnData.eventHeader.eventType === '70051') {
          this.$refs.warnList.isVideoPlay()
        }
        if (shown && this.warnData.eventHeader.eventType === '70051') {
          this.$refs.warnList.isContinuePlay()
        }
      })
    }
  }
}
