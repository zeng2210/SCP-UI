<template>
  <div class="item-box falling-water-box item-danger">
    <div v-show=" !showSelectGuards " v-if="primaryWarnList.length>0">
      <carousel height="16.3rem" :noAction="true" dotTop="-1.64rem" @change="pageChange" ref="carousel">
        <carousel-item>
          <component :is="currentWarn" :warnData="warnData" :ocxbgColor="ocxbgColor" :errorImg="errorImg" :defaultImg="defaultImg" ref="warnList" @choseDispathGuard="choseDispathGuard" @closeWarnEvent="closeWarnEvent" :checkedInfo="checkedInfo" @mulDismissWarn="mulDismissWarn">
          </component>
        </carousel-item>
      </carousel>
    </div>
    <select-guards v-if="showSelectGuards" @cancleSelectGuards="cancleSelectGuards" :securityList="checkedInfo.recommedSecurity" :warnData="warnData"></select-guards>
  </div>
</template>
<script>
import parkWarn from './ParkWarnList.vue'
import patrolAccident from './PatrolAccident.vue'
import selectGuards from './components/SelectGuards'
import controller from '@/pages/main/controller'
// import mutationTypes from '@/pages/main/store/mutation-types'
import { getSecurityDistanceList, hasPatrolSecuritys, getWarnData, hasDoneInfo, disMissWarning, eleDismissWarn } from '@/pages/main/api/park-warning'
import { recursionGetCatchPic } from '../util'
export default {
  name: 'parkWarning',
  props: {
    info: Object
  },
  components: {
    parkWarn,
    patrolAccident,
    selectGuards
  },
  data () {
    return {
      errorImg: require('../../../../../../static/images/people-danger.png'),
      defaultImg: 'this.src="' + require('../../../../../../static/images/people-danger.png') + '"',
      ocxbgColor: 1,
      showSelectGuards: false, // 显示选择保安页面
      currentWarn: 'parkWarn',
      warnData: {},
      checkedInfo: {
        imgInit: false,
        isSelect: false,
        checkedSecurity: [],
        doneData: { finishPicArr: [], joinPerson: '', assistPerson: '' },
        recommedSecurity: [{
          name: ''
        },
        {
          name: ''
        }]
      },
      primaryWarnList: [],
      curIndex: '' // 用于缓存当前index ,便于判断异步返回更改的数据是否刚好当前页，用于是否要立即刷新
    }
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      this.getWarnDataList()
      controller.register({
        key: 'park-warning',
        points: [25019, 25020, 91001],
        callback: (info) => {
          that.handleReceiveData(info)
        }
      })
    })
  },
  methods: {
    pageChange (index) { // 异常事件切换
      this.setWarnData(index)
    },
    setLength () {
      this.$refs.carousel.setItemLength(this.primaryWarnList.length)
    },
    /**
  * @desc  处理收到的webscoket消息
  */
    handleReceiveData (info) {
      if (this.primaryWarnList.length === 0) {
        this.$store.commit('sendMessage', {
          windowName: 'primary_alarm',
          shown: true,
          data: {}
        })
      }
      let message = JSON.parse(info)
      if (message.eventHeader.eventStatus === '99') { // 未派遣事件
        this.primaryWarnList.push(message)
        if (this.primaryWarnList.length === 1) this.setWarnData(0)
        this.$nextTick(() => {
          this.$refs.carousel.updateItemLength(this.primaryWarnList.length, 1)
        })
      } else {
        this.checkedInfo.checkedSecurity = []
        this.primaryWarnList.map((item, index) => {
          if (item.eventHeader.eventId === message.eventHeader.eventId) {
            if (message.eventHeader.eventStatus === '1') { // 派遣保安成功消息
              this.primaryWarnList[index].eventHeader.eventStatus = '1'
              this.showSelectGuards = false // 关闭选择派遣保安页面
              if (this.warnData.eventHeader.eventId === message.eventHeader.eventId) {
                // if (index < this.primaryWarnList.length - 1) {
                //   this.$refs.carousel.next()
                // } else {
                this.$refs.warnList.dealWarnInfo = true
                this.$refs.warnList.isShowDone = false
                this.hasDispatchInfo() // 查询事件完成信息
                // }
              }
            } else if (message.eventHeader.eventStatus === '3') {
              this.primaryWarnList[index].eventHeader.eventStatus = '3'
              this.$refs.carousel.setActiveItem(index)
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
    // 初始化获取未解除预警数据列表
    getWarnDataList () {
      getWarnData().then(res => {
        res.map(item => {
          switch (item.eventHeader.eventType) {
            case '25020':
            case '25019':
            case '91001':
              item.eventBody = JSON.parse(item.eventBody)
              this.primaryWarnList.push(item)
              break
          }
        })
        // console.log(this.primaryWarnList)
        if (this.primaryWarnList.length > 0) {
          this.$store.commit('sendMessage', {
            windowName: 'primary_alarm',
            shown: true,
            data: {}
          })
          // this.warnData = this.primaryWarnList[0]
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
   * @desc  获取事件已完成信息
   */
    hasDispatchInfo () {
      hasPatrolSecuritys({ eventId: this.warnData.eventHeader.eventId }).then(res => {
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
        this.checkedInfo.doneData = res.rows[0]
        this.checkedInfo.imgInit = true
      }).catch(e => {
        this.checkedInfo.imgInit = true
        console.log(e)
      })
    },
    setWarnData (index) {
      this.curIndex = index
      this.warnData = this.primaryWarnList[index] // 切换预警数据
      this.checkedInfo.checkedSecurity = []
      // 判定是电子围栏（园区越界事件）同时此时事件数据中sencePic字段数组元素无图片
      if (this.warnData.eventHeader.eventType === '91001' && this.warnData.eventBody.scenePic && !this.warnData.eventBody.scenePic[0]) {
        setTimeout(() => { recursionGetCatchPic(0, this, index) }, 1500)
      }
      if (this.warnData.eventHeader.eventStatus === '99') {
        this.getSecurityList() // 查询保安列表
      } else {
        if (this.warnData.eventHeader.eventStatus === '1') { // 事件已派遣保安
          this.hasDispatchInfo() // 查询事件完成信息
        }
        if (this.warnData.eventHeader.eventStatus === '3') { // 事件已完成
          this.hasDoneInfo() // 查询事件完成信息
        }
      }
    },
    // 关闭预警事件
    closeWarnEvent () {
      this.$store.commit('sendMessage', {
        windowName: 'primary_alarm',
        shown: false,
        data: {}
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
    mulDismissWarn (eventId) {
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
        this.primaryWarnList.map((item, index) => {
          if (item.eventHeader.eventStatus === '3') {
            ids.push(item.eventHeader.eventId)
            // indexArray.push(index)
          }
        })
        if (ids.length > 0) {
          disMissWarning({ ids: ids }).then(res => {
            // console.log(res)
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
      for (var i = 0; i < ids.length; i++) {
        this.primaryWarnList.map((item, index) => {
          if (item.eventHeader.eventId === ids[i]) {
            this.primaryWarnList.splice(index, 1)
            this.$refs.carousel.updateItemLength(index, -1)
            // 电子围栏获取设备信息
            if (item.eventBody.hostId) {
              eleDismissWarn({ deviceCode: item.eventBody.hostId }).then(res => {
                console.log(res)
              }).catch(err => {
                console.log(err)
              })
            }
          }
        })
      }
      this.$refs.warnList.isConfirm = false
    }
  },
  computed: {
    arrayLength () {
      return this.primaryWarnList.length
    }
  },
  watch: {
    info () {
      this.primaryWarnList.map((item, index) => {
        if (item.eventHeader.eventId === this.info.id) {
          this.$refs.carousel.setActiveItem(index)
        }
      })
    },
    arrayLength (val) {
      if (val === 0) {
        this.$store.commit('sendMessage', {
          windowName: 'primary_alarm',
          shown: false,
          data: {}
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
