<template>
  <div class="browser-tip-wrap" v-if="showBrowserTip">
    <div>
      <iframe src="" frameborder="0" class="tip-iframe-bg"></iframe>
      <div class="tip-box icon-ie">
        <a class="close" @click="closeTip">╳</a>
        <p class="title">温馨提示</p>
        <div class="bd">
          <p>请使用IE浏览器打开</p>
          <p>部分内容无法适应会显示异常</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'browser-tip',
  data () {
    return {
      showBrowserTip: true,
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    closeTip () {
      this.showBrowserTip = false
    }
  }
}
</script>

<style>
.icon-ie:before {
  content: "\e680";
}

.browser-tip-wrap {
  position: absolute;
  z-index: 20;
  height: 5.08rem;
}

.tip-iframe-bg{
  position: absolute;
  top: 2rem;
  left: 20.35rem;
  z-index: 1;
  width: 31.1rem;
  height: 3.08rem;
}

.tip-box {
  position: absolute;
  top:0;
  left: 20.4rem;
  z-index: 20;
  width: 31rem;
  background-color: #0c012d;
  border: 0.05rem solid #008bff;
  padding: .7rem .7rem .7rem 5rem;
  font-size: .7rem;
  line-height: 1;
}

.tip-box.icon-ie:before{
  position: absolute;
  top: .7rem;
  left: 1rem;
  font-size: 3rem;
  color: #5d75a9;
  line-height: 1;
}

.tip-box .close {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 1rem;
  padding: .7rem;
}

.tip-box .title {
  margin-bottom: .5rem;
  color: #5d75a9;
}

.tip-box .bd {
  line-height: 1.2rem;
}

</style>
