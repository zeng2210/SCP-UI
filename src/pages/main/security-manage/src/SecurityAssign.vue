<template>
  <div>
    <div class="hd">值班人员</div>
    <div class="select-guards-box">
      <a class="icon-return" href="javascript:void(0);" @click="fnClose"></a>
      <p class="title">
        <span class="name">{{info.name}}</span>已分配{{info.taskNum}}个任务
      </p>
      <div class="guards-list-box" v-if="!nonTaskWork">
        <slider v-show="eventList.length" ref="slider" :paddingRight="paddingRight" :loading="loading">
          <!-- @reachRight="fnGetEventList" -->
          <ul class="guards-list" :class="{'center': eventList.length<=3}">
            <li v-for="(item,index) in eventList" :key="index" :class="{'active':checked.indexOf(item.eventHeader.eventId)!==-1||eventAssigned.indexOf(item.eventHeader.eventId)!==-1}" @click="checkTask(item)">
              <div class="guard-info">
                <div class="pic-box">
                  <img :src="JSONParse(item.eventBody).scenePic && JSONParse(item.eventBody).scenePic.length && JSONParse(item.eventBody).scenePic[0] || errorImg" alt="" class="pic" :onerror="defaultImg">
                </div>
                <p>
                  <b>事件：</b>{{JSONParse(item.eventBody).eventDescription}}</p>
                <p>
                  <b>时间：</b>{{item.eventHeader.occurTime | fmtDate}}</p>
                <p>
                  <b>地点：</b>{{JSONParse(item.eventBody).address}}</p>
              </div>
            </li>
          </ul>
        </slider>
      </div>
      <div class="load-container" v-show="loading">
        <div class=" loading "></div>
        <div class="loader-txt ">正在加载</div>
      </div>
      <div class="no-task" v-if="nonTaskWork">
        <img src="/static/images/no-task.png" alt="" class="ico">
        <div class="loader-txt ">当前无任务</div>
      </div>
      <!--<div v-if="nonTaskWork" style="text-align: center; height: 9.67rem; line-height: 10rem; ">暂无新任务可分配</div>-->
      <div class="btn-box " v-if="!eventList.length || inited ">
        <button type="button " class="btn cancel " @click="fnCancel ">取 消</button>
        <button type="button " class="btn confirm " :class="{ 'disabled': checked.length===0} " @click="assignTask ">确 定</button>
      </div>
      <transition name="fade" mode="out-in">
        <div class="note-wrap" v-show="toast.show">
          <div class="note-pop">{{toast.msg}}</div>
        </div>
      </transition>
    </div>
    <!--<a href="javascript:; " class="arrow icon-arrow-l disabled "></a>
    <a href="javascript:; " class="arrow icon-arrow-r "></a>-->
  </div>
</template>
<script>
import { getEventAssigned, securityAssign, getUnManegedEvents } from '../../api/security-manage.js'
import formatDate from '@/assets/js/utils/format-date.js'
export default {
  name: 'security-list',
  props: {
    info: Object
  },
  data () {
    return {
      errorImg: require('../../../../../static/images/picture.png'),
      defaultImg: 'this.src="' + require('../../../../../static/images/picture.png') + '"',
      inited: false,
      eventList: [],
      eventAssigned: [],
      checked: [],
      nonTaskWork: false,
      paddingRight: 0,
      loading: true,
      toast: {
        show: false,
        msg: ''
      },
      securityBol: true,
      defer: {
        cacheData: [],
        deferId: ''
      }
    }
  },
  mounted () {
    let dom = this.$el.querySelector('.guards-list')
    this.paddingRight = parseFloat(getComputedStyle(dom).paddingRight)
    let pro1 = this.fnGetEventList()
    let por2 = this.fnGetEventAssigned()
    Promise.all([pro1, por2]).then(() => {
      // this.fnSort(this.eventList)
      this.inited = true
    }).catch(() => {
      this.inited = true
    })
  },
  filters: {
    fmtDate (val) {
      return formatDate(val, 'YYYY-MM-DD hh:mm:ss')
    }
  },
  methods: {
    JSONParse (val) {
      return JSON.parse(val)
    },
    popError (msg) {
      this.toast = {
        show: true,
        msg: msg
      }
      setTimeout(() => {
        this.toast.show = false
      }, 1000)
    },
    checkTask (item) {
      let uuid = item.eventHeader.eventId
      if (this.eventAssigned.indexOf(uuid) !== -1) return
      let indexOf = this.checked.indexOf(uuid)
      if (indexOf === -1) {
        this.checked.push(uuid)
      } else {
        this.checked.splice(indexOf, 1)
      }
    },

    assignTask () {
      if (this.checked.length <= 0) return
      if (this.checked.length > 6) {
        this.popError('一次选择任务不能超过6条')
        return
      }
      let eventData = []
      this.eventList.forEach(item => {
        if (this.checked.indexOf(item.eventHeader.eventId) !== -1) {
          let eventBody = JSON.parse(item.eventBody)
          eventData.push({
            'eventId': item.eventHeader.eventId,
            'eventAddr': eventBody.address || '',
            'picUrl': eventBody.scenePic && eventBody.scenePic.length ? eventBody.scenePic.join(',') : '',
            'eventType': item.eventHeader.eventType,
            'videoUrl': eventBody.sceneVideo || '',
            'eventTypeDetail': eventBody.eventContent || ''
          })
        }
      })
      let reqData = {
        userId: this.info.userId,
        eventData: eventData
      }
      if (this.securityBol) {
        this.securityBol = false
        securityAssign(reqData).then(result => {
          this.fnClose()
        }, rs => {
          this.popError(rs.message)
        }).catch(err => {
          console.log(err)
          this.securityBol = true
        })
      }
    },
    fnClose () {
      this.clearDeferTimeout()
      this.$emit('close')
      this.securityBol = true
    },
    fnCancel () {
      this.fnClose()
    },
    fnSort (arr) {
      return arr.sort((a, b) => {
        return this.eventAssigned.indexOf(a.eventHeader.eventId) - this.eventAssigned.indexOf(b.eventHeader.eventId)
      })
    },
    fnGetEventList () {
      this.loading = true

      return getUnManegedEvents().then(result => {
        this.loading = false
        if (result.length > 1000) {
          this.defer.cacheData = JSON.stringify(result)
          result.length = 1000
          this.eventList = result
          this.handleDelayDrawing()
        } else {
          this.eventList = result
        }
        this.$nextTick(() => {
          this.$refs.slider.update()
          this.nonTaskWork = !this.eventList.length
        })
      }).catch(() => {
        this.loading = false
      })
    },
    handleDelayDrawing () {
      this.clearDeferTimeout()
      this.defer.deferId = setTimeout(() => {
        this.eventList = JSON.parse(this.defer.cacheData)
      }, 10000)
    },
    clearDeferTimeout () {
      if (this.defer.deferId) {
        clearTimeout(this.defer.deferId)
        this.defer.cacheData = []
      }
    },
    fnGetEventAssigned () {
      let reqData = { userId: this.info.userId }
      return getEventAssigned(reqData).then(result => {
        this.eventAssigned = result
      })
    }
  }
}
</script>

<style scoped>

</style>
