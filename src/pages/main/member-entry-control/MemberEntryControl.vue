<template>
  <!-- 人员管理 -->
  <div class="item-box member-entry-box">
    <div class="hd">人员出入</div>
    <div class="bd">
      <div class="view-wrap">
        <!-- <div class="view-list"> -->
        <!--多路预览-->
        <member-screen @cameraCodeParams="cameraCodeParams"></member-screen>
        <!-- <div class="column">
            <img src="/static/images/p02.jpg" alt="" class="view">
            <img src="/static/images/p02.jpg" alt="" class="view">
          </div>
          <div class="column">
            <img src="/static/images/p02.jpg" alt="" class="view">
            <img src="/static/images/p02.jpg" alt="" class="view">
          </div> -->
        <!-- </div> -->

        <!--<div class="view-box">
          <div class="subscript-box">
            <img :src="imgSrc" alt="" class="pic">
            <em class="subscript subscript1"></em>
            <em class="subscript subscript2"></em>
            <em class="subscript subscript3"></em>
            <em class="subscript subscript4"></em>
          </div>
          <p class="txt focus">重点人员</p>
          &lt;!&ndash; 重点人员添加类focus &ndash;&gt;
        </div>-->
      </div>

      <div class="member-list-wrap">
        <div class="list-wrap" ref="wraplistBox">
          <slider ref="slider" :loading="loading" @reachLeft="getFaceCaptureList" :autoMove="true">
            <ul class="list-box" ref="listBox" :style="{width:lisboxLenth +'rem'}">
              <li v-for="(item,index) in member" :key="index" @click="showMsg($event,item)">
                <div>
                  <img :src="item.facePicUrl || errorImg" alt="" class="pic" :onerror="defaultImg">
                </div>
                <p :class="['txt',{focus:item.userType==='3'}]">{{MemberType[item.userType]}}</p>
              </li>
              <template v-if="member.length < 5">
                <li v-for="(item,index) in emptyLis" :key="'lis'+index"></li>
              </template>
            </ul>
          </slider>
        </div>
        <div class="view-box">
          <div class="subscript-box">
            <img :src="imgSrc || errorImg" alt="" class="pic" :onerror="defaultImg">
            <em class="subscript subscript1"></em>
            <em class="subscript subscript2"></em>
            <em class="subscript subscript3"></em>
            <em class="subscript subscript4"></em>
            <div class="scanning-box">
              <div class="scanning"></div>
            </div>
          </div>
          <p :class="['txt',{focus:userType==='3'}]">{{MemberType[userType]}}</p>
          <!-- 重点人员添加类focus -->
        </div>
        <div class="view-box new" v-if="animationEnter">
          <div class="subscript-box">
            <img :src="memberParams[0].facePicUrl || errorImg" alt="" class="pic" :onerror="defaultImg">
          </div>
          <p :class="['txt',{focus:memberParams[0].userType==='3'}]">{{MemberType[userType]}}</p>
          <!-- 重点人员添加类focus -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MemberScreen from './MemberScreen'
import { getCaptureData } from '@/pages/main/api/video-preview.js'
import controller from '@/pages/main/controller'
import { castAnimate } from '@/assets/js/utils'
export default {
  name: 'member-entry-control',
  components: { MemberScreen },
  data () {
    return {
      errorImg: require('../../../../static/images/people.png'),
      defaultImg: 'this.src="' + require('../../../../static/images/people.png') + '"',
      imgSrc: '../../../../static/images/people.png',
      member: [],
      loading: true,
      lisBoxLength: 0,
      clickTimes: 0,
      hasNext: true,
      emptyLis: [],
      faceCaptureParams: {
        cameraCode: '',
        pageSize: 6,
        pageNo: 1,
        timeStamp: new Date().getTime()
      },
      userType: 0,
      MemberType: ['', '住户', '访客', '重点人员', '未登记'],
      memberParams: [],
      picParams: {},
      faceCaptureArr: [],
      captureData: [],
      lisboxLenth: 22,
      timer: null,
      animationEnter: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      controller.register({
        key: 'member-entry',
        // range: [0, 99999],
        points: [20113, 20114, 25051],
        callback: (info, data) => {
          let picInfo = JSON.parse(info)
          this.getPicParams(picInfo)
        }
      })
    })
  },
  methods: {
    /**
     * 图片推送
     */
    getPicParams (data) {
      // console.log(data)
      if (this.faceCaptureArr.indexOf(data.eventBody.deviceId) > -1 && data.eventBody.eventType !== 25060) {
        this.userType = data.eventHeader.userType
        this.imgSrc = data.eventBody.facePic
        this.picParams = {
          cameraCode: data.eventBody.deviceId,
          captureTime: data.eventHeader.occurTime,
          eventType: data.eventBody.eventType,
          faceDatabaseId: data.eventBody.faceLibId,
          facePicId: data.eventBody.faceImgId,
          facePicUrl: data.eventBody.facePic,
          userType: data.eventHeader.userType,
          resourceName: data.eventBody.address
        }
        this.memberParams.push(this.picParams)
        if (this.memberParams.length > 1) {
          this.animationEnter = true
          setTimeout(() => {
            this.member.unshift(this.memberParams[0])
            this.memberParams.splice(0, 1)
            this.animationEnter = false
            if (this.member.length < 5) {
              this.emptyLis.length = 5 - this.member.length
            }
            if (this.member.length > 5) {
              this.lisboxLenth = this.member.length * 4.5 - 0.5
              this.$nextTick(() => {
                this.$refs.slider.update()
                this.$refs.slider.setRight()
              })
            }
          }, 1000)
        }
      }
    },
    /**
     * 获取人脸抓拍图片
     */
    cameraCodeParams (data) {
      this.faceCaptureArr = data
      this.faceCaptureParams.cameraCode = data.join(',')
      this.getFaceCaptureList()
    },
    getFaceCaptureList () {
      if (this.hasNext && this.faceCaptureParams.cameraCode) {
        this.loading = true
        getCaptureData(this.faceCaptureParams).then(res => {
          this.hasNext = res.hasNext
          this.captureData = res.rows || []
          if (this.captureData.length > 0 && this.faceCaptureParams.pageNo === 1) {
            this.userType = this.captureData[0].userType
            this.imgSrc = this.captureData[0].facePicUrl
            this.memberParams.push(this.captureData[0])
            this.captureData.splice(0, 1)
          }
          this.member = this.member.concat(this.captureData)
          if (this.member.length < 5) {
            this.emptyLis.length = 5 - this.member.length
          }
          if (this.member.length > 5) {
            this.lisboxLenth = this.member.length * 4.5 - 0.5
          }
          this.$nextTick(() => {
            this.faceCaptureParams.pageNo++
            this.$refs.slider.update()
            this.$refs.slider.setRight()
            this.loading = false
          })
        }).catch(err => {
          this.loading = false
          console.log(err)
        })
      }
    },
    showMsg (event, item) {
      let animatePoint = {
        x: event.pageX,
        y: event.pageY
      }
      castAnimate(animatePoint, 'D').then(() => {
        this.$store.commit('sendMessage', {
          windowName: 'member_info',
          data: item,
          shown: true
        })
      })
    }
  }
}
</script>
