<template>
  <div>
    <div class="ico-btn-group">
      <a class="ico turn-off" @click="confirmBox"></a>
      <a class="ico exit-full" @click="handleClose"></a>
    </div>

    <div class="hd">{{warnData.eventBody.eventDescription}}</div>
    <div class="detail-info-box" v-if="!isShowDone">
      <div class="left-box">
        <!-- <div class="view" v-if="warnData.eventBody.deviceId===''|| undefined">
          <img :src="warnData.eventBody.facePic" alt="" class="pic">
        </div> -->
        <!-- 调单路视频组件 -->
        <div class="view">
          <single-screen :videoplayData="videoplayData" :ocxbgColor="ocxbgColor"></single-screen>
        </div>
        <div class="key-person-note" v-show="false">派遣失败，请重新派遣！</div>
        <div class="key-person-txt" v-show="false">派遣中：等待保安张晓明、程飞接收任务</div>
        <button type="button" class="btn cancel" @click="dispatchGuard" v-show="!dealWarnInfo" :class="{ 'disabled': !checkedInfo.recommedSecurity.length}">派遣保安</button>
        <!--派遣添加类.doing-->
        <button type="button" class="btn doing disabled" v-show="dealWarnInfo">处 理 中</button>
      </div>
      <ul class="right-box">
        <li class="pic-box"><img :src="warnData.eventBody.scenePic&&warnData.eventBody.scenePic[0] || errorImg" :onerror="defaultImg" alt=" " class="pic "></li>
        <li>
          <span class="name ">事&nbsp;件：</span>{{warnData.eventBody.eventContent}}</li>
        <li>
          <span class="name ">时&nbsp;间：</span>{{formatDate(warnData.eventHeader.occurTime,'YYYY-MM-DD hh:mm:ss')}}</li>
        <li>
          <span class="name">地&nbsp;点：</span>{{warnData.eventBody.address}}</li>
        <li v-if="!checkedInfo.checkedSecurity.length">
          <span class="name" v-show="!dealWarnInfo">推荐保安：</span>
          <span class="name" v-show="dealWarnInfo">保&nbsp;安：</span>
          <span v-if="checkedInfo.recommedSecurity.length">{{checkedInfo.recommedSecurity[0].name}} {{ (warnData.eventHeader.eventType==='25020' || warnData.eventHeader.eventType==='25019'||warnData.eventHeader.eventType==='91001') && checkedInfo.recommedSecurity[1] && checkedInfo.recommedSecurity[1].name || ''}}</span>
          <span v-else>无</span>
          <a class="icon-send" v-if="checkedInfo.recommedSecurity.length" @click="choseDispathGuard " v-show="!dealWarnInfo" href="javascript:;"></a>
        </li>
        <li v-if="checkedInfo.checkedSecurity.length>0">
          <span class="name" v-show="!dealWarnInfo">推荐保安：</span>
          <span class="name" v-show="dealWarnInfo">保&nbsp;安：</span>
          <span>
            <span v-for="(item,index) in checkedInfo.checkedSecurity" :key="index">{{item}} </span>
          </span>
        </li>
      </ul>
    </div>
    <!--解除警报-->
    <div class="detail-info-box" v-else-if="checkedInfo.imgInit">
      <div class="left-box">
        <div class="view">
          <img :src="checkedInfo.doneData&&checkedInfo.doneData.finishPicArr&&checkedInfo.doneData.finishPicArr.length&&checkedInfo.doneData.finishPicArr[0]" :onerror="errorTip" alt="" class="pic">
        </div>
        <button type="button" class="btn confirm" @click="dismissWarn">解除警报</button>
      </div>
      <ul class="right-box">
        <li>
          <span class="name">状&nbsp;态：</span>处理完成</li>
        <li>
          <span class="name">保&nbsp;安：</span>
          <span class="people" v-if="checkedInfo.doneData&&!checkedInfo.doneData.assistPerson">{{checkedInfo.doneData.joinPerson}}</span>
          <span class="people" v-else>{{checkedInfo.doneData&&checkedInfo.doneData.joinPerson}},{{checkedInfo.doneData&&checkedInfo.doneData.assistPerson}}</span>
        </li>
        <li class="result ">
          <span class="name ">处理结果：</span>{{checkedInfo.doneData&&checkedInfo.doneData.handleDetail}}</li>
      </ul>
    </div>
    <!--确定是否解除警报-->
    <div class="clear-confirm-box " v-show="isConfirm ">
      <iframe frameborder="0 " class="iframe-box "></iframe>
      <div class="bg "></div>
      <div class="con ">
        <p class="title ">确定要解除该窗口的所有报警吗？</p>
        <div class="btn-box ">
          <button type="button " class="btn cancel " @click="cancleDismiss ">取 消</button>
          <button type="button " class="btn confirm " @click="mulDismissWarn ">解 除</button>
        </div>
      </div>
    </div>
    <div class="note-wrap" v-show="toast.show">
      <iframe frameborder="0" class="iframe-box"></iframe>
      <transition name="fade" mode="out-in">
        <div class="note-pop">{{toast.msg}}</div>
      </transition>
    </div>
  </div>
</template>
<script>
import { patrolSecuritys } from '@/pages/main/api/park-warning'
import formatDate from '@/assets/js/utils/format-date.js'
export default {
  props: {
    warnData: Object,
    checkedInfo: Object,
    ocxbgColor: Number,
    errorImg: String,
    defaultImg: String
  },
  components: {
  },
  data () {
    return {
      dealWarnInfo: false,
      isConfirm: false,
      isShowDone: false,
      videoplayData: {
        deviceID: this.warnData.eventBody.deviceId,
        parentID: this.warnData.eventBody.parentID,
        mediaIP: this.warnData.eventBody.mediaIp,
        mediaPort: Number(this.warnData.eventBody.mediaPort)
      },
      clearDom: null,
      toast: {
        show: false,
        msg: ''
      },
      isDispatch: true,
      errorTip: 'this.src="' + require('../../../../../../static/images/failure-warning.png') + '"'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.clearDom = this.$el.querySelector('.clear-confirm-box')
      this.$parent.$parent.$el.appendChild(this.clearDom)
    })
  },
  methods: {
    formatDate,
    popError (msg) {
      this.toast = {
        show: true,
        msg: msg
      }
      setTimeout(() => {
        this.toast.show = false
      }, 1000)
    },
    /**
    * @description 预警弹窗关闭
    */
    handleClose () {
      this.$emit('closeWarnEvent')
    },
    // 选择派遣人员
    choseDispathGuard () {
      if (!this.checkedInfo.recommedSecurity.length) return
      this.$emit('choseDispathGuard') // 显示选择派遣保安页面
    },
    // 派遣保安
    dispatchGuard () {
      // 选择派遣保安页面派遣后
      let userIds = []
      // 落水预警系统推荐派遣两名保安
      if (this.warnData.eventHeader.eventType === '25020' || this.warnData.eventHeader.eventType === '25019' || this.warnData.eventHeader.eventType === '91001') {
        userIds = [this.checkedInfo.recommedSecurity[0].userId, this.checkedInfo.recommedSecurity[1] ? this.checkedInfo.recommedSecurity[1].userId : '']
      } else {
        userIds = [this.checkedInfo.recommedSecurity[0].userId]
      }
      if (this.isDispatch) {
        this.isDispatch = false
        patrolSecuritys({
          userIds: userIds,
          eventId: this.warnData.eventHeader.eventId,
          picUrl: this.warnData.eventBody.scenePic && this.warnData.eventBody.scenePic instanceof Array ? this.warnData.eventBody.scenePic.join(',') : '',
          eventType: this.warnData.eventHeader.eventType,
          eventAddr: this.warnData.eventBody.address,
          videoUrl: this.warnData.eventBody.sceneVideo || '',
          eventTypeDetail: this.warnData.eventBody.eventContent
        }).then(res => {
          this.isDispatch = true
          console.log(res)
        }, rs => {
          this.isDispatch = true
          if ('message' in rs) {
            this.popError(rs.message)
          } else {
            this.popError(rs)
          }
        }).catch(err => {
          this.isDispatch = true
          console.log(err)
        })
      }
    },
    // 弹出确认框
    confirmBox () {
      this.isConfirm = true
    },
    // 取消批量解除
    cancleDismiss () {
      this.isConfirm = false
    },
    // 批量解除处理已完成预警
    mulDismissWarn () {
      this.$emit('mulDismissWarn')
    },
    // 解除单条警报
    dismissWarn () {
      this.$emit('mulDismissWarn', this.warnData.eventHeader.eventId)
    },
    // 初始化页面数据
    init () {
      if (this.warnData.eventHeader.eventStatus === '99') {
        this.dealWarnInfo = false
        this.isShowDone = false
      } else {
        if (this.warnData.eventHeader.eventStatus === '1') { // 事件已派遣保安
          this.dealWarnInfo = true
          this.isShowDone = false
        }
        if (this.warnData.eventHeader.eventStatus === '3') { // 事件已完成
          this.isShowDone = true
          this.dealWarnInfo = false
        }
      }
    }
  },
  watch: {
    warnData (warnData) {
      this.videoplayData = {
        deviceID: warnData.eventBody.deviceId,
        parentID: warnData.eventBody.parentID,
        mediaIP: warnData.eventBody.mediaIp,
        mediaPort: Number(warnData.eventBody.mediaPort)
      }
      this.init()
      this.isDispatch = true
    }
  },
  beforeDestroy () {
    this.clearDom.parentNode.removeChild(this.clearDom)
    this.clearDom = null
  }
}
</script>

<style scoped>
/*.iframe-box {
  position: absolute;
  width: 28rem;
  height: 7.3rem;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}*/
</style>
