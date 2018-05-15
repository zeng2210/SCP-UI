<template>
  <div class="item-warning community-help-box">
    <div class="ico-btn-group">
      <a class="ico turn-off" href="javascript:;" @click="confirmBox"></a>
      <a class="ico exit-full" href="javascript:;" @click="hidePage" :disabled="noSwitch"></a>
    </div>
    <div class="hd">社区求助</div>
    <div class="bd">
      <object v-show="showOcx['0']" type='application/x-vlc-plugin' ref='PlayOcx0' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['1']" type='application/x-vlc-plugin' ref='PlayOcx1' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['2']" type='application/x-vlc-plugin' ref='PlayOcx2' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['3']" type='application/x-vlc-plugin' ref='PlayOcx3' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['4']" type='application/x-vlc-plugin' ref='PlayOcx4' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['5']" type='application/x-vlc-plugin' ref='PlayOcx5' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['6']" type='application/x-vlc-plugin' ref='PlayOcx6' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['7']" type='application/x-vlc-plugin' ref='PlayOcx7' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['8']" type='application/x-vlc-plugin' ref='PlayOcx8' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['9']" type='application/x-vlc-plugin' ref='PlayOcx9' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['10']" type='application/x-vlc-plugin' ref='PlayOcx10' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['11']" type='application/x-vlc-plugin' ref='PlayOcx11' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['12']" type='application/x-vlc-plugin' ref='PlayOcx12' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['13']" type='application/x-vlc-plugin' ref='PlayOcx13' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object v-show="showOcx['14']" type='application/x-vlc-plugin' ref='PlayOcx14' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...' class="help-list ocx-obj">
      </object>
      <object style="display:none" type='application/x-vlc-plugin' ref='PlayOcx_1' classid='clsid:{F62C659C-5902-4ECD-9C57-2C4DD27C6D93}' standby='正在加载...'>
        <param name='wmode' value='transparent'>
      </object>

      <div class="demonstration">
        <div v-show="showCountTime">正在通话中&nbsp;{{countTime}}</div>
        <div v-show="showHangUpText">{{hangUpText}}</div>
      </div>
      <div class="open-door-text" v-show="showOpenDoor">
        <div>{{openDoorText}}</div>
      </div>

      <!-- 通话层，即正在通话时显示该层 -->
      <ul class="help-list-box" v-if="showInTheCallRecord">
        <li>
          <div class="detail-info-box">
            <div class="left-box">
              <div class="view" v-if="inTheCallRecord[inTheCallRecord.callId].callType === '室内机呼叫'">
                <div class="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="view" v-else>
                <div class="no-ocx-wrap" style=""><div class="no-ocx-box"><img src="/static/images/no-ocx-warning.png" alt="" class="no-ocx"><p>无视频输出</p></div>
              </div>
              </div>
              <div class="btn-box" v-if="showButtons[0]" v-show="!btnDisabled">
                <button class="btn confirm" @click="playVideo()">接 听</button>
                <button class="btn cancel" @click="hangupVideo()">拒 绝</button>
              </div>
              <div class="btn-box" v-else-if="(showButtons[1] || showButtons[2])">
                <button class="btn confirm" @click="openDoor()" v-show="showButtons[1]">开 门</button>
                <button class="btn confirm" @click="openDoor()" v-show="showButtons[2]">开 闸</button>
                <button class="btn cancel" @click="hangupVideo()">挂 断</button>
              </div>
              <div class="btn-box one-btn" v-else>
                <button type="button" class="btn cancel" @click="hangupVideo()">挂 断</button>
              </div>
            </div>
            <ul class="right-box">
              <li class="pic-box"><img :src="inTheCallRecordsImageUrl" alt="" class="pic"></li>
              <li>
                <span class="name">事&nbsp;件：</span>{{inTheCallRecord[inTheCallRecord.callId].callType}}</li>
              <li>
                <span class="name">时&nbsp;间：</span>{{inTheCallRecord[inTheCallRecord.callId].time}}</li>
              <li class="place">
                <span class="name">地&nbsp;点：</span>{{inTheCallRecord[inTheCallRecord.callId].deviceAddress}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!--确定是否解除警报-->
    <div class="clear-confirm-box" v-show="isConfirm">
      <iframe frameborder="0" class="iframe-box"></iframe>
      <div class="bg"></div>
      <div class="con">
        <p class="title">确定要解除该窗口的所有报警吗？</p>
        <div class="btn-box">
          <button type="button" class="btn cancel" @click="cancleDismiss">取 消</button>
          <button type="button" class="btn confirm" @click="mulDismissWarn">解 除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import '@/assets/css/community-help.css'
import {
  callinConfirm,
  offHook,
  onHook,
  onHookSync,
  openDoor,
  ringing,
  ipList
} from '../api/community-help'
export default {
  name: 'community-help-item',
  props: {
    curShow: String,
    showPage: Boolean
  },
  data () {
    return {
      countTime: '', // 计时
      timer: '', // 计时器
      showCountTime: false, // 计时是否显示
      showButtons: [true, false, false], // 接听后按钮变化
      btnDisabled: false, // 按钮是否可点击
      showHangUpText: false, // '通话已结束'文本显示
      hangUpText: '通话已结束',
      showOpenDoor: false, // 是否显示开门提示
      openDoorText: '', // 开门显示文字
      showOcx: {}, // OCX控件是否显示
      playOcxFreeIndexs: [], // OCX控件空闲的
      inTheCallPlayOcxIndex: '', // 通话中的OCX控件playOcxFreeIndex
      callRecords: [], // 存放正常振铃的呼叫数据
      inviteCallRecords: [], // 存放呼入数据，包括新呼入未振铃的呼叫
      callRecordsImageUrl: {}, // 存放呼叫抓拍图片url
      inTheCallRecordsImageUrl: '', // 当前呼叫的抓拍图片
      showInTheCallRecord: false,
      inTheCallRecord: {}, // 存放当前呼叫的呼叫记录
      inTheCallRecordIndex: 0, // 存放当前呼叫的呼叫记录的index
      defaultUrl: '', // 默认视频位置显示图片
      isConfirm: false, // 全部解除弹窗是否显示
      timeoutTimer: {}, // 用于存放超时计时器
      noSwitch: false, // 是否可滑动
      removeIndex: 0 // 挂断的呼叫index
    }
  },
  computed: {
  },
  /* 当前页面渲染完毕，但不会保证子组件被渲染 */
  mounted () {
    this.$nextTick(() => {
      this.$parent.$parent.$el.appendChild(this.$el.querySelector('.clear-confirm-box'))
    })
    // 初始化playOcxFreeIndexs，showOcx
    for (let i = 0; i < 15; i++) {
      this.playOcxFreeIndexs.push(String(i))
      this.showOcx[String(i)] = false
    }
    // 在页面刷新时挂断全部通话
    window.addEventListener('beforeunload', () => {
      this.hangupAllCall()
    })
  },
  methods: {
    /**
    * @description 隐藏弹窗
    */
    hidePage () {
      this.$emit('hidePage')
    },
    /**
    * @description 弹出全部解除确认框
    */
    confirmBox () {
      this.isConfirm = true
    },
    /**
    * @description 取消批量解除
    */
    cancleDismiss () {
      this.isConfirm = false
    },
    /**
    * @description 批量解除未通话呼叫
    */
    mulDismissWarn () {
      this.$emit('mulDismissWarn')
    },
    /**
    * @description 当轮播Slide切换时执行，设置OCX控件为显示
    * @param {String} callId 呼叫记录的callId
    */
    slideChangeSwiper (callId) {
      if (this.inTheCallRecord.callId) {
        let oldPlayOcxFreeIndex = this.inTheCallRecord[this.inTheCallRecord.callId].playOcxFreeIndex
        this.showOcx[oldPlayOcxFreeIndex] = false
      }
      // 显示当前呼叫信息
      this.inTheCallRecordsImageUrl = !this.callRecordsImageUrl[callId] ? this.defaultUrl : this.callRecordsImageUrl[callId]
      this.inTheCallRecord = this.getCallRecordByCallId(callId)
      // 设置当前显示的页面index
      this.inTheCallRecordIndex = this.callRecords.indexOf(this.inTheCallRecord)
      this.showInTheCallRecord = true
      if (this.inTheCallRecord[callId].callType !== '室内机呼叫' && this.showPage) {
        let playOcxFreeIndex = this.inTheCallRecord[this.inTheCallRecord.callId].playOcxFreeIndex
        let that = this
        setTimeout(() => {
          // 将对应空闲OCX控件设置为可见
          let showOcxTemp = {}
          for (var key in that.showOcx) {
            showOcxTemp[key] = that.showOcx[key]
          }
          showOcxTemp[playOcxFreeIndex] = true
          that.showOcx = showOcxTemp
          // 获取OCX控件视频接口所需参数
          let sdp = that.inTheCallRecord[that.inTheCallRecord.callId].sdp
          let videoIp = that.inTheCallRecord[that.inTheCallRecord.callId].videoIp
          let videoPort = that.inTheCallRecord[that.inTheCallRecord.callId].videoPort
          // 播放视频
          that.$nextTick(() => {
            setTimeout(() => {
              that.$refs['PlayOcx' + playOcxFreeIndex].OpenVideoFile(sdp, videoIp, videoPort)
            }, 100)
          })
        }, 100)
      }
    },
    /**
    * @description 根据callId获取对应的呼叫记录
    * @param {String} callId 呼叫记录的callId
    * @returns {Object} nowCallRecord 对应callId的呼叫记录
    */
    getCallRecordByCallId (callId) {
      // 根据callId获取对应呼叫记录
      let nowCallRecord
      for (let i = 0, len = this.callRecords.length; i < len; i++) {
        let item = this.callRecords[i]
        if (callId === item.callId) {
          nowCallRecord = item
          break
        }
      }
      return nowCallRecord
    },
    /**
     * @description pc端响应门口机呼叫调用接口，播放视频
     * @param {String} callId 呼叫id
     * @param {String} audioIp 本地音频播放ip
     * @param {Number} audioPort 本地音频播放端口
     * @param {Number} localAudioCatchPort 本地音频采集端口
     * @param {String} audioIp 本地视频播放ip
     * @param {Number} videoPort 本地视频播放端口
     * @param {String} sdp 设备sdp信息
     */
    callinConfirm (
      callId,
      audioIp,
      audioPort,
      localAudioCatchPort,
      videoIp,
      videoPort,
      sdp
    ) {
      callinConfirm(callId, audioIp, audioPort, videoIp, videoPort)
        .then(result => {
          console.log('pc端响应门口机呼叫调用接口:', result)
          if (result) {
            let data = result
            // OCX处理发送给设备的sdp信息,告诉设备该往哪里发音频视频数据
            let allSdp = this.$refs.PlayOcx_1.GetSdp(
              sdp,
              data.receiveDevVoiceIp,
              data.receiveDevVideoPort,
              data.receiveDevVoicePort
            )
            console.log('>>>>allSdp' + allSdp)
            // 振铃
            ringing(callId, allSdp)
              .then(result => {
                console.log('>>>>振铃回复:' + JSON.stringify(result))
                if (result) {
                  // 判断若存在空闲的OCX控件，则调用OCX监听视频流，并将对应PlayOcxFreeIndex移除
                  if (this.playOcxFreeIndexs.length > 0) {
                    // 将要被使用的OCX控件playOcxFreeIndex记录，等待存入callRecords
                    let playOcxFreeIndex = this.playOcxFreeIndexs[0]
                    // 将用到的OCX控件从playOcxFreeIndexs中移除
                    this.playOcxFreeIndexs.shift()
                    let callRecordsTemp = []
                    let index = 0
                    let newIndex
                    this.inviteCallRecords.forEach(item => {
                      let tempItem = item
                      if (callId === item.callId) {
                        newIndex = index

                        tempItem.status = 'ringing'
                        tempItem[callId].videoIp = videoIp
                        tempItem[callId].videoPort = videoPort
                        tempItem[callId].audioIp = audioIp
                        tempItem[callId].audioPort = audioPort
                        tempItem[callId].localAudioCatchPort = localAudioCatchPort
                        tempItem[callId].receiveDevVoiceIp = data.receiveDevVoiceIp // 视频组件接收设备端音频流的IP
                        tempItem[callId].receiveDevVoicePort = data.receiveDevVoicePort // 视频组件接收设备端音频流端口
                        tempItem[callId].receiveCltVoicePort = data.receiveCltVoicePort
                        tempItem[callId].receiveCltVoiceIp = data.receiveCltVoiceIp
                        tempItem[callId].receiveDevVideoIp = data.receiveDevVideoIp
                        tempItem[callId].receiveDevVideoPort = data.receiveDevVideoPort
                        tempItem[callId].allSdp = allSdp
                        tempItem[callId].devSdp = sdp // 设备sdp信息

                        tempItem[callId].playOcxFreeIndex = playOcxFreeIndex // 将上面保存的控件playOcxFreeIndex存入tempRecord
                      }
                      callRecordsTemp.push(tempItem)
                      index++
                    })
                    // 将呼入数据更新
                    this.inviteCallRecords = callRecordsTemp
                    // 重新渲染轮播
                    this.callRecords = callRecordsTemp
                    this.$emit('setCallData')
                    // 添加轮播小白点
                    this.$emit('updateItemLength', newIndex, 1)

                    // 以下情况将轮播切换到优先级最高的页面
                    // 1、当前显示不是社区求助，而且为第一通呼叫； 2、当前显示为第一页且新来呼叫优先级更高
                    if ((this.curShow !== 'call' && this.callRecords.length === 1) || (this.curShow === 'call' && newIndex === 0 && this.inTheCallRecordIndex === 0)) {
                      this.$emit('setActiveItem', 0)
                    }
                    // 30秒振铃超时
                    let that = this
                    this.timeoutTimer['ringing' + callId] = setTimeout(() => {
                      for (let i = 0, len = that.callRecords.length; i < len; i++) {
                        if (callId === that.callRecords[i].callId) {
                          // 若指定时间内对应记录还是'ringing'则响铃超时
                          if (that.callRecords[i].status === 'ringing') {
                            that.hangupVideoInit(callId, '振铃超时，已挂断')
                            // 通知设备挂机
                            onHook(callId)
                              .then(result => {
                                console.log(result)
                              }).catch(error => {
                                console.log(error)
                              })
                          }
                        }
                      }
                    }, 30000)
                  } else {
                    console.log('error: 控件已用完')
                  }
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log(result)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
    * @description 接听
    * @param {String} callId 呼叫id
    */
    playVideo () {
      let callId = this.inTheCallRecord.callId
      console.log('--------------当前接听的呼叫记录是--------------', this.inTheCallRecord)
      if (callId) {
        let audioPort = this.inTheCallRecord[callId].audioPort
        let receiveCltVoiceIp = this.inTheCallRecord[callId].receiveCltVoiceIp
        let receiveCltVoicePort = this.inTheCallRecord[callId].receiveCltVoicePort
        let allSdp = this.inTheCallRecord[callId].allSdp
        if (!/Trident\/7\./.test(navigator.userAgent)) {
          // 判断用户是否采用IE11打开
          return false
        }
        let that = this
        // PC可视对讲应用点提机接口
        offHook(callId, allSdp)
          .then(result => {
            console.log('PC可视对讲应用点提机接口:', result)
            if (!result) {
              return false
            }
            for (let i = 0, len = that.callRecords.length; i < len; i++) {
              if (callId === that.callRecords[i].callId) {
                // 清除振铃超时计时器
                clearTimeout(that.timeoutTimer['ringing' + callId])
                delete that.timeoutTimer['ringing' + callId]
                that.callRecords[i].status = 'accept'
              }
            }
            // 提机成功，播放音频
            setTimeout(() => {
              // 播放音频
              that.$refs['PlayOcx' + that.inTheCallRecord[callId].playOcxFreeIndex].OpenAudio(
                audioPort,
                receiveCltVoicePort,
                receiveCltVoiceIp
              )
              // 接通后，改变显示的按钮
              if (that.inTheCallRecord[callId].callType === '门禁呼叫') {
                that.showButtons = [false, true, false]
              } else if (that.inTheCallRecord[callId].callType === '车闸呼叫') {
                that.showButtons = [false, false, true]
              } else {
                that.showButtons = [false, false, false]
              }
              // 设置轮播不可改变
              that.noSwitch = true
              that.$emit('setNoSwitch', true)
              // 设置当前通话的OCX控件playOcxFreeIndex
              that.inTheCallPlayOcxIndex = that.inTheCallRecord[callId].playOcxFreeIndex
              // 显示通话计时
              that.showCountTime = true
              that.countTime = ''
              // 播放音视频成功开始计时
              that.countTimeFun()
              // 120秒通话超时
              that.timeoutTimer['accept' + callId] = setTimeout(() => {
                for (let i = 0, len = that.callRecords.length; i < len; i++) {
                  if (callId === that.callRecords[i].callId) {
                    // 若指定时间内对应记录还是'accept'则通话超时
                    if (that.callRecords[i].status === 'accept') {
                      // 调用挂断方法
                      that.hangupVideoInit(callId, '通话超时，已挂断')
                      // 通知设备挂机
                      onHook(callId)
                        .then(result => {
                          console.log(result)
                        }).catch(error => {
                          console.log(error)
                        })
                    }
                  }
                }
              }, 120000)
            }, 100)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('error: 没有对应的呼叫记录')
      }
    },
    /**
    * @description 开门
    * @param {String} 呼叫id
    */
    openDoor () {
      let that = this
      let callId = this.inTheCallRecord.callId
      // 根据callId获取对应呼叫记录
      console.log('--------------当前开门的呼叫记录是--------------', this.inTheCallRecord)
      if (callId) {
        let deviceCode = this.inTheCallRecord[callId].deviceCode
        openDoor(callId, deviceCode)
          .then(result => {
            console.log('PC端可视对讲发起远程开门:', result)
            if (result) {
              if (this.inTheCallRecord[callId].callType === '门禁呼叫') {
                this.openDoorText = '门禁已打开'
              } else if (this.inTheCallRecord[callId].callType === '车闸呼叫') {
                this.openDoorText = '车闸已打开'
              }
            } else {
              this.openDoorText = '开门失败'
            }
            this.showOpenDoor = true
            setTimeout(() => {
              that.showOpenDoor = false
            }, 2000)
          })
          .catch(error => {
            console.log(error)
            this.openDoorText = '开门失败'
            this.showOpenDoor = true
            setTimeout(() => {
              that.showOpenDoor = false
            }, 2000)
          })
      } else {
        console.log('error: 没有对应的呼叫记录')
      }
    },
    /**
     * @description 挂断，音频或视频结束并停止接收视频或音频流
     * @param {String} callId 呼叫id
     */
    hangupVideo () {
      let callId = this.inTheCallRecord.callId
      // 调用挂断初始化方法
      this.hangupVideoInit(callId, '通话已结束')
      // PC可视对讲应用点挂机接口
      onHook(callId)
        .then(result => {
          console.log(result)
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @description 挂断全部
     */
    hangupAllVideo () {
      let callRecordsTemp = []
      // 除正在通话中的记录，挂断全部通话
      for (let i = 0, len = this.callRecords.length; i < len; i++) {
        let item = this.callRecords[i]
        let itemCallId = item.callId
        let playOcxFreeIndex = item[itemCallId].playOcxFreeIndex
        if (playOcxFreeIndex !== this.inTheCallPlayOcxIndex) {
          // 清除通话超时计时器
          clearTimeout(this.timeoutTimer['accept' + itemCallId])
          delete this.timeoutTimer['accept' + itemCallId]
          // 清除振铃超时计时器
          clearTimeout(this.timeoutTimer['ringing' + itemCallId])
          delete this.timeoutTimer['ringing' + itemCallId]
          if (item[itemCallId].callType !== '室内机呼叫') {
            this.$refs['PlayOcx' + playOcxFreeIndex].CloseVideo()
          }
          // 将空闲OCX控件playOcxFreeIndex添加到空闲控件playOcxFreeIndexs中
          this.playOcxFreeIndexs.push(playOcxFreeIndex)
          this.showOcx[playOcxFreeIndex] = false
          // PC可视对讲应用点挂机接口
          onHook(itemCallId)
            .then(result => {
              console.log(itemCallId, result)
            })
            .catch(error => {
              console.log(itemCallId, error)
            })
        } else {
          callRecordsTemp.push(item)
        }
      }
      let itemLength = this.showButtons[0] ? this.callRecords.length : this.callRecords.length - 1
      this.inviteCallRecords = callRecordsTemp
      this.callRecords = callRecordsTemp
      this.$emit('setCallData')
      this.$emit('updateItemLength', 0, -itemLength)
      this.$emit('setActiveItem', 0)
      if (this.showButtons[0]) {
        // 初始化当前呼叫的呼叫记录
        this.showInTheCallRecord = false
        this.inTheCallRecord = {}
        // 初始化通话计时
        this.showCountTime = false
        clearInterval(this.timer)
      }
      this.isConfirm = false
    },
    hangupAllCall () {
      // 挂断全部通话
      for (let i = 0, len = this.callRecords.length; i < len; i++) {
        let item = this.callRecords[i]
        let itemCallId = item.callId
        let playOcxFreeIndex = item[itemCallId].playOcxFreeIndex
        if (item[itemCallId].callType !== '室内机呼叫') {
          this.$refs['PlayOcx' + playOcxFreeIndex].CloseVideo()
        }
        if (playOcxFreeIndex === this.inTheCallPlayOcxIndex) {
          this.$refs['PlayOcx' + playOcxFreeIndex].CloseAudio() // 音频挂断方法
        }
        // PC可视对讲应用点挂机接口
        onHookSync(itemCallId)
      }
    },
    /**
     * @description 挂断初始化方法
     */
    hangupVideoInit (callId, hangUpText) {
      // 获取当前呼叫记录
      let nowCallRecord = this.getCallRecordByCallId(callId)
      // 如果记录中不存在对应callId的呼叫记录则不做处理
      if (nowCallRecord && nowCallRecord.status !== 'bye') {
        for (let i = 0, len = this.callRecords.length; i < len; i++) {
          if (callId === this.callRecords[i].callId) {
            this.callRecords[i].status = 'bye'
          }
        }
        // 清除通话超时计时器
        clearTimeout(this.timeoutTimer['accept' + callId])
        delete this.timeoutTimer['accept' + callId]
        // 清除振铃超时计时器
        clearTimeout(this.timeoutTimer['ringing' + callId])
        delete this.timeoutTimer['ringing' + callId]
        console.log('--------------当前挂机的呼叫记录是--------------', nowCallRecord)
        // OCX控件释放端口
        let playOcxFreeIndex = nowCallRecord[callId].playOcxFreeIndex
        if (this.$refs['PlayOcx' + playOcxFreeIndex]) {
          if (nowCallRecord[nowCallRecord.callId].callType !== '室内机呼叫' && nowCallRecord[callId].videoIp) {
            this.$refs['PlayOcx' + playOcxFreeIndex].CloseVideo() // 视频挂断方法
          }
          // 将空闲OCX控件playOcxFreeIndex添加到空闲控件playOcxFreeIndexs中
          this.playOcxFreeIndexs.push(playOcxFreeIndex)
          // 如果挂断的OCX控件等于通话中的OCX控件，则初始化按钮和当前通话的OCX控件playOcxFreeIndex
          if (playOcxFreeIndex === this.inTheCallPlayOcxIndex) {
            this.$refs['PlayOcx' + playOcxFreeIndex].CloseAudio() // 音频挂断方法
            // 将按钮初始化
            this.showButtons = [true, false, false]
            // 将开门成功隐藏
            this.showOpenDoor = false
            // 设置轮播可改变
            this.noSwitch = false
            this.$emit('setNoSwitch', false)
            // 将当前通话的OCX控件playOcxFreeIndex
            this.inTheCallPlayOcxIndex = ''
          }
        }
        if (callId === this.inTheCallRecord.callId) {
          // 通话计时结束，通话已结束文本出现
          this.showCountTime = false
          clearInterval(this.timer)
          this.hangUpText = hangUpText
          this.showHangUpText = true
          this.btnDisabled = true
          this.inTheCallRecordsImageUrl = this.defaultUrl
        }
        delete this.callRecordsImageUrl[callId]
        let that = this
        setTimeout(() => {
          // 将挂断的呼叫信息移除
          that.removeCallRecordByCallId(callId)
          that.showHangUpText = false
          that.btnDisabled = false
          // 若当前没有呼叫，则隐藏弹窗
          if (that.callRecords.length === 0) {
            // 将对应OCX控件隐藏
            that.showOcx[playOcxFreeIndex] = false
            // 初始化当前呼叫的呼叫记录
            that.showInTheCallRecord = false
            that.inTheCallRecord = {}
            that.inTheCallPlayOcxIndex = ''
          } else {
            // 如果挂断的OCX控件等于当前显示页面，则将跳转到优先级最高的呼叫记录
            if (callId === that.inTheCallRecord.callId) {
              that.$emit('setActiveItem', 0)
            }
          }
          that.$emit('setCallData')
          that.$emit('updateItemLength', that.removeIndex, -1)
        }, 700)
      }
    },
    /**
    * @description 更新呼叫记录，将接听的呼叫从数组中移除
    * @param {String} callId 呼叫id
    */
    removeCallRecordByCallId (callId) {
      let callRecordsTemp = []
      let index = 0
      for (let i = 0, len = this.callRecords.length; i < len; i++) {
        if (callId !== this.callRecords[i].callId) {
          callRecordsTemp.push(this.callRecords[i])
        } else {
          index = i
        }
      }
      this.inviteCallRecords = callRecordsTemp
      this.callRecords = callRecordsTemp
      this.removeIndex = index
    },
    /**
    * @description 计时器函数
    */
    countTimeFun () {
      let minutes = 0
      let seconds = 0
      if (this.showInTheCallRecord) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          seconds++
          if (seconds >= 60) {
            seconds = 0
            minutes += 1
          }
          this.countTime =
            (minutes >= 10 ? minutes : '0' + minutes) +
            ':' +
            (seconds >= 10 ? seconds : '0' + seconds)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    /**
     * @description 监听websocket实时推送消息
     * @param {Object} data websocket消息
     */
    onSocketMessage (data) {
      let that = this
      let callId = data.callId
      let status = data.status
      let sdp = data.sdp
      // 呼叫
      if (status === 'invite') {
        let callTypeNum = data.from.slice(0, 2)
        let callType
        let callRecordsTempSortIndex
        switch (callTypeNum) {
          case '02':
            callType = '围墙机呼叫'
            callRecordsTempSortIndex = 2
            break
          case '03':
            callType = '门禁呼叫'
            callRecordsTempSortIndex = 2
            break
          case '04':
            callType = '室内机呼叫'
            callRecordsTempSortIndex = 3
            break
          case '06':
            callType = '车闸呼叫'
            callRecordsTempSortIndex = 1
            break
          case '07':
            callType = '电梯呼叫'
            callRecordsTempSortIndex = 0
            break
          default:
            callType = '未知号码呼叫'
            callRecordsTempSortIndex = 4
        }
        data.callType = callType
        // 将callId加入呼叫记录中
        let callRecord = {
          'callId': callId
        }
        // 呼叫数据
        let callItem = data
        callItem.url = this.defaultUrl
        callRecord[callId] = callItem
        // 将呼入记录加入inviteCallRecords，按级别倒序，时间正序排序，即级别越低时间越后排序越后
        // 级别：电梯>车闸>门禁>室内机>未知
        let callRecordsTempSort = [[], [], [], [], []]
        this.inviteCallRecords.forEach(item => {
          let itemCallId = item.callId
          if (item[itemCallId].videoIp) { // 将呼入记录中无效记录删除
            if (item[itemCallId].callType === '电梯呼叫') {
              callRecordsTempSort[0].push(item)
            } else if (item[itemCallId].callType === '车闸呼叫') {
              callRecordsTempSort[1].push(item)
            } else if (item[itemCallId].callType === '门禁呼叫' || item[itemCallId].callType === '围墙机呼叫') {
              callRecordsTempSort[2].push(item)
            } else if (item[itemCallId].callType === '室内机呼叫') {
              callRecordsTempSort[3].push(item)
            } else {
              callRecordsTempSort[4].push(item)
            }
          }
        })
        callRecordsTempSort[callRecordsTempSortIndex].push(callRecord)
        // 将对应级别的数组合并为一个总的数组
        let callRecordsTemp = callRecordsTempSort.reduce(function (n1, n2) {
          return n1.concat(n2)
        })
        this.inviteCallRecords = callRecordsTemp
        // 正在呼入，不响应呼叫
        try {
          setTimeout(() => {
            // 调用OCX控件方法获取ip和空闲端口 播放音视频
            let audioIp = that.$refs.PlayOcx_1.GetLocalIP()
            let audioPort = that.$refs.PlayOcx_1.GetFreePort()
            let localAudioCatchPort = that.$refs.PlayOcx_1.GetFreePort() // 本地音频采集的端口
            let videoIp = that.$refs.PlayOcx_1.GetLocalIP()
            let videoPort = that.$refs.PlayOcx_1.GetFreePort()
            console.log(
              '本地this.audioIp:' +
              audioIp +
              'this.audioPort: ' +
              audioPort +
              'this.videoIp: ' +
              videoIp +
              'this.videoPort: ' +
              videoPort
            )
            that.callinConfirm(
              callId,
              audioIp,
              audioPort,
              localAudioCatchPort,
              videoIp,
              videoPort,
              sdp
            )
          }, 100)
        } catch (e) {
          console.log('onSocketMessage:' + e)
        }
      } else if (status === 'capture') {
        this.callRecordsImageUrl[callId] = data.url
        if (callId === this.inTheCallRecord.callId) {
          this.inTheCallRecordsImageUrl = data.url
        }
      } else if (status === 'bye') {
        if (this.callRecords.length > 0) {
          this.hangupVideoInit(callId, '设备已断开')
        }
      }
    },
    /**
     * @description 处理可视对讲呼叫消息
     * @param {Object} data websocket消息
     */
    processCommunityHelpData (data) {
      try {
        // 匹配当前的ip是否已添加到ip配置列表
        let localIp = this.$refs.PlayOcx_1.GetLocalIP()
        ipList()
          .then(result => {
            if (!result) {
              console.log(result)
              // 失败
              return false
            } else {
              let ipArary = result
              ipArary.forEach((item) => {
                if (localIp === item) {
                  let info = JSON.parse(data.info)
                  info.time = data.time
                  this.onSocketMessage(info)
                }
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      } catch (e) {
        // 未安装插件
        console.log(e)
      }
    }
  },
  watch: {
    showPage () {
      if (this.showPage) {
        let callId = this.inTheCallRecord.callId
        if (this.inTheCallRecord[callId].callType !== '室内机呼叫') {
          let playOcxFreeIndex = this.inTheCallRecord[callId].playOcxFreeIndex
          // 将对应空闲OCX控件设置为可见
          let showOcxTemp = {}
          for (var key in this.showOcx) {
            showOcxTemp[key] = this.showOcx[key]
          }
          showOcxTemp[playOcxFreeIndex] = true
          this.showOcx = showOcxTemp
          // 获取OCX控件视频接口所需参数
          let sdp = this.inTheCallRecord[callId].sdp
          let videoIp = this.inTheCallRecord[callId].videoIp
          let videoPort = this.inTheCallRecord[callId].videoPort
          // 播放视频
          let that = this
          this.$nextTick(() => {
            setTimeout(() => {
              that.$refs['PlayOcx' + playOcxFreeIndex].OpenVideoFile(sdp, videoIp, videoPort)
            }, 500)
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.community-help-box {
  border: 0rem;
}
.demonstration {
  position: absolute;
  top: 10.6rem;
  left: 2.65rem;
  height: 1rem;
  width: 13rem;
  font-size: 0.7rem;
  z-index: 10;
  text-align: center;
}
.open-door-text {
  position: absolute;
  top: 10.4rem;
  left: 6.2rem;
  height: 1.5rem;
  width: 6rem;
  background-color: #231a0a;
  z-index: 20;
  text-align: center;
  padding: 0.1rem;
  font-size: 0.8rem;
}
.ocx-obj {
  position: absolute;
  width: 12.8rem;
  height: 7.2rem;
  top: 2.86rem;
  left: 2.67rem;
}
.detail-info-box .btn-box .btn {
  width: 6.2rem;
}
.detail-info-box .one-btn .btn {
  width: 13rem;
}
</style>
