<template>
  <div class="no-signal-wrap" v-if="false">
    <iframe src="" frameborder="0" class="signal-iframe-bg"></iframe>
    <div class="no-signal-box">
      <img class="no-signal" src="../../../../static/images/no-signal.png" alt="">
      <p>信号迷失，我正在努力呼唤它回家~</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-signal',
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
