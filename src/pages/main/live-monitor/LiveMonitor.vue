<template>
  <div class="item-box live-monitor-box" v-show="communityHelpVisible">
    <div class="hd">实时监控</div>
    <!-- <div class="bd"> -->
    <!--多路预览-->
    <!-- <multi-screen @multitosingle="multiTosingle" ref="multi"></multi-screen> -->
    <!-- <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">

      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic">
      <img src="/static/images/p02.jpg" alt="" class="pic"> -->
    <!-- </div> -->

    <!--点击放大-->
    <div class="big-box">
      <a class="icon-return" href="javascript:;" @click="backMultiScreen" v-if="ocxScreenShow"></a>
      <!-- <img src="/static/images/p02.jpg" alt="" class="pic"> -->
      <div class="pic">
        <!--单路预览-->
        <!-- <video-playback :warningData="warningData"></video-playback> -->
        <!-- <single-screen :videoplayData="videoplayData"></single-screen> -->
        <!-- <four-split-screen :fourSplitData="fourSplitData"></four-split-screen> -->
        <multi-screen @multitosingle="multiTosingle" ref="multi"></multi-screen>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'live-monitor',
  props: {
    communityHelpVisible: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ocxScreenShow: false,
      videoplayData: {
        deviceID: '300114a78b9b53050001', // 300114a78b9b53050001,30010000001310000001
        parentID: '1002200114a78b9b5305', // 1002200114a78b9b5305，10012001001110004444
        mediaIP: '192.168.0.94', // 192.168.0.94，192.168.0.207
        mediaPort: 10000
      },
      fourSplitData: [
        {
          deviceID: '30011238222980110001',
          parentID: '10012001123822298011',
          mediaIP: '192.168.0.109',
          mediaPort: 10000
        }
      ]
    }
  },
  created () {

  },
  methods: {
    backMultiScreen () {
      this.$refs.multi.singleToPreview()
      this.ocxScreenShow = false
    },
    multiTosingle () {
      this.ocxScreenShow = true
    },
    // ocxclick () {
    //   console.log('213')
    //   this.videoplayData = {
    //     deviceID: '300114a78b9b53050001',
    //     parentID: '1002200114a78b9b5305',
    //     mediaIP: '192.168.0.94',
    //     mediaPort: 10000
    //   }
    // },
    // TODO:模拟监控中心模块用户主动触发一个事件
    // testClick () {
    //   store.commit('liveMonitorClick')
    // }
  }
}
</script>

<style scoped>

</style>
