<template>
  <div class="explorer-tips-wrap" v-if="false">
    <div class="ocx-box">
      <div class="info">
        <div class="hd">
          <span class="icon-tea"></span>
          <p>温馨提示：来，123，先做好准备工作再开始吧！</p>
        </div>
        <ul class="bd">
          <li class="icon-down1">
            下载OCX控件
            <a class="down-btn confirm" href="http://192.168.0.236/OCX/hk-videoplayer.exe" download="ocxvideo.exe">OCX控件1</a>
            <button class="down-btn">OCX控件2</button>
          </li>
          <li class="icon-down2">
            下载完成后，双击安装包中的Register文件；
          </li>
          <li class="icon-refresh">
            刷新页面，开始使用！
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      ocxShow: false
    }
  },
  computed: {
    ...mapState({
      ocxDownload () {
        return this.$store.state.ocxDownload.shown
      }
    })
  },
  watch: {
    ocxDownload (val) {
      console.log('******************')
      console.log(val)
      this.ocxShow = val
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.icon-tea:before {
  content: "\e6f2";
}
.icon-down1:before {
  content: "\e603";
}
.icon-down2:before {
  content: "\e6b7";
}
.icon-refresh:before {
  content: "\e697";
}

.ocx-wrap {
  height: 100%;
  padding: 0.7rem;
  display: flex;
  align-items: stretch;
}

.ocx-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0c012d;
  border: 0.05rem solid #008bff;
}

.ocx-box .info {
  width: 45rem;
}

.ocx-box .icon-tea {
  font-size: 7.5rem;
  line-height: 1;
}

.ocx-box .hd {
  text-align: center;
  margin-bottom: 1rem;
}

.ocx-box .bd li {
  height: 7rem;
  background-color: #0b0b3d;
  display: flex;
  padding-left: 7rem;
  align-items: center;
}

.ocx-box .bd li + li {
  margin-top: 1rem;
}

.ocx-box .bd [class^="icon-"]:before,
.ocx-box .bd [class*=" icon-"]:before {
  font-size: 5rem;
  position: absolute;
  left: 1rem;
}

.ocx-box .bd .down-btn {
  margin-left: 1rem;
  width: 5rem;
  height: 1.4rem;
  line-height: 1.2rem;
  color: #fff;
  font-size: 0.8rem;
  border: 0.05rem solid rgba(0, 152, 255, 1);
  background-color: rgba(74, 144, 226, 0.5);
  cursor: pointer;
}

.ocx-box .bd .down-btn:active {
  background-color: rgba(74, 144, 226, 0.7);
}
</style>
