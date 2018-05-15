<template>
  <div>
    <div class="select-guards-box select-send-box">
      <p class="title">选择保安</p>
      <a class="icon-return" href="javascript:void(0);" @click="cancleSelectGuards"></a>
      <slider ref="slider" :paddingRight="paddingRight">
        <!-- <div class="guards-list-wrap"> -->
        <ul class="guards-list" :class="{ 'center': this.securityList.length<4 }">
          <!--事件列表小于或等于3，添加类.center，反之移除-->
          <li @click="chosenGuard(index)" v-for="(item,index) in securityList" :key="index" :class="{ 'active': checked.indexOf(index) !== -1 }">
            <div class="guard-info">
              <div class="pic-box">
                <p class="success" v-show="index===0">
                  <span>系统推荐</span>
                </p>
                <img :src="item.facePic||errorImg" alt="" class="pic" :onerror="defaultImg">
              </div>
              <div class="txt-box">
                <p class="name">保安-{{item.name}}</p>
                <p class="distance" v-show="item.distance>-1">距离事发点&nbsp;{{item.distance}}米</p>
                <p class="distance" v-show="item.distance===-1&&index===0">距离事发点最近</p>
                <p class="distance" v-show="item.distance===-1&&index>0">距离较远</p>
              </div>
            </div>
          </li>
        </ul>
        <!-- </div> -->
      </slider>
      <div class="btn-box">
        <button type="button" class="btn cancel" @click="cancleSelectGuards">取 消</button>
        <button type="button" class="btn confirm" @click="dispatchGuard" :class="{ 'disabled': !this.checked.length>0 }">派 遣</button>
      </div>
    </div>
    <!-- <transition name="fade" mode="out-in">
      <div class="note-pop" v-show="toast.show">{{toast.msg}}</div>
    </transition> -->
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
export default {
  props: {
    securityList: {
      type: Array,
      default () {
        return []
      }
    },
    warnData: Object
  },
  data () {
    return {
      errorImg: require('../../../../../../../static/images//people.png'),
      defaultImg: 'this.src="' + require('../../../../../../../static/images//people.png') + '"',
      isSelect: false,
      checked: [0],
      paddingRight: 0,
      toast: {
        show: false,
        msg: ''
      },
      isDispatch: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 获取ul的padding值
      let dom = this.$el.querySelector('.guards-list')
      this.paddingRight = parseFloat(getComputedStyle(dom).paddingRight)
    })
  },
  methods: {
    popError (msg) {
      this.toast = {
        show: true,
        msg: msg
      }
      setTimeout(() => {
        this.toast.show = false
      }, 1000)
    },
    // 取消派遣事件
    cancleSelectGuards () {
      this.$emit('cancleSelectGuards')
    },
    // 派遣保安
    dispatchGuard () {
      if (this.checked.length > 0) {
        let userIds = []
        let checkedArray = []
        this.checked.map(item => {
          userIds.push(this.securityList[item].userId)
          checkedArray.push(this.securityList[item])
        })
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
      }
    },
    // 选择保安
    chosenGuard (index) {
      let indexOf = this.checked.indexOf(index)
      if (indexOf === -1) {
        this.checked.push(index)
      } else {
        this.checked.splice(indexOf, 1)
      }
    }
  },
  watch: {
    securityList () {
      this.$nextTick(() => {
        this.$refs.slider.update()
      })
    }
  }
}
</script>
<style scoped>

</style>
