<template>
  <div class="ocx-wrap" v-if="showOcxDownload">
    <iframe src="" frameborder="0" class="ocx-iframe-bg"></iframe>
    <div class="ocx-box">
      <a class="close" @click="closeTip">╳</a>
      <div class="hd">
        <p class="title">温馨提示</p>
        <p>来，123，先好准备工作再开始吧！</p>
      </div>
      <ul class="bd">
        <li class="icon-down">
          下载OCX控件
          <a v-show="showVideoOcxDownload" target="_blank" class="down-btn confirm" :href="videoOcxURL" download="ocxvideo.exe" >视频OCX控件</a>
          <a v-show="showCallOcxDownload" target="_blank" class="down-btn confirm" :href="callOcxURL" download="ajb-videoplayer.exe" >呼叫OCX控件</a>
        </li>
        <li class="icon-open">
          下载完成后，双击安装包中exe文件；
        </li>
        <li class="icon-refresh">
          刷新页面，开始使用！
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      showOcxDownload: true,
      // todo 控件的下载目录暂时默认为：当前IP + "/OCX"
      videoOcxURL: window.location.protocol + '//' + window.location.hostname + '/OCX/hk-videoplayer.exe',
      callOcxURL: window.location.protocol + '//' + window.location.hostname + '/OCX/ajb-videoplayer.exe'
      // showVideoOcxDownload: false,
      // showCallOcxDownload: false
    }
  },
  computed: {
    ...mapState({
      showVideoOcxDownload () {
        return !this.$store.state.is_videoocx_downloaded
      },
      showCallOcxDownload () {
        return !this.$store.state.is_callocx_downloaded
      }
    })
  },
  mounted () {
  },
  watch: {
    // ocxDownload (val) {
    //   console.log('******************')
    //   console.log(val)
    //   this.ocxShow = val
    // }
  },
  methods: {
    closeTip () {
      this.showOcxDownload = false
    }
  }
}
</script>

<style scoped>
.icon-down:before {
  content: "\e67f";
}
.icon-open:before {
  content: "\e67d";
}
.icon-refresh:before {
  content: "\e67e";
}

.ocx-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 54rem;
  background-color: rgba(0, 0, 0, .9);
}

.ocx-iframe-bg{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.ocx-box {
  position: relative;
  top: 21.7rem;
  left: 20.4rem;
  width: 31rem;
  background-color: #0c012d;
  border: 0.05rem solid #008bff;
  padding: .7rem .7rem .7rem 1.3rem;
  font-size: .8rem;
  line-height: 1;
  z-index: 2
}

.ocx-box .close {
  position: absolute;
  top: .7rem;
  right: .7rem;
  color: #fff;
  font-size: 1rem;
}

.ocx-box .hd {
  margin-bottom: 1rem;
}

.ocx-box .hd .title {
  margin-bottom: 1rem;
  color: #5d75a9;
}

.ocx-box .bd li {
  height: 1.2rem;
  display: flex;
  padding-left: 1.9rem;
  align-items: center;
}

.ocx-box .bd li + li {
  margin-top: 1rem;
}

.ocx-box .bd [class^="icon-"]:before,
.ocx-box .bd [class*=" icon-"]:before {
  font-size: 1.2rem;
  position: absolute;
  left: 0;
}

.ocx-box .bd .down-btn {
  display: block;
  text-align: center;
  margin-left: 1rem;
  width: 5rem;
  height: 1.1rem;
  line-height: 1.1rem;
  color: #fff;
  font-size: .7rem;
  border: none;
  background-color: #5d75a9;
  cursor: pointer;
}

.ocx-box .bd .down-btn:active {
  background-color: rgba(74, 144, 226, 0.7);
}
</style>
