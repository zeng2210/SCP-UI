<template>
  <div>
    <div class="item-box" v-show="false">
      <a class="close" href="javascript:;">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
            <div class="note">{{operateResult}}</div><!--文字弹层提示-->
          </div>
          <button type="button" class="btn confirm" @click="openGate(deviceId, parentId)">远程开闸</button>
        </div>
        <!--左侧只有图片，图片居中显示，添加类center，如下-->
        <!--<div class="left-box center">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
          </div>
        </div>-->
        <ul class="right-box">
          <li>摄像头 002</li>
          <li><span class="name">位&nbsp;置：</span>3栋2单元大堂</li>
          <li><span class="name">编&nbsp;码：</span>1001232443244sfsf</li>
          <li><span class="name">类&nbsp;型：</span>枪机摄像头</li>
          <li><span class="name">厂&nbsp;商：</span>海康</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!-- 电子指路牌 start -->
    <div class="item-box" v-show="false">
      <a class="close" href="javascript:;">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
          </div>
          <button type="button" class="btn open">设定屏幕</button>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>电子指路牌</li>
          <li><span class="name">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>3栋2单元大堂</li>
          <li><span class="name">编&nbsp;码：</span>1001232443244sfsf</li>
          <li><span class="name">类&nbsp;型：</span>枪机摄像头</li>
          <li><span class="name">厂&nbsp;商：</span>海康</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!--设定电子指路牌屏幕-->
    <div class="item-box " v-show="false">
      <div class="set-signposts-box">
        <a class="icon-return" href="javascript:;"></a>
        <p class="title">请选择电子指路牌屏幕内容</p>
        <ul class="tabs-nav">
          <li class="active">第一组</li>
          <li>第二组</li>
          <li>第三组</li>
        </ul>
        <ul class="signposts-list"><!--事件列表小于或等于4，添加类.center-->
          <li class="active">
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
            <div class="signposts">
              <img src="/static/images/p09.png" alt="" class="pic">
            </div>
          </li>
        </ul>
        <div class="btn-box">
          <button type="button" class="btn blue">使   用</button>
        </div>
      </div>
    </div>
    <!-- 电子指路牌 end-->
    <!-- 广播播放 start -->
    <div class="item-box" v-show="false">
      <div class="detail-info-box broadcast-box">
        <div class="left-box">
          <ul class="broadcast-view">
            <li class="prev">
              <img src="/static/images/p06.png" alt="" class="cover">
              <p class="tag-name">清晨</p>
            </li>
            <li class="active">
              <img src="/static/images/p06.png" alt="" class="cover">
              <p class="tag-name">紧急事件</p>
              <a href="javacript:;" class="status icon-playing"></a><!--播放-->
              <!--<a href="javacript:;" class="status icon-time-out"></a>--><!--暂停-->
            </li>
            <li class="next">
              <img src="/static/images/p06.png" alt="" class="cover">
              <p class="tag-name">傍晚</p>
            </li>
          </ul>
          <div class="txt-box">
            <p class="title">紧急事件广播</p>
            <p class="time">00:25/04:35</p>
          </div>
          <div class="volume-box">
            <a href="javascript:;" class="ico icon-volume"></a>
            <div class="volume-bar">
              <div class="bar" style="width: 30%;"></div>
              <div class="dot" style="left: 30%;"></div>
            </div>
            <label><input type="checkbox" v-show="false"><span class="icon-check"></span>同步到全部广播</label>
          </div>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>电子指路牌</li>
          <li><span class="name">位&nbsp;置：</span>3栋2单元大堂</li>
          <li><span class="name">编&nbsp;码：</span>1001232443244sfsf</li>
          <li><span class="name">类&nbsp;型：</span>枪机摄像头</li>
          <li><span class="name">厂&nbsp;商：</span>海康</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!-- 广播播放 end -->
    <!-- 呼叫电梯 - 选择楼层 start -->
    <!-- <div class="item-box" v-show="true">
      <div class="detail-info-box select-floor-box">
        <a class="icon-return" href="javascript:;"></a>
        <p class="title">呼叫电梯</p>
          <div class="left-box center">
            <div class="view">
              <img src="/static/images/p06.png" alt="" class="pic">
            </div>
          </div>
          <ul class="right-box">
            <li>请选择楼层</li>
            <li class="floor-box">
              <a href="javascript:;">22</a>
              <a href="javascript:;">21</a>
              <a href="javascript:;">20</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;" class="active">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
              <a href="javascript:;">19</a>
            </li>
          </ul>
        </div>

      </div> -->
    <!-- 选择楼层 end -->
    <!-- 机器人 start -->
    <!-- 机器人 start
    <div class="item-box" v-show="false">
      <a class="close" href="javascript:;">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box robot-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
            <p class="note">为了保护收件人隐私<br>暂不支持查看当前画面</p>文字弹层提示
          </div>
          <div class="btn-box">
            <div class="oper-box">
              <button class="oper" type="button">前</button>
              <button class="oper active" type="button">后</button>
              <button class="oper" type="button">左</button>
              <button class="oper" type="button">右</button>
            </div>
            <button type="button" class="btn blue">召   回</button>
          </div>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>摄像头 002</li>
          <li><span class="name">电&nbsp;量：</span>40%</li>
          <li><span class="name">编码：</span>1001232443244sfsf</li>
          <li><span class="name">待处理任务：</span>4</li>
          <li><span class="name">厂&nbsp;商：</span>海康</li>
          <li><span class="name">当前状态：</span>召回中</li>
        </ul>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>摄像头 002</li>
          <li><span class="name">电&nbsp;量：</span>40%</li>
          <li><span class="name">当前状态：</span>派送中</li>
          <li><span class="name">待处理任务：</span>4</li>
          <li class="task"><span class="name">当前任务：</span>
            <p>3号楼1单元客梯04  预计12:24到达</p>
          </li>
        </ul>
      </div>
    </div>
    机器人 end -->
    <!-- 门禁 start -->
    <div class="item-box" v-show='showControl'>
      <a class="close" href="javascript:;" @click="closeDialog">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
            <div class="note">{{operateResult}}</div><!--文字弹层提示-->
          </div>
          <button type="button" class="btn green" @click="openGate(deviceId, parentId)">远程开闸</button>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>{{deviceObj.markerName}}</li>
          <li><span class="name">位&nbsp;置：</span>A区 北门</li>
          <li><span class="name">编&nbsp;码：</span>{{deviceObj.id}}</li>
          <li><span class="name">类&nbsp;型：</span>门禁</li>
          <li><span class="name">厂&nbsp;商：</span>捷顺</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!-- 门禁 end -->
    <!-- 人行道闸 start -->
    <div class="item-box" v-show='showGates'>
      <a class="close" href="javascript:;" @click="closeDialog">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
            <div class="note">{{operateResult}}</div><!--文字弹层提示-->
          </div>
          <button type="button" class="btn green" @click="openGate(deviceId, parentId)">远程开闸</button>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>{{deviceObj.markerName}}</li>
          <li><span class="name">位&nbsp;置：</span>A区 北门</li>
          <li><span class="name">编&nbsp;码：</span>{{deviceObj.id}}</li>
          <li><span class="name">类&nbsp;型：</span>人行道闸</li>
          <li><span class="name">厂&nbsp;商：</span>捷顺</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!-- 人行道闸 end -->
     <!-- 车闸 start -->
    <div class="item-box" v-show='showbrake'>
      <a class="close" href="javascript:;" @click="closeDialog">╳</a>
      <div class="hd">设备信息</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
            <div class="note">{{operateResult}}</div><!--文字弹层提示-->
          </div>
          <button type="button" class="btn green" @click="openBrake(deviceId, parentId)">远程开闸</button>
        </div>
        <ul class="right-box">
          <li><span class="name">设备名称：</span>{{deviceObj.markerName}}</li>
          <li><span class="name">位&nbsp;置：</span>A区 北门</li>
          <li><span class="name">编&nbsp;码：</span>{{deviceObj.id}}</li>
          <li><span class="name">类&nbsp;型：</span>车闸</li>
          <li><span class="name">厂&nbsp;商：</span>捷顺</li>
          <li><span class="name">IP和端口：</span>172.16.10.221:80</li>
        </ul>
      </div>
    </div>
    <!-- 车闸 end -->
    <robot v-show="flase"></robot>
  </div>
</template>

<script>
import {accessControlOpenDoor, remoteControlBrake} from '@/pages/main/api/device_info'
import Robot from '@/pages/main/robot/Robot'
export default {
  components: {
    Robot
  },
  name: 'device-info',
  data () {
    return {
      operateResult: '', // 远程操作结果
      showControl: false, // 显示门禁设备信息
      showGates: false, // 显示人行道闸设备信息
      showbrake: false, // 显示车闸设备信息
      deviceId: '',
      parentId: '',
      gateWayId: ''
    }
  },
  props: {
    showType: {
      type: String
    },
    deviceObj: {
      type: Object
    }
  },
  methods: {
    openGate () {
      this.deviceId = '30180015282199250001'
      this.parentId = '10042010001528219925'
      this.gateWayId = 'APP6003'
      accessControlOpenDoor(this.deviceId, this.parentId, this.gateWayId).then(res => {
        console.log(res)
        this.operateResult = '远程开闸成功'
      }).catch(err => {
        console.warn(err)
      })
    },
    openBrake (deviceId, parentId) {
      this.deviceId = '1003200500189902F063'
      this.parentId = '1003200500189902F063'
      remoteControlBrake(this.deviceId, this.parentId).then(res => {
        console.log(res)
        this.operateResult = '远程开闸成功'
      })
    },
    closeDialog () {
      this.$emit('closeDeviceInfo')
    }
  },
  watch: {
    showType () {
      this.showControl = false
      this.showGates = false
      this.showbrake = false
      if (this.showType === '1') {
        this.showControl = true
      } else if (this.showType === '2') {
        this.showGates = true
      } else if (this.showType === '3') {
        this.showbrake = true
      }
    }
  }
}
</script>

<style scoped>

</style>
